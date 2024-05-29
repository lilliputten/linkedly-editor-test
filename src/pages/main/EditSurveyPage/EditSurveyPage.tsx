import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSurveyId, TSurvey } from 'src/entities/Survey/types';
import { EditSurveyRoot } from 'src/components/Survey/EditSurvey';

export const EditSurveyPage: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const surveyId: TSurveyId = Number(routerParams.surveyId);
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [surveyData, setSurveyData] = React.useState<TSurvey | undefined>();
  React.useEffect(() => {
    if ((!surveyId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/survey/${surveyId}`;
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
      <Scrollable className={classNames(className, 'EditSurveyPage')}>
        <Container maxWidth="md" sx={{ my: 2 }}>
          {ready && !!surveyData && <EditSurveyRoot surveyData={surveyData} />}
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
