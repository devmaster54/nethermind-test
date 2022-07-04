import { SupportedNetworks, Network } from './types';

export const NETWORKS: {
  [networkId in SupportedNetworks]: Network;
} = {
  3: {
    name: 'Ropsten',
    rpcUrl: 'https://ropsten.infura.io/v3/1d8013e058d14402a3195e54ee340f2b',
    infoPageUrl: 'https://ropsten.etherscan.io'
  }
};
