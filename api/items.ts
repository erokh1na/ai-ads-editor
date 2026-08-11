import type { VercelRequest, VercelResponse } from "@vercel/node"
import { readFileSync } from "fs"
import { join } from "path"

type ItemCategory = "auto" | "real_estate" | "electronics"

type Item = {
  id: number
  title: string
  description?: string
  price: number | null
  createdAt: string
  updatedAt: string
  category: ItemCategory
  params: Record<string, unknown>
}

const REQUIRED_PARAMS: Record<ItemCategory, string[]> = {
  auto: ["brand", "model", "yearOfManufacture", "transmission", "mileage", "enginePower"],
  real_estate: ["type", "address", "area", "floor"],
  electronics: ["type", "brand", "model", "condition", "color"],
}

let cachedItems: Item[] | null = null

function getItems(): Item[] {
  if (!cachedItems) {
    cachedItems = JSON.parse(
      readFileSync(join(process.cwd(), "src/server/data/items.json"), "utf-8")
    ) as Item[]
  }
  return cachedItems
}

function doesItemNeedRevision(item: Item): boolean {
  if (!item.description) return true
  const required = REQUIRED_PARAMS[item.category]
  return required.some(param => !(param in item.params))
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" })
    return
  }

  const q = (req.query.q as string) || ""
  const limit = Math.max(1, parseInt(req.query.limit as string) || 10)
  const skip = Math.max(0, parseInt(req.query.skip as string) || 0)
  const needsRevision = req.query.needsRevision === "true" || req.query.needsRevision === "1"
  const categories = req.query.categories
    ? (req.query.categories as string).split(",").filter(Boolean)
    : null
  const sortColumn = (req.query.sortColumn as string) || "createdAt"
  const sortDirection = (req.query.sortDirection as string) || "asc"

  const allItems = getItems()

  const filteredItems = allItems.filter(item => {
    return (
      item.title.toLowerCase().includes(q.toLowerCase()) &&
      (!needsRevision || doesItemNeedRevision(item)) &&
      (!categories?.length || categories.includes(item.category))
    )
  })

  filteredItems.sort((a, b) => {
    let cmp = 0
    if (sortColumn === "title") {
      cmp = a.title.localeCompare(b.title)
    } else {
      cmp = new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    }
    return sortDirection === "desc" ? -cmp : cmp
  })

  res.json({
    items: filteredItems.slice(skip, skip + limit).map(item => ({
      id: item.id,
      category: item.category,
      title: item.title,
      price: item.price,
      needsRevision: doesItemNeedRevision(item),
    })),
    total: filteredItems.length,
  })
}
