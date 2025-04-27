import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = "AIzaSyCMOix-BWI2-KFBNhqRxq5Oi_Jt8DhorTc";

export const QUERY_KEYS = {
  FETCH_PLACES: "FETCH_PLACES",
};

export const useFetchNearByPlacesQuery = (
  latitude: number | undefined,
  longitude: number | undefined,
  type: string
) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [latitude, longitude, type],
    queryFn: async () => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=${type}&key=${apiKey}`
      );

      return response.data.results;
    },
    retry: false,
    enabled: latitude !== null && longitude !== null,
  });

  return { isLoading, isError, error, data };
};
