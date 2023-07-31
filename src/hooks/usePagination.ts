import { getAllcharactersData } from "./../api/get-characters";
import { useEffect, useState } from "react";

export const usePagination = (page: number) => {
  const [data, setData] = useState<any>([]);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    (async function getAllcharacters() {
      const { data } = await getAllcharactersData(page);
      if (data) {
        setData((prev: any[]): any[] => [
          ...new Set<any>([...prev, ...data.results]),
        ]);
        setMore(Boolean(data.info.next));
      } else {
        setError(true);
      }
      setLoading(false);
    })();
  }, [page]);

  return { data, more, loading, error };
};
