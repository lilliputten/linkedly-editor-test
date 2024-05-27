import { Server } from 'miragejs';

import sampleMinData from './demo-data/sample-min.json';
import sampleData from './demo-data/sample.json';

export function surveySeeds(server: Server) {
  // type TSurveyInitializer = Partial<ModelInitializer<Instantiate<AnyRegistry, 'survey'>>>;
  server.create('survey', sampleMinData);
  server.create('survey', sampleData);
}
