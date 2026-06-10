import { SchemaItem } from '../../types.ts';

/**
 * modifies the priority of the items passed in
 * such that the item with the id passed in has the highest priority
 * while preserving the order of the other items and their relative priorities.
 *
 * @param id - the id of the item to prioritize
 * @param items - loose subset of the items in the aggregator
 * @returns void - the items are modified in place
 */
export const prioritize = (id: SchemaItem['id'], items: SchemaItem[]) => {
  const itemToPrioritize = items.find((item) => item.id === id);
  if (!itemToPrioritize) return;

  const priorities = items.map((item) => item.priority);
  const [max, min] = [Math.max(...priorities), Math.min(...priorities)];
  const range = max - min;
  itemToPrioritize.priority = max;

  items.sort((a, b) => a.priority - b.priority);

  const increment = Number((range / items.length).toFixed(2));
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) continue;
    items[i].priority = min + increment * i;
  }
};

/**
 * a helper that, when given the aggregator, will specifically prioritize a node
 *
 * @param id - the id of the node to prioritize
 * @param items - the aggregator array
 * @returns void - the items are modified in place
 */
export const prioritizeNode = (id: SchemaItem['id'], items: SchemaItem[]) => {
  const nodeSchemas = items.filter((item) => item.graphType === 'node');
  prioritize(id, nodeSchemas);
};
