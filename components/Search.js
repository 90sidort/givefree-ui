import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { resetIdCounter, useCombobox } from "downshift";
import debounce from "lodash.debounce";

import { GET_ITEMS_SEARCH } from "../graphql/items";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

export default function Search() {
  const router = useRouter();
  const [searchItems, { loading, data, error }] = useLazyQuery(
    GET_ITEMS_SEARCH,
    {
      fetchPolicy: "no-cache",
    }
  );
  // Debounce not working, send request on every input change anyway, FIX IT!
  const items = data?.items || [];
  const searchChill = debounce(searchItems, 400);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      searchChill({
        variables: {
          name: inputValue,
          description: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/item/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an item",
            id: "search",
            className: loading ? "loading" : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={index}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={
                  item.images.length > 0
                    ? item.images[0].url
                    : "http://localhost:4000/placeholder.jpg"
                }
                alt={
                  item.images.length > 0 ? item.images[0].alt : "placeholder"
                }
                width={50}
                height={50}
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && inputValue.length && (
          <DropDownItem>No results for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
