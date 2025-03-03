import axios from "axios";
import { apiResponse, Site, Test } from "../types";

const url: string = "http://localhost:3100/";

export const fetchData = async (): Promise<apiResponse> => {
  try {
    const [testResponse, sitesResponse] = await Promise.all([
      axios.get<Test[]>(`${url}tests`),
      axios.get<Site[]>(`${url}sites`),
    ]);

    return {
      tests: testResponse.data,
      sites: sitesResponse.data,
    };
  } catch (error) {
    console.error("Ошибка", error);
    return { tests: [], sites: [] };
  }
};
