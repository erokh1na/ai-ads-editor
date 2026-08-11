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
  const itemId = Number(req.query.id)

  if (!Number.isFinite(itemId)) {
    res.status(400).json({ success: false, error: "Item ID path param should be a number" })
    return
  }

  if (req.method === "GET") {
    const item = getItems().find(i => i.id === itemId)

    if (!item) {
      res.status(404).json({ success: false, error: "Item with requested id doesn't exist" })
      return
    }

    res.json({ ...item, needsRevision: doesItemNeedRevision(item) })
    return
  }

  if (req.method === "PUT" || req.method === "POST") {
    const items = getItems()
    const itemIndex = items.findIndex(i => i.id === itemId)

    if (itemIndex === -1) {
      res.status(404).json({ success: false, error: "Item with requested id doesn't exist" })
      return
    }

    const body = req.body as Partial<Item> & { params?: Record<string, unknown> }
    const existing = items[itemIndex]

    items[itemIndex] = {
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
      ...existing,
      ...body,
      category: body.category || existing.category,
    } as Item

    res.json({ success: true })
    return
  }

  res.status(405).json({ success: false, error: "Method not allowed" })
}
