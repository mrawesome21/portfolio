"use client";

import { ReactNode, useMemo } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import lowerCase from "lodash/lowerCase";
import startCase from "lodash/startCase";
import moment from "moment";

import ClassProfile from "@/components/Projects/ClassProfile";
import StockCard from "@/components/Projects/Finance/StockCard";
import useGetStockCompany from "@/hooks/useGetStockCompany";
import useGetStockQuote from "@/hooks/useGetStockQuote";
import { isNullish } from "@/utils/Common";
import { Company, Quote } from "@/utils/types";

const formatMarketCap = (marketCap: number): string => {
  // * nine zeroes for billions (B)
  if (marketCap >= 1.0e9) {
    return `${(marketCap / 1.0e9).toFixed(3)} B`;
  }
  // * six zeroes for millions (MM)
  if (marketCap >= 1.0e6) {
    return `${(marketCap / 1.0e6).toFixed(3)} MM`;
  }
  // * three zeroes for thousands (M)
  if (marketCap >= 1.0e3) {
    return `${(marketCap / 1.0e3).toFixed(3)} M`;
  }

  return marketCap.toString();
};

const getStockData = (segment: string | null) => {
  switch (segment) {
    case "advanced-investments":
      return { symbol: "RBLX", purchasePrice: 108.06 };
    case "hess":
      return { symbol: "HES", purchasePrice: 107.63 };
    case "murphy-usa":
      return { symbol: "MUSA", purchasePrice: 139.4 };
    default:
      return {
        symbol: "",
        purchasePrice: 0,
      };
  }
};

const getClassProfileData = (segment: string | null) => {
  switch (segment) {
    case "advanced-investments":
      return {
        heading: "[BUAD 427] Advanced Investments",
        dateString: "Fall 2021",
        description: `This course focuses on advanced topics relating to equity
                    and fixed-income investments. It covers various
                    sophisticated debt instruments such as corporate and
                    treasury bonds, mortgage-backed securities (MBS), commercial
                    mortage-backed securities (CMBS), agency MBS, asset-backed
                    securities (ABS), STRIPS, and floating rate notes (FRN).
                    Other financial instruments covered include Eurodollar
                    futures, credit spreads, mortgage loans, mortgage
                    pass-through securities, and interest rate swaps.`,
      };
    case "hess":
      return {
        heading: "[BUAD 421] Student Managed Investment Fund",
        dateString: "Spring 2022",
        description: `This course provides a hands-on experience with portfolio
                management and security analysis through the management of the
                Mason School Student Managed Investment Fund (SMIF). Students
                must select companies from an S&P stock universe, do research on
                their business model and competitive environment, make forecasts
                of future financial performance and conduct valuation analyses,
                write an investment report, and present an oral recommendation
                to colleagues and faculty for inclusion in a real endowment
                portfolio of common stocks.`,
      };
    case "murphy-usa":
      return {
        heading: "[BUAD 329] Corporate Valuation and Credit Analysis",
        dateString: "Spring 2021",
        description: `This course focuses on common methodologies for valuing
                    corporate entities used by professionals working in
                    investments, private equity, venture capital and investment
                    banking. It aims to familiarize students with various data
                    sources and software used in the financial industry.`,
      };
    default:
      return {
        heading: "",
        dateString: "",
        description: "",
      };
  }
};

type FinanceLayoutProps = {
  children: ReactNode;
};

const FinanceLayout = ({ children }: FinanceLayoutProps) => {
  const segment = useSelectedLayoutSegment();

  const { symbol, purchasePrice } = getStockData(segment);
  const { heading, dateString, description } = getClassProfileData(segment);

  const { data: quoteData, isLoading: isLoadingQuote, error: quoteError } = useGetStockQuote(symbol);
  const { data: companyData, isLoading: isLoadingCompany, error: companyError } = useGetStockCompany(symbol);

  const isLoading = isLoadingQuote || isLoadingCompany;
  const errors = [quoteError, companyError].filter((err) => !isNullish(err)) as Error[];

  const stockCardData = useMemo(() => {
    if (isLoading || errors.length || isNullish(quoteData) || isNullish(companyData)) {
      return {
        symbol,
        name: "",
        exchange: "",
        latestBusinessDay: "",
        price: 0,
        change: 0,
        changePct: 0,
        column1: {
          "Market Cap": "",
          "52 Week Range": "",
          "Dividend Yield": "",
        },
        column2: {
          Sector: "",
          Industry: "",
          "EPS (TTM)": "",
        },
      };
    }

    const { price, change, changePct, latestBusinessDay } = quoteData as Quote;
    const { name, exchange, sector, industry, marketCap, dividendYield, eps, high52Weeks, low52Weeks } =
      companyData as Company;

    return {
      symbol,
      name,
      exchange,
      latestBusinessDay: moment(latestBusinessDay).format("MMM Do, YYYY"),
      price,
      change,
      changePct,
      column1: {
        "Market Cap": formatMarketCap(marketCap),
        "52 Week Range": `${low52Weeks} - ${high52Weeks}`,
        "Dividend Yield": `${dividendYield.toFixed(2)}%`,
      },
      column2: {
        Sector: startCase(lowerCase(sector)),
        Industry: startCase(lowerCase(industry)),
        "EPS (TTM)": eps,
      },
    };
  }, [isLoading, errors.length, quoteData, companyData, symbol]);

  return (
    <main className="md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col items-center space-y-10 lg:space-y-14 mx-10 md:mx-auto">
      <ClassProfile heading={heading} dateString={dateString}>
        {description}
      </ClassProfile>
      <StockCard data={stockCardData} errors={errors} loading={isLoading} purchasePrice={purchasePrice} />
      {children}
    </main>
  );
};

export default FinanceLayout;
