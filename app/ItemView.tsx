import React, { ReactElement } from 'react';

export interface ItemViewProps {
  match: any;
}

export const ItemView = (props: ItemViewProps): ReactElement => {
  const { match } = props;
  const name = match?.params?.name;
  console.log(name);
  return(
    <div>
      <h3>ItemView</h3>
      <div>{name}</div>
    </div>
  )
}
