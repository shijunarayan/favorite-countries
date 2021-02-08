import React, { useState, useEffect } from 'react';

// Api imports
import { getCountries } from './api/CountriesAPI';

// Component imports
import Search from './components/Search';
import SelectedCountries from './components/SelectedCountries';
import DisplayAlert from './components/DisplayAlert';

// Bootstrap imports
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


/* 
The entire app that gets rendered in the "root" 
element of the page
*/
const ListSearchApp = () => {
  const [loading, setLoading] = useState(false);
  const [savingFavorites, setSavingFavorites] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [pinnedCountries, setPinnedCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!savingFavorites && pinnedCountries.length === 0) {
      setLoading(true);
      getCountries()
        .then(res => {
          if (res.data.length > 0) { // Set set Pinned countries only if we have data from api.
            setPinnedCountries(res.data)
          }
          setLoading(false);
        })
        .catch(() => setLoading(false)); //ToDo: log error for monitoring and alert
    }
  }, [savingFavorites, pinnedCountries]);

  return (
    <Container fluid className="p-2">
      <Row>
        <Col md="5">
          <Card>
            <Card.Header as="h4">Look up countries</Card.Header>
            <Card.Body>
              {<Search
                countryList={countryList}
                pinnedCountries={pinnedCountries}
                setCountryList={setCountryList}
                setSavingFavorites={setSavingFavorites}
                setLoading={setLoading}
                setErrorMessage={setErrorMessage}
                setPinnedCountries={setPinnedCountries}
              />}
            </Card.Body>
          </Card>
        </Col>
        <Col md="2">
          <DisplayAlert
            loading={loading}
            errorMessage={errorMessage}
          />
        </Col>
        <Col md="5">
          <Card>
            <Card.Header as="h4">Selected Countries</Card.Header>
            <Card.Body>
              {<SelectedCountries
                pinnedCountries={pinnedCountries}
                setSavingFavorites={setSavingFavorites}
                setPinnedCountries={setPinnedCountries} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ListSearchApp;
