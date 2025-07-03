import { useState } from "react";
import { ReqUrlContext } from "../contexts/ReqUrlContext";

import type { ReqUrlType } from "../type";

const initialReqUrl: ReqUrlType = {
  bank: "",
  rate: "",
  deposit: "",
};

export const ReqUrlProvider = ({ children }: { children: React.ReactNode }) => {
  const [reqUrlState, setReqUrlState] = useState(initialReqUrl);

  return (
    <ReqUrlContext.Provider value={{ reqUrlState, setReqUrlState }}>
      {children}
    </ReqUrlContext.Provider>
  );
};
