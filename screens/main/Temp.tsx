'use dom';

import '@tailwind';
import axios from 'axios';
// import axios from 'axios';
import { DOMProps } from 'expo/dom';
import { useEffect } from 'react';
// import { useEffect } from 'react';
// import { fetch } from 'expo/fetch';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';

const testFetch = async () => {
  const res = await axios.get(
    '/hello',
    // {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // },
  );
  console.log('🚀 ~ testFetch ~ res1:', res.data);
  return res;
};

export default function Temp({}: {
  dom?: DOMProps;
  // testFetch: () => Promise<any>;
}) {
  
  useEffect(() => {
    testFetch()
  })
  //   try {
  //     // const res1 = await axios.get('https://google.com', {
  //     //   // headers: { 'Content-Type': '*/*', Accept: 'text/html' },
  //     //   // params: null,
  //     //   // data: {
  //     //   //   jsonrpc: '2.0',
  //     //   //   id: 934517654545,
  //     //   //   method: 'status',
  //     //   //   params: {},
  //     //   // },
  //     // });
  //     // console.error('🚀 ~ res1:', res1);
  //     // const res = await axios.request({
  //     //   url: 'https://t7v8q56t-5173.euw.devtunnels.ms/kleomedes-rpc',
  //     //   adapter: 'fetch',
  //     //   method: 'POST',
  //     //   data: {
  //     //     jsonrpc: '2.0',
  //     //     id: 934517654545,
  //     //     method: 'status',
  //     //     params: {},
  //     //   },
  //     //   headers: {
  //     //     'Access-Control-Allow-Origin': '*',
  //     //   },
  //     // });

  //     // console.log('🚀 ~ res:', res);

  //     const res = await fetchPolyfill(
  //       'https://cors-anywhere.herokuapp.com/corsdemo',
  //       // {
  //       //   headers: {
  //       //     'Access-Control-Allow-Origin': '*',
  //       //   },
  //       // },
  //     );

  //     console.log('🚀 ~ fech ~ res:', res.status);
  //   } catch (_) {
  //     console.log('🚀 ~ _:', _, JSON.stringify(_, null, 2));
  //   }
  // };
  // useEffect(() => {
  //     fech()
  // }, []);
  return (
    <div>
      <button onClick={testFetch}>click</button>
    </div>
  );
}
