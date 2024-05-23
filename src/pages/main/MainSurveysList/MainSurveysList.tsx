import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Container, Stack } from '@mui/material';

import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import {
  // TSurvey,
  // TSurveyList,
  TSurveyListItem,
} from 'src/entities/Survey/types';

import { isDev } from 'src/core/constants/config';
import { getRandomStubImageUrl } from 'src/core/helpers/stubImages';
import { Edit } from '@mui/icons-material';
import { RouterLinkComponent } from 'src/components/MUI';

import styles from './MainSurveysList.module.scss';

export const MainSurveysList: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [surveysList, setSurveysList] = React.useState<TSurveyListItem[]>([]);
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
        <Container maxWidth="md">
          <Stack className="MainSurveysListList-List" spacing={2} useFlexGap>
            {/*
            <p>MainSurveysList</p>
            <pre>{JSON.stringify(surveysList, null, 2)}</pre>
            */}
            {surveysList.map((item, no) => {
              const { id, name } = item;
              const url = `/main/survey/${id}`;
              const imageUrl = getRandomStubImageUrl(id);
              const title = name || `Survey ${id}`; // + (isDev ? ` (${imageUrl})` : '');
              return (
                <Card key={id} className="MainSurveysListList-Item">
                  {/* @ts-ignore: Suppress error for `to` property. TODO: To solve this problem using typings? */}
                  <CardActionArea
                    // prettier-ignore
                    to={url}
                    LinkComponent={RouterLinkComponent}
                  >
                    {/* <RouterLink to={url}> */}
                    <CardMedia
                      // prettier-ignore
                      component="img"
                      height="140"
                      image={imageUrl}
                      alt={title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      // size="small"
                      color="primary"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
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
