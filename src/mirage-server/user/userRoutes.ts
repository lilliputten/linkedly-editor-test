import { AppSchema } from '../AppSchema';

export function getAllUsers(schema: AppSchema) {
  return schema.all('user');
  // return schema.users.all();
  // return [
  //   { id: '1', name: 'Luke' },
  //   { id: '2', name: 'Leia' },
  //   { id: '3', name: 'Anakin' },
  // ];
}
