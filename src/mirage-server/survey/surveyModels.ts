import { Model } from 'miragejs';

import {
  TSurvey,
  // TSurveyData,
} from 'src/entities/Survey/types';
import { ModelDefinition } from 'miragejs/-types';

export const SurveyModel: ModelDefinition<TSurvey> = Model.extend({});
