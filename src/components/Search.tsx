import React from "react";

// Api imports
import { fetchCountries } from '../api/RestCountriesAPI';
import { getCountries, saveCountry } from '../api/CountriesAPI';

// Component imports
import CountryListItem from "./CountryListItem";

// Bootstrap imports
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import ListGroup from "react-bootstrap/ListGroup";

// Data types
import { Country } from "../types/Country";

interface Props {
  countryList: Country[],
  pinnedCountries: Country[],
  setCountryList: any,
  setSavingFavorites: any,
  setLoading: any,
  setErrorMessage: any,
  setPinnedCountries: any,
}

const Search: React.FC<Props> = ({ countryList, pinnedCountries, setCountryList, setSavingFavorites,
  setLoading, setErrorMessage, setPinnedCountries }) => {

  // Loads the countries from restcountries api
  const loadCountries = async (name: string) => {
    setLoading(true);
    setErrorMessage('');
    setSavingFavorites(true);
    fetchCountries(name)
      .then((countries) => {
        setCountryList(countries.slice(0, 5));
        setLoading(false);
        setSavingFavorites(false);
      })
      .catch((error) => {
        console.log('My', error);
        setCountryList([]);
        setErrorMessage(error.toString());
        setLoading(false);
        setSavingFavorites(false);
      })
  }

  /*
  Handles pinning the country
  If we can connect to the backend api, saves the selection to backend and reload pinned data from backend
  If backend is not reachable, we pin the data in memory and updates the frontend
  */
  const handlePinCountries = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const numericCode = event.currentTarget.getAttribute('value');
    if (isNotPinned(numericCode)) {
      const country: Country | undefined = countryList.find((e: any) => { return e.numericCode.toString().padStart(3, '0') === numericCode });
      if (country) {
        setSavingFavorites(true);
        saveCountry(country)
          .then(res => {
            getCountries()
              .then(res => {
                setPinnedCountries(res.data)
              }) // Error here is caught below
            setSavingFavorites(false)
          }
          )
          .catch(err => {
            setPinnedCountries((pinnedCountries: Country[]) => [...pinnedCountries, country])
            setSavingFavorites(true)
          }); //ToDo: log error for monitoring and alert
      }
    }
  }

  // DRY: Function used by handlePinCountries and CountryListItem to check if the given country is pinned or not
  const isNotPinned = (numericCode: number | string | null) => {
    if (typeof numericCode === 'number') {  //Bug-fix: Our backend returns int, while restcountries return numericCOde as string
      return !pinnedCountries.find((e: any) => { return e.numericCode === numericCode });
    } else {
      return !pinnedCountries.find((e: any) => { return e.numericCode.toString().padStart(3, '0') === numericCode });
    }
  }

  return (
    <div>
      <InputGroup size="lg">
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Start typing a country name here"
          onChange={(e) => loadCountries(e.target.value)}
        />
      </InputGroup>
      <ListGroup>
        {countryList.map((c, index) => {
          return <CountryListItem
            key={index}
            country={c.name}
            flag={c.flag}
            numericCode={c.numericCode}
            buttonDisplay={isNotPinned(c.numericCode)}
            buttonText={'+'}
            handleClick={handlePinCountries}
          />
        })}
      </ListGroup>
    </div>
  );
}

export default Search