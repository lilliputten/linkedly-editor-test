import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import {
  // TSurvey,
  // TSurveyList,
  TSurveyListItem,
} from 'src/entities/Survey/types';
import { RouterLink } from 'src/components/MUI';

import styles from './MainSurveysList.module.scss';
import { isDev } from 'src/core/constants/config';

export const MainSurveysList: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [surveysList, setSurveysList] = React.useState<TSurveyListItem[]>([]);
  /* React.useEffect(() => {
   *   console.log('[MainSurveysList]', {
   *     isLogged,
   *     ready,
   *     surveyData,
   *   });
   * }, [isLogged, ready, surveyData]);
   */
  React.useEffect(() => {
    if (!isLogged && !isDev) {
      return;
    }
    // console.log('[MainSurveysList] start fetch');
    fetch('/api/surveys/list')
      .then((response) => response.json())
      .then((list: TSurveyListItem[]) => {
        setSurveysList(list);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged]);
  /* // DEMO: Dummy list
   * const itemsCount = 1;
   * const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
   */
  return (
    <>
      <Scrollable className={classNames(className, styles.root)}>
        {/*
        <p>MainSurveysList</p>
        */}
        <pre>{JSON.stringify(surveysList, null, 2)}</pre>
        <div className="MainSurveysListList-List">
          {surveysList.map((item) => {
            const { id, name } = item;
            const text = name || `Survey ${id}`;
            const url = `/main/survey/${id}`;
            return (
              <div key={id} className="MainSurveysListList-Item">
                <RouterLink to={url}>{text}</RouterLink>
              </div>
            );
          })}
        </div>
      </Scrollable>
      <ThemedLoaderSplash
        // prettier-ignore
        show={!ready}
        mode="cover"
        fullSize
      />
    </>
  );
});
