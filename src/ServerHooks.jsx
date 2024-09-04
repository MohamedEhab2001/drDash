// ServerHooks.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://dr.daimooma.com";
//const baseUrl = "http://localhost:7000";

export const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      await axios.post(`${baseUrl}/products`, product);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`${baseUrl}/products/${id}`, updatedProduct);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/categories`);
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (category) => {
    try {
      const response = await axios.post(`${baseUrl}/categories`, category);
      setCategories([...categories, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await axios.put(
        `${baseUrl}/categories/${id}`,
        updatedCategory
      );
      setCategories(
        categories.map((cat) => (cat.id === id ? response.data : cat))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${baseUrl}/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

// Hook to fetch content data
export const useDaystHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/days`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addDay = async (day, hours) => {
    try {
      const response = await axios.post(`${baseUrl}/days`, { day, hours });
      setData((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const deleteDay = async (id) => {
    try {
      await axios.delete(`${baseUrl}/days/${id}`);
      setData((prevData) => prevData.filter((day) => day.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  const updateDay = async (id, updatedDay) => {
    try {
      const response = await axios.put(`${baseUrl}/days/${id}`, updatedDay);
      setData((prevData) =>
        prevData.map((day) => (day.id === id ? response.data : day))
      );
    } catch (err) {
      setError(err);
    }
  };

  return { data, loading, error, addDay, deleteDay, updateDay };
};

// Hook to update content data
export const useContentUpdate = () => {
  const updateContent = async (data, updatedContent) => {
    try {
      const response = await axios.put(`${baseUrl}/content`, {
        ...data,
        ...updatedContent,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update content");
    }
  };

  return { updateContent };
};

// Hook to fetch content data
export const useUsagetHook = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/usage`);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
