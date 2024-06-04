import * as React from 'react';

import { TSurveyNodeBaseProps } from './types';
import { SurveyNodeBase } from './SurveyNodeBase';

export const SurveyNodeFoldedContent: React.FC<TSurveyNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <SurveyNodeBase {...restProps}>{children}</SurveyNodeBase>;
};
