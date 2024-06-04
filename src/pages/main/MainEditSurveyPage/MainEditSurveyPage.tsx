import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Box, Container, Typography } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSurveyId, TSurvey, TSurveyNodeChangeParams } from 'src/entities/Survey/types';
import { EditSurveyRoot } from 'src/components/Survey/EditSurvey';

export const MainEditSurveyPage: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const surveyId: TSurveyId = Number(routerParams.surveyId);
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [surveyData, setSurveyData] = React.useState<TSurvey | undefined>();
  const [hasChanged, setHasChanged] = React.useState(false);
  React.useEffect(() => {
    if ((!surveyId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/survey/${surveyId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSurveyData(data);
        setHasChanged(false);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged, surveyId]);
  const handleChange = React.useCallback((params: TSurveyNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal survey sample', items: Array(1)}
      nodeId, // 111
      value, // [{…}]
      valueId, // "items"
    } = params;
    console.log('[MainEditSurveyPage:handleChange]', {
      nodeData,
      nodeId,
      value,
      valueId,
      params,
    });
    // debugger;
    setSurveyData(nodeData as TSurvey);
    setHasChanged(true);
  }, []);

  /* // DEMO: Dummy list
   * const itemsCount = 1;
   * const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
   */
  return (
    <>
      <Scrollable className={classNames(className, 'MainEditSurveyPage')}>
        <Container maxWidth="md" sx={{ my: 2 }}>
          {hasChanged && (
            <Box>
              <Typography color="red">
                {/* Notification about data change */}
                The survey data has changed. Saving will be required.
              </Typography>
            </Box>
          )}
          {ready && !!surveyData && (
            <EditSurveyRoot
              // prettier-ignore
              surveyData={surveyData}
              onChange={handleChange}
            />
          )}
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
