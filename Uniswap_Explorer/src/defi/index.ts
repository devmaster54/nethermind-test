import { DEFI_CONFIG } from './config';
import { NETWORKS } from './networks';
import { userConnectorsByName } from './connectors';
import { SupportedNetworks } from './types';

export const isValidNetwork = (chainId?: number) =>
  DEFI_CONFIG.supportedNetworkIds.includes(chainId as SupportedNetworks);

export const getNetworkName = (chainId: number) =>
  (chainId as SupportedNetworks) in NETWORKS ? NETWORKS[chainId as SupportedNetworks].name : 'Unknown';

export const getNetworkRpcUrl = (chainId: number | undefined) =>
  (chainId as SupportedNetworks) in NETWORKS ? NETWORKS[chainId as SupportedNetworks].rpcUrl : 'Unknown';

export const getUserConnectors = () => {
  return userConnectorsByName;
};
