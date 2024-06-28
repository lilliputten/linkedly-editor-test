import { Response } from 'miragejs';
import { AnyResponse } from 'miragejs/-types';

import { TCampaignId } from 'src/entities/Campaign/types';

import { AppSchema } from '../AppSchema';

/** Return only list of campaigns */
export function getCampaignsList(schema: AppSchema) {
  const all = schema.all('campaign');
  const list = all.models.map((item) => {
    const id = Number(item.id);
    const name = item.name;
    return { id, name };
  });
  return list;
}

/** Return one campaign by id */
export function getCampaignData(schema: AppSchema, request: AnyResponse) {
  // @ts-ignore: To clarify types!
  const campaignId: TCampaignId = Number(request?.params?.campaignId);
  if (!campaignId) {
    return new Response(400, {}, { errors: ['Empty campaign id passed'] });
  }
  // @ts-ignore: To clarify types
  let found = schema.campaigns.findBy({ id: campaignId });
  // const all = schema.all('campaign');
  // const found = all.models.find((item) => {
  //   const id = Number(item.id);
  //   return campaignId === id;
  // });
  if (!found) {
    return new Response(400, {}, { errors: ['Campaign not found'] });
  }
  if (found.attrs) {
    found = found.attrs;
  }
  if (found.id && typeof found.id !== 'number') {
    found.id = Number(found.id);
  }
  return found;
}

/** Get all campaigns data */
export function getAllCampaigns(schema: AppSchema) {
  return schema.all('campaign');
}
