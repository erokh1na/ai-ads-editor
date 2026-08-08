import { useNotificationMainContext } from "@/core/notification"
import { useAdDetail } from "@/modules/ads/applications/usecases"
import type { AppAd, AppAdsCategory } from "@/modules/ads/domain/entities"
import { adsApiClient, adsApiKeys } from "@/modules/ads/infrastructure/adapters"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { z } from "zod"

export const useAdEditForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const params = useParams()

  const query = useAdDetail()
  const mutation = adsApiClient.useUpdate()

  const notify = useNotificationMainContext()

  const schema = z.object({
    category: z.string().min(1, "Выберите категорию"),
    title: z.string().min(1, "Название должно быть заполнено"),
    price: z.string().min(1, "Цена должна быть заполнена"),
    description: z.string().optional(),
    params: z.record(z.string(), z.string().optional()),
  })

  const toFormValues = (ad: AppAd): z.infer<typeof schema> => ({
    category: ad.category,
    title: ad.title,
    price: String(ad.price ?? ""),
    description: ad.description ?? undefined,
    params: Object.fromEntries(
      Object.entries(ad.params).map(([key, value]) => [key, value != null ? String(value) : undefined]),
    ),
  })

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: query.data ? toFormValues(query.data) : undefined,
    mode: "onBlur",
  })

  const submit = methods.handleSubmit((values) => {
    if (!query.data) return

    mutation.mutate(
      {
        ...values,
        id: query.data.id,
        category: values.category as AppAdsCategory,
      },
      {
        onSuccess: async () => {
          notify.open("success", () => ({
            title: "Данные успешно изменены",
          }))

          await queryClient.invalidateQueries({
            queryKey: adsApiKeys.detail({ id: params.id }),
          })

          navigate(`/${query.data?.id}`)
        },
        onError: () => {
          notify.open("error", () => ({
            title: "Данные не изменены",
          }))
        },
      },
    )
  })

  const cancel = () => {
    if (query.data) methods.reset(toFormValues(query.data))

    navigate(`/${query.data?.id}`)
  }

  return {
    query,
    methods,
    submit,
    cancel,
    isSubmitting: mutation.isPending,
    isValid: methods.formState.isValid,
  }
}
