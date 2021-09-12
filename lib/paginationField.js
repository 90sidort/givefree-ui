import { COUNT_ITEMS } from "../graphql/items";

export default function PaginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const {
        input: { skip, first, view },
      } = args;
      const data = cache.readQuery({
        query: COUNT_ITEMS,
        variables: {
          input: {
            view,
          },
        },
      });
      const count = data?.countItems;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages)
        return items;
      if (items.length !== first) return false;
      if (items.length) return items;
      return false;
    },
    merge(existing, incoming, { args }) {
      const {
        input: { skip, first },
      } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
