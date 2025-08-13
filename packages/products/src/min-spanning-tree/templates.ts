import type { GraphTemplate } from '@graph/templates/types';

const templates: GraphTemplate[] = [
  {
    id: 'mst',
    title: 'Minimum Spanning Tree',
    description: 'basic example for visualizing different mst algorithms',
    graphState: {
      nodes: [
        {
          id: 'zxs2igh',
          label: 'A',
          x: 2067,
          y: 1335,
        },
        {
          id: '9ahn5ow',
          label: 'B',
          x: 2281,
          y: 1366,
        },
        {
          id: '4o66u6a',
          label: 'C',
          x: 2295,
          y: 1561,
        },
        {
          id: 'cwq9ut3',
          label: 'D',
          x: 2064,
          y: 1574,
        },
        {
          id: 'i0j3o1w',
          label: 'E',
          x: 2593,
          y: 1672,
        },
        {
          id: 'jv60h9o',
          label: 'F',
          x: 2791,
          y: 1400,
        },
        {
          id: 'rz3pnda',
          label: 'G',
          x: 2754,
          y: 1161,
        },
        {
          id: 'x31sqs1',
          label: 'H',
          x: 2380,
          y: 1131,
        },
        {
          id: 'msm96s6',
          label: 'I',
          x: 2134,
          y: 1110,
        },
      ],
      edges: [
        {
          label: '2',
          id: 'ham4d00',
          from: '9ahn5ow',
          to: 'zxs2igh',
        },
        {
          label: '4',
          id: 'nrfl5v6',
          from: 'zxs2igh',
          to: 'msm96s6',
        },
        {
          label: '5',
          id: 'o2x178a',
          from: 'msm96s6',
          to: 'x31sqs1',
        },
        {
          label: '8',
          id: 'ro7b1ic',
          from: 'x31sqs1',
          to: 'rz3pnda',
        },
        {
          label: '1',
          id: '19suq9q',
          from: '9ahn5ow',
          to: '4o66u6a',
        },
        {
          label: '4',
          id: 'l103z1d',
          from: '9ahn5ow',
          to: 'jv60h9o',
        },
        {
          label: '3',
          id: 'h1xl528',
          from: 'jv60h9o',
          to: 'i0j3o1w',
        },
        {
          label: '1',
          id: '9vpj23r',
          from: 'jv60h9o',
          to: 'rz3pnda',
        },
        {
          label: '6',
          id: '678vx4v',
          from: '4o66u6a',
          to: 'cwq9ut3',
        },
        {
          label: '1',
          id: 's27dpd1',
          from: '4o66u6a',
          to: 'i0j3o1w',
        },
        {
          label: '1',
          id: 've0w5na',
          from: 'x31sqs1',
          to: '9ahn5ow',
        },
        {
          label: '1',
          id: 'kmoz02l',
          from: 'zxs2igh',
          to: 'cwq9ut3',
        },
        {
          label: '5',
          id: 'haubfvt',
          from: 'rz3pnda',
          to: '9ahn5ow',
        },
        {
          label: '1',
          id: 'yclk3h8',
          from: 'jv60h9o',
          to: '4o66u6a',
        },
      ],
    },
  },
];

export default templates;
