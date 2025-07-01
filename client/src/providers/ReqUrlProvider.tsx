import { useState } from "react";
import type { ReqUrlType } from "../contexts/ReqUrlContext";
import { ReqUrlContext } from "../contexts/ReqUrlContext";

const initialReqUrl: ReqUrlType = {
  companyCode: "",
  interestRate: "",
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
