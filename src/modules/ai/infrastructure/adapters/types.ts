export interface ServerAiPromptContext {
  title: string
  description?: string
  price?: number
  category: string
  params: Record<string, string | number>
}

export interface ServerAiDescriptionOutput {
  data: {
    description: string
  }
}

export interface ServerAiPriceOutput {
  data: {
    price: number
    explanation: string
  }
}
