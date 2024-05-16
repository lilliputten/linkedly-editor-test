import {
  Menu,
  HelpOutline,
  // DriveFolderUpload,
  DarkMode,
  LightMode,
  BugReport,
  // BarChart,
  SvgIconComponent,
  Home,
  Login,
  Logout,
} from '@mui/icons-material';

export interface TAppMenuItem {
  icon?: SvgIconComponent;
  id: string;
  text: string;
  title?: string;
  selected?: boolean;
}
