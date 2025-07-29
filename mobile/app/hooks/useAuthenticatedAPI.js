import { useState } from 'react';
import apiClient from '../../config/apiClient';

export const useAuthenticatedAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await apiClient.get(endpoint);
          break;
        case 'post':
          response = await apiClient.post(endpoint, data);
          break;
        case 'put':
          response = await apiClient.put(endpoint, data);
          break;
        case 'delete':
          response = await apiClient.delete(endpoint);
          break;
        default:
          throw new Error('Unsupported HTTP method');
      }
      
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  return {
    loading,
    error,
    makeRequest,
    get: (endpoint) => makeRequest('get', endpoint),
    post: (endpoint, data) => makeRequest('post', endpoint, data),
    put: (endpoint, data) => makeRequest('put', endpoint, data),
    delete: (endpoint) => makeRequest('delete', endpoint),
  };
};

export default useAuthenticatedAPI;
