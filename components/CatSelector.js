// This will be used in the future to add feature filter by category

// import React, { useState } from "react";
// import {
//   Main,
//   DropDownHeader,
//   DropDownBody,
//   DropDownBodyOpen,
//   DropDownItem
// } from "./styles/CatSelectorStyles";
//
// export default function CatSelector({ changeCat }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const categoryChanger = cat => changeCat(cat);
//   const toggling = () => setIsOpen(!isOpen);
//   console.log(isOpen);
//   return (
//     <Main>
//       <DropDownHeader onClick={toggling}>All</DropDownHeader>
//       {!isOpen && <DropDownBody />}
//       {isOpen && (
//         <DropDownBodyOpen>
//           <DropDownItem onClick={() => changeCat("COAT")}>COAT</DropDownItem>
//           <DropDownItem onClick={() => changeCat("DRESS")}>DRESS</DropDownItem>
//           <DropDownItem>Oranges</DropDownItem>
//         </DropDownBodyOpen>
//       )}
//     </Main>
//   );
// }
