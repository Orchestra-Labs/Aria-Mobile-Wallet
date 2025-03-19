import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { WalletConnectPairingsScreen } from '@/screens/main/WalletConnectPairings';

export default function Screen() {
  const props = usePrepareDOMComponentProps();

  return <WalletConnectPairingsScreen {...props} />;
}
