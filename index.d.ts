import * as React from 'react';

export interface StickyListProps extends React.Props<StickyList> {
  className?: string;
  children: JSX.Element[];
  shadows?: boolean;
  onScrollTop?: (isInside:boolean) => void;
  onScrollBottom?: (isInside:boolean) => void;
  getScrollContainerRef?: (div:HTMLDivElement) => void;
}

declare class StickyList extends React.Component<StickyListProps, any> {}

export interface StickyElement {
  idx: number;
  position: string;
  component: JSX.Element;
}

export interface StickyPosition {
  idx: number;
  position: string;
}

declare module 'react-sticky-list'


export default StickyList;
