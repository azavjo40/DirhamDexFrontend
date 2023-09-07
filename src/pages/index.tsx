import { useTokenBalanceOf } from "@/contracts";
import { Address, useAccount, useConnect, useDisconnect } from "wagmi";
import React from "react";

export default function Home() {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const { connect, connectors, isLoading } = useConnect({
    onSuccess: async (data, { connector }) => {
      await connector.watchAsset?.({
        address: data.account as Address,
        symbol: "USDT",
        decimals: 20,
      });
    },
  });

  const { data: balance } = useTokenBalanceOf({
    // address: process.env.ADSRESS_CONTRACT! as Address,
    address: "0x85C4Cd0a44Bfa751F9F6B9030479d0c73Ff4FCb5" as Address,
    args: [address! as Address],
    watch: true,
    enabled: !!address && !!process.env.ADSRESS_CONTRACT,
  });

  console.log(balance);

  return (
    <div>
      {connectors?.map((connector) => (
        <button key={connector?.id} onClick={() => (isConnected ? disconnect() : connect({ connector }))} type="button">
          {isConnected ? "Disconnect" : `Connect to ${connector?.name.replace("Legacy", "")}`}
        </button>
      ))}
      {balance && <p>Balance User {balance?.toString()} USDT</p>}
    </div>
  );
}
