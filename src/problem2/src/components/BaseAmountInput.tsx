import React, { forwardRef } from "react";
import {
  NumericFormat,
  NumericFormatProps,
  NumberFormatValues,
} from "react-number-format";
import { type InputBaseProps } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Decimal from "decimal.js";

type CustomTarget = { name?: string; value: string; floatValue?: number };
type CustomProps = Omit<NumericFormatProps, "onChange"> & {
  value?: number;
  onChange?: (event: { target: CustomTarget }) => void;
  name?: string;
};
export type HTMLCustomNumericElement = HTMLInputElement & {
  name?: string;
  value: string;
  floatValue: number;
};

type BaseAmountInputProps = InputBaseProps & {
  value?: number;
  decimals?: number;
};

const DEFAULT_MAX_LIMIT = 1e10; // 10,000,000,000
const allowedDecimalSeparators = [","];
const isAllowed = (values: NumberFormatValues) => {
  const floatValue = values.floatValue || 0;
  return floatValue <= DEFAULT_MAX_LIMIT;
};

const CustomNumericFormat = forwardRef<HTMLCustomNumericElement, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, value, ...rest } = props;

    return (
      <NumericFormat
        {...rest}
        value={value}
        getInputRef={ref}
        onChange={(evt) => {
          const params = {
            ...evt,
            target: {
              ...evt.target,
              floatValue: evt.target.value
                ? new Decimal(evt.target.value).toNumber()
                : undefined,
            },
          };
          onChange?.(params);
        }}
        // onValueChange={({ floatValue, value }, { event = {} }) => {
        //   debugger
        //   const params = {
        //     ...event,
        //     target: {
        //       ...event.target,
        //       name: props.name,
        //       floatValue,
        //       value,
        //     },
        //   };
        //   onChange?.(params);
        // }}
        thousandSeparator
        valueIsNumericString
        allowedDecimalSeparators={allowedDecimalSeparators}
        isAllowed={isAllowed}
        inputMode="decimal"
      />
    );
  }
);

const BaseAmountInput = ({
  inputProps,
  decimals,
  ...restProps
}: BaseAmountInputProps) => {
  return (
    <InputBase
      inputComponent={CustomNumericFormat as any}
      placeholder="0"
      inputProps={{
        "aria-label": "0",
        className: "p-0! text-xl! text-white! font-semibold!",
        min: 0,
        ...(inputProps || {}),
        decimalScale: decimals,
        allowNegative: false,
        thousandSeparator: ",",
        inputMode: "decimal",
      }}
      {...restProps}
    />
  );
};

export default BaseAmountInput;
