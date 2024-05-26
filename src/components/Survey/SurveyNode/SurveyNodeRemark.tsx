import * as React from 'react';
import classNames from 'classnames';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { SectionSubTitle } from 'src/components/MUI';

export const SurveyNodeRemark: React.FC<TPropsWithChildrenAndClassName> = (props) => {
  const { className, children } = props;
  return (
    <SectionSubTitle
      className={classNames(className, 'SurveyNodeRemark')}
      sx={{ my: 1, opacity: 0.5 }}
    >
      {children}
    </SectionSubTitle>
  );
};
