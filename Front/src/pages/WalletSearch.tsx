import React, { useState } from "react";
import Header from "../components/common/Header";
import SearchForm from "../components/wallet/SearchForm";
import { searchResultTradeList } from "../store/wallet/atoms";
import { useRecoilValue } from "recoil";
import TotalTradeList from "../components/wallet/TotalTradeList";
import BottomNav from "../components/common/BottomNav";

const WalletSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handdleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    console.log(searchKeyword);
  };
  const resetSearchKeyword = () => {
    setSearchKeyword("");
  };

  const tradeResultList = useRecoilValue(searchResultTradeList);

  return (
    <div>
      <Header pageTitle="거래내역 검색" />
      <div className="mx-8">
        <SearchForm
          searchKeyword={searchKeyword}
          onChange={handdleSearchKeyword}
          resetKeyword={resetSearchKeyword}
          className={"m-5"}
        />
        <TotalTradeList tradeList={tradeResultList} />
      </div>
      <BottomNav />
    </div>
  );
};

export default WalletSearch;
