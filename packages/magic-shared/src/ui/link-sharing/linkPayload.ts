import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';

import { MagicGraph } from '../../product/useGraphProduct.ts';

const graphSharePayloadQueryParam = 'graph';

const getLinkPayload = (graph: MagicGraph) => {
  const encoding = graph.transit.encode();
  const stringEncoding = JSON.stringify(encoding);
  return compressToEncodedURIComponent(stringEncoding);
};

export const getLink = (graph: MagicGraph) => {
  const { origin } = window.location;
  const { slug } = graph.magic.manifest.navigation;
  const payload = getLinkPayload(graph);
  const graphQueryParam = `${graphSharePayloadQueryParam}=${payload}`;

  return `${origin}/${slug}?${graphQueryParam}`;
};

export const loadGraphFromLinkPayload = (graph: MagicGraph) => {
  const url = new URL(window.location.href);
  const payload = url.searchParams.get(graphSharePayloadQueryParam);
  if (!payload) return;

  // always consume or else users see stale when they refresh
  url.searchParams.delete(graphSharePayloadQueryParam);
  window.history.replaceState({}, '', url);

  const stringEncoding = decompressFromEncodedURIComponent(payload);
  if (!stringEncoding) return;

  graph.transit.decode(JSON.parse(stringEncoding));
};
