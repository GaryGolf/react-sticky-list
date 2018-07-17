import * as React from 'react';

interface IMenuItem {
  title: string;
  description: string;
  price: number;
}

interface Props {
  item: IMenuItem;
}

export default class MenuItem extends React.PureComponent<Props, {}> {
  render() {
    const { item } = this.props;
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const price = numberFormat.format(item.price);
    return (
      <a className="menu-item_container" href="#" title={item.description}>
        <div>{item.title}</div>
        <div className="menu-item_spacer" />
        <div>{price}</div>
      </a>
    )
  }
}