import { Response } from 'miragejs';
import { AnyResponse } from 'miragejs/-types';

import { TSurveyId } from 'src/entities/Survey/types';

import { AppSchema } from '../AppSchema';

/** Return only list of surveys */
export function getSurveysList(schema: AppSchema) {
  const all = schema.all('survey');
  const list = all.models.map((item) => {
    const id = Number(item.id);
    const name = item.name;
    return { id, name };
  });
  return list;
}

/** Return one survey by id */
export function getSurveyData(schema: AppSchema, request: AnyResponse) {
  // @ts-ignore: To clarify types!
  const surveyId: TSurveyId = Number(request?.params?.surveyId);
  if (!surveyId) {
    return new Response(400, {}, { errors: ['Empty survey id passed'] });
  }
  // @ts-ignore: To clarify types
  let found = schema.surveys.findBy({ id: surveyId });
  // const all = schema.all('survey');
  // const found = all.models.find((item) => {
  //   const id = Number(item.id);
  //   return surveyId === id;
  // });
  console.log('[routes:getSurveyData]', {
    found,
    surveyId,
    request,
  });
  if (!found) {
    return new Response(400, {}, { errors: ['Survey not found'] });
  }
  if (found.attrs) {
    found = found.attrs;
  }
  if (found.id && typeof found.id !== 'number') {
    found.id = Number(found.id);
  }
  return found;
}

/** Get all surveys data */
export function getAllSurveys(schema: AppSchema) {
  return schema.all('survey');
}
