import { TSurvey } from './TSurvey';

export type TSurveyListItem = Pick<TSurvey, 'id' | 'name'>;
export type TSurveyList = TSurveyListItem[];
