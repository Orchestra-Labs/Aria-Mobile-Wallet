// 'use dom';

// import '@tailwind';

import { Main, Temp } from '@/screens';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { useEffect } from 'react';
import axios from 'axios';

const testFetch = async () => {
  const res = await fetch(
    '/hello',
    // {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // },
  );
  console.log('🚀 ~ testFetch ~ res:', res);
  return res;
};

export default function MainScreen(...props: any) {

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ testFetch:", testFetch)
    testFetch()
  }, [])
  return (
    <Temp
      dom={{
        originWhitelist: [
          'https://*',
          'http://*',
          'file://*',
          'sms://*',
          'tel://*',
          'https://google.com',
        ],
        webviewDebuggingEnabled: true,
        mixedContentMode: 'always',
        javaScriptEnabled: true,
        domStorageEnabled: true,
      }}
      // testFetch={testFetch}
    />
    // <AuthenticatedScreenWrapper>
    //   <MainLayout>
    //     <Main />
    //   </MainLayout>
    // </AuthenticatedScreenWrapper>
  );
}
