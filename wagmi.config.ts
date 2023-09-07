import { defineConfig } from "@wagmi/cli";
import { hardhat, react, actions } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/contracts.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat-contract",
    }),
    actions({
      readContract: true,
      getContract: true,
      prepareWriteContract: true,
    }),
    react({
      useContractRead: true,
      useContractFunctionRead: true,
    }),
  ],
});
// npx wagmi generate
