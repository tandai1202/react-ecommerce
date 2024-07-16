import { BasketProvider } from './context/basketContext';
import { CategoryProvider } from './context/categoryContext';
import { FilterProvider } from './context/filterContext';
import { ProductProvider } from './context/productContext';
import PropTypes from 'prop-types';
import { SearchProvider } from './context/searchContext';
import { AuthProvider } from './context/authContext';

const combineProviders = (providers) => providers.reduce((AccumulatedComponents, CurrentComponent) => {
  const CombinedProvider = ({ children }) => (
    <AccumulatedComponents>
      <CurrentComponent>
        {children}
      </CurrentComponent>
    </AccumulatedComponents>
  );

  CombinedProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return CombinedProvider;
});

export const AllProviders = combineProviders([ProductProvider, FilterProvider, CategoryProvider, BasketProvider, SearchProvider, AuthProvider]);