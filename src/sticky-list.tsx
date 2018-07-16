import * as React from 'react';
import Waypoint from 'react-waypoint';
import StickyItem from './item';
import StickyHeader from './header';
import { StickyElement } from '../index';

import * as styles from './sticky-list.css';

export interface StickyListProps {
  className?: string;
  children: JSX.Element[];
  shadows?: boolean;
  onScrollTop?: (isInside:boolean) => void;
  onScrollBottom?: (isInside:boolean) => void;
  getScrollContainerRef?: (div:HTMLDivElement) => void;
}

interface State {
  elements: StickyElement[];
  isTop: boolean;
  isBottom: boolean;
}

export class StickyList extends React.Component<StickyListProps, State> {
  static defaultProps = { className: '', shadows: true };
  private container: HTMLDivElement;

  public constructor(props:StickyListProps) {
    super(props);
    this.state = { 
      elements: this.sortElements(props.children),
      isTop: false,
      isBottom: false
    };
  }

  public componentWillReceiveProps(nextProps:StickyListProps) {
    if(this.props.children != nextProps.children) {
      this.updateElements(nextProps.children);
    }
  }

  private isHeading = (element:JSX.Element):boolean => 
      ['h1','h2','h3','h4','h5','h6','header'].includes(element.type as string);

  private sortElements = (children):StickyElement[] => 
    React.Children.map(children, (item, idx) => {
      const element = item as JSX.Element;

      if (!this.isHeading(element)) return null;

      return ({
        idx,
        position: null,
        component: element
      })
    }).filter(item => !!item);

  private updateElements = (children) => this.setState(state => {

      const elements:StickyElement[] = [];

      React.Children.forEach(children, (item, idx) => {
        const component = item as JSX.Element;
        if (!this.isHeading(component)) return;

        const element = state.elements.find(e => e.component.key == component.key);

        if (!element) { 
          elements.push({ idx, position: null, component })
        } else {
          elements.push({ ...element, idx, component });
        }
      })

      return { elements: elements.sort((a, b) => a.idx - b.idx) }
    })

  private handleWaypointPositionChange = ({ idx, position }) => {
    this.setState((state:State) => {
      const elements = state.elements.map(item => item.idx == idx ? { ...item, position } : item);
      return { elements };
    })
  }

  private handleHeaderClick = (idx:number) => {
    if (!this.container) return;
    const target = this.container.querySelector(`[data-idx="${idx}"]`) as HTMLDivElement;
    if (!target) return;
    this.container.scroll({
      behavior: 'smooth',
      top: target.offsetTop, 
      left: 0
    });
  }

  private handleScrollTop = ({currentPosition}) => {
    const { onScrollTop } = this.props;
    const isTop = currentPosition == Waypoint.inside
    this.setState({ isTop })
    onScrollTop && onScrollTop(isTop);
  }

  private handleScrollBottom = ({currentPosition}) => {
    const { onScrollBottom } = this.props;
    const isBottom = currentPosition == Waypoint.inside;
    this.setState({ isBottom });
    onScrollBottom && onScrollBottom(currentPosition == Waypoint.inside);
  }
  
  render() {
    const { isTop, isBottom } = this.state;
    const { children, className, shadows, getScrollContainerRef } = this.props;

    const above = this.state.elements
      .filter(e => ![Waypoint.inside, Waypoint.below, null].includes(e.position))
      .map(e => (
        <StickyItem 
          key={e.idx} 
          element={e}
          onClick={this.handleHeaderClick}
        />
      ));

    const below = this.state.elements
      .filter(e => ![Waypoint.inside, Waypoint.above, null].includes(e.position))
      .map(e => (
        <StickyItem 
          key={e.idx} 
          element={e}
          onClick={this.handleHeaderClick}
        />
      ));

    const inside = React.Children.map(children, (item, idx) => {
      const element = item as JSX.Element;

      if (!this.isHeading(element)) return (
        <element.type {...element.props} 
          key={element.key}
          data-idx={idx}
        />
      );
      const header = this.state.elements.find(e => e.idx == idx)
      return (
        <StickyHeader 
          key={element.key}
          element={header}
          container={this.container}
          onChange={this.handleWaypointPositionChange}
        />
      );
    })

    inside.push(
      <Waypoint key="down end waypoint"
        scrollableAncestor={this.container} 
        onPositionChange={this.handleScrollBottom}
      />
    );

    inside.unshift(
      <Waypoint key="up end waypoint"
        scrollableAncestor={this.container} 
        onPositionChange={this.handleScrollTop}
      />
    );

    const conatinerStyle = shadows ? [
      'sticky-list_container',
      !isTop && !isBottom ? 'sticky-list_container-bothshadow' : 
      !isTop ? 'sticky-list_container-topshadow' :
      !isBottom ? 'sticky-list_container-bottomshadow' : ''
    ].join(' ') : 'sticky-list_container';

    return (
      <div className={`sticky-list ${className}`}>
        <div>{above}</div>
        <div className={conatinerStyle}
          ref={el => { this.container = el; getScrollContainerRef && getScrollContainerRef(el); }}>
          {inside}
        </div>
        <div>{below}</div>
        <style>{styles.toString()}</style>
      </div>
    )
  }
}

export default StickyList;
