import { useState, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import type { BankProduct } from "../contexts/DataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BankProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3333/");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  return <DataContext value={{ data, setData }}>{children}</DataContext>;
};
