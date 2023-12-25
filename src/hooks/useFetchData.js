import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const cache = {};

const useFetchData = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (cache[url]) {
        setData(cache[url]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);
        cache[url] = response.data.records;
        setData(response.data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useFetchData;
