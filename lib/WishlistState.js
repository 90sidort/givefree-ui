import { useContext, createContext, useState } from "react";

const WishlistStateContext = createContext();
const WishlistProvider = WishlistStateContext.Provider;

function WishlistStateProvider({ children }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  function toggleWishlist() {
    setWishlistOpen(!wishlistOpen);
  }
  function openWishlist() {
    setWishlistOpen(true);
  }
  function closeWishlist() {
    setWishlistOpen(false);
  }
  return (
    <WishlistProvider
      value={{
        wishlistOpen,
        wishlistCount,
        toggleWishlist,
        openWishlist,
        closeWishlist,
        setWishlistCount,
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
