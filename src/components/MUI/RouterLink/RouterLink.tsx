import * as React from 'react';
import { Link as RouterLinkComponent } from 'react-router-dom';
import Link, { LinkOwnProps } from '@mui/material/Link';

export interface TRouterLinkProps extends LinkOwnProps {
  to: string;
}

export const RouterLink: React.FC<TRouterLinkProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    <Link component={RouterLinkComponent} {...restProps}>
      {children}
    </Link>
  );
};
