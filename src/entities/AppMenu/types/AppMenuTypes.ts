import { SvgIconComponent } from '@mui/icons-material';

export interface TAppMenuItem {
  icon?: SvgIconComponent;
  id: string;
  text: string;
  title?: string;
  selected?: boolean;
}
