import { GeoCoordinates } from "@/types/trip";
import axios from "axios";

export const fetchImage = async (
  placeName: string,
  geoCoordinates: GeoCoordinates,
) => {
  try {
    const res = await axios.post("/api/generate-place-image", {
      geoCoordinates,
      placeName,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
