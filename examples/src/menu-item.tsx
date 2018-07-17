import * as React from 'react';
import * as styles from './demo.css';

interface IMenuItem {
  title: string;
  description: string;
  price: number;
}

interface Props {
  item: IMenuItem;
}

const MenuItem:React.SFC<Props> = props => {
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  const price = numberFormat.format(props.item.price);
  return (
    <a className={styles['menu-item_container']} href="#" title={props.item.description}>
      <div>{props.item.title}</div>
      <div className={styles['menu-item_spacer']} />
      <div>{price}</div>
    </a>
  )
}

export default MenuItem;
