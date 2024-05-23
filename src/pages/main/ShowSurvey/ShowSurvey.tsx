import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Container, Stack } from '@mui/material';
import { PageTitle } from 'src/components/MUI';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSurveyId, TSurvey } from 'src/entities/Survey/types';

/* TODO:
 *   - Show loader
 *   - Check miragejs data
 */

export const ShowSurvey: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const surveyId: TSurveyId = Number(routerParams.surveyId);
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [surveyData, setSurveyData] = React.useState<TSurvey | undefined>();
  React.useEffect(() => {
    console.log('[ShowSurvey]', {
      isLogged,
      ready,
      surveyId,
    });
  }, [isLogged, ready, surveyId]);
  React.useEffect(() => {
    if ((!surveyId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/survey/${surveyId}`;
    console.log('[ShowSurvey] start fetch', {
      surveyId,
      url,
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSurveyData(data);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged, surveyId]);
  /* // DEMO: Dummy list
   * const itemsCount = 1;
   * const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
   */
  return (
    <>
      <Scrollable className={classNames(className, 'ShowSurvey')}>
        <Container maxWidth="md">
          <PageTitle mb={3}>Survey {surveyId}</PageTitle>
          <Stack className="MainSurveysListList-List" spacing={2} useFlexGap>
            <pre>{JSON.stringify(surveyData, null, 2)}</pre>
          </Stack>
        </Container>
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
