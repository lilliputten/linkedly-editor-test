import { Server } from 'miragejs';

import sampleMinData from './demo-data/sample-min.json';

export function sequenceSeeds(server: Server) {
  // type TSequenceInitializer = Partial<ModelInitializer<Instantiate<AnyRegistry, 'sequence'>>>;
  server.create('sequence', sampleMinData);
}
