import React, { useMemo } from "react";
import {
  Box,
  Select as SelectBase,
  MenuItem as MenuItemBase,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import * as tokenIcons from "../assets/tokens";
import { TokenUNKNOWN } from "../assets/tokens";
import { styled } from "@mui/material/styles";

export type TokenItem = {
  currency: string;
  date: string;
  price: number;
};

type Props = {
  tokens: TokenItem[];
  selectedToken?: TokenItem;
  exclude?: TokenItem;
  onChange: (evt: SelectChangeEvent<TokenItem | undefined>) => any;
};

const Select = styled(SelectBase<TokenItem | undefined>)(() => ({
  ".MuiSelect-select": {
    zIndex: 1,
    fontSize: 14,
    minHeight: 0,
    padding: "5px 16px",
  },
  "&": {
    color: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
    backgroundColor: "#1e2735",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  ".MuiSvgIcon-root": {
    zIndex: 1,
    width: "0.8em",
    height: "0.8em",
    color: "white",
  },
}));
const MenuItem = MenuItemBase<any>;

const getIcon = (currency: string) => {
  return tokenIcons[`Token${currency.toUpperCase()}`] || TokenUNKNOWN;
}

const SelectToken = ({
  tokens: tokensProps,
  selectedToken,
  onChange,
  exclude,
}: Props) => {
  const tokens = useMemo(() => {
    if (!exclude) return tokensProps;
    return tokensProps.filter((t) => t.currency !== exclude.currency);
  }, [tokensProps, exclude]);

  return (
    <Select
      label="Select token"
      value={selectedToken || ''} // To avoid the warning: `A component is changing the uncontrolled value state of Select to be controlled.`
      onChange={onChange}
      renderValue={(token) => {
        if (!token) return <p>Select token</p>;

        const currency = token.currency;
        const Icon = getIcon(currency)
        return (
          <Box className="flex gap-2 items-center">
            <Icon className="w-[1.3rem] h-[1.3rem]" /> <p>{currency}</p>
          </Box>
        );
      }}
      displayEmpty
    >
      {tokens.map((t) => {
        const Icon = getIcon(t.currency)
        return (
          <MenuItem key={`${t.currency}-${t.price}`} component="li" value={t} className="gap-2">
            <Icon className="w-[1.3rem] h-[1.3rem]" /> {t.currency}
          </MenuItem>
        );
      })}
      {tokens.length === 0 && <Typography className="text-center">Empty</Typography>}
    </Select>
  );
};

export default SelectToken;
