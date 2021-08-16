import ProptTypes from 'prop-types';
import Header from './Header';
import { GlobalStyles, InnerStyles } from './styles/GlobalStyles';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Layout.ProptTypes = {
  children: ProptTypes.any,
};
