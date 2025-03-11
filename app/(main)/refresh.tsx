import { ROUTES } from '@/constants';
import { Redirect } from 'expo-router';

export default function Screen() {
  return <Redirect href={ROUTES.APP.ROOT} />;
}
