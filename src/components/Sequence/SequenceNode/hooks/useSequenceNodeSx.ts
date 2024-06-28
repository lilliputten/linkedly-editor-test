import { SxProps, Theme } from '@mui/material';

import { TSequenceNodeOwnProps } from '../types';

export function useSequenceNodeSx(props: Pick<TSequenceNodeOwnProps, 'root' | 'indent'>) {
  const {
    // root,
    indent = false,
  } = props;
  const showIndent = indent; // && !root;
  const sx: SxProps<Theme> = {
    my: 0.5,
    pl: showIndent ? 2 : 0,
    borderLeft: showIndent ? '1px solid rgba(127,127,127, 0.5)' : '',
  };
  return sx;
}
