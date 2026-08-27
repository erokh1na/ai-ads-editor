import type { z } from "zod"
import type { AppAiPromptContextSchema, AppAiPricePromptContextSchema } from "./ai-validation.ts"

type AppAiPromptContext = z.infer<typeof AppAiPromptContextSchema>
type AppAiPricePromptContext = z.infer<typeof AppAiPricePromptContextSchema>

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = "qwen/qwen3.8-27b"

function buildPrompt(item: AppAiPromptContext): string {
  const paramsText = Object.entries(item.params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")

  return [
    `Категория: ${item.category}`,
    `Название: ${item.title}`,
    item.price !== undefined ? `Цена: ${item.price}` : "",
    item.description ? `Текущее описание: ${item.description}` : "Текущее описание: отсутствует",
    paramsText ? `Характеристики: ${paramsText}` : "",
    "",
    "Напиши привлекательное, конкретное описание объявления для маркетплейса на основе этих данных. Не более 300 символов. Только текст описания, без пояснений и вступлений.",
  ]
    .filter(Boolean)
    .join("\n")
}

export async function generateDescription(item: AppAiPromptContext): Promise<{ description: string }> {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured")
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: buildPrompt(item) }],
      max_tokens: 300,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Groq API error ${response.status}: ${errorBody}`)
  }

  const json = await response.json()
  const description: string | undefined = json.choices?.[0]?.message?.content?.trim()

  if (!description) {
    throw new Error("Groq API returned an empty response")
  }

  return { description }
}

function buildPricePrompt(item: AppAiPricePromptContext): string {
  const paramsText = Object.entries(item.params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")

  return [
    `Категория: ${item.category}`,
    `Название: ${item.title}`,
    item.price !== undefined ? `Текущая цена: ${item.price}` : "Текущая цена: не указана",
    item.description ? `Описание: ${item.description}` : "Описание: отсутствует",
    paramsText ? `Характеристики: ${paramsText}` : "",
    "",
    "Предложи реалистичную рыночную цену в рублях для этого объявления на основе указанных данных. Учитывай категорию, характеристики и состояние.",
    "Ответ должен быть ровно в таком формате:",
    "Первая строка — только число (цена в рублях, без валюты и пробелов).",
    "Вторая строка — краткое пояснение цены, не более 300 символов.",
  ]
    .filter(Boolean)
    .join("\n")
}

export async function generatePrice(item: AppAiPricePromptContext): Promise<{ price: number; explanation: string }> {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured")
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: buildPricePrompt(item) }],
      max_tokens: 300,
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Groq API error ${response.status}: ${errorBody}`)
  }

  const json = await response.json()
  const raw: string | undefined = json.choices?.[0]?.message?.content?.trim()

  if (!raw) {
    throw new Error("Groq API returned an empty response")
  }

  const lines = raw.split("\n")
  const priceStr = lines[0]?.trim() ?? ""
  const price = Number(priceStr.replace(/\s/g, ""))

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(`Groq API returned invalid price: "${raw}"`)
  }

  const explanation = lines.slice(1).join("\n").trim().slice(0, 300) || "Цена рассчитана на основе рыночных данных"

  return { price, explanation }
}
