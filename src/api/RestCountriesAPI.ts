import apiUrls from "../apiConfig";
import { Country } from "../types/Country";

// const delay = (ms: any) => new Promise(res => setTimeout(res, ms)); // Added to test loading spinner

export const fetchCountries = async (name: string) => {
  const endpoint = `${apiUrls.restcountriesUrl}${name}?fields=name;flag;numericCode`;
  // await delay(300);
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