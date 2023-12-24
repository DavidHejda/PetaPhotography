import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const useFetchData = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [data, setData] = useState([]);
  let response;
  const getPhotos = async () => {
    setIsLoading(true); // Start loading
    try {
      response = await axiosInstance.get(url);
      setData(response.data.records); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching landing photos:', error);
    }
    setIsLoading(false); // End loading
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return { data, isLoading };
};

export default useFetchData;
