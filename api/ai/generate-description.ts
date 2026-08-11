import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ZodError, treeifyError } from "zod"
import { generateDescription } from "../../src/server/src/groq-ai-repository"
import { AppAiDescriptionInputSchema } from "../../src/server/src/validation"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" })
    return
  }

  try {
    const { item } = AppAiDescriptionInputSchema.parse(req.body)
    const data = await generateDescription(item)
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
