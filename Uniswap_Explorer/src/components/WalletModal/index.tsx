import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Grid, Box, Typography, Theme, Dialog as MuiDialog } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserConnectors } from 'defi';
import { useWalletConnectModal } from 'store/appsettings/hooks';
import Image from 'next/image';
import { connectorLocalStorageKey } from 'defi/types';

export const WalletModal = () => {
  const { isOpen, closeWalletConnect } = useWalletConnectModal();
  const { connector, error, active, activate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = React.useState<unknown>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
      if (active) {
        closeWalletConnect();
      }
    }
  }, [activatingConnector, connector, active, closeWalletConnect]);
  return (
    <>
      <MuiDialog
        PaperProps={{
          style: {
            overflow: 'hidden',
            maxWidth: 500
          },
          elevation: 0
        }}
        fullWidth
        open={isOpen}
        onClose={() => closeWalletConnect()}>
        <Box margin="auto" maxWidth={400} width="100%" py={4} px={2}>
          <Grid container direction="column">
            <Typography variant="h5" textAlign="center">
              Select Wallet
            </Typography>
            <Box mt={2} />
            {Object.entries(getUserConnectors()).map(([name, connectorInfo]) => {
              const currentConnectorInfo = connectorInfo;
              const currentConnector = connectorInfo.connector;
              const activating = currentConnector === activatingConnector;

              const connected = currentConnector === connector;
              const disabled = !!activatingConnector || connected || !!error;

              return (
                <Grid
                  item
                  sx={{
                    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 1,
                    marginBottom: '20px',
                    transition: 'all 0.3s',
                    opacity: disabled ? 1 : 0.8,
                    '&:hover': {
                      background: (theme: Theme) => (disabled ? undefined : theme.palette.primary.light)
                    }
                  }}
                  key={name}>
                  <Box
                    onClick={
                      !disabled
                        ? () => {
                            setActivatingConnector(currentConnector);
                            activate(connectorInfo.connector);
                            window.localStorage.setItem(connectorLocalStorageKey, name);
                          }
                        : undefined
                    }
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: (theme: Theme) => theme.spacing(1.5, 3),
                      textAlign: 'center',
                      cursor: !disabled ? 'pointer' : undefined
                    }}>
                    <Image src={connectorInfo.icon} alt={connectorInfo.name} width="24" height="24" />
                    <Box textAlign="center" width="100%">
                      {activating ? (
                        <CircularProgress size="1.25rem" />
                      ) : (
                        <Typography variant="body2">{currentConnectorInfo.name}</Typography>
                      )}{' '}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </MuiDialog>
    </>
  );
};
