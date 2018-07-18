import * as React from 'react';

export interface StickyElement {
  idx: number;
  position: string;
  component: JSX.Element;
}

export interface StickyPosition {
  idx: number;
  position: string;
}

export interface StickyListProps {
  className?: string;
  children: JSX.Element[];
  shadows?: boolean;
  onScrollTop?: (isInside:boolean) => void;
  onScrollBottom?: (isInside:boolean) => void;
  getScrollContainerRef?: (div:HTMLDivElement) => void;
}
