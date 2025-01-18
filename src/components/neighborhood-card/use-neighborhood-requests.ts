/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { GeoServices } from "@services";

interface GetNeighborhoodPopulation {
  id: number;
}

export const useNeighborhoodRequests = () => {
  const getNeighborhoodPopulation = ({ id }: GetNeighborhoodPopulation) => {
    return useQuery({
      queryKey: ["neighborhood-population", id],
      queryFn: async () => {
        return GeoServices.getNeighborhoodPopulation(id).then(({ data }) => {
          return data;
        });
      },
      initialData() {
        return []
      },
      enabled: !id,
    });
  };

  const getNeighborhoods = () => {
    return useQuery({
      queryKey: ["neighborhood"],
      queryFn: () => {
        return GeoServices.getNeighborhoods().then(({ data }) => {
          return data;
        });
      },
    });
  };

  return {
    getNeighborhoodPopulation,
    getNeighborhoods,
  };
};
