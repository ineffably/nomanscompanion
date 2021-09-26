/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, FunctionComponent, useState } from 'react';
import { GCProductEntry, DebrisFile } from '../types/gcproduct';
// import { ProductTable } from './ProductTable';
import { MinProductCard } from './MinProductCard';
import './App.css';
import languageTokens from '../assets/data/all_usenglish.json';
import { colorFromEntry, getIconUrlFromDebrisFile } from './utils';

const transformProductTable = (entries: GCProductEntry[]) => {
  return entries.map(row => {
    row.Name = languageTokens[row.Name] || row.Name;
    row.NameLower = languageTokens[row.NameLower] || row.NameLower;
    row.Subtitle = languageTokens[row.Subtitle] || row.Subtitle;
    row.Description = languageTokens[row.Description] || row.Description;
    if(row.ID){
      row.Id = row.ID;
    }
    row.ext = {
      iconUrl: row.Icon ? getIconUrlFromDebrisFile(row.Icon as DebrisFile) : null,
      linkColor: row.LinkColour ? colorFromEntry(row.LinkColour) : null
    }
    return row;
  })
}

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
    const incomingProductTable = [];
    fetchDataAsset('/assets/data/nms_reality_gctechnologytable.json', ({ Table }: { Table: GCProductEntry[] }) => {
      incomingProductTable.push(transformProductTable(Table));
      fetchDataAsset('/assets/data/nms_u3reality_gcproducttable.json', ({ Table }: { Table: GCProductEntry[] }) => {
        incomingProductTable.push(transformProductTable(Table));
        fetchDataAsset('/assets/data/nms_reality_gcsubstancetable.json', ({ Table }: { Table: GCProductEntry[] }) => {
          incomingProductTable.push(transformProductTable(Table));
          setProductTable(incomingProductTable.flat());
        });
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log('=== App Render ===', productTable.length);

  return (
    <div >
      <h1>GCProductTable ({productTable.length})</h1>
      {/* <ProductTable { ...{ productTable, languageTokens } } /> */}
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {productTable.map((entry, index) => <MinProductCard key={entry.ID} {...{ entry }} />)}
      </div>
    </div>
  )
}