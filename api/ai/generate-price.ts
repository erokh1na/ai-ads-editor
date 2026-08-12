import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ZodError, treeifyError } from "zod"
import { generatePrice } from "../../src/server/src/groq-ai-repository.js"
import { AppAiPriceInputSchema } from "../../src/server/src/validation.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" })
    return
  }

  try {
    const { item } = AppAiPriceInputSchema.parse(req.body)
    const data = await generatePrice(item)
    res.status(200).json({ data })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: treeifyError(error) })
      return
    }

    console.error(error)
    res.status(502).json({ success: false, error: "AI service is unavailable" })
  }
}
