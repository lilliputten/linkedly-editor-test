import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';

import { UserModel, userFactory } from './user';
import { CampaignModel } from './campaign';

type AppModels = {
  user: typeof UserModel;
  campaign: typeof CampaignModel;
};
type AppFactories = {
  user: typeof userFactory;
  // campaign: typeof campaignFactory;
};

type AppRegistry = Registry<AppModels, AppFactories>;

export type AppSchema = Schema<AppRegistry>;
