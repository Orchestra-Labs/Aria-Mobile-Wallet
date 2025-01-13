import { usePathName } from '@/hooks';
import { useLocalSearchParams, usePathname, useRouter, withLayoutContext } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { ComponentType } from 'react';

// export const withRouter = (Screen: ComponentType<any>) => () =>{
//   const pathname = usePathname();
//   const { pathName } = usePathName();

//   return Screen;
// };


// const withRouter = <P extends object>(
//   Screen: ComponentType<P & RouterParams>
// ) => {
//   const WithRouter = (props: P) => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const localParams = useLocalSearchParams();

//     return (
//       <Screen
//         {...props}
//         router={router}
//         searchParams={searchParams}
//         localParams={localParams}
//       />
//     );
//   };

//   WithParams.displayName = `WithExpoRouterParams(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

//   return WithParams;
// };