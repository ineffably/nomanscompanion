/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, FunctionComponent, useState } from 'react';
import { GCProductEntry, DebrisFile } from '../types/gcproduct';
import './App.css';
import { colorFromEntry, getIconUrlFromDebrisFile } from './utils';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import Home from './Home';
import { ItemView } from './ItemView';

const createLookupEntries = (productTable: GCProductEntry[], byField = "Name") => {
  return productTable.reduce((result, entry) => {
    const { records, fieldTable } = result;
    records[entry[byField]] = entry;
    result.records = records;
    fieldTable.push(entry[byField]);
    return result;
  }, { 
    records: {} as Record<string, GCProductEntry>,
    fieldTable: [] as string[]
  })
}

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
  const [languageTokens, setLanguageTokens] = useState({} as Record<string, string>);
  const [entriesbyName, setEntriesByName] = useState({} as Record<string, GCProductEntry>);
  const [productNameTable, setProductNameTable] = useState([] as string[])

  const fetchDataAsset = async (location, onSuccess = json => { }) => {
    const response = await window.fetch(location);
    const json = await response.json();
    if (json) {
      onSuccess(json)
    }
  }

  const fetchProductTables = (tokens: Record<string, string>) => {
    const incomingProductTable = [];
    fetchDataAsset('./assets/data/nms_reality_gctechnologytable.json', ({ Table }: { Table: GCProductEntry[] }) => {
      incomingProductTable.push(transformProductTable(Table, tokens));
      fetchDataAsset('./assets/data/nms_u3reality_gcproducttable.json', ({ Table }: { Table: GCProductEntry[] }) => {
        incomingProductTable.push(transformProductTable(Table, tokens));
        fetchDataAsset('./assets/data/nms_reality_gcsubstancetable.json', ({ Table }: { Table: GCProductEntry[] }) => {
          incomingProductTable.push(transformProductTable(Table, tokens));
          const finalTable = incomingProductTable.flat() as GCProductEntry[];
          const { records, fieldTable } = createLookupEntries(finalTable, 'Name');
          setProductNameTable(fieldTable);
          setEntriesByName(records);
        });
      });
    });
  }

  const fetchData = async () => {
    fetchDataAsset('./assets/data/all_usenglish.json', setLanguageTokens)
  }

  useEffect(() => {
    fetchProductTables(languageTokens);
  }, [languageTokens])

  useEffect(() => {
    fetchData();
  }, [])

  console.log('=== App Render ===');

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <Home { ...{ ...props, ...{ entriesbyName, productNameTable } } } />} />
        <Route exact path="/items/:name" render={props => {
          return(<ItemView { ...props } />);
        }} />
      </Switch>
    </Router>
  )
}