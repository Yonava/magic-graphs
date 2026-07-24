import { Color } from '@core/utils/colors';
import { Themer } from '@graph/create-graph/createThemer';
import { ThemeValue } from '@graph/plugins-shared/theme';

type Identified = { id: string };

/**
 * a themer that paints one fixed color onto a mutable set of ids. the element
 * it paints is whatever `T` is, so nodes and edges share this whole mechanism
 * and differ only in which tokens their themer factory writes to
 */
export type IdThemer<T extends Identified> = {
  themer: Themer;
  setId: (id: T['id'] | undefined) => void;
  setIds: (ids: readonly T['id'][]) => void;
  clearIds: () => void;
};

export const createIdThemer = <T extends Identified>(
  createThemer: (color: ThemeValue<Color, [T]>) => Themer,
  color: Color,
  initialIds?: readonly T['id'][],
): IdThemer<T> => {
  const ids: Set<T['id']> = new Set(initialIds);

  const themer = createThemer((el) => (ids.has(el.id) ? color : undefined));

  const clearIds: IdThemer<T>['clearIds'] = () => {
    ids.clear();
  };

  const setIds: IdThemer<T>['setIds'] = (newIds) => {
    clearIds();
    for (const id of newIds) ids.add(id);
  };

  const setId: IdThemer<T>['setId'] = (id) => (id ? setIds([id]) : clearIds());

  return {
    themer,
    setId,
    setIds,
    clearIds,
  };
};
