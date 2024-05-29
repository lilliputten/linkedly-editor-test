import { RouteObject } from 'react-router-dom';

import { makeUrl } from 'src/core/helpers/urls';

import {
  demoRoute,
  loginRoute,
  mainRoute,
  mainSurveyRoute,
  rootUrl,
  startRoute,
  testRoute,
} from './appUrls';

import { AppRootLayout } from 'src/pages/app/AppRootLayout';
import { DemoPage } from 'src/pages/app/DemoPage';
import { EditSurveyPage } from 'src/pages/main/EditSurveyPage';
import { LoginPage } from 'src/pages/app/LoginPage';
import { MainLayout } from 'src/pages/main/MainLayout';
import { MainSurveysList } from 'src/pages/main/MainSurveysList';
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
          { index: true, element: <MainSurveysList /> },
          { path: makeUrl([mainSurveyRoute, ':surveyId']), element: <EditSurveyPage /> },
          { path: startRoute, element: <TestPage /> },
        ],
      },
      { path: startRoute, element: <StartPage /> }, // TODO?
      { path: demoRoute, element: <DemoPage /> }, // NOTE: Debug only!
      { path: testRoute, element: <TestPage /> }, // NOTE: Debug only!
    ],
  },
];
