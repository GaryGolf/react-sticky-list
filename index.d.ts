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


declare class StickyList extends React.Component<StickyList.StickyListProps, {}> {}

export default StickyList;

declare namespace StickyList {


  interface StickyListProps {

    /**
     * className added to div container
     */
    className?: string;

    /**
     * show scroll shadows, default true
     */
    shadows?: boolean;

    /**
     * Array of JSX.Elements
     * <h1 - h6> or <header> for sticky headers
     * <div> for element items
     */
    // children: JSX.Element[] | React.ReactNode[];

    /**
     * Function called when scroll container reaches or leaves the top end
     * @param boolean
     */
    onScrollTop?: (isInside:boolean) => void;

     /**
     * Function called when scroll container reaches or leaves the bottom end
     * @param boolean
     */
    onScrollBottom?: (isInside:boolean) => void;

    /**
     * Function called when scroll container has mounted
     * @param HTMLDivElement
     */
    getScrollContainerRef?: (div:HTMLDivElement) => void;
  }
}

declare module 'react-sticky-list'
