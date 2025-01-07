'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { Login } from '@/screens';
import { GuestGuard } from '@/guards';
import { StoreLoader } from '@/managers';

export default function LoginScreen() {
  return (
    <StoreLoader>
      <GuestGuard>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </GuestGuard>
    </StoreLoader>
  );
}
