# 99Tech Code Challenge #

# Problem1
  - Setup a basic structure with Babel and Jest to test the solution

# Problem2 (Fancy Form)
  - This Fancy Form App is designed to allow users to swap between two tokens while ensuring accurate calculations between four key values: amountIn, and amountOut, tokenIn, tokenOut. Below is a detailed breakdown of the application's technical aspects and implementation choices.

  - Vite is chosen for its fast build times and better DX (Developer Experience).
  
  - React helps manage UI efficiently, while TypeScript ensures type safety, reducing runtime errors.

  - Style and UI Component with MUI Material UI and TailwindCSS. Provides utility-first styling, making UI development faster and more consistent.

  - Key Features: Token Swap Functionality, Automatic Recalculation, User-friendly UI with dropdown selections for tokens, input fields for amounts

  - Handling Floating-Point Precision with decimal.js: JavaScript’s built-in Number type suffers from precision issues when performing floating-point arithmetic. For example, adding 0.1 + 0.2 results in 0.30000000000000004 instead of the expected 0.3. When calculating exchange rates or converting between tokens, these small inaccuracies can accumulate, leading to incorrect results. By using decimal.js, the swap logic maintains precise and reliable calculations.

# Problem3

  - Improved Filtering Logic: The filtering logic now correctly checks balancePriority >= -99 and ensures that balance.amount > 0, refactor nested conditionals
  - Removed Unnecessary Dependency: The prices dependency was removed from useMemo since it is not used in the calculation of sortedBalances
  - Fixed Sorting Logic: Missing return the value zero, improve the code for more readable and shorter
  - Efficient Mapping: The formattedBalances array was removed, and formatting is done directly within the rows mapping to avoid unnecessary computations.
  - Unique Key Prop: Using index as a key is an anti-pattern. The key prop now uses a combination of currency and blockchain to ensure uniqueness and avoid issues with React's reconciliation.
  - Improved Type Safety: The blockchain parameter in getPriority is now typed as string, improving type safety and reducing the risk of runtime errors.
  - Removed Unnescessary Rerender: Move the getPriority method outside the component scope to prevent unnecessary re-renders when the rendering component changes.
  - Optimize Expensive Computations: Use useMemo to memoize row data, ensuring that the cached result is returned when the input dependencies remain unchanged.
  - Handling Floating-Point Precision: Vanilla JavaScript's floating-point precision issues make it unreliable for crypto calculations. Using decimal.js instead provides arbitrary-precision arithmetic, ensuring accurate and precise calculations.