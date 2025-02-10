/// <reference types="vite-plugin-svgr/client" />
import React, { ChangeEvent, useCallback } from "react";
import {
  Box,
  Button,
  SelectChangeEvent,
  Typography,
  CircularProgress,
} from "@mui/material";
import BaseAmountInput, {
  HTMLCustomNumericElement,
} from "./components/BaseAmountInput";
import { useEffect, useState } from "react";
import SelectToken, { TokenItem } from "./components/SelectToken";
import { calculateAmountIn, calculateAmountOut } from "./App.helpers";
import Decimal from "decimal.js";

function App() {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [tokenIn, setTokenIn] = useState<TokenItem>();
  const [tokenOut, setTokenOut] = useState<TokenItem>();
  const [amountIn, setAmountIn] = useState<number>();
  const [amountOut, setAmountOut] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data: TokenItem[]) => {
        const uniqueCurrency = data.filter(
          (t, idx) =>
            data.findIndex((item) => t.currency === item.currency) === idx
        );
        const defaultTokenOut = uniqueCurrency.find(
          (t: TokenItem) => t.currency === "USD"
        );
        setTokens(uniqueCurrency);
        setTokenOut(defaultTokenOut);
      });
  }, []);

  const handleAmountInChange = useCallback(
    (evt: ChangeEvent<HTMLCustomNumericElement>) => {
      debugger;
      const newAmountIn = evt.target.floatValue;
      setAmountIn(newAmountIn);
      setAmountOut(
        calculateAmountOut(newAmountIn, tokenIn, tokenOut)?.toNumber()
      );
    },
    [tokenIn, tokenOut]
  );

  const handleAmountOutChange = useCallback(
    (evt: ChangeEvent<HTMLCustomNumericElement>) => {
      const newAmountOut = evt.target.floatValue;
      setAmountOut(newAmountOut);
      setAmountIn(
        calculateAmountIn(newAmountOut, tokenIn, tokenOut)?.toNumber()
      );
    },
    [tokenIn, tokenOut]
  );

  const handleTokenInChange = useCallback(
    (evt: SelectChangeEvent<TokenItem | undefined>) => {
      const newTokenIn = evt.target.value;
      debugger;
      if (typeof newTokenIn !== "string") {
        setTokenIn(newTokenIn);
        amountIn &&
          setAmountOut(
            calculateAmountOut(amountIn, newTokenIn, tokenOut)?.toNumber()
          );
      }
    },
    [amountIn, tokenOut]
  );

  const handleTokenOutChange = useCallback(
    (evt: SelectChangeEvent<TokenItem | undefined>) => {
      const newTokenOut = evt.target.value;
      if (typeof newTokenOut !== "string") {
        setTokenOut(newTokenOut);
        amountIn &&
          setAmountOut(
            calculateAmountOut(amountIn, tokenIn, newTokenOut)?.toNumber()
          );
      }
    },
    [amountIn, tokenIn]
  );

  const handleSubmit = useCallback(() => {
    if (tokenIn && tokenOut) {
      setLoading(true);

      setTimeout(() => {
        const rate = new Decimal(tokenIn.price).div(tokenOut.price).toNumber();
        alert(
          `Swap successfully from ${tokenIn.currency} to ${tokenOut.currency} with rate ${rate}`
        );
        setLoading(false)
        setAmountIn(0)
        setAmountOut(0)
        setTokenIn(undefined)
      }, 1000);
    }
  }, [tokenIn, tokenOut]);

  return (
    <Box className="min-h-dvh flex justify-center items-center">
      <div className="p-2 md:p-4 rounded-[16px] md:rounded-[24px] bg-[#1E2735] w-[488px] max-w-full flex flex-col gap-2">
        <Typography className="text-white">Swap</Typography>
        <Box className="w-full bg-[#141A23] rounded-2xl pt-4 px-6 pb-7">
          <Typography className="text-white opacity-40 mb-0.5!">
            Amount to send
          </Typography>
          <Box className="flex items-center justify-between">
            <BaseAmountInput
              value={amountIn}
              onChange={handleAmountInChange}
              name="amountIn"
              decimals={9}
            />
            <SelectToken
              tokens={tokens}
              selectedToken={tokenIn}
              onChange={handleTokenInChange}
              exclude={tokenOut}
              key={String(!!tokenOut)}
            />
          </Box>
        </Box>
        <Box className="w-full bg-[#141A23] rounded-2xl pt-4 px-6 pb-7">
          <Typography className="text-white opacity-40">
            Amount to receive
          </Typography>
          <Box className="flex items-center justify-between">
            <BaseAmountInput
              value={amountOut}
              onChange={handleAmountOutChange}
              name="amountOut"
              decimals={9}
            />
            <SelectToken
              tokens={tokens}
              selectedToken={tokenOut}
              onChange={handleTokenOutChange}
              exclude={tokenIn}
              key={String(!!tokenOut)}
            />
          </Box>
        </Box>
        <Box className="flex justify-between">
          {tokenIn && tokenIn.currency !== "USD" && (
            <Typography className="text-[#9ca3ae] text-xs!">
              1 {tokenIn.currency} ~{" "}
              <strong className="text-white">{tokenIn.price}</strong> USD
            </Typography>
          )}
          {tokenOut && tokenOut.currency !== "USD" && (
            <Typography className="text-[#9ca3ae] text-xs!">
              1 {tokenOut.currency} ~{" "}
              <strong className="text-white">{tokenOut.price}</strong> USD
            </Typography>
          )}
        </Box>
        <Button
          disabled={!tokenIn || !tokenIn || !amountIn || !amountOut}
          onClick={handleSubmit}
          loading={loading}
          startIcon={loading && <CircularProgress size={14} />}
          className="relative normal-case! text-base! rounded-2xl! bg-[#141a23]! hover:bg-[#2E3846]! text-[#C2CBD9]! p-[12px]! disabled:opacity-40"
        >
          Confirm swap
        </Button>
      </div>
    </Box>
  );
}

export default App;
