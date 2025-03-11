import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { WalletConnectSignTransactionScreen } from '@/screens/main/WalletConnectSignTransaction';
import { useLocalSearchParams } from 'expo-router';
import { SignClientTypes } from '@walletconnect/types';

export default function Screen() {
  const local = useLocalSearchParams<{ requestEvent: string }>();
  const requestEvent: SignClientTypes.EventArguments['session_request'] =
    JSON.parse(local?.requestEvent);

  const props = usePrepareDOMComponentProps();

  return (
    <WalletConnectSignTransactionScreen
      {...props}
      requestEvent={requestEvent}
    />
  );
}
