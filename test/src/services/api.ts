import axios from "axios";
import { Site, Test } from "../types";

const url: string = "http://localhost:3100/";

export const fetchTests = async (): Promise<Test[]> => {
  try {
    const response = await axios.get<Test[]>(`${url}tests`);
    return response.data;
  } catch (error) {
    console.error("Ошибка", error);
    return [];
  }
};

export const fetchSites = async (): Promise<Site[]> => {
  try {
    const response = await axios.get<Site[]>(`${url}sites`);
    return response.data;
  } catch (error) {
    console.error("Ошибка", error);
    return [];
  }
};

export const fetchTestById = async (testId: string): Promise<Test | null> => {
  try {
    const response = await axios.get<Test>(`${url}tests/${testId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка", error);
    return null;
  }
};
