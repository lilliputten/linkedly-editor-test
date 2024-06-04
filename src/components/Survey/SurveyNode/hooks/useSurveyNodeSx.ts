import { SxProps, Theme } from '@mui/material';

import { TSurveyNodeOwnProps } from '../types';

export function useSurveyNodeSx(props: Pick<TSurveyNodeOwnProps, 'root' | 'indent'>) {
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
