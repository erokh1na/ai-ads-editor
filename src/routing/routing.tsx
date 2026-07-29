import { Route, Routes } from "react-router"
import { LayoutMain } from "./layouts"
import {PageHome} from "@/routing/pages";

export const Routing = () => {
  return (
    <Routes>
      <Route element={<LayoutMain />}>
        <Route path="/" index element={<PageHome />} />
      </Route>
    </Routes>
  )
}
