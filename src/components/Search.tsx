import React from 'react';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import ListGroup from 'react-bootstrap/esm/ListGroup';

interface Props {
  onChangeFunction: (changeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: React.ReactNode[]

  ;
}

/* 
The search bar and search results. Add a handler that makes
a rest-countries API request on key press, and returns the     
first 5 results as <CountryListItem /> components. 
Show a loading state while API request is not resolved!
*/
const Search: React.FC<Props> = ({ onChangeFunction, searchResults }) => {
  return (
    <div>
      <InputGroup size="lg">
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Start typing a country name here"
          onChange={onChangeFunction}
        />
      </InputGroup>
      <ListGroup>
        {searchResults.map(s => s)}
      </ListGroup>
    </div>
  );
}

export default Search