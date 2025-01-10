import { AptosSignAndSubmitTransactionInput, AptosSignAndSubmitTransactionOutput, UserResponse } from '@aptos-labs/wallet-standard';
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, InputViewFunctionData, Network } from '@aptos-labs/ts-sdk';
import { CUSTOMFULLNODE, INDEXERURL } from '@/config/config';
import { MessagePlugin } from 'tdesign-react';
import errorParse from './error';


const config = new AptosConfig({ network: Network.CUSTOM, fullnode: CUSTOMFULLNODE });
const aptos = new Aptos(config);

const signAndSubmit = async (transaction: InputTransactionData, signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<any>) => {
  console.log('transaction', transaction)
  const response: any = await signAndSubmitTransaction(transaction);
  console.log('response', response)
  const res = await aptos.waitForTransaction({ transactionHash: response.hash });
  console.log('res', res)
  return res;


}

const getView = async (payload: InputViewFunctionData) => {

  const res = await aptos.view({
    payload: payload
  });
  return res
}

const getAccountResource = async (args: { accountAddress: string, resourceType: `${string}::${string}::${string}` }) => {
  const accountResource = await aptos.getAccountResource({
    accountAddress: args.accountAddress,
    resourceType: args.resourceType,
  });
  // const events = await aptos.getAccountEventsByEventType({
  //   accountAddress: '0xeaf93e58e22bd2deb1875eb635dfc961c1c9e51c53dceeb5b1cf2936d7566442',  // 目标账户地址
  //   eventType: "0xeaf93e58e22bd2deb1875eb635dfc961c1c9e51c53dceeb5b1cf2936d7566442::weusd_operations::MintedWeUSD",  // 事件类型
  // });
  // const events = await aptos.getEventsByEventHandle({
  //   accountAddress: "0xeaf93e58e22bd2deb1875eb635dfc961c1c9e51c53dceeb5b1cf2936d7566442", // replace with a real account address
  //   creationNumber: 14,
  //   // minimumLedgerVersion: 1, // optional, specify if needed
  // })
  return accountResource;
  // console.log('eventHandles', eventHandles)
}

const getTimestampByVersion = async (version: string) => {
  const block = await aptos.getBlockByVersion({ ledgerVersion: Number(version) });
  return block;
}

const getBalance = async ({ accountAddress, coinType, faMetadataAddress }: { accountAddress: string, coinType?: `${string}::${string}::${string}`, faMetadataAddress?: string }) => {
  const resource = await aptos.getAccountCoinAmount({
    accountAddress: accountAddress, // replace with a real account address
    coinType: coinType,
    faMetadataAddress: faMetadataAddress,
  });
  return resource;
}

export {
  signAndSubmit,
  getView,
  getAccountResource,
  getTimestampByVersion,
  getBalance
}