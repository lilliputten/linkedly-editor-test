import { createServer, Server } from 'miragejs';

import { IntegerSerializer } from './IntegerSerializer';

import { UserModel, getAllUsers, userFactory, userSeeds } from './user';
import { SurveyModel, getAllSurveys, getSurveysList, surveySeeds } from './survey';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    logging: true,

    environment,

    serializers: {
      application: IntegerSerializer,
    },

    factories: {
      user: userFactory,
      // survey: surveyFactory, // UNUSED: Data is creating from static json files (see `src/mirage-server/survey/seeds.ts`)
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
      this.get('surveys/all', getAllSurveys);
      this.get('surveys/list', getSurveysList);
    },
  });

  return server;
}
