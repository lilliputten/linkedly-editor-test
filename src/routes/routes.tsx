import { RouteObject } from 'react-router-dom';

import { LoginPage } from 'src/pages/LoginPage';
import { StartPage } from 'src/pages/StartPage';
import { TestPage } from 'src/pages/TestPage';
import { WaitingPage } from 'src/pages/WaitingPage';
import { DemoPage } from 'src/pages/DemoPage';
import { AppRootLayout } from 'src/pages/AppRootLayout';
import { MainPage } from 'src/pages/main/MainPage';
import { MainLayout } from 'src/pages/main/MainLayout';

/** Routes
 * @see src/routes/urls.ts
 * @see https://reactrouter.com/en/main/route/route
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRootLayout />,
    // loader
    children: [
      { index: true, element: <WaitingPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'main',
        element: <MainLayout />,
        children: [
          // prettier-ignore
          { index: true, element: <MainPage /> },
          { path: 'start', element: <TestPage /> },
        ],
      },
      { path: 'demo', element: <DemoPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'start', element: <StartPage /> },
    ],
  },
  // TODO:
  // - finished
  // - ready?
];
