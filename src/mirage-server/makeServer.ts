import { createServer, Server } from 'miragejs';

import { UserModel, getAllUsers, userFactory, userSeeds } from './user';
import { SurveyModel, getAllSurveys, surveyFactory, surveySeeds } from './survey';
import { IntegerSerializer } from './IntegerSerializer';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    logging: true,

    environment,

    serializers: {
      application: IntegerSerializer,
    },

    factories: {
      user: userFactory,
      // survey: surveyFactory,
    },

    models: {
      // Model.extend<Partial<TUser>>({}),
      user: UserModel,
      survey: SurveyModel,
    },

    seeds(server: Server) {
      userSeeds(server);
      surveySeeds(server);
    },

    routes() {
      this.namespace = 'api';
      this.get('users', getAllUsers);
      this.get('surveys', getAllSurveys);
    },
  });

  return server;
}
