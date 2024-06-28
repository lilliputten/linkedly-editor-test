import { createServer, Server } from 'miragejs';

import { IntegerSerializer } from './IntegerSerializer';

import { UserModel, getAllUsers, userFactory, userSeeds } from './user';
import {
  CampaignModel,
  getAllCampaigns,
  getCampaignData,
  getCampaignsList,
  campaignSeeds,
} from './campaign';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    logging: true,

    environment,

    serializers: {
      application: IntegerSerializer,
    },

    factories: {
      user: userFactory,
      // campaign: campaignFactory, // UNUSED: Data is creating from static json files (see `src/mirage-server/campaign/seeds.ts`)
    },

    models: {
      // Model.extend<Partial<TUser>>({}),
      user: UserModel,
      campaign: CampaignModel,
    },

    seeds(server: Server) {
      userSeeds(server);
      campaignSeeds(server);
    },

    routes() {
      this.namespace = 'api';
      this.get('users', getAllUsers);
      this.get('campaigns/all', getAllCampaigns);
      this.get('campaigns/list', getCampaignsList);
      this.get('campaign/:campaignId', getCampaignData);
    },
  });

  return server;
}
