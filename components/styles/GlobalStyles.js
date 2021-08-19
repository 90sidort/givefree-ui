import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
}
html {
    --red: #881512;
    --black: #393939;
    --gray: #3A3A3A;
    --lightGray: #e1e1e1;
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
}
*,*:before, #:after {
    box-sizing: inherit;
}
body {
    font-family: 'radnika_next', --apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
}
a {
    text-decoration: none,
    color: var(--black)
}
a:hover {
    text-decoration: underline;
}
button {
    font-family: 'radnika_next', --apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
}
`;

export const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;
