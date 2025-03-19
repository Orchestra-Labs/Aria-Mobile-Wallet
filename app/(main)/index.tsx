import { MainScreen } from '@/screens';
import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';

export default function Screen() {
  const props = usePrepareDOMComponentProps();
  return <MainScreen {...props} />;
}
