import React from 'react';
import { observer } from 'mobx-react-lite';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Check } from '@mui/icons-material';

import { RouterLink } from 'src/components/MUI';
// import { appTitle } from 'src/core/constants/config';
// import { mainUrl } from 'src/routes/urls';
import { useAppSessionStore } from 'src/store';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { Scrollable } from 'src/ui/Basic';

/* // UNUSED: Copyright (?)
 * function Copyright(props: any) {
 *   return (
 *     <Typography variant="body2" color="text.secondary" align="center" {...props}>
 *       {'Copyright © '}
 *       <RouterLink color="inherit" to="/">
 *         {appTitle}
 *       </RouterLink>{' '}
 *       {new Date().getFullYear()}
 *       {'.'}
 *     </Typography>
 *   );
 * }
 */

export const LoginPage: React.FC = observer(() => {
  const appSessionStore = useAppSessionStore();
  useCommonAppNavigation();
  /* // UNUSED: Manually navigate to main page...
   * const navigate = useNavigate();
   * const { logged } = appSessionStore;
   * React.useEffect(() => {
   *   if (logged) {
   *     navigate(mainUrl);
   *   }
   * }, [logged, navigate]);
   */
  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);
      // console.log('[LoginPage:LoginPage] handleSubmit', {
      //   login: data.get('login'),
      //   password: data.get('password'),
      // });
      // TODO: Check login data
      // navigate(mainUrl);
      appSessionStore.setLogged(true);
    },
    [appSessionStore],
  );

  const avatarSize = 64;

  return (
    <Scrollable>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: avatarSize, height: avatarSize }}>
            <LockOutlinedIcon
            // fontSize="large"
            />
          </Avatar>
          <Typography component="h1" variant="h3" fontSize="1.5rem" color="primary">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box
              // prettier-ignore
              sx={{ mt: 3, mb: 2 }}
            >
              <Button
                // prettier-ignore
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Check />}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <RouterLink to="#" variant="body2">
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="#" variant="body2">
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/*
         * <Copyright sx={{ mt: 8, mb: 4 }} />
         */}
      </Container>
    </Scrollable>
  );
});
