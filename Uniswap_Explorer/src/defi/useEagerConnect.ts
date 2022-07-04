import { useEffect } from 'react';

import { connectorLocalStorageKey } from './types';
import { ConnectorNames } from './connectors';
import { getUserConnectors } from 'defi';
import { useWeb3React } from '@web3-react/core';

const useEagerConnect = () => {
  const { activate } = useWeb3React();
  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;

    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    if (connectorId) {
      activate(getUserConnectors()[connectorId].connector);
    }
  }, [activate]);
};

export default useEagerConnect;
