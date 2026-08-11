import { AppAiDescription, AppAiPrice } from "@/modules/ai/domain/entities"
import { ServerAiDescriptionOutput, ServerAiPriceOutput } from "./types.ts"

export const toDomainAiDescription = (data: ServerAiDescriptionOutput): AppAiDescription => {
  return {
    description: data.data.description,
  }
}

export const toDomainAiPrice = (data: ServerAiPriceOutput): AppAiPrice => {
  return {
    price: data.data.price,
    reason: data.data.explanation,
  }
}
