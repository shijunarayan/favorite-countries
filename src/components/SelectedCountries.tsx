import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

interface Props {
  pinnedCountries: React.ReactNode[];
}

/* 
A list of selected countries (no duplicates). Replace
the singular <CountryListItem /> below with the list of 
all selected countries.
*/
const SelectedCountries: React.FC<Props> = ({ pinnedCountries }) => {
  return (
    <ListGroup>
      {pinnedCountries.map(s => s)}
    </ListGroup>
  );
}

export default SelectedCountries;