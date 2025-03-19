import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Scan, X } from 'lucide-react-native';
import { RelativePathString, router } from 'expo-router';

type Props = {
  nextPathname: RelativePathString;
  nextParam: string;
};

export default function QRScanner({ nextPathname, nextParam }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const goBack = () => router.back();

  const redirectOnSuccessScan = (string: string) => {
    router.replace({
      pathname: nextPathname,
      params: { [nextParam]: encodeURIComponent(string) },
    });
  };

  const onBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    const result = scanningResult.data;
    if (!result) return;
    if (result.startsWith('wc:')) {
      return redirectOnSuccessScan(result);
    }
    if (typeof result === 'string') return redirectOnSuccessScan(result);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={goBack}>
          <X color="white" width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={styles.camera}
        facing={'back'}
        onBarcodeScanned={onBarcodeScanned}
      >
        <TouchableOpacity style={styles.closeButton} onPress={goBack}>
          <X color="white" width={40} height={40} />
        </TouchableOpacity>
        <View style={styles.frameIconContainer}>
          <Text style={styles.text}>Scan QR Code</Text>
          <Scan color="white" width="100%" height={300} strokeWidth={0.5} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 64,
    right: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  frameIconContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
  },
});
