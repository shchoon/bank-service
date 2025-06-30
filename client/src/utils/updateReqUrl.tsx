import type { ReqUrlType } from "../hook/useReqUrlContext";

// 오버로드
export default function updateReqUrl(isRefresh: true): {
  updatedReqUrl: ReqUrlType;
  reqUrl: string;
};
export default function updateReqUrl(
  prev: ReqUrlType,
  key: keyof ReqUrlType,
  query: string
): { updatedReqUrl: ReqUrlType; reqUrl: string };

export default function updateReqUrl(
  refreshOrPrev: ReqUrlType | true,
  key?: keyof ReqUrlType,
  query?: string
) {
  let reqUrl = "";
  let updatedReqUrl: ReqUrlType;
  if (refreshOrPrev === true) {
    // 초기화
    updatedReqUrl = { companyCode: "", interestRate: "", deposit: "" };

    return { updatedReqUrl, reqUrl };
  }
  if (key !== undefined && query !== undefined) {
    const prev = refreshOrPrev;
    updatedReqUrl = { ...prev, [key]: query };

    for (const k in updatedReqUrl) {
      reqUrl += updatedReqUrl[k as keyof ReqUrlType];
    }

    return { updatedReqUrl, reqUrl };
  }
}
