import * as React from 'react';

import { TSequenceNodeBaseProps } from './types';
import { SequenceNodeBase } from './SequenceNodeBase';

export const SequenceNodeFoldedContent: React.FC<TSequenceNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <SequenceNodeBase {...restProps}>{children}</SequenceNodeBase>;
};
