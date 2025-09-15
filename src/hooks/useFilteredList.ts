type FilterFn<T> = (item: T) => boolean;

interface UseFilteredListArgs<T> {
  list: T[];
  search?: string;
  searchKey?: keyof T;
  filters?: Array<FilterFn<T>>;
}

export function useFilteredList<T>({
  list,
  search,
  searchKey,
  filters = [],
}: UseFilteredListArgs<T>): T[] {
  return list.filter((item) => {
    let matches = true;
    if (search && searchKey) {
      const value = String(item[searchKey] ?? "").toLowerCase();
      matches = value.includes(search.toLowerCase());
    }
    if (matches && filters.length > 0) {
      matches = filters.every((fn) => fn(item));
    }
    return matches;
  });
}
