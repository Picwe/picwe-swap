// 引入 request 
import { CUSTOMFULLNODE } from '@/config/config';
import request from '@/utils/request';


// 获取编译字节
export function getBytecode(params: any) {
  return request('/token/compile', {
    method: 'get',
    params,
  })
}

/** 保存deploy的token */
/**
 * 
 * @param data 
 * @returns 
 */
interface saveForm {
  sender: string
  function: string
  typeArguments: string
  description: string
  tokenName: string
  symbol: string
  icon: string
  website: string
  telegram: string
  twitter: string
  txHash: string
}
export function saveDeployToken(data: saveForm) {
  return request('/token/create', {
    method: 'post',
    data,
  })
}

/** 获取首页列表
 * @param page
 * @param size
 */
export function getTokenPage(params: any) {
  return request('/token/page', {
    method: 'get',
    params,
  })
}

/**
 * 获取token价格
 * 参数：from（开始时间）、 to（结束时间）精确到毫秒的时间戳  {cycle} 价格周期 {tokenId} token列表返回的ID
 */
export function getTokenPrice(cycle: string, tokenId: string | number, params: any) {
  return request(`/price/price/${cycle}/${tokenId}`, {
    method: 'get',
    params,
  })
}

/**
 * 获取交易记录
 * page
   size
   tokenId
 */
export function getTradeRecord(params: any) {
  return request(`/trade/page`, {
    method: 'get',
    params,
  })
}

export function getTokenInfo(tokenId: any) {
  return request(`/token/id/${tokenId}`, {
    method: 'get',
  })
}

export function getEventsFromChain(accountAddress: string, eventsType: string, params: any) {
  return request(`${CUSTOMFULLNODE}/accounts/${accountAddress}/events/${eventsType}/minted_weusd_events`, {
    method: 'get',
    params
  })
}