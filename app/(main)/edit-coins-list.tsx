import { EditCoinListScreen } from '@/screens';

export default function EditCoinsList() {
  return (
    <EditCoinListScreen
      isOnSendPage={false}
      withWrappers
      dom={{ overScrollMode: 'never' }}
    />
  );
}
