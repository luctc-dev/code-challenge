# Notes
  - Improved Filtering Logic: The filtering logic now correctly checks balancePriority >= -99 and ensures that balance.amount > 0, refactor nested conditionals
  - Removed Unnecessary Dependency: The prices dependency was removed from useMemo since it is not used in the calculation of sortedBalances
  - Fixed Sorting Logic: Missing return the value zero, improve the code for more readable and shorter
  - Efficient Mapping: The formattedBalances array was removed, and formatting is done directly within the rows mapping to avoid unnecessary computations.
  - Unique Key Prop: Using index as a key is an anti-pattern. The key prop now uses a combination of currency and blockchain to ensure uniqueness and avoid issues with React's reconciliation.
  - Improved Type Safety: The blockchain parameter in getPriority is now typed as string, improving type safety and reducing the risk of runtime errors.
  - Removed Unnescessary Rerender: Move the getPriority method outside the component scope to prevent unnecessary re-renders when the rendering component changes.
  - Optimize Expensive Computations: Use useMemo to memoize row data, ensuring that the cached result is returned when the input dependencies remain unchanged.
  - Handling Floating-Point Precision: Vanilla JavaScript's floating-point precision issues make it unreliable for crypto calculations. Using decimal.js instead provides arbitrary-precision arithmetic, ensuring accurate and precise calculations.