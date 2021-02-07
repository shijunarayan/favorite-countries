import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/RestCountriesAPI';
import { deleteCountry, getCountries, saveCountry } from './api/CountriesAPI';
import Search from './components/Search';
import SelectedCountries from './components/SelectedCountries';
import CountryListItem from './components/CountryListItem';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Country } from './types/Country';


/* 
The entire app that gets rendered in the "root" 
element of the page
*/
function ListSearchApp() {
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryListElements, setCountryListElements] = useState<JSX.Element[]>([]);
  const [pinnedCountries, setPinnedCountries] = useState<Country[] | []>([]);
  const [pinnedElements, setPinnedElements] = useState<JSX.Element[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (pinnedCountries.length === 0) {
      getCountries()
        .then(res => setPinnedCountries(res.data))
        .catch(err => console.log('Error', err));
    }

    const handlePinCountries = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const id = event.currentTarget.getAttribute('value');
      if (pinnedCountries.filter((e: any) => { return e.numericCode === id }).length === 0) {
        const country: Country | undefined = countryList.find((e: any) => { return e.numericCode === id });
        if (country) {
          setPinnedCountries(pinnedCountries => [...pinnedCountries, country]);
          saveCountry(country)
            .catch(err => console.log('Error', err));
        }
      }
    }

    const handleUnpinCountries = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (pinnedCountries) {
        const id = event.currentTarget.getAttribute('value');
        const unpinnedCountry = pinnedCountries.find((e: any) => { return e.numericCode !== id });
        if (unpinnedCountry && unpinnedCountry.id) {
          deleteCountry(unpinnedCountry.id)
            .then(res => setPinnedCountries(res.data))
            .catch(err => console.log('Error', err))
        } else {
          const updatedList = pinnedCountries.filter((e: any) => { return e.numericCode !== id });
          setPinnedCountries(updatedList)
        }
      }
    }

    const clElem: JSX.Element[] = countryList.map((c: { name: string, flag: string, numericCode: number; }, key: number) => {
      return <CountryListItem
        key={key}
        country={c.name}
        flag={c.flag}
        numericCode={c.numericCode}
        // buttonDisplay={(pinnedCountries.filter((e: any) => { return e.numericCode === c.numericCode }).length === 0)}
        buttonDisplay={true}
        buttonText={'+'}
        handleClick={handlePinCountries}
      />;
    });
    setCountryListElements(clElem);

    // const clElem: JSX.Element[] = countryList.map((c: { name: string, flag: string, numericCode: number; }, key: number) => {
    //   return <CountryListItem
    //     key={key}
    //     country={c.name}
    //     flag={c.flag}
    //     numericCode={c.numericCode}
    //     // buttonDisplay={(pinnedCountries.filter((e: any) => { return e.numericCode === c.numericCode }).length === 0)}
    //     buttonDisplay={true}
    //     buttonText={'+'}
    //     handleClick={handlePinCountries}
    //   />;
    // });
    // setCountryListElements(clElem);

    // Add as any[]
    const clPinnedElem: JSX.Element[] = (pinnedCountries as any[]).map((c: { name: string, flag: string, numericCode: number; }, key: number) => {
      return <CountryListItem
        key={key}
        country={c.name}
        flag={c.flag}
        numericCode={c.numericCode}
        buttonDisplay={true}
        buttonText={'x'}
        handleClick={handleUnpinCountries}
      />;
    });
    setPinnedElements(clPinnedElem);
  }, [countryList, pinnedCountries]);

  const someFunc = async (name: string) => {
    setLoading(true);
    setErrorMessage('');
    fetchCountries(name)
      .then((countries) => {
        setCountryList(countries);
      })
      .catch((error) => {
        setCountryList([]);
        if (name) setErrorMessage(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });

  }

  return (
    <Container fluid className="p-2">
      <Row>
        <Col md="5">
          <Card>
            <Card.Header as="h4">Look up countries</Card.Header>
            <Card.Body>
              {<Search onChangeFunction={(e) => someFunc(e.target.value)} searchResults={countryListElements} />}
            </Card.Body>
          </Card>
        </Col>
        <Col md="2">
          {loading && <><Spinner animation="border" variant="primary" /><p className="text-primary">Loading Countries...</p></>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Col>
        <Col md="5">
          <Card>
            <Card.Header as="h4">Selected Countries</Card.Header>
            <Card.Body>
              {<SelectedCountries pinnedCountries={pinnedElements} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ListSearchApp;
