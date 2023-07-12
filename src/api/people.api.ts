import { AxiosResponse } from "axios";
import { IResident } from "../types/resident.type";
import Request from "./Request";

export const getPeopleApi = (url: string): Promise<AxiosResponse<IResident>> => {
    return Request.get(url);
};
