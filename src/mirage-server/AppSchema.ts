import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';

import { UserModel, userFactory } from './user';

type AppModels = {
  user: typeof UserModel;
};
type AppFactories = {
  user: typeof userFactory;
};

type AppRegistry = Registry<AppModels, AppFactories>;

export type AppSchema = Schema<AppRegistry>;
