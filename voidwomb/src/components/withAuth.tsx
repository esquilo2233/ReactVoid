// src/components/withAuth.tsx
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn();
      }
    }, [status]);

    useEffect(() => {
      if (status === 'authenticated' && !session?.user?.is_staff) {
        router.push('/');
      }
    }, [status, session, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'authenticated' && session?.user?.is_staff) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};

function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
