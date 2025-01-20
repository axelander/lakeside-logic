import type { Cabin } from "./db";

export interface GetCabinsResponse {
  cabins: Cabin[]
}

export interface BookCabinRequest {
  email: string
}

export interface BookCabinResponse {
  success: boolean
  cabin: Cabin
}
