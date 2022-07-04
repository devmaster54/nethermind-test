import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'store';

export interface AppSettings {
  isOpenWalletConnectModal: boolean;
  triedEeager: boolean;
}

const initialState: AppSettings = {
  isOpenWalletConnectModal: false,
  triedEeager: false
};

export const appettingsSlice = createSlice({
  name: 'appsettings',
  initialState,
  reducers: {
    openWalletConnectModal: (state) => {
      state.isOpenWalletConnectModal = true;
    },
    closeWalletConnectModal: (state) => {
      state.isOpenWalletConnectModal = false;
    },

    triedEagerConnect: (state) => {
      state.triedEeager = true;
    }
  }
});

export const selectIsOpenWalletConnect = (state: AppState) => state.appsettings.isOpenWalletConnectModal;

export const selectHasTriedEeager = (state: AppState) => state.appsettings.triedEeager;

export const {
  openWalletConnectModal,
  closeWalletConnectModal,

  triedEagerConnect
} = appettingsSlice.actions;

export default appettingsSlice.reducer;
