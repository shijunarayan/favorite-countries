import apiUrls from "../apiConfig";
import { Country } from "../types/Country";

export const fetchCountries = async (name: string) => {
  const endpoint = `${apiUrls.restcountriesUrl}${name}?fields=name;flag;numericCode`;

  return fetch(endpoint).then(async function (response) {
    if (!response.ok) {
      // make the promise be rejected if we didn't get a 2xx response
      throw new Error("No countries found");
    } else {
      const jsonRes = await response.json();
      return jsonRes.map((country: Country) => ({
        name: country.name,
        flag: country.flag,
        numericCode: country.numericCode
      }));
    }
  })
}