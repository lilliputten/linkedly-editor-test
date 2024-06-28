import * as React from 'react';
import classNames from 'classnames';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { SectionSubTitle } from 'src/components/MUI';

export const CampaignNodeRemark: React.FC<TPropsWithChildrenAndClassName> = (props) => {
  const { className, children } = props;
  return (
    <SectionSubTitle
      className={classNames(className, 'CampaignNodeRemark')}
      fontSize="sm"
      sx={{ my: 1, opacity: 0.5 }}
    >
      {children}
    </SectionSubTitle>
  );
};
