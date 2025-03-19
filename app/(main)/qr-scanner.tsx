import { QRScannerScreen } from '@/screens/main';
import { RelativePathString, useLocalSearchParams } from 'expo-router';

export default function Screen() {
  const { nextPathname, nextParam = 'q' } = useLocalSearchParams<{
    nextPathname: RelativePathString;
    nextParam: string;
  }>();

  return <QRScannerScreen nextPathname={nextPathname} nextParam={nextParam} />;
}
