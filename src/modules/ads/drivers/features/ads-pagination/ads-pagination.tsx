import { useAdsList, useAdsPagination } from "@/modules/ads/applications/usecases"
import { Pagination } from "antd"

export const AdsPagination = () => {
  const adsPagination = useAdsPagination()
  const adsList = useAdsList()

  if (adsList.total <= adsPagination.pageSize) return null

  return <Pagination current={adsPagination.page} total={adsList.total} pageSize={adsPagination.pageSize} onChange={adsPagination.setPage} />
}
