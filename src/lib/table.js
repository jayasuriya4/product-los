import { set } from 'lodash';

export function extractFilters(filters) {
  return filters.reduce((acc, { id, value }) => {
    if (value !== '-1') {
      set(acc, id, value);
    }
    return acc;
  }, {});
}

export function extractSorts(filters) {
  return filters.reduce((acc, { id, desc }) => {
    acc.push([id, desc ? 'DESC' : 'ASC']);
    return acc;
  }, []);
}

export function getSortsFilters(table) {
  const filters = JSON.stringify(extractFilters(table.filtered));
  const sorts = JSON.stringify(extractSorts(table.sorted));
  return [filters, sorts];
}

export function getNewSortsFilters(table) {
  const filters = (extractFilters(table.filtered));
  const sorts = JSON.stringify(extractSorts(table.sorted));
  return [filters, sorts];
}
