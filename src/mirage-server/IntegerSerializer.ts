import { RestSerializer, Serializer } from 'miragejs';

function convertIdsToNumbers(o: Record<string, unknown>) {
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
