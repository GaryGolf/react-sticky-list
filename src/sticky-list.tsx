import * as React from 'react';
import Waypoint from 'react-waypoint';
import StickyItem from './item';
import StickyHeader from './header';
import StickyEdge from './sticky-edge';
import * as styles from './sticky-list.css';


export interface StickyListProps {
  className?: string;
  children: JSX.Element[];
  getScrollContainerRef?: (div:HTMLDivElement) => void;
}

interface State {
  elements: StickyElement[];
  upBtnDisabled: boolean;
  downBtnDisabled: boolean;
}

export class StickyList extends React.Component<StickyListProps, State> {
  static defaultProps = { className: '' };
  private container: HTMLDivElement;


  public constructor(props:StickyListProps) {
    super(props);
    this.state = { 
      elements: this.sortElements(props.children),
      upBtnDisabled: true,
      downBtnDisabled: true
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
    
  private handleButtonClick = (direction:string) => {
    switch(direction) {
      case 'UP' :
        this.container.scrollTo({
          behavior: 'smooth', left: 0, top: this.container.scrollTop - this.container.clientHeight
        });
        break;
      case 'DOWN' :
        this.container.scrollTo({
          behavior: 'smooth', left: 0, top: this.container.scrollTop + this.container.clientHeight
        });
    }
  }

  private handleScrollEnd = (position:string, isInside:boolean) => {
    switch(position) {
      case 'UP' :
        this.setState({ upBtnDisabled: isInside });
        break;
      case 'DOWN' :
        this.setState({ downBtnDisabled: isInside });
        break;
    }
  }
  
  render() {
    const { upBtnDisabled, downBtnDisabled } = this.state;
    const { children, className, getScrollContainerRef } = this.props;

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
      <StickyEdge
        container={this.container}
        onChange={this.handleScrollEnd.bind(this, 'DOWN')}
      />
    );
    inside.unshift(
      <StickyEdge
        container={this.container}
        onChange={this.handleScrollEnd.bind(this, 'UP')}
      />
    );

    return (
      <div className={`sticky-list ${className}`}>
        <button className="sticky-list_button up" 
          onClick={this.handleButtonClick.bind(this, 'UP')}
          disabled={upBtnDisabled}>&#770;</button>
        <div>{above}</div>
        <div className="sticky-list_container"
          ref={el => {
            this.container = el;
            getScrollContainerRef && getScrollContainerRef(el);
          }}>
          {inside}
        </div>
        <div>{below}</div>
        <button className="sticky-list_button down" 
          onClick={this.handleButtonClick.bind(this, 'DOWN')}
          disabled={downBtnDisabled}> &#711;
        </button>
        <style>{styles.toString()}</style>
      </div>
    )
  }
}

export default StickyList;
