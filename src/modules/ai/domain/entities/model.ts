export interface AppAiPromptContext {
  title: string
  description?: string
  price?: number
  category?: string
  params?: Record<string, any>
}

export interface AppAiDescription {
  description: string
}

export interface AppAiPrice {
  price: number
  reason: string
}
