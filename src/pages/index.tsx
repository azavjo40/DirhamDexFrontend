import { useDirhamV1BalanceOf, useDirhamV1Mint, usePrepareDirhamV1Mint } from "@/contracts";
import { Address, useAccount, useConnect, useDisconnect } from "wagmi";
import React, { useState } from "react";
import { BigNumber } from "ethers";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [value, setvalue] = useState(0);

  const { connect, connectors, isLoading } = useConnect({
    onSuccess: async (data, { connector }) => {
      await connector.watchAsset?.({
        address: data.account as Address,
        symbol: "DHM",
        decimals: 18,
        image: `https://${window.location.host}/dirham.png`,
      });
    },
  });

  const { data: balance } = useDirhamV1BalanceOf({
    address: process.env.DIRHAM_ADSRESS! as Address,
    args: [address! as Address],
    watch: true,
    enabled: !!address && !!process.env.DIRHAM_ADSRESS,
  });

  const { config } = usePrepareDirhamV1Mint({
    address: process.env.DIRHAM_ADSRESS! as Address,
    args: [BigNumber.from(value)],
  });

  const { write } = useDirhamV1Mint(config);

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
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter HDH"
              onChange={(event) => setvalue(Number(event.target.value))}
            />
          </div>
          <button
            onClick={() => (value && write ? write() : "")}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add DHM
          </button>
        </div>
      </div>
    </div>
  );
}
