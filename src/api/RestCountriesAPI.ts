import axios from 'axios';
import apiUrls from "../apiConfig";
import { Country } from "../types/Country";

export const fetchCountries = async (name: string) => {
  // Fetch Rest Countries from thirdparty API
  let restCountries: Country[] = [];
  await fetchRestCountries(name)
    .then(res => { restCountries = res.data })
    .catch(err => console.log(err));

  // Fetch Supplimental Countries from our Backend API
  let supplCountries: Country[] = [];
  await fetchSupplementalCountries(name)
    .then(res => { supplCountries = res.data })
    .catch(err => console.log(err));

  // Replace duplicate countries from restCountries and supplementCountries with country from supplementCountries
  const uniqueRestCountries = Array.from(new Set(restCountries.map(a => a.name)))
    .map(name => {
      return supplCountries.find(a => a.name === name) ?? restCountries.find(a => a.name === name)
    })

  // Combine Rest Countries and Supplimental Countries
  const combinedCountries = [...uniqueRestCountries, ...supplCountries];

  // If return data is empty throw an exception
  if (name && combinedCountries.length === 0) {
    throw new Error(`No countries found for input: ${name}`);
  }

  return combinedCountries;
}

export const fetchRestCountries = async (name: string) => {
  return axios({
    method: 'GET',
    url: `${apiUrls.restcountriesUrl}${name}?fields=name;flag;numericCode`
  });
}

export const fetchSupplementalCountries = async (name: string) => {
  return axios({
    method: 'GET',
    url: `${apiUrls.supplementalCountriesUrl}${name}`
  });
}