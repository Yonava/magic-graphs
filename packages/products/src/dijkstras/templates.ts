import type { GraphTemplate } from '@graph/templates/types';

const templates: GraphTemplate[] = [
  {
    id: 'dijkstras',
    title: 'Dijkstras',
    description: 'basic example for visualizing Dijkstras Algorithm',
    graphState: {
      nodes: [
        {
          id: 'x9p9i8x',
          label: 'A',
          x: 2093,
          y: 817,
        },
        {
          id: 'y2rtfe1',
          label: 'B',
          x: 2209,
          y: 1081,
        },
        {
          id: 'jcdp371',
          label: 'C',
          x: 2414,
          y: 870,
        },
        {
          id: 'fvkeu0w',
          label: 'D',
          x: 2479,
          y: 614,
        },
        {
          id: 'fy2mn9l',
          label: 'E',
          x: 2732,
          y: 621,
        },
        {
          id: 'foa09xw',
          label: 'F',
          x: 2745,
          y: 868,
        },
        {
          id: 's28s7h0',
          label: 'G',
          x: 2876,
          y: 1043,
        },
        {
          id: 'ewrl5ly',
          label: 'H',
          x: 2654,
          y: 1129,
        },
        {
          id: 'b2rll3i',
          label: 'I',
          x: 2280,
          y: 629,
        },
        {
          id: '64t4hj4',
          label: 'J',
          x: 3030,
          y: 757,
        },
      ],
      edges: [
        {
          label: '2',
          id: 'y1wgh62',
          from: 'x9p9i8x',
          to: 'b2rll3i',
        },
        {
          label: '5',
          id: 'loztixb',
          from: 'b2rll3i',
          to: 'fvkeu0w',
        },
        {
          label: '1',
          id: 'rpl8vwo',
          from: 'fvkeu0w',
          to: 'jcdp371',
        },
        {
          label: '6',
          id: 'ph8bkto',
          from: 'jcdp371',
          to: 'fy2mn9l',
        },
        {
          label: '1',
          id: 'sduxigd',
          from: 'fy2mn9l',
          to: 'foa09xw',
        },
        {
          label: '1',
          id: '5laamxh',
          from: 'foa09xw',
          to: 'ewrl5ly',
        },
        {
          label: '1',
          id: '30eh8dw',
          from: 'ewrl5ly',
          to: 's28s7h0',
        },
        {
          label: '1',
          id: 'xxm1b9a',
          from: 's28s7h0',
          to: '64t4hj4',
        },
        {
          label: '12',
          id: 'umxhdk2',
          from: 'foa09xw',
          to: '64t4hj4',
        },
        {
          label: '13',
          id: '14k6y72',
          from: 'fy2mn9l',
          to: '64t4hj4',
        },
        {
          label: '2',
          id: 'f51gwgj',
          from: 'jcdp371',
          to: 'foa09xw',
        },
        {
          label: '1',
          id: 'n1sbpbs',
          from: 'fvkeu0w',
          to: 'fy2mn9l',
        },
        {
          label: '9',
          id: 'ez6t270',
          from: 'jcdp371',
          to: 'ewrl5ly',
        },
        {
          label: '7',
          id: 'dwofzhq',
          from: 'y2rtfe1',
          to: 'jcdp371',
        },
        {
          label: '8',
          id: 'v6oxxo7',
          from: 'x9p9i8x',
          to: 'jcdp371',
        },
        {
          label: '1',
          id: 'ldmmtm1',
          from: 'x9p9i8x',
          to: 'y2rtfe1',
        },
        {
          label: '15',
          id: 'w65nyaa',
          from: 'y2rtfe1',
          to: 'ewrl5ly',
        },
      ],
    },
  },
];

export default templates;
