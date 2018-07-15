import * as React from 'react';
import StickyList from '../../src/sticky-list';

import * as json from './pizza.json'
import { access } from 'fs';

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
      acc.push(<header key={menu.header}>{menu.header}</header>)
      const a = menu.items.map(item => (
        <div key={item.title}>{item.title}....{item.price}</div>
      ))
      return [...acc, ...a];
    },[])
  }

  render() {
    const menu = this.renderMenu();
    // console.log(menu)

    return (
      <StickyList>
       {menu}
      </StickyList>
    )
    // return (
    //   <div>
    //     {menu}
    //   </div>
    // )
  }
}