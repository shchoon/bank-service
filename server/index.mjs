import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/bank_product", async (req, res) => {
  const { companyCode, primeInterestRate, deposit } = req.query;
  try {
    let { data: bank_product, error } = await supabase
      .from("bank_product")
      .select("*");

    let data = bank_product.sort(
      (a, b) => Number(b.interestRate) - Number(a.interestRate)
    );
    let result;
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (companyCode) {
      let dupData = result ? [...result] : [...data];
      let companyCodes = Array.isArray(companyCode)
        ? companyCode
        : [companyCode];
      result = dupData.filter((item) =>
        companyCodes.includes(item.companyCode)
      );
    }

    if (primeInterestRate) {
      let dupData = result ? [...result] : [...data];
      result = dupData.sort(
        (a, b) => Number(b.primeInterestRate) - Number(a.primeInterestRate)
      );
    }

    if (deposit) {
      let dupData = result ? [...result] : [...data];
      result = dupData.filter((item) => item.depositAmount <= Number(deposit));
    }

    res.json(result ?? data);
  } catch (err) {
    res.status(500).json({ error: "서버 내부 오류" });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});
