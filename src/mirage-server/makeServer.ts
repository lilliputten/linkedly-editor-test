import { createServer, Server } from 'miragejs';

import { IntegerSerializer } from './IntegerSerializer';

import { UserModel, getAllUsers, userFactory, userSeeds } from './user';
import {
  SequenceModel,
  getAllSequences,
  getSequenceData,
  getSequencesList,
  sequenceSeeds,
} from './sequence';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    logging: true,

    environment,

    serializers: {
      application: IntegerSerializer,
    },

    factories: {
      user: userFactory,
      // sequence: sequenceFactory, // UNUSED: Data is creating from static json files (see `src/mirage-server/sequence/seeds.ts`)
    },

    models: {
      // Model.extend<Partial<TUser>>({}),
      user: UserModel,
      sequence: SequenceModel,
    },

    seeds(server: Server) {
      userSeeds(server);
      sequenceSeeds(server);
    },

    routes() {
      this.namespace = 'api';
      this.get('users', getAllUsers);
      this.get('sequences/all', getAllSequences);
      this.get('sequences/list', getSequencesList);
      this.get('sequence/:sequenceId', getSequenceData);
    },
  });

  return server;
}
