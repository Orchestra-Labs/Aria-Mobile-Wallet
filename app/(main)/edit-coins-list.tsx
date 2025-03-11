import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { EditCoinListScreen } from '@/screens';

export default function EditCoinsList() {
  const props = usePrepareDOMComponentProps();
  return <EditCoinListScreen {...props} isOnSendPage={false} withWrappers />;
}
