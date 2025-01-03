'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { Login } from '@/screens';
import { GuestGuard } from '@/guards';

export default function LoginScreen() {
  return (
    <GuestGuard>
      <AuthLayout>
        <Login />
      </AuthLayout>
    </GuestGuard>
  );
}
