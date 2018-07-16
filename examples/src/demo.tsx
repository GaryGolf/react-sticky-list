import * as React from 'react';
import StickyList from '../../src/sticky-list';

import * as json from './pizza.json'


interface Props {}

interface MenuItem {
  title: string;
  description: string;
  price: number;
  novelty?: boolean;
}
interface Menu {
  header: string;
  items: MenuItem[];
}

export default class Demo extends React.PureComponent<{}, {}> {

  private renderMenu = () => {
    const menu:JSX.Element[] = [];
    if(!json || !json.length) return menu;
    return json.reduce((acc:JSX.Element[],menu:Menu) => {
      const header = <header key={menu.header}>{menu.header}</header>;
      const items = menu.items.map(item => (
        <div key={item.title}>{item.title}....{item.price}</div>
      ))
      return [...acc, header, ...items];
    },[])
  }

  render() {
    const menu = this.renderMenu();

    return (
      <StickyList>
       {menu}
      </StickyList>
    )
  }
}