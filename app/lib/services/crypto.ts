import axios from "axios";

export const fetchCrypto = async (id: string) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false`
    );
    return res.data;
  };