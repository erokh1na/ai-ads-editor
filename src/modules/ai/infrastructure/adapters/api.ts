import { fetcherClient } from "@/core/fetcher"
import { AppAiDescriptionInput, AppAiPriceInput } from "@/modules/ai/domain/port"
import { useMutation } from "@tanstack/react-query"
import { toDomainAiDescription, toDomainAiPrice } from "./mapper.ts"
import { ServerAiDescriptionOutput, ServerAiPriceOutput } from "./types.ts"

const useGenerateDescription = () => {
  return useMutation({
    mutationFn: (input: AppAiDescriptionInput) =>
      fetcherClient
        .post<ServerAiDescriptionOutput>("/ai/generate-description", input)
        .then((response) => toDomainAiDescription(response.data)),
  })
}

const useGeneratePrice = () => {
  return useMutation({
    mutationFn: (input: AppAiPriceInput) =>
      fetcherClient
        .post<ServerAiPriceOutput>("/ai/generate-price", input)
        .then((response) => toDomainAiPrice(response.data)),
  })
}

export const aiApiClient = {
  useGenerateDescription,
  useGeneratePrice,
}
