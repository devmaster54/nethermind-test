import { useAppDispatch, useAppSelector } from 'store';
import { closeWalletConnectModal, openWalletConnectModal, selectIsOpenWalletConnect } from './slice';

export function useWalletConnectModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletConnect);
  const closeWalletConnect = () => dispatch(closeWalletConnectModal());
  const openWalletConnect = () => dispatch(openWalletConnectModal());

  return { isOpen, closeWalletConnect, openWalletConnect };
}
