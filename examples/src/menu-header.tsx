import * as React from 'react';
import * as styles from './demo.css';

interface Props {
  header: string;
}

const MenuHeader:React.SFC<Props> = props => (
  <div className={styles['menu-header']}>
    {props.header}
  </div>
);

export default MenuHeader;
