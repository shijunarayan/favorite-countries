import React from 'react';

// Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export interface Props {
  loading: boolean;
  errorMessage: string;
}

const DisplayAlert: React.FC<Props> = ({ loading, errorMessage }) => {
  return (
    <div className="m-5">
      {
        loading ?
          <Alert variant="success"><Spinner animation="border" /> Loading ...</Alert>
          :
          errorMessage && <Alert variant="danger">{errorMessage}</Alert>
      }
    </div>
  );
}

export default DisplayAlert;