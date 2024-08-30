// App.jsx
import React, { createContext, useContext } from "react";
import { useContentHook, useCategory, useProduct } from "./ServerHooks";
import Dashboard from "./Dashboard";

const ContentContext = createContext();
const CategoryContext = createContext();
const ProductContext = createContext();

const App = () => {
  const { data, loading, error } = useContentHook();
  const categoryContext = useCategory();
  const productData = useProduct();

  return (
    <ContentContext.Provider value={{ data, loading, error }}>
      <CategoryContext.Provider value={categoryContext}>
        <ProductContext.Provider value={productData}>
          <Dashboard />
        </ProductContext.Provider>
      </CategoryContext.Provider>
    </ContentContext.Provider>
  );
};

// Custom hooks to use contexts
export const useContentContext = () => useContext(ContentContext);
export const useCategoryContext = () => useContext(CategoryContext);
export const useProductContext = () => useContext(ProductContext);

export default App;
