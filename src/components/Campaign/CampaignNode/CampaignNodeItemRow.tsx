import * as React from 'react';
import { Box, Stack, StackOwnProps } from '@mui/material';
// import tinycolor from 'tinycolor2';
import classNames from 'classnames';

import { TReactNode } from 'src/core/types';
import { responsiveNodeStackDirection } from './constants/responsiveNodeStyles';
import { primaryColor, transitionTimeMs } from 'src/core/assets/scss';

interface TCampaignNodeItemRowProps extends StackOwnProps {
  className?: string;
  id?: number | string;
  activeButtonId?: string;
  title?: TReactNode;
}

// const activeBgHoverColor = tinycolor(primaryColor).setAlpha(0.2).toRgbString();

export const CampaignNodeItemRow: React.FC<TCampaignNodeItemRowProps> = (props) => {
  const { id, activeButtonId, className, children, title, ...restProps } = props;
  const isActive = !!activeButtonId;
  const onLabelClick = React.useCallback(() => {
    const activeNode =
      !!activeButtonId && (document.getElementById(activeButtonId) as HTMLButtonElement);
    if (activeNode) {
      activeNode.focus && activeNode.focus();
      activeNode.click && activeNode.click();
    }
  }, [activeButtonId]);
  return (
    <Stack
      // prettier-ignore
      className={classNames(className, 'CampaignNodeItemRow')}
      data-id={id}
      direction={responsiveNodeStackDirection}
      {...restProps}
    >
      <Box
        className={classNames('CampaignNodeItemRow_Title')}
        px={1}
        py={1}
        border="1px solid transparent"
        sx={{
          opacity: 0.5,
          cursor: isActive ? 'pointer' : 'default',
          transition: `all ${transitionTimeMs}`,
          '&:hover': {
            opacity: 1,
            color: primaryColor,
            // backgroundColor: activeBgHoverColor,
          },
        }}
        onClick={onLabelClick}
      >
        {title}
      </Box>
      <Box
        // prettier-ignore
        className={classNames('CampaignNodeItemRow_Content')}
        sx={{ overflow: 'hidden' }}
        flex={1}
      >
        {children}
      </Box>
    </Stack>
  );
};
