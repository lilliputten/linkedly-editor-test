import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Container, Stack } from '@mui/material';
import { Edit, Save, Visibility } from '@mui/icons-material';

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
import { RouterLinkComponent, PageTitle } from 'src/components/MUI';
import { makeRootUrl } from 'src/core/helpers/urls';
import { mainRoute, mainSurveyRoute } from 'src/routes/appUrls';

import styles from './MainSurveysList.module.scss';

export const MainSurveyItem: React.FC<{ item: TSurveyListItem }> = ({ item }) => {
  const { id, name } = item;
  const url = makeRootUrl([mainRoute, mainSurveyRoute, String(id)]);
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
        <Button component={RouterLinkComponent} color="primary" startIcon={<Edit />} to={url}>
          Edit
        </Button>
        <Button color="primary" startIcon={<Visibility />} disabled>
          Preview
        </Button>
        <Button color="primary" startIcon={<Save />} disabled>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

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
  return (
    <>
      <Scrollable className={classNames(className, styles.root)}>
        <Container maxWidth="md">
          <PageTitle mb={3}>Available surveys list</PageTitle>
          <Stack className="MainSurveysListList-List" spacing={2} useFlexGap>
            {/*
            <p>MainSurveysList</p>
            <pre>{JSON.stringify(surveysList, null, 2)}</pre>
            */}
            {surveysList.map((item) => (
              <MainSurveyItem key={item.id} item={item} />
            ))}
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
