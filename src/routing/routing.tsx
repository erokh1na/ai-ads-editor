import { PageAd, PageHome } from "@/routing/pages"
import { Route, Routes } from "react-router"
import { LayoutMain } from "./layouts"

export const Routing = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" index element={<PageHome />} />
        <Route path=":id" element={<PageAd />} />
      </Route>
    </Routes>
  )
}
