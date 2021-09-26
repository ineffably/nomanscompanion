import React, { ReactElement } from 'react';
import { Colour, GCProductEntry } from '../types/gcproduct';
import { colorFromEntry, GCProductKeys, getIconUrlFromDebrisFile } from './utils';

export interface ProductTableProps {
  productTable: GCProductEntry[];
  languageTokens: Record<string, string>;
}

export const getTableObjectValue = (key, value) => {
  if (key === 'Colour') {
  const rgbaValue = colorFromEntry(value as Colour);
    return (<div style={{ backgroundColor: rgbaValue, color: '#EEE' }}>{rgbaValue}</div>);
  }
  if (key === 'Icon') {
    return <img src={getIconUrlFromDebrisFile(value)} style={{ width: '80px' }} />
  }
  return JSON.stringify(value);
}

export const ProductTable = ({ productTable, languageTokens }: ProductTableProps): ReactElement => {
  return (
    <table>
      <thead>
        <tr>
          {GCProductKeys.map(entry => (<td key={entry}><b>{entry}</b></td>))}
        </tr>
      </thead>
      <tbody>
        {productTable.map((entry, index) => {
          return (
            <tr key={index}>
              {GCProductKeys.map(key => {
                const value = (() => {
                  return entry[key] as GCProductEntry;
                })();
                return (
                  <td key={key} title={key} style={{ whiteSpace: 'nowrap' }}>{typeof value === 'string' ? value : getTableObjectValue(key, value)}</td>)
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}