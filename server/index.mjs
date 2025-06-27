import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // 파일의 전체 경로
const __dirname = path.dirname(__filename); // 현재 파일이 위치함 폴더 경로

const server = http.createServer(async (req, res) => {
  // CORS 헤더 추가
  res.setHeader("Access-Control-Allow-Origin", "*"); // 또는 특정 origin: "http://localhost:3000"
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight 요청 (OPTIONS) 처리
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // if (req.method === "HEAD" || req.method === "GET") {
  //   if (req.url === "/") {
  //     res.writeHead(200, { "Content-Type": "text/plain" });
  //     res.end("OK");
  //     return;
  //   }
  // }

  if (req.method === "GET") {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // 전체 요청 url 구성
    const pathname = parsedUrl.pathname; // 쿼리를 제외한 경로만 추출 ex) /all
    const searchParams = parsedUrl.searchParams; //

    const companyCode = searchParams.getAll("companyCode"); // 은행명
    const maxDeposit = searchParams.get("maxDeposit"); // 예치금 최대 금액
    const primeInterestRate = searchParams.get("primeInterestRate"); // 최대금리 제한

    const files = await fs.readdir(path.join(__dirname, "data")); // data 폴더의 모든 파일 가져오기
    const jsonFiles = files.filter((file) => file.endsWith(".json")); // data 내의 모든 파일이 json 인지 확인

    // 모든 데이터를 요청할 때, 기본금리 높은 순으로 응답
    if (pathname === "/") {
      try {
        const allData = await Promise.all(
          jsonFiles.map(async (file) => {
            const content = await fs.readFile(
              path.join(__dirname, "data", file)
            );
            return JSON.parse(content);
          })
        );

        let flattened;

<<<<<<< HEAD
=======
        // companyCode 쿼리 처리
>>>>>>> 3c2d97fb911ea30df2ec382e40951b6a779f219b
        if (companyCode.length > 0) {
          flattened = allData
            .filter((data) => companyCode.includes(data[0].companyCode))
            .flat();
        } else {
          flattened = allData.flat();
        }

        flattened.sort(
          (a, b) => Number(b.interestRate) - Number(a.interestRate)
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(flattened));
<<<<<<< HEAD
=======
        return;
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
    }

    // 최고금리순
    if (pathname === "/primeInterestRate") {
      try {
        const allData = await Promise.all(
          jsonFiles.map(async (file) => {
            const content = await fs.readFile(
              path.join(__dirname, "data", file)
            );
            return JSON.parse(content);
          })
        );

        let flattened = allData.flat();

        let result = flattened.sort(
          (a, b) => b.primeInterestRate - a.primeInterestRate
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
        return;
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
    }

    // 최대 예금 금액
    if (pathname === "/depositAmount") {
      try {
        const allData = await Promise.all(
          jsonFiles.map(async (file) => {
            const content = await fs.readFile(
              path.join(__dirname, "data", file)
            );
            return JSON.parse(content);
          })
        );

        let flattened = allData
          .flat()
          .sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
        let result;
        if (maxDeposit) {
          result = flattened.filter(
            (data) => data.depositAmount <= Number(maxDeposit)
          );
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
>>>>>>> 3c2d97fb911ea30df2ec382e40951b6a779f219b
        return;
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
    }

    // try {
    //   const data = await fs.readFile(
    //     path.join(
    //       __dirname,
    //       "data",
    //       req.url.toLocaleUpperCase().replace(/\/$/, "") + ".json"
    //     ),
    //     "utf-8"
    //   );
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(data);
    //   return;
    // } catch {}
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(3333, () => {
  console.log("Server running at http://localhost:3333");
  console.log("example: http://localhost:3333/hbj");
  console.log("example: http://localhost:3333/da");
});
