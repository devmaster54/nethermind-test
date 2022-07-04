import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { DEFI_CONFIG } from 'defi/config';
import { NETWORKS } from 'defi/networks';
import { metamask, walletconnect as walletconnectP } from 'assets/wallets';
import { SupportedNetworks } from './types';

// NETWORK connector
const urls = DEFI_CONFIG.supportedNetworkIds.reduce((map, networkId: number) => {
  map[networkId] = NETWORKS[networkId as SupportedNetworks].rpcUrl;
  return map;
}, {} as { [chainId: number]: string });

export const network = new NetworkConnector({
  urls,
  defaultChainId: 56
});

// USER connectors
const injected = new InjectedConnector({});

const walletconnect = new WalletConnectConnector({
  rpc: urls
});

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect'
}

export interface ConnectorInfo {
  connector: any;
  name: string;
  icon: string;
}

export const userConnectorsByName: {
  [connectorName in ConnectorNames]: ConnectorInfo;
} = {
  [ConnectorNames.Injected]: {
    connector: injected,
    name: 'Metamask',
    icon: metamask
  },
  [ConnectorNames.WalletConnect]: {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: walletconnectP
  }
};
