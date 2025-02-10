import Decimal from 'decimal.js';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added blockchain to WalletBalance
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Move out of the scope of WalletPage component
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority >= -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = new Decimal(balance.amount)
        .mul(prices[balance.currency]).toNumber()
      const formattedBalance: FormattedWalletBalance = {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
  
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`} // Use a unique key
          amount={formattedBalance.amount}
          usdValue={usdValue}
          formattedAmount={formattedBalance.formatted}
        />
      );
    })
  }, [sortedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};