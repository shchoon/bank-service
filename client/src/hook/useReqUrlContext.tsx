import { useContext } from "react";
import { ReqUrlContext } from "../contexts/ReqUrlContext";

export const useReqUrlContext = () => {
  const context = useContext(ReqUrlContext);
  if (!context)
    throw new Error("ReqUrlContext must be used within ReqUrlProvider");
  return context;
};
