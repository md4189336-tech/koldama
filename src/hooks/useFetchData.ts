import { useState, useEffect } from 'react';
import { mockData } from '@/lib/mockData';

type DataType = keyof typeof mockData;

export const useFetchData = <T extends DataType>(dataType: T) => {
  const [data, setData] = useState<typeof mockData[T] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        // Simulate network latency
        setTimeout(() => {
          setData(mockData[dataType]);
          setLoading(false);
        }, 500);
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
