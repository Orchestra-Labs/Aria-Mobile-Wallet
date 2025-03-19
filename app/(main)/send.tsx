import { SendScreen } from '@/screens';
import { usePrepareDOMComponentProps } from '@/hooks/usePrepareDOMComponentProps';
import { useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { address } = useLocalSearchParams<{ address?: string }>();
  const props = usePrepareDOMComponentProps();
  return <SendScreen address={address} {...props} />;
}
