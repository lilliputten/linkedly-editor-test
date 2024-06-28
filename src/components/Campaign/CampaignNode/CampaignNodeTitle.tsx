import * as React from 'react';
import classNames from 'classnames';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { SectionTitle } from 'src/components/MUI';

export const CampaignNodeTitle: React.FC<TPropsWithChildrenAndClassName> = (props) => {
  const { className, children } = props;
  return (
    <SectionTitle className={classNames(className, 'CampaignNodeTitle')} sx={{ my: 0.5 }}>
      {children}
    </SectionTitle>
  );
};
