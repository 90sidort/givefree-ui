import { useContext, createContext, useState } from "react";

const WishlistStateContext = createContext();
const WishlistProvider = WishlistStateContext.Provider;

function WishlistStateProvider({ children }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wisherlistOpen, setWisherlistOpen] = useState(false);
  const [wisherlistCount, setWisherlistCount] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  function toggleWishlist() {
    setWishlistOpen(!wishlistOpen);
  }
  function openWishlist() {
    setWishlistOpen(true);
  }
  function closeWishlist() {
    setWishlistOpen(false);
  }
  function toggleWisherlist() {
    setWisherlistOpen(!wisherlistOpen);
  }
  function openWisherlist(id) {
    setCurrentItem(id);
    setWisherlistOpen(true);
  }
  function closeWisherlist() {
    setWisherlistOpen(false);
  }
  return (
    <WishlistProvider
      value={{
        wishlistOpen,
        wisherlistOpen,
        wishlistCount,
        wisherlistCount,
        currentItem,
        toggleWishlist,
        toggleWisherlist,
        openWishlist,
        openWisherlist,
        closeWishlist,
        closeWisherlist,
        setWishlistCount,
        setWisherlistCount,
      }}
    >
      {children}
    </WishlistProvider>
  );
}

function useWishlist() {
  const all = useContext(WishlistStateContext);
  return all;
}

export { WishlistStateProvider, useWishlist };
