import React, { ReactElement } from 'react';
import { Colour, GCProductEntry } from '../types/gcproduct';
import { GCProductKeys } from './datautils';

const colorFromEntry = (colorValue: Colour) => {
  const { R, G, B, A } = colorValue;
  const colorEntry = (value) => {
    return Math.round(parseFloat(value) * 255);
  }
  return `rgba(${colorEntry(R)}, ${colorEntry(G)}, ${colorEntry(B)}, ${A})`;
}

const iconFromFilename = ({ Filename }) => {
  const iconPath = 'TEXTURES/UI/FRONTEND/ICONS';
  // Filename
  const imagePath = Filename.replace(iconPath, './assets/images').replace('.DDS', '.webp').toLowerCase();
  return imagePath;
}

const getTableObjectValue = (key, value) => {
  if (key === 'Colour') {
    const rgbaValue = colorFromEntry(value as Colour);
    return (<div style={{ backgroundColor: rgbaValue, color: '#EEE' }}>{rgbaValue}</div>);
  }
  if (key === 'Icon') {
    return <img src={iconFromFilename(value)} style={{ width: '80px' }} />
  }
  return JSON.stringify(value);
}

export interface ProductTableProps {
  productTable: GCProductEntry[];
  languageTokens: Record<string, string>;
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
                  return entry[key];
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