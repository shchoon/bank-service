import { createContext } from "react";

import type { ReqUrlType } from "../type";

type ReqUrlContextType = {
  reqUrlState: ReqUrlType;
  setReqUrlState: React.Dispatch<React.SetStateAction<ReqUrlType>>;
};

export const ReqUrlContext = createContext<ReqUrlContextType | null>(null);
