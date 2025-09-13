import FormLogin from '@/components/ui/form-login';
import { Suspense } from 'react';
import LoginSkeleton from './login-skeleton';

export default function Page() {
    return (
        <>
        <Suspense>
            <FormLogin />
        </Suspense>
        </>
    )
}