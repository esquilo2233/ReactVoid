// src/components/withAuth.tsx
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, requiredRole: string | null = null) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn();
      }
    }, [status]);

    useEffect(() => {
      if (status === 'authenticated' && requiredRole) {
        const hasRequiredRole = session?.user?.is_staff;
        if (!hasRequiredRole) {
          router.push('/');
        }
      }
    }, [status, session, requiredRole, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'authenticated' && (!requiredRole || session?.user?.is_staff)) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
