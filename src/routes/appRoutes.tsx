import { RouteObject } from 'react-router-dom';

import { makeUrl } from 'src/core/helpers/urls';

import {
  demoRoute,
  loginRoute,
  mainRoute,
  mainCampaignRoute,
  rootUrl,
  startRoute,
  testRoute,
} from './appUrls';

import { AppRootLayout } from 'src/pages/app/AppRootLayout';
import { DemoPage } from 'src/pages/app/DemoPage';
import { LoginPage } from 'src/pages/app/LoginPage';
import { MainEditCampaignPage } from 'src/pages/main/MainEditCampaignPage';
import { MainLayout } from 'src/pages/main/MainLayout';
import { MainCampaignsList } from 'src/pages/main/MainCampaignsList';
import { StartPage } from 'src/pages/app/StartPage';
import { TestPage } from 'src/pages/app/TestPage';
import { WaitingPage } from 'src/pages/app/WaitingPage';

/** Routes
 * @see src/routes/appUrls.ts
 * @see https://reactrouter.com/en/main/route/route
 */
export const routes: RouteObject[] = [
  {
    path: rootUrl,
    element: <AppRootLayout />,
    // loader
    children: [
      { index: true, element: <WaitingPage /> },
      { path: loginRoute, element: <LoginPage /> },
      {
        path: mainRoute,
        element: <MainLayout />,
        children: [
          // prettier-ignore
          { index: true, element: <MainCampaignsList /> },
          { path: makeUrl([mainCampaignRoute, ':campaignId']), element: <MainEditCampaignPage /> },
          { path: startRoute, element: <TestPage /> },
        ],
      },
      { path: startRoute, element: <StartPage /> }, // TODO?
      { path: demoRoute, element: <DemoPage /> }, // NOTE: Debug only!
      { path: testRoute, element: <TestPage /> }, // NOTE: Debug only!
    ],
  },
];
