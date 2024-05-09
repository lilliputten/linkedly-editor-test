import { RouteObject } from 'react-router-dom';

import { LoginPage } from 'src/pages/LoginPage';
import { StartPage } from 'src/pages/StartPage';
import { TestPage } from 'src/pages/TestPage';
import { WaitingPage } from 'src/pages/WaitingPage';
import { DemoPage } from 'src/pages/DemoPage';
import { AppRootOutlet } from 'src/pages/AppRootOutlet';
import { MainPage } from 'src/pages/MainPage';

/** Routes
 * @see src/routes/urls.ts
 * @see https://reactrouter.com/en/main/route/route
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRootOutlet />,
    // loader
    children: [
      { index: true, element: <WaitingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'main', element: <MainPage /> },
      { path: 'demo', element: <DemoPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'start', element: <StartPage /> },
    ],
  },
  // TODO:
  // - finished
  // - ready?
];
