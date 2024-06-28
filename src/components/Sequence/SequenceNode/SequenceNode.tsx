import * as React from 'react';

import { SequenceNodeBase } from './SequenceNodeBase';
import { TSequenceNodeBaseProps } from './types';

export const SequenceNode: React.FC<TSequenceNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <SequenceNodeBase {...restProps}>{children}</SequenceNodeBase>;
};
