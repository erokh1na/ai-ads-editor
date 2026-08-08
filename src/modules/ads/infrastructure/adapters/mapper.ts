import {
  AD_CATEGORY_CONFIG,
  AppAd,
  AppAdsAutoParams,
  AppAdsCategory,
  AppAdsElectronicsParams,
  AppAdsRealtyParams,
} from "@/modules/ads/domain/entities"
import { AppAdsListInput, AppAdsListOutput, AppAdsUpdateParams } from "@/modules/ads/domain/port"
import {
  ServerAd,
  ServerAdCategory,
  ServerAdsListParams,
  ServerAdsListResponse,
  ServerAdUpdateBody,
  ServerAutoParams,
  ServerElectronicsParams,
  ServerRealEstateParams,
} from "./types"

const APP_TO_SERVER_CATEGORY: Record<AppAdsCategory, ServerAdCategory> = {
  auto: "auto",
  realty: "real_estate",
  electro: "electronics",
}

const SERVER_TO_APP_CATEGORY: Record<ServerAdCategory, AppAdsCategory> = {
  auto: "auto",
  real_estate: "realty",
  electronics: "electro",
}

function toAutoParams(params: ServerAutoParams): AppAdsAutoParams {
  return {
    transmission: params.transmission,
    brand: params.brand,
    model: params.model,
    yearOfManufacture: params.yearOfManufacture,
    mileage: params.mileage,
    enginePower: params.enginePower,
  }
}

function toRealtyParams(params: ServerRealEstateParams): AppAdsRealtyParams {
  return {
    type: params.type,
    address: params.address,
    area: params.area,
    floor: params.floor,
  }
}

function toElectronicsParams(params: ServerElectronicsParams): AppAdsElectronicsParams {
  return {
    type: params.type,
    brand: params.brand,
    model: params.model,
    condition: params.condition,
    color: params.color,
  }
}

function toAppParams(item: ServerAd): AppAd["params"] {
  if (!item.params) return {} as AppAd["params"]
  switch (item.category) {
    case "auto":
      return toAutoParams(item.params)
    case "real_estate":
      return toRealtyParams(item.params)
    case "electronics":
      return toElectronicsParams(item.params)
  }
}

export function toDomainAd(item: ServerAd): AppAd {
  return {
    id: String(item.id),
    title: item.title,
    description: item.description ?? undefined,
    price: item.price ?? 0,
    needsRevision: item.needsRevision,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? undefined,
    category: SERVER_TO_APP_CATEGORY[item.category],
    params: toAppParams(item),
  } as AppAd
}

export function toDomainAdsList(response: ServerAdsListResponse): AppAdsListOutput {
  return {
    data: response.items.map(toDomainAd),
    meta: { total: response.total },
  }
}

export function toServerAdsList(input: AppAdsListInput): ServerAdsListParams {
  return {
    q: input.search,
    limit: input.limit,
    skip: input.skip,
    needsRevision: input.needsRevision,
    categories: input.categories?.map((category) => APP_TO_SERVER_CATEGORY[category]).join(","),
    sortColumn: input.sortColumn,
    sortDirection: input.sortDirection,
  }
}

export const toServerAdUpdate = (input: Omit<AppAdsUpdateParams, "id">): ServerAdUpdateBody => {
  const numericKeys = AD_CATEGORY_CONFIG[input.category].numericParams

  const params = Object.fromEntries(
    Object.entries(input.params).map(([key, value]) => [
      key,
      value != null && numericKeys.includes(key) ? Number(value) : value,
    ]),
  )

  return {
    category: APP_TO_SERVER_CATEGORY[input.category],
    title: input.title,
    price: Number(input.price),
    description: input.description,
    params,
  } as ServerAdUpdateBody
}
