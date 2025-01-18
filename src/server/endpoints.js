import { HttpResponse, http } from 'msw';
import bairros from './response_geometrias_bairros.json';
import populacao from './response_populacao_bairros.json';

export const endpoints = [
  http.get('/bairros-geojson', () => {
    return HttpResponse.json(bairros);
  }),
  http.get('/populacao', (data) => {
    const url = new URL(data.request.url)

    let populationId = url.searchParams.get('id')

    if (!populationId) throw new Error("No population")

    populationId = Number(populationId)


    const neighborhoodPopulation = populacao.filter((population) => {
      return population.id_geometria === populationId
    })

    return HttpResponse.json(neighborhoodPopulation);
  }),
];
