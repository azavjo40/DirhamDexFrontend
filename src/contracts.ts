// Generated by @wagmi/cli@0.1.15 on 07.09.2023 at 17:03:55
import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from "wagmi/actions";

import {
  useContract,
  UseContractConfig,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from "wagmi";
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenABI = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_from",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      {
        name: "_value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function getToken(config: Omit<GetContractArgs, "abi">) {
  return getContract({ abi: tokenABI, ...config });
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function readToken<TAbi extends readonly unknown[] = typeof tokenABI, TFunctionName extends string = string>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, "abi">
) {
  return readContract({
    abi: tokenABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>);
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function writeToken<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof tokenABI, TFunctionName>, "abi">
    | Omit<WriteContractUnpreparedArgs<typeof tokenABI, TFunctionName>, "abi">
) {
  return writeContract({ abi: tokenABI, ...config } as WriteContractArgs<typeof tokenABI, TFunctionName>);
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function prepareWriteToken<
  TAbi extends readonly unknown[] = typeof tokenABI,
  TFunctionName extends string = string
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, "abi">) {
  return prepareWriteContract({
    abi: tokenABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>);
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenABI}__.
 */
export function watchTokenEvent<TAbi extends readonly unknown[] = typeof tokenABI, TEventName extends string = string>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, "abi">,
  callback: WatchContractEventCallback<TAbi, TEventName>
) {
  return watchContractEvent({ abi: tokenABI, ...config } as WatchContractEventConfig<TAbi, TEventName>, callback);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContract}__ with `abi` set to __{@link tokenABI}__.
 */
export function useToken(config: Omit<UseContractConfig, "abi"> = {} as any) {
  return useContract({ abi: tokenABI, ...config });
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof tokenABI, TFunctionName>
>(config: Omit<UseContractReadConfig<typeof tokenABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: tokenABI, ...config } as UseContractReadConfig<
    typeof tokenABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useTokenBalanceOf<TSelectData = ReadContractResult<typeof tokenABI, "balanceOf">>(
  config: Omit<UseContractReadConfig<typeof tokenABI, "balanceOf", TSelectData>, "abi" | "functionName"> = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "balanceOf", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"name"`.
 */
export function useTokenName<TSelectData = ReadContractResult<typeof tokenABI, "name">>(
  config: Omit<UseContractReadConfig<typeof tokenABI, "name", TSelectData>, "abi" | "functionName"> = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "name", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"owner"`.
 */
export function useTokenOwner<TSelectData = ReadContractResult<typeof tokenABI, "owner">>(
  config: Omit<UseContractReadConfig<typeof tokenABI, "owner", TSelectData>, "abi" | "functionName"> = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "owner", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useTokenSymbol<TSelectData = ReadContractResult<typeof tokenABI, "symbol">>(
  config: Omit<UseContractReadConfig<typeof tokenABI, "symbol", TSelectData>, "abi" | "functionName"> = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "symbol", TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useTokenTotalSupply<TSelectData = ReadContractResult<typeof tokenABI, "totalSupply">>(
  config: Omit<UseContractReadConfig<typeof tokenABI, "totalSupply", TSelectData>, "abi" | "functionName"> = {} as any
) {
  return useContractRead({
    abi: tokenABI,
    functionName: "totalSupply",
    ...config,
  } as UseContractReadConfig<typeof tokenABI, "totalSupply", TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenWrite<TMode extends WriteContractMode, TFunctionName extends string>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof tokenABI, string>["abi"], TFunctionName>
    : UseContractWriteConfig<TMode, typeof tokenABI, TFunctionName> & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, TFunctionName>({
    abi: tokenABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 */
export function useTokenTransfer<TMode extends WriteContractMode>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<TMode, PrepareWriteContractResult<typeof tokenABI, "transfer">["abi"], "transfer"> & {
        functionName?: "transfer";
      }
    : UseContractWriteConfig<TMode, typeof tokenABI, "transfer"> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any
) {
  return useContractWrite<TMode, typeof tokenABI, "transfer">({
    abi: tokenABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__.
 */
export function usePrepareTokenWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>, "abi"> = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareTokenTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof tokenABI, "transfer">, "abi" | "functionName"> = {} as any
) {
  return usePrepareContractWrite({
    abi: tokenABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenABI, "transfer">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link tokenABI}__.
 */
export function useTokenEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof tokenABI, TEventName>, "abi"> = {} as any
) {
  return useContractEvent({
    abi: tokenABI,
    ...config,
  } as UseContractEventConfig<typeof tokenABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link tokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useTokenTransferEvent(
  config: Omit<UseContractEventConfig<typeof tokenABI, "Transfer">, "abi" | "eventName"> = {} as any
) {
  return useContractEvent({
    abi: tokenABI,
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof tokenABI, "Transfer">);
}
