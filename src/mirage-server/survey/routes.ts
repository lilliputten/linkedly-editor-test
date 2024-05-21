import { AppSchema } from '../AppSchema';

export function getAllSurveys(schema: AppSchema) {
  return schema.all('survey');
  // return schema.surveys.all();
  // return [
  //   { id: '1', name: 'Luke' },
  //   { id: '2', name: 'Leia' },
  //   { id: '3', name: 'Anakin' },
  // ];
}
