import axios from 'axios';
import apiUrls from '../apiConfig';
import { Country } from "../types/Country";

export const getCountries = () => {
  return axios({
    method: 'GET',
    url: apiUrls.countriesUrl
  });
}

export const saveCountry = (country: Country) => {
  return axios({
    method: 'POST',
    url: apiUrls.countriesUrl,
    data: {
      "numericCode": country.numericCode,
      "name": country.name,
      "flag": country.flag
    }
  });
}


export const deleteCountry = (id: number) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrls.countriesUrl}${id}/`,
  });
}