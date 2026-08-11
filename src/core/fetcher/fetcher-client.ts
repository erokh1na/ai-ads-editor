import axios from "axios"

export const fetcherClient = axios.create({
  baseURL: "/api",
})
