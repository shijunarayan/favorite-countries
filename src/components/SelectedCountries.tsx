import React from "react";

// Api imports
import { deleteCountry } from "../api/CountriesAPI";

// Component imports
import CountryListItem from "./CountryListItem";

// Bootstrap imports
import ListGroup from "react-bootstrap/ListGroup";

// Data types
import { Country } from "../types/Country";

interface Props {
  pinnedCountries: Country[],
  setSavingFavorites: any,
  setPinnedCountries: any,
}

const SelectedCountries: React.FC<Props> = ({ pinnedCountries, setSavingFavorites, setPinnedCountries }) => {

  /*
  Handles unpinning the selected country
  If we can connect to the backend api, deletes the selection from backend and load from backend
  Nonetheless, removes the selected country from the pinned list from the frontend
  */
  const handleUnpinCountries = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const selectedNumericCode = event.currentTarget.getAttribute('value');
    if (selectedNumericCode) {
      const countryToRemove = (pinnedCountries.find((e: any) => {
        return e.numericCode.toString().padStart(3, '0') === selectedNumericCode.padStart(3, '0')
      }));

      if (countryToRemove) {
        setSavingFavorites(true)
        deleteCountry(countryToRemove)
          .then(setSavingFavorites(false))
          .catch(setSavingFavorites(false)) //ToDo: log error for monitoring and alert
          .finally(() => {
            const newPinnedCountries = (pinnedCountries.filter((e: any) => {
              return e.numericCode.toString().padStart(3, '0') !== selectedNumericCode.padStart(3, '0')
            }));
            setPinnedCountries(newPinnedCountries);
          })
      }
    }
  }

  return (
    <ListGroup>
      {pinnedCountries.map((c, index) => {
        return <CountryListItem
          key={index}
          country={c.name}
          flag={c.flag}
          numericCode={c.numericCode}
          buttonDisplay={true}
          buttonText={'x'}
          handleClick={handleUnpinCountries}
        />
      })}
    </ListGroup>
  );
}

export default SelectedCountries;