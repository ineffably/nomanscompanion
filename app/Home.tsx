import React, { ReactElement } from 'react';
import { GCProductEntry } from '../types/gcproduct';
import { MinProductCard } from './MinProductCard';

export interface HomeProps {
  entriesbyName: Record<string, GCProductEntry>;
  productNameTable: string[];
  history?: any;
}

export const Home = ({ productNameTable, entriesbyName, history }: HomeProps): ReactElement => {
  return (
    <div >
      <h2>ProductCard Table [{productNameTable.length}]</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productNameTable.map((name, index) => <MinProductCard key={index} {...{ entry: entriesbyName[name], history }} />)}
      </div>
    </div>)
}

export default Home;