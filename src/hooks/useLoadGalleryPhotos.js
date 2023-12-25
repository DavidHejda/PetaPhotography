import { useEffect, useState } from 'react';
import useFetchData from './useFetchData';
import useFlatPhotos from './useFlatPhotos';

const useLoadGalleryPhotos = () => {
  const [images, setImages] = useState({});
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  const { data: productData, isProductsLoading } = useFetchData({
    url: '/Produkty',
  });
  const { data: peopleData, isPeopleLoading } = useFetchData({
    url: '/Lide',
  });
  const { data: weddingData, isWeddingLoading } = useFetchData({
    url: '/Svatby',
  });

  const { flattenPhotos: productPhotos } = useFlatPhotos({ data: productData });
  const { flattenPhotos: peoplePhotos } = useFlatPhotos({ data: peopleData });
  const { flattenPhotos: weddingPhotos } = useFlatPhotos({ data: weddingData });

  // Prefetch and cache images
  const prefetchImages = (photos) => {
    photos.forEach((photoUrl) => {
      const img = new Image();
      img.src = photoUrl;
    });
  };

  useEffect(() => {
    if (!isProductsLoading && !isPeopleLoading && !isWeddingLoading) {
      prefetchImages([...productPhotos, ...peoplePhotos, ...weddingPhotos]);
      setImages({
        products: productPhotos || [],
        people: peoplePhotos || [],
        weddings: weddingPhotos || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isProductsLoading,
    isPeopleLoading,
    isWeddingLoading,
    productData,
    peopleData,
    weddingData,
  ]);

  if (isProductsLoading || isPeopleLoading || isWeddingLoading) {
    setIsGalleryLoading(true);
  }

  return { images, isGalleryLoading };
};

export default useLoadGalleryPhotos;
