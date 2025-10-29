import { Maximize, Minimize } from '@react-admin-core/icons';

import { useFullscreen } from '@reactuses/core';

import { ScButton } from '../button';

interface Props {
  ref?: React.RefObject<any>;
}

export const ScFullScreen = (props: Props) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    props.ref?.current ?? document.documentElement,
  );

  return (
    <ScButton variant="outline" size="icon" onClick={toggleFullscreen}>
      {isFullscreen ? <Minimize /> : <Maximize />}
    </ScButton>
  );
};
