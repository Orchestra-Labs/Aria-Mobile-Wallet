import { useSegments } from 'expo-router';

export const usePathName = () => {
  const segments = useSegments();
  const pathName = `/${segments.join('/')}`;

  return { pathName };
};
