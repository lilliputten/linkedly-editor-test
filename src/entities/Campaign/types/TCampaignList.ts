import { TCampaign } from './TCampaign';

export type TCampaignListItem = Pick<TCampaign, 'id' | 'name'>;
export type TCampaignList = TCampaignListItem[];
