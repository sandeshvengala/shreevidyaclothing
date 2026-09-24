export type OfferCampaign = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  startAt: string;
  endAt: string;
};

export const defaultOfferCampaign: OfferCampaign = {
  enabled: true,
  eyebrow: 'Festive offer · Limited time',
  title: 'Up to 25% off selected edits.',
  description: 'Discover graceful silhouettes, rich fabrics and timeless details at a special price for a limited time.',
  buttonLabel: 'Shop the offer',
  startAt: new Date().toISOString().slice(0, 16),
  endAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
};

export function isOfferCampaignActive(campaign: OfferCampaign) {
  const now = Date.now();
  const starts = new Date(campaign.startAt).getTime();
  const ends = new Date(campaign.endAt).getTime();
  return campaign.enabled && Number.isFinite(starts) && Number.isFinite(ends) && now >= starts && now <= ends;
}
