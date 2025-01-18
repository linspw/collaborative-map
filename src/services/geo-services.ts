import axios, { AxiosResponse } from 'axios';
import { NeighborhoodListResult, NeighborhoodPopulations } from '../types/apis/neighborhood-population';

const getNeighborhoods = () => {
  return axios.get<void, AxiosResponse<NeighborhoodListResult>>('/bairros-geojson')
}


const getNeighborhoodPopulation = (id: number) => {
  return axios.get<void, AxiosResponse<NeighborhoodPopulations>>('/populacao', {
    params: { id }
  })
}

export const GeoServices = {
  getNeighborhoods,
  getNeighborhoodPopulation,
}
