import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { CssBaseline } from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import store from 'store';
import { ethers } from 'ethers';
import { WalletModal } from '../components/WalletModal';

function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  library.pollingInterval = 12000;
  return library;
}

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>DeFi App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <WalletModal />
          </ThemeProvider>
        </Provider>
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;
