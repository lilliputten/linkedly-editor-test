import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';

import { UserModel, userFactory } from './user';
import { SurveyModel } from './survey';

type AppModels = {
  user: typeof UserModel;
  survey: typeof SurveyModel;
};
type AppFactories = {
  user: typeof userFactory;
  // survey: typeof surveyFactory;
};

type AppRegistry = Registry<AppModels, AppFactories>;

export type AppSchema = Schema<AppRegistry>;
