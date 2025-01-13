'use dom';

import '@tailwind';
import axios from 'axios';
// import axios from 'axios';
import { DOMProps } from 'expo/dom';
// import { useEffect } from 'react';
// import { fetch } from 'expo/fetch';
// import { fetch as fetchPolyfill } from 'whatwg-fetch';

const testFetch = async () => {
  try {
    const res = await axios.get('/test');
    console.log('🚀 ~ testFetch ~ res1:', res.data);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export default function Temp({}: { dom?: DOMProps }) {
  return (
    <div>
      <button onClick={testFetch}>click</button>
    </div>
  );
}
