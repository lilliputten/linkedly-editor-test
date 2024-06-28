import React from 'react';
import classNames from 'classnames';
import { Stack, Typography } from '@mui/material';

import { TReactNode } from 'src/core/types';

import styles from './CampaignNodeHeader.module.scss';
import {
  responsiveNodeStackAlignItems,
  responsiveNodeStackDirection,
  responsiveNodeStackSpacing,
} from './constants/responsiveNodeStyles';

interface TCampaignNodeHeaderProps {
  className?: string;
  id?: number | string;
  prefix?: TReactNode;
  title?: TReactNode;
  icon?: TReactNode;
  toolbar?: TReactNode;
  /* TODO:
   *   - Icon
   *   - Exandable properties: expanded, handleExpand
   *   - Toolbar
   */
}

const WrappedNode: React.FC<{ className?: string; children?: TReactNode }> = (props) => {
  const { className, children } = props;
  const node = React.useMemo(() => {
    if (!children) {
      return null;
    }
    // If react object
    if (typeof children === 'object' && React.isValidElement(children)) {
      return children;
    }
    // Otherwise render as primitive type (string, number, etc)
    return <Typography className={classNames(className, styles.wrapped)}>{children}</Typography>;
  }, [className, children]);
  return node;
};

export const CampaignNodeHeader: React.FC<TCampaignNodeHeaderProps> = (props) => {
  const {
    // prettier-ignore
    id,
    className,
    prefix,
    title,
    icon,
    toolbar,
  } = props;
  return (
    <Stack
      // prettier-ignore
      direction={responsiveNodeStackDirection}
      alignItems={responsiveNodeStackAlignItems}
      spacing={responsiveNodeStackSpacing}
      px={1}
      py={0.5}
      className={classNames(className, styles.root)}
      data-id={id}
    >
      <Stack
        // prettier-ignore
        direction={responsiveNodeStackDirection}
        alignItems={responsiveNodeStackAlignItems}
        spacing={responsiveNodeStackSpacing}
        className={classNames(className, styles.leftContainer)}
        flex={1}
      >
        <WrappedNode className={styles.icon}>{icon}</WrappedNode>
        <WrappedNode className={styles.prefix}>{prefix}</WrappedNode>
        <WrappedNode className={styles.title}>{title}</WrappedNode>
      </Stack>
      <Stack
        // prettier-ignore
        direction={responsiveNodeStackDirection}
        alignItems={responsiveNodeStackAlignItems}
        spacing={responsiveNodeStackSpacing}
        className={classNames(className, styles.rightContainer)}
      >
        <WrappedNode className={styles.toolbar}>{toolbar}</WrappedNode>
      </Stack>
    </Stack>
  );
};
