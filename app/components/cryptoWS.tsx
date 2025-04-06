"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../lib/store";
import { wsClient } from "../lib/wsClient";

export default function CryptoPriceWS() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    wsClient.setDispatch(dispatch);
    wsClient.connectCrypto();
    return () => {
      wsClient.disconnect();
    };
  }, [dispatch]);

  return null;
}