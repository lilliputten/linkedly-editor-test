import { useAppSessionStore } from 'src/store';

export function useLogged() {
  const appSessionStore = useAppSessionStore();
  const { logged } = appSessionStore;
  return logged;
}
