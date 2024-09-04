// App.jsx
import React, { createContext, useContext } from "react";
import { useDaystHook, useCategory, useProduct } from "./ServerHooks";
import Dashboard from "./Dashboard";

const DaysContext = createContext();
const CategoryContext = createContext();
const ProductContext = createContext();

const App = () => {
  const DaysContextData = useDaystHook();
  const categoryContext = useCategory();
  const productData = useProduct();

  return (
    <DaysContext.Provider value={DaysContextData}>
      <CategoryContext.Provider value={categoryContext}>
        <ProductContext.Provider value={productData}>
          <Dashboard />
        </ProductContext.Provider>
      </CategoryContext.Provider>
    </DaysContext.Provider>
  );
};

// Custom hooks to use contexts
export const useDaysContext = () => useContext(DaysContext);
export const useCategoryContext = () => useContext(CategoryContext);
export const useProductContext = () => useContext(ProductContext);

export default App;
