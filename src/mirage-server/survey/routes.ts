import { TSurveyList } from 'src/entities/Survey/types';
import { AppSchema } from '../AppSchema';

/** Return only list of surveys */
export function getSurveysList(schema: AppSchema): TSurveyList {
  const all = schema.all('survey');
  const list = all.models.map((item) => {
    const id = Number(item.id);
    const name = item.name;
    return { id, name };
  });
  return list;
}

/** Get all surveys data */
export function getAllSurveys(schema: AppSchema) {
  return schema.all('survey');
}
