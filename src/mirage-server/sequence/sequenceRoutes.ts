import { Response } from 'miragejs';
import { AnyResponse } from 'miragejs/-types';

import { TSequenceId } from 'src/entities/Sequence/types';

import { AppSchema } from '../AppSchema';

/** Return only list of sequences */
export function getSequencesList(schema: AppSchema) {
  const all = schema.all('sequence');
  const list = all.models.map((item) => {
    const id = Number(item.id);
    const name = item.name;
    return { id, name };
  });
  return list;
}

/** Return one sequence by id */
export function getSequenceData(schema: AppSchema, request: AnyResponse) {
  // @ts-ignore: To clarify types!
  const sequenceId: TSequenceId = Number(request?.params?.sequenceId);
  if (!sequenceId) {
    return new Response(400, {}, { errors: ['Empty sequence id passed'] });
  }
  // @ts-ignore: To clarify types
  let found = schema.sequences.findBy({ id: sequenceId });
  // const all = schema.all('sequence');
  // const found = all.models.find((item) => {
  //   const id = Number(item.id);
  //   return sequenceId === id;
  // });
  if (!found) {
    return new Response(400, {}, { errors: ['Sequence not found'] });
  }
  if (found.attrs) {
    found = found.attrs;
  }
  if (found.id && typeof found.id !== 'number') {
    found.id = Number(found.id);
  }
  return found;
}

/** Get all sequences data */
export function getAllSequences(schema: AppSchema) {
  return schema.all('sequence');
}
