import { Server } from 'miragejs';

import sampleMinData from './demo-data/sample-min.json';
import sampleData from './demo-data/sample.json';

export function campaignSeeds(server: Server) {
  // type TCampaignInitializer = Partial<ModelInitializer<Instantiate<AnyRegistry, 'campaign'>>>;
  server.create('campaign', sampleMinData);
  server.create('campaign', sampleData);
}
