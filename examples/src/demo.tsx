import * as React from 'react';
import StickyList from '../../src/sticky-list';
import MenuItem from './menu-item';

import * as json from './pizza.json';
import * as styles from './demo.css';


interface Props {}

interface IMenuItem {
  title: string;
  description: string;
  price: number;
  //novelty?: boolean;
}
interface Menu {
  header: string;
  items: IMenuItem[];
}

export default class Demo extends React.PureComponent<{}, {}> {

  private renderMenu = () => {
    const menu:JSX.Element[] = [];
    if(!json || !json.length) return menu;
    return json.reduce((acc:JSX.Element[],menu:Menu) => {
      const header = <header key={menu.header}>{menu.header}</header>;
      const items = menu.items.map(item => <MenuItem key={item.title} item={item}/>)
      return [...acc, header, ...items];
    },[])
  }

  render() {
    const menu = this.renderMenu();

    return (
      <div className={styles.menu}>
        <StickyList>
        {menu}
        </StickyList>
      </div>
    )
  }
}