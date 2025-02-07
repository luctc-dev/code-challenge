import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution"

test('should throw new Error if the input less than zero', () => {
  expect(() => sum_to_n_a(-10)).toThrow('Input must be a non-negative integer');
  expect(() => sum_to_n_b(-10)).toThrow(new Error('Input must be a non-negative integer'));
  expect(() => sum_to_n_c(-10)).toThrow(new Error('Input must be a non-negative integer'));
});

test('should return 0 for n = 0', () => {
  expect(sum_to_n_a(0)).toBe(0)
  expect(sum_to_n_b(0)).toBe(0)
  expect(sum_to_n_c(0)).toBe(0)
})

test('should return correct result sum to n', () => {
  expect(sum_to_n_a(5)).toBe(15)
  expect(sum_to_n_b(5)).toBe(15)
  expect(sum_to_n_c(5)).toBe(15)

  expect(sum_to_n_a(1000)).toBe(500500)
  expect(sum_to_n_b(1000)).toBe(500500)
  expect(sum_to_n_c(1000)).toBe(500500)
})