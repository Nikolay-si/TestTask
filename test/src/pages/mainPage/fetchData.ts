import { fetchSites, fetchTests } from "../../services/api";
import { apiResponse } from "../../types";

export const fetchData = async (): Promise<apiResponse> => {
  try {
    const [tests, sites] = await Promise.all([fetchTests(), fetchSites()]);
    return { tests, sites };
  } catch (error) {
    console.error("Ошибка", error);
    return { tests: [], sites: [] };
  }
};
