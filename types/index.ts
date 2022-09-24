export interface LocationQuery {
  latitude: number | null;
  longitude: number | null;
  radius: number | null;
}

export interface RestaurantsInRadiusResponse {
  count: number | null;
  avg: number | null;
  std: number | null;
}