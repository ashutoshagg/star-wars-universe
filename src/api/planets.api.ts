import { AxiosResponse } from "axios";
import { STAR_WARS_UNIVERSE_BASE_URL } from "../envrionment";
import { IPlanetResponse } from "../types/planets.type";
import Request from "./Request";

export const getPlanetsApi = (url: string): Promise<AxiosResponse<IPlanetResponse>> => {
    let endpoint = `${STAR_WARS_UNIVERSE_BASE_URL}planets`;
    if (url !== '') {
        endpoint = url;
    }
    return Request.get(endpoint);
};
