import { LoginScreen } from '@/screens';
import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';

export default function Screen() {
  const props = usePrepareDOMComponentProps();
  return <LoginScreen {...props} />;
}
