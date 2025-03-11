import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { ChangePasswordScreen } from '@/screens';

export default function Screen() {
  const props = usePrepareDOMComponentProps();
  return <ChangePasswordScreen {...props} />;
}
