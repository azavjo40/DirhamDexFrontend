import {
  usePrepareErc20Approve,
  useErc20Approve,
  useExchangeBuyTokens,
  usePrepareExchangeBuyTokens,
  useExchangeExchangeRates,
} from "@/contracts";
import {
  Address,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import React, { useEffect, useState } from "react";
import { parseEther } from "ethers/lib/utils.js";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [value, setvalue] = useState("0");
  const { chain: activeChain } = useNetwork();
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  const { data: rate } = useExchangeExchangeRates({
    address: process.env.EXCHANGE_ADDRESS as Address,
    args: [process.env.USDT_ADDRESS as Address],
    watch: true,
  });

  // console.log(rate);

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

  const { data: userBalance } = useBalance({
    token: process.env.DIRHAM_ADSRESS as Address,
    address,
    watch: true,
  });

  const amount = parseEther(value === "" ? "0" : value);

  const approveArgs = [process.env.EXCHANGE_ADDRESS as Address, amount] as const;

  const { config: approveConfig } = usePrepareErc20Approve({
    address: process.env.USDT_ADDRESS as Address,
    args: approveArgs,
    enabled: !!approveArgs,
  });

  const { write: approve, data: approveData, isLoading: isLoadingApprove } = useErc20Approve(approveConfig);

  const { config } = usePrepareExchangeBuyTokens({
    address: process.env.EXCHANGE_ADDRESS! as Address,
    args: [process.env.USDC_ADDRESS! as Address, amount],
    enabled: !!approveData?.hash,
  });

  const { write: buy, isSuccess: isSuccessBuy, isLoading: isLoadingBuy } = useExchangeBuyTokens(config);

  const { data: approveReceipt } = useWaitForTransaction({
    hash: approveData?.hash,
    enabled: !amount,
  });

  useEffect(() => {
    setvalue("0");
  }, [isSuccessBuy]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">User account</h5>
          {userBalance !== undefined && (
            <p className="text-res-300">
              Balance {userBalance?.formatted} {userBalance.symbol}
            </p>
          )}
          <div className="flex flex-col">
            {isConnected && (
              <button
                onClick={() => disconnect()}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Disconnect
              </button>
            )}
            {!isConnected &&
              connectors?.map((connector) => (
                <button
                  key={connector?.id}
                  onClick={() => connect({ connector })}
                  className="w-full text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {`Connect to ${connector?.name.replace("Legacy", "")}`}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter HDH"
                onChange={(event) => setvalue(event.target.value)}
                value={value}
                type="number"
              />
            </div>
          )}

          {isConnected && !approveData?.hash && (
            <button
              onClick={() => approve && approve()}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoadingApprove ? "Approving..." : "Approve pay"}
            </button>
          )}

          {isConnected && (
            <button
              onClick={() => buy && buy()}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {/* {isLoadingBuy ? "Paying..." : "Pay  " + Number(value) * (rate?.toNumber() ?? 0) + " USDT"} */}
              {isLoadingBuy ? "Paying..." : "Pay  " + Number(value) + " USDT"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
