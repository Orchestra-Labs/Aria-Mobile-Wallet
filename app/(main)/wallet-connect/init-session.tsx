import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { WalletConnectInitSessionScreen } from '@/screens/main';
import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { q } = useLocalSearchParams<{ q: string }>();

  const props = usePrepareDOMComponentProps();
  return <WalletConnectInitSessionScreen {...props} uri={q} />;
}
