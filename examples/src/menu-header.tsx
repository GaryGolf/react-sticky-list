import * as React from 'react';
import * as styles from './demo.css';

interface Props {
  header: string;
}

export default class MenuItem extends React.PureComponent<Props, {}> {
  render() {
    const { header } = this.props;
    
    return (
      <div className={styles['menu-header']}>
        {this.props.header}
      </div>
    )
  }
}