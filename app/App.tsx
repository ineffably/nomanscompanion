/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, FunctionComponent, useState } from 'react';
import { GCProductEntry, DebrisFile } from '../types/gcproduct';
import { MinProductCard } from './MinProductCard';
import './App.css';
import { colorFromEntry, getIconUrlFromDebrisFile } from './utils';

const transformProductTable = (entries: GCProductEntry[], languageTokens: Record<string, string>) => {
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
  const [languageTokens, setLanguageTokens] = useState({} as Record<string, string>);
  
  const fetchDataAsset = async (location, onSuccess = json => { }) => {
    const response = await window.fetch(location);
    const json = await response.json();
    if (json) {
      onSuccess(json)
    }
  }

  const fetchProductTables = (tokens: Record<string, string>) => {
    const incomingProductTable = [];
    fetchDataAsset('/assets/data/nms_reality_gctechnologytable.json', ({ Table }: { Table: GCProductEntry[] }) => {
      incomingProductTable.push(transformProductTable(Table, tokens));
      fetchDataAsset('/assets/data/nms_u3reality_gcproducttable.json', ({ Table }: { Table: GCProductEntry[] }) => {
        incomingProductTable.push(transformProductTable(Table, tokens));
        fetchDataAsset('/assets/data/nms_reality_gcsubstancetable.json', ({ Table }: { Table: GCProductEntry[] }) => {
          incomingProductTable.push(transformProductTable(Table, tokens));
          setProductTable(incomingProductTable.flat());
        });
      });
    });
  }

  const fetchData = async () => {
    fetchDataAsset('/assets/data/all_usenglish.json', setLanguageTokens)
  }

  useEffect(() => {
    fetchProductTables(languageTokens);
  }, [languageTokens])

  useEffect(() => {
    fetchData();
  }, [])

  console.log('=== App Render ===');

  return (
    <div >
      <h2>ProductTable ({productTable.length})</h2>
      {/* <ProductTable { ...{ productTable, languageTokens } } /> */}
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {productTable.map((entry, index) => <MinProductCard key={entry.ID} {...{ entry }} />)}
      </div>
    </div>
  )
}