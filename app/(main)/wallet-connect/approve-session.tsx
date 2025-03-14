import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { WalletConnectApproveSessionScreen } from '@/screens/main';
import { useLocalSearchParams } from 'expo-router';
import { SignClientTypes } from '@walletconnect/types';

export default function Screen() {
  const local = useLocalSearchParams<{ proposal: string }>();
  const proposal: SignClientTypes.EventArguments['session_proposal'] =
    JSON.parse(local?.proposal);

  const props = usePrepareDOMComponentProps();

  return <WalletConnectApproveSessionScreen {...props} proposal={proposal} />;
}
