import axios from "axios"

export const fetcherClient = axios.create({
  baseURL: "http://localhost:8080",
})
