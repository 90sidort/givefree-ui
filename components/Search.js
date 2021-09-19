import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { resetIdCounter, useCombobox } from "downshift";

import { GET_ITEMS_SEARCH } from "../graphql/items";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Search() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState(null);
  const router = useRouter();
  const [searchItems, { loading, data, error }] = useLazyQuery(
    GET_ITEMS_SEARCH,
    {
      fetchPolicy: "no-cache",
      onError: () => setShowModal(true),
    }
  );
  useEffect(() => {
    if (input?.length >= 3) {
      const timer = setTimeout(() => {
        searchItems({
          variables: {
            input: {
              name: input,
            },
          },
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [input]);
  const items = data?.items || [];

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
    onInputValueChange(props) {
      setInput(props.inputValue);
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/item/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });
  return (
    <>
      <Modal
        show={showModal}
        title="Error!"
        onClose={() => setShowModal(false)}
      >
        {`${error?.message}`}
      </Modal>
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
          {isOpen && !items.length && !loading && inputValue.length >= 3 && (
            <DropDownItem>No results for {inputValue}</DropDownItem>
          )}
          {isOpen && !loading && inputValue.length < 3 && (
            <DropDownItem>Needs at least three characters</DropDownItem>
          )}
        </DropDown>
      </SearchStyles>
    </>
  );
}
