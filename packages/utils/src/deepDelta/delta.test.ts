import { expect, test } from 'vitest';

import { delta } from '.';

test('deepDelta standard', () => {
  const yona = {
    name: 'yona',
    sex: 'm',
    residence: 'amherst',
    school: {
      name: 'umass',
      year: 'senior',
      info: {
        major: ['cs'],
        minor: [],
        start: '2023',
      },
    },
    test: {
      hello: 'world',
      removeMe: {
        removeMe: 'removeMe',
        removeMe2: {},
      },
      test2: {
        test3: 'secret',
      },
    },
  };

  const dila = {
    name: 'dila',
    sex: 'f',
    residence: 'amherst',
    school: {
      name: 'umass',
      year: 'junior',
      info: {
        major: ['cs', 'japanese'],
        minor: [],
        start: '2022',
      },
    },
    test: {
      hello: 'world',
      removeMe: {
        removeMe: 'removeMe',
        removeMe2: {},
      },
      test2: {
        test3: 'secret changed',
      },
    },
  };

  const expected = {
    name: 'dila',
    sex: 'f',
    school: {
      year: 'junior',
      info: {
        major: ['cs', 'japanese'],
        start: '2022',
      },
    },
    test: {
      test2: {
        test3: 'secret changed',
      },
    },
  };

  const result = delta(yona, dila);
  expect(result).toEqual(expected);
});

test('deepDelta works if new object has more keys', () => {
  const yona = {
    name: 'yona',
  };

  const dila = {
    name: 'dila',
    favoriteColor: 'blue',
    anime: {
      naruto: 'meh',
      bleach: 'good',
    },
  };

  const expected = {
    name: 'dila',
    favoriteColor: 'blue',
    anime: {
      naruto: 'meh',
      bleach: 'good',
    },
  };

  const result = delta(yona, dila);

  expect(result).toEqual(expected);
});

test('deepDelta works on fields that are null or undefined', () => {
  const colorGetter = () => 'blue';

  const yona = {
    name: 'yona',
    favoriteColor: {
      color: colorGetter,
    },
    sbahn: 's1',
  };

  const dila = {
    name: 'dila',
    favoriteColor: null,
    sbahn: undefined,
  };

  const expected = {
    name: 'dila',
    sbahn: undefined,
  };

  const result = delta(yona, dila);
  expect(result).toEqual(expected);
});
