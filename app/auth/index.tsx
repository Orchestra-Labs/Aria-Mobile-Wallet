'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { Login } from '@/screens';

export default function LoginScreen() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
