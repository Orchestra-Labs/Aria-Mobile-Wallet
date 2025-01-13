import { Temp } from '@/screens';

export default function MainScreen(...props: any) {
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
    />
  );
}
