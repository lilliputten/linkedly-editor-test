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
  // TSequence,
  // TSequenceList,
  TSequenceListItem,
} from 'src/entities/Sequence/types';

import { isDev } from 'src/core/constants/config';
import { getRandomStubImageUrl } from 'src/core/helpers/stubImages';
import { RouterLinkComponent, PageTitle } from 'src/components/MUI';
import { makeRootUrl } from 'src/core/helpers/urls';
import { mainRoute, mainSequenceRoute } from 'src/routes/appUrls';

import styles from './MainSequencesList.module.scss';

export const MainSequenceItem: React.FC<{ item: TSequenceListItem }> = ({ item }) => {
  const { id, name } = item;
  const url = makeRootUrl([mainRoute, mainSequenceRoute, String(id)]);
  const imageUrl = getRandomStubImageUrl(id);
  const title = name || `Sequence ${id}`; // + (isDev ? ` (${imageUrl})` : '');
  return (
    <Card key={id} className="MainSequencesListList-Item">
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

export const MainSequencesList: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [sequencesList, setSequencesList] = React.useState<TSequenceListItem[]>([]);
  React.useEffect(() => {
    if (!isLogged && !isDev) {
      return;
    }
    // console.log('[MainSequencesList] start fetch');
    fetch('/api/sequences/list')
      .then((response) => response.json())
      .then((list: TSequenceListItem[]) => {
        setSequencesList(list);
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
          <PageTitle mb={3}>Available sequences list</PageTitle>
          <Stack className="MainSequencesListList-List" spacing={2} useFlexGap>
            {/*
            <p>MainSequencesList</p>
            <pre>{JSON.stringify(sequencesList, null, 2)}</pre>
            */}
            {sequencesList.map((item) => (
              <MainSequenceItem key={item.id} item={item} />
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
