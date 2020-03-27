import React from 'react';
import { get } from 'lodash'
import { Collapse } from 'antd';
import ListItem from './ListItem';
const { Panel } = Collapse;

const List = ({data}) => {
  return (
    <Collapse accordion>
       {
        data ? data.map((item, index) => {
          const name = get(item, 'name')
          const code = get(item, 'code')
          
          return (
            <Panel header={name} key={index}>
              <ListItem itemCode={code} />
            </Panel>
          )
        }) : (
          <p>Loading...</p>
        )
      }
      </Collapse>
  );
}

export default List;
