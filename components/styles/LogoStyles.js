import styled from 'styled-components';

const LogoStyles = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-6deg);
  background: IndianRed;
  a {
    color: MintCream;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  a:hover {
    text-decoration: none;
  }
`;

export default LogoStyles;
