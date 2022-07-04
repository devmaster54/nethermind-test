import React from 'react';
import {
  styled,
  Container,
  AppBar as MaterialAppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useWalletConnectModal } from 'store/appsettings/hooks';
import useEagerConnect from 'defi/useEagerConnect';
import { connectorLocalStorageKey } from 'defi/types';
import { isValidNetwork } from 'defi';
import { getShortString } from 'utils';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(2)
}));

const Header: React.FC = () => {
  useEagerConnect();
  const { openWalletConnect } = useWalletConnectModal();
  const { chainId, account, deactivate } = useWeb3React();
  const onDisconnect = () => {
    window.localStorage.removeItem(connectorLocalStorageKey);
    deactivate();
  };
  const isValid = chainId && isValidNetwork(chainId);
  return (
    <>
      <MaterialAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                Uniswap Explorer
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, textAlign: 'right', display: 'flex', alignItems: 'center' }}>
              {account && (
                <Box mr={2}>
                  <Typography variant="body1">{isValid ? getShortString(account) : 'Invalid Network'}</Typography>
                </Box>
              )}
              <Button variant="text" onClick={account ? onDisconnect : openWalletConnect}>
                {account ? 'Disconnect' : 'Connect Wallet'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </MaterialAppBar>
    </>
  );
};

export default Header;
