import { usePrepareDOMComponentProps } from '@/hooks';
import { NewWalletScreen } from '@/screens';

export default function Screen() {
  const props = usePrepareDOMComponentProps();
  return <NewWalletScreen {...props} />;
}
