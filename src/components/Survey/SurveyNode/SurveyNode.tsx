import * as React from 'react';

import { SurveyNodeBase } from './SurveyNodeBase';
import { TSurveyNodeBaseProps } from './types';

export const SurveyNode: React.FC<TSurveyNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <SurveyNodeBase {...restProps}>{children}</SurveyNodeBase>;
};
