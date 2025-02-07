export const sum_to_n_a = (n) => {
  if (n < 0) throw new Error('Input must be a non-negative integer')
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

export const sum_to_n_b = (n) => {
  if (n < 0) throw new Error('Input must be a non-negative integer')
  return (n * (n + 1)) / 2;
};

export const sum_to_n_c = (n) => {
  if (n < 0) throw new Error('Input must be a non-negative integer')
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
};