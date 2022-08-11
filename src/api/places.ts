// Const import
import { PLACES_URI, GOECODING_URI } from "@Const/api-uri";
import { Location } from "@Types/types";

// dependencies import
import axios from "axios";

const fetchPlace = async (lon: string, lat: string) => {
  const result = await axios.get(PLACES_URI(lon, lat));

  return result.data;
};

export const fetchPlaces = async (coordinates: Location[]) => {
  const places = [];

  for await (const coordinate of coordinates) {
    const place = await fetchPlace(coordinate.lon, coordinate.lat);
    places.push(place);
  }

  return places;
};

export const fetchGeocoding = async (locations: string[]) => {
  const coordinates: Location[] = [];

  for await (const location of locations) {
    const { data } = await axios.get(GOECODING_URI(location));
    const lon: string | undefined =
      data?.features[0]?.properties?.lon?.toString();
    const lat: string | undefined =
      data?.features[0]?.properties?.lat.toString();

    if (lon && lat) {
      coordinates.push({
        lon,
        lat,
      });
    }
  }

  return coordinates;
};
