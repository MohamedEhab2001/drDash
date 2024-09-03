// ServerHooks.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://ac2f-197-43-66-245.ngrok-free.app";

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
export const useContentHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/content`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
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
