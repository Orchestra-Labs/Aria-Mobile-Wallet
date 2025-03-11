import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { WalletConnectInitSessionScreen } from '@/screens/main';
import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { string } = useLocalSearchParams<{ string: string }>();

  const props = usePrepareDOMComponentProps();
  return <WalletConnectInitSessionScreen {...props} uri={string} />;
}
