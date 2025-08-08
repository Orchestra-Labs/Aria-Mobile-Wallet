'use dom';

import '@tailwind';
import { Loader } from '../Loader';
import { StyleSheet } from 'react-native';

const ScreenLoader = () => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900"
      style={styles.container}
    >
      <Loader />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
});

export default ScreenLoader;
