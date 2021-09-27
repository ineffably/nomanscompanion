import React, { ReactElement } from 'react';
import { GCProductEntry } from '../types/gcproduct';
import { Card, Popover } from 'antd';
import { colorFromEntry } from './utils';
// import styled from 'styled-components'

const JsonPreview = (json) => {
  return <pre style={{fontSize: '10px', width: '500px', overflow: 'scroll'}}>{JSON.stringify(json, null, 1)}</pre>
}

export interface ProductCardProps {
  entry: GCProductEntry;
  history?: any;
}

export const MinProductCard = ({ entry, history }: ProductCardProps): ReactElement  => {
  if(!entry) return null;
  const { ext, Name, Id } = entry;
  const title = Name && Name.length > 0 ? Name : Id;
  const { iconUrl } = ext;
  const backgroundColor = entry.Colour ? colorFromEntry(entry.Colour) : '';
  
  return (
    <Popover content={JsonPreview(entry)} title="JSON">
      <Card 
        size="small" 
        title={ title } 
        hoverable={true} 
        style={{width: '140px'}} 
        headStyle={{textAlign: 'center', fontSize: '12px'}}
        bodyStyle={{display:'flex', alignItems: 'center', justifyContent: 'center'}}
        onClick={() => {
          console.log('onclick', history);
          history?.push(`/items/${entry.Name}`);
        }}
        >
         <img style={{ width: '100px', backgroundColor, padding: '20px'}} src={iconUrl }  /> 
      </Card>
    </Popover>
  )
}
