import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Image from 'react-bootstrap/Image';

export interface Props {
  country: string;
  flag: string;
  numericCode: number;
  buttonDisplay: boolean;
  buttonText: string
  handleClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
}

/* 
Takes an image URL and a country name, and renders a 
list item that can be pinned to or removed from the
"Selected Countries" list.
*/
const CountryListItem: React.FC<Props> = ({ country, flag, numericCode, buttonDisplay, buttonText, handleClick }) => {
  return (
    <ListGroup.Item>
      <Image src={flag} alt={country} width="50" height="30" thumbnail />
      {' '}{country}
      {buttonDisplay && <Button
        variant="outline-secondary"
        className="float-right"
        value={numericCode}
        onClick={handleClick}
      >{buttonText}</Button>}
    </ListGroup.Item>
  );
}

export default CountryListItem;