import { StackProps } from '@mui/material';

// Show header in vertcal layout for narrow/mobile displays
export const responsiveNodeStackDirection: StackProps['direction'] = { xs: 'column', sm: 'row' };
export const responsiveNodeStackAlignItems: StackProps['alignItems'] = {
  xs: 'flex-start',
  sm: 'center',
};
export const responsiveNodeStackSpacing: StackProps['spacing'] = { xs: 0, sm: 0.5 };
