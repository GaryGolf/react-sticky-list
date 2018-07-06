import * as React from 'react';
import Waypoint from 'react-waypoint';

interface Props {
  container?: HTMLDivElement;
  onChange: (isInside:boolean) => void;
}

const StickyEdge:React.SFC<Props> = props => {

  const { container, onChange } = props;
  const handlePositionChange = ({ currentPosition }) => onChange(currentPosition == 'inside');

  return (
    <Waypoint scrollableAncestor={container} onPositionChange={handlePositionChange}>
      <div />
    </Waypoint>
  );
}

export default StickyEdge;
