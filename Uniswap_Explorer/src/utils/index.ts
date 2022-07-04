import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { HistoryData } from './types';

export const getShortString = (str = '') => {
  return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
};
export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
export const rawToFixed = (amount: string, decimal: number): BigNumber => {
  return new BigNumber(amount).div(new BigNumber(10).pow(decimal));
};

export const getHistory = async (address: string, networkId: number): Promise<HistoryData[]> => {
  const provider = new ethers.providers.EtherscanProvider(networkId, 'RI9GRG3J4GCUWIQFP8JVDRZD3EEW2ME6BT');
  const history = await provider.getHistory(address);
  return history.map((item) => ({
    blockHash: item.blockHash,
    from: item.from,
    timestamp: item.timestamp,
    hash: item.hash,
    blockNumber: item.blockNumber,
    value: item.value.toString()
  }));
};
