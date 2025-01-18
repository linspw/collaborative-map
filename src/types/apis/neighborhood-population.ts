import { GeoJSONProps } from "react-leaflet"

export interface NeighborhoodListResult {
  type: GeoJSONProps['data']['type']
  name: string
  crs: Crs
  features: NeighborhoodFeature[]
}

export interface Crs {
  type: string
  properties: CrsProperties
}

export interface CrsProperties {
  name: string
}

export interface NeighborhoodFeature {
  type: string
  properties: FeatureProperties
  geometry: Geometry
  bbox: number[]
}

export interface FeatureProperties {
  id: number
  name: string
  setor: string
  zona: string
}

export interface Geometry {
  type: string
  coordinates: number[][][][]
}


export type NeighborhoodPopulations = NeighborhoodPopulation[]

export interface NeighborhoodPopulation {
  id_geometria: number
  ano: string
  populacao: number
}
