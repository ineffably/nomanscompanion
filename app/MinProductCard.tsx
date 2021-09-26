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
}

export const MinProductCard = ({ entry }: ProductCardProps): ReactElement  => {
  const { ext, Name, Id } = entry;
  const title = Name && Name.length > 0 ? Name : Id;
  const { iconUrl, linkColor } = ext;
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
        >
         <img style={{ width: '100px', backgroundColor, padding: '20px'}} src={iconUrl }  /> 
      </Card>
    </Popover>
  )
}
