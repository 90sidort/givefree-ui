import styled from "styled-components";

export const Main = styled("div")`
  width: 20em;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: inline-grid;
  margin-left: 3em;
`;

export const DropDownHeader = styled("div")`
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropDownBody = styled("div")`
  padding: 5px;
  border-top: 1px solid #e5e8ec;
  display: none;
`;

export const DropDownBodyOpen = styled("div")`
  margin-top: 3.5em;
  padding: 5px;
  border-top: 1px solid #e5e8ec;
  background: white;
  display: block;
  position: absolute;
  width: 20em;
  z-index: 9999;
`;

export const DropDownItem = styled("div")`
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightGray;
  &:hover {
    cursor: pointer;
  }
`;
