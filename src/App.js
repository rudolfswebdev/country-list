import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import './App.css';
import List from './components/List';

const query = `
  query {
    countries {
      code
      name
    }
  }
`

const StyledHeading = styled.h1`
    font-weight: bold;
    text-transform: uppercase;
`

const StyledWrapper = styled.section`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`

function App() {
  const [data, setData] = useState();
  
  useEffect(()=> {
    const response = fetch('https://countries.trevorblades.com/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query
      })
    }).then(response => {
      return response.json()
    }).then(responseAsJson => {
      setData(responseAsJson.data.countries )
    })
  }, [])
  
  return (
    <div className="App">
      <StyledHeading>
        super awesome country list with irrelevant data
      </StyledHeading>
      <StyledWrapper>
        <List data={data} />
      </StyledWrapper>
      
    </div>
  );
}

export default App;
