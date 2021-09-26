/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, FunctionComponent, useState } from 'react';
import { GCProductEntry } from '../types/gcproduct';
// import { ProductTable } from './ProductTable';
import { ProductCard } from './ProductCard';
import './App.css';
import languageTokens from '../assets/data/all_usenglish.json';

export const App: FunctionComponent = () => {
  const [productTable, setProductTable] = useState([] as GCProductEntry[])

  const fetchDataAsset = async (location, onSuccess = json => { }) => {
    const response = await window.fetch(location);
    const json = await response.json();
    if (json) {
      onSuccess(json)
    }
  }

  const fetchData = async () => {
    fetchDataAsset('./assets/data/nms_reality_gctechnologytable.json', ({ Table }) => {
      setProductTable(Table.map(row => {
        row.Name = languageTokens[row.Name];
        row.NameLower = languageTokens[row.NameLower];
        row.Subtitle = languageTokens[row.Subtitle];
        row.Description = languageTokens[row.Description];
        return row;
      }));
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <h1>GCProductTable</h1>
      {/* <ProductTable { ...{ productTable, languageTokens } } /> */}
      {productTable.map(entry => <ProductCard key={entry.Id} {...{ entry }} />)}
    </div>
  )
}