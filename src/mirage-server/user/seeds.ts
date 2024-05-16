import { Server } from 'miragejs';

export function userSeeds(server: Server) {
  server.createList('user', 1);
}
