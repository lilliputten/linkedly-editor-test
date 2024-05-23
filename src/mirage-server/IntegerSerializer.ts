import { RestSerializer, Serializer } from 'miragejs';

export function convertIdsToNumbers(o: Record<string, unknown>) {
  Object.keys(o).forEach((k) => {
    const v = o[k];
    if (Array.isArray(v) || v instanceof Object) {
      convertIdsToNumbers(v as Record<string, unknown>);
    }
    if (k === 'id' || k.endsWith('Id')) {
      const num = Number(v);
      if (!isNaN(num)) {
        o[k] = num;
      }
    }
  });
}

export function normalizeRecord<T extends Record<string, unknown>>(o: T): T {
  convertIdsToNumbers(o);
  return o;
}

export const IntegerSerializer = RestSerializer.extend({
  root: false,
  embed: true,
  serialize(_o, request) {
    // @ts-ignore: Unknown `serialize` property?
    const json = Serializer.prototype.serialize.apply(this, arguments);
    convertIdsToNumbers(json);
    return {
      status: request.status,
      payload: json,
    };
  },
});
