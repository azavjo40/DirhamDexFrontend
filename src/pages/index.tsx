import {
  useDirhamBalanceOf,
  usePrepareDexContractBuyTokens,
  useDexContractBuyTokens,
  usePrepareDirhamMint,
  useDirhamMint,
} from "@/contracts";
import { Address, useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [value, setvalue] = useState("");
  const RATE = 1;
  const { chain: activeChain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  const { connect, connectors } = useConnect({
    onSuccess: async (data, { connector }) => {
      await connector.watchAsset?.({
        address: data.account as Address,
        symbol: "DHM",
        decimals: 18,
        image: `https://${window.location.host}/dirham.png`,
      });
    },
  });

  const { data: balance } = useDirhamBalanceOf({
    address: process.env.DIRHAM_ADSRESS! as Address,
    args: [address! as Address],
    watch: true,
    enabled: !!address && !!process.env.DIRHAM_ADSRESS,
  });

  const { config } = usePrepareDexContractBuyTokens({
    address: process.env.DEX_CONTRACT_ADSRESS! as Address,
    args: [process.env.USDT_ADDRESS! as Address, BigNumber.from(RATE), BigNumber.from(Number(value))],
  });

  const { write, isSuccess, isLoading: isLoadingAdd } = useDexContractBuyTokens(config);

  const { config: configDirhamM } = usePrepareDirhamMint({
    address: process.env.DIRHAM_ADSRESS! as Address,
    args: [address!, BigNumber.from(Number(value))],
  });

  const { write: writeMint, isSuccess: isSuccessMint } = useDirhamMint(configDirhamM);

  useEffect(() => {
    setvalue("");
  }, [isSuccess, isSuccessMint]);

  const buyTokents = () => {
    console.log(write);
    try {
      // value && write && write();
      value && writeMint && writeMint();
    } catch (error) {
      console.error("Error occurred while adding DHM:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">User account</h5>
          {balance !== undefined && <p className="text-res-300">Balance {balance?.toString()} DHM</p>}
          <div className="flex space-x-4 flex-col">
            {connectors?.map((connector) => (
              <button
                key={connector?.id}
                onClick={() => (isConnected ? disconnect() : connect({ connector }))}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isConnected ? "Disconnect" : `Connect to ${connector?.name.replace("Legacy", "")}`}
              </button>
            ))}
          </div>
          <div className="flex space-x-4 flex-col">
            {isConnected && activeChain?.name !== chains[0]?.name && (
              <button
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => switchNetwork?.(chains[0].id)}
              >
                Switch to {chains[0]?.name}
                {isLoading && pendingChainId === chains[0]?.id && " (switching)"}
              </button>
            )}
          </div>
          {isConnected && (
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter HDH"
                onChange={(event) => setvalue(event.target.value)}
                value={value}
              />
            </div>
          )}

          {isConnected && (
            <button
              disabled={isLoadingAdd || isSuccessMint}
              onClick={() => buyTokents()}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoadingAdd || isSuccessMint ? "Adding..." : "Add DHM"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
