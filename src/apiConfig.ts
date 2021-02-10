const apiUrls = {
  supplementalCountriesUrl: 'https://admithub-suppl-countries.herokuapp.com/supplemental/countries/',
  restcountriesUrl: 'https://restcountries.eu/rest/v2/name/',
  countriesUrl: 'https://admithub-suppl-countries.herokuapp.com/pinned/countries/',
}

// if (window.location.hostname === 'localhost') {
//   console.log('Urls are using dev environment settings');
//   apiUrls = {
//     supplementalCountriesUrl: 'http://127.0.0.1:8000/supplemental/countries/',
//     restcountriesUrl: 'https://restcountries.eu/rest/v2/name/',
//     countriesUrl: 'http://127.0.0.1:8000/pinned/countries/',
//   }
// }

export default apiUrls