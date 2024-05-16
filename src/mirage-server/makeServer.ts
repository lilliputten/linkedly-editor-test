import { createServer, Server } from 'miragejs';

import { UserModel, getAllUsers, userFactory, userSeeds } from './user';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    logging: true,

    environment,

    factories: {
      user: userFactory,
    },

    models: {
      user: UserModel, // Model.extend<Partial<TUser>>({}),
    },

    seeds(server: Server) {
      userSeeds(server);
    },

    routes() {
      this.namespace = 'api';
      this.get('users', getAllUsers);
    },
  });

  return server;
}
