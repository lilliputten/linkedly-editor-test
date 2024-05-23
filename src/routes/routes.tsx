import { RouteObject } from 'react-router-dom';

import { LoginPage } from 'src/pages/app/LoginPage';
import { StartPage } from 'src/pages/app/StartPage';
import { TestPage } from 'src/pages/app/TestPage';
import { WaitingPage } from 'src/pages/app/WaitingPage';
import { DemoPage } from 'src/pages/app/DemoPage';
import { AppRootLayout } from 'src/pages/app/AppRootLayout';
// import { MainPage } from 'src/pages/main/MainPage';
import { MainLayout } from 'src/pages/main/MainLayout';
import { MainSurveysList } from 'src/pages/main/MainSurveysList';
import { ShowSurvey } from 'src/pages/main/ShowSurvey';

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
          { index: true, element: <MainSurveysList /> },
          { path: 'survey/:surveyId', element: <ShowSurvey /> },
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
