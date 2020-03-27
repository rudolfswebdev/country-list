import React, {useEffect, useState} from 'react';
import {Spin} from 'antd'
import {isEmpty, get} from 'lodash'

const ListItem = ({itemCode}) => {
  const [data, setData] = useState();
  
  useEffect(()=> {
    const response = fetch('https://countries.trevorblades.com/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            country(code: "${itemCode}") {
              name
              native
              currency
              continent{
                name
              }
              languages{
                name
              }
            }
          }
        `
      })
    }).then(response => {
      return response.json()
    }).then(responseAsJson => {
      setData(responseAsJson.data)
    })
  }, [])
  
  const country = get(data, 'country')
  const continent = get(country, 'continent.name')
  const currency = get(country, 'currency')
  const native = get(country, 'native')
  const languages = get(country, 'languages')
  
  return (
    <div>
      {data ? (
        <>
          {!isEmpty(continent) && <p>Continent: {continent}</p> }
          {!isEmpty(currency) && <p>Currency: {data.country.currency}</p> }  
          {!isEmpty(native) &&<p>Native: {data.country.native}</p> }
          {!isEmpty(languages) && (
            <p>
              Languages: 
              { 
                languages.map((item, index) => `${item.name}${index !== languages.length-1 ? ', ' : ''} `)
              }
            </p>
          )
          }
        </>
      ) : <Spin/>}
    </div>
  );
}

export default ListItem;
