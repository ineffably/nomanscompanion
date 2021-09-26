import React, { ReactElement } from 'react';
import { GCProductEntry } from '../types/gcproduct';
import { Card } from 'antd';

export interface ProductCardProps {
  entry: GCProductEntry;
}

export const ProductCard = ({ entry }: ProductCardProps): ReactElement  => {
  return (
    <Card title={entry.Name}>

    </Card>
  )
}

