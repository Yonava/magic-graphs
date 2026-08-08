import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';

import { Magic } from '../../product/useMagicProduct.ts';

const graphSharePayloadQueryParam = 'graph';

const getLinkPayload = (magic: Magic) => {
  const encoding = magic.transit.encode();
  const stringEncoding = JSON.stringify(encoding);
  return compressToEncodedURIComponent(stringEncoding);
};

export const getLink = (magic: Magic) => {
  const { origin } = window.location;
  const { slug } = magic.manifest.navigation;
  const payload = getLinkPayload(magic);
  const graphQueryParam = `${graphSharePayloadQueryParam}=${payload}`;

  return `${origin}/${slug}?${graphQueryParam}`;
};

export const loadFromLinkPayload = (magic: Magic) => {
  const url = new URL(window.location.href);
  const payload = url.searchParams.get(graphSharePayloadQueryParam);
  if (!payload) return;

  // always consume or else users see stale when they refresh
  url.searchParams.delete(graphSharePayloadQueryParam);
  window.history.replaceState({}, '', url);

  const stringEncoding = decompressFromEncodedURIComponent(payload);
  if (!stringEncoding) return;

  const parsedEncoding = JSON.parse(stringEncoding);
  magic.transit.decode(parsedEncoding);
};
