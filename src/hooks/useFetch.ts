"use client";
import { useState, useEffect } from "react";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

export interface productCategoryParams {
  data: [
    {
      product: {
        _id: string;
        prescription: boolean;
        name: string;
        coverimage: string;
        price: Number;
      };
      _id: string;
      category: string;
    },
  ];
}

interface FetchState<productCategoryParams> {
  data: productCategoryParams | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T = unknown>(
  fetchFunction: (session: Session) => Promise<productCategoryParams>,
): FetchState<productCategoryParams> {
  const { data: session } = useSession();
  const [data, setData] = useState<productCategoryParams | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseData = await fetchFunction(session!);
        setData(responseData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;
