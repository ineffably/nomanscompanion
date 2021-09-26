/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, FunctionComponent, useState } from 'react';
import { Colour, GCProductEntry } from '../types/gcproduct';
import { GCProductKeys } from './datautils';

const colorFromEntry = (colorValue: Colour) => {
  const { R, G, B, A } = colorValue;
  const colorEntry = (value) => {
    return Math.round(parseFloat(value) * 255);
  }
  return `rgba(${colorEntry(R)}, ${colorEntry(G)}, ${colorEntry(B)}, ${A})`;
}

const getTableObjectValue = (key, value) => {
  if(key === 'Colour'){
    const rgbaValue = colorFromEntry(value as Colour);
    return (<div style={{backgroundColor: rgbaValue, color: '#EEE'}}>{rgbaValue}</div>);
  }
  return JSON.stringify(value);
}

export const App: FunctionComponent = () => {
  const [languageTokens, setLanguageTokens] = useState({} as Record<string, string>)
  const [productTable, setProductTable] = useState([] as GCProductEntry[])

  const fetchDataAsset = async (location, onSuccess = json => {}) => {
    const response = await window.fetch(location);
    const json = await response.json();
    if (json) {
      onSuccess(json)
    }
  }

  const fetchData = async () => {
    fetchDataAsset('./assets/data/all_usenglish.json', json => setLanguageTokens(json));
    fetchDataAsset('./assets/data/nms_reality_gctechnologytable.json', ({ Table }) => setProductTable(Table));
  }

  useEffect(() => {
    fetchData();
  }, [])
 
  return (
    <div>
      <h1>GCProductTable</h1>
      <table>
        <thead>
          {GCProductKeys.map(entry => (<td key={entry}><b>{entry}</b></td>))}
        </thead>
        <tbody>
          {productTable.map((entry, index) => {
            return (
              <tr key={index}>
                {GCProductKeys.map(key => {
                  const value = entry[key];
                  return (
                    <td key={key} title={key} style={{whiteSpace: 'nowrap'}}>{typeof value === 'string' ? value : getTableObjectValue(key, value)}</td>)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}