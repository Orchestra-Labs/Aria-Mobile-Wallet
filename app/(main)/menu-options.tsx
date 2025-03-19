import { MenuOptionsScreen } from '@/screens';
import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';

// TODO: add animation slide down on open, animation slide up on close
export default function Screen() {
  const props = usePrepareDOMComponentProps();
  return <MenuOptionsScreen {...props} />;
}
