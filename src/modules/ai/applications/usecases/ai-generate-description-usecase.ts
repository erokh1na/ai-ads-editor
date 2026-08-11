import { useAdDetail } from "@/modules/ads/applications/usecases"
import { aiApiClient } from "@/modules/ai/infrastructure/adapters/api.ts"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

export const useAiGenerateDescription = () => {
  const formContext = useFormContext()

  const detail = useAdDetail()
  const mutation = aiApiClient.useGenerateDescription()
  const data = mutation.data?.description || ""

  const [state, setState] = useState<{
    phase: "start" | "loading" | "retry"
    open: boolean
  }>({
    phase: "start",
    open: false,
  })

  const open = (open: boolean) => {
    setState((prev) => ({ ...prev, open }))
  }

  const close = () => {
    setState({ phase: "start", open: false })
  }

  const generate = () => {
    if (!detail.data) return

    setState((prev) => ({ ...prev, phase: "loading", open: false }))

    const values = formContext.getValues()

    mutation.mutate(
      {
        item: {
          title: values.title || detail.data.title,
          description: values.description || undefined,
          category: values.category || detail.data.category,
          params: values.params || detail.data.params,
        },
      },
      {
        onSuccess: () => {
          setState((prev) => ({ ...prev, phase: "retry", open: true }))
        },
        onError: () => {
          setState((prev) => ({ ...prev, phase: "start", open: false }))
        },
      },
    )
  }

  const apply = () => {
    formContext.setValue("description", data, {
      shouldValidate: true,
      shouldDirty: true,
    })

    close()
  }

  return {
    phase: state.phase,
    isOpen: state.open,
    data,
    generate,
    apply,
    close,
    open,
  }
}
