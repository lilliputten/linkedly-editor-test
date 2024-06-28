import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';

import { UserModel, userFactory } from './user';
import { SequenceModel } from './sequence';

type AppModels = {
  user: typeof UserModel;
  sequence: typeof SequenceModel;
};
type AppFactories = {
  user: typeof userFactory;
  // sequence: typeof sequenceFactory;
};

type AppRegistry = Registry<AppModels, AppFactories>;

export type AppSchema = Schema<AppRegistry>;
