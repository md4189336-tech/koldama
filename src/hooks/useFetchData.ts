import { useState, useEffect } from 'react';
import { mockData } from '@/lib/mockData';

type DataType = keyof typeof mockData;

// Simple in-memory cache for performance optimization
const dataCache = new Map<DataType, typeof mockData[DataType]>();

export const useFetchData = <T extends DataType>(dataType: T) => {
  const [data, setData] = useState<typeof mockData[T] | null>(() => {
    // Check cache first for instant loading
    return (dataCache.get(dataType) as typeof mockData[T]) || null;
  });
  const [loading, setLoading] = useState(!dataCache.has(dataType));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Return early if data is already cached
    if (dataCache.has(dataType)) {
      setData(dataCache.get(dataType) as typeof mockData[T]);
      setLoading(false);
      return;
    }

    const fetchData = () => {
      try {
        setLoading(true);
        // Simulate minimal network latency (reduced from 500ms to 100ms)
        setTimeout(() => {
          const fetchedData = mockData[dataType];
          dataCache.set(dataType, fetchedData);
          setData(fetchedData);
          setLoading(false);
        }, 100);
      } catch (err) {
        console.error("Erreur de chargement des données", err);
        setError("Impossible de charger les données. Vérifiez la connexion.");
        setLoading(false);
      }
    };
    fetchData();
  }, [dataType]);

  return { data, loading, error };
};
