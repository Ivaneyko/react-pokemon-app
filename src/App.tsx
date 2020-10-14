import React, { useEffect } from 'react';
// ToDO
import HttpUtility from 'utilities/http';

type IProps = {

};

const App:React.FC<IProps> = () => {
  const http = new HttpUtility();

  useEffect(() => {
    http.get('/pokemon').then(response => {
      console.log(response);
    }).catch(error => console.error(error))
    // eslint-disable-next-line
  }, []);

  return (
    <div></div>
  );
}

export default App;
