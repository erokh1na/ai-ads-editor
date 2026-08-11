import { AppAiDescription, AppAiPrice, AppAiPromptContext } from "@/modules/ai/domain/entities"

interface AppAiInput {
  item: AppAiPromptContext
}

export type AppAiDescriptionInput = AppAiInput
export type AppAiPriceInput = AppAiInput

export interface AppAiDescriptionOutput {
  data: AppAiDescription
}

export interface AppAiPriceOutput {
  data: AppAiPrice
}
