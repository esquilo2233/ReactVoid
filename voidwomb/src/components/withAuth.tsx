// src/components/withAuth.tsx
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'unauthenticated') {
        console.log('No session found, redirecting to sign-in...');
        signIn();
      }
    }, [status]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (session) {
      console.log('Session found:', session);
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export default withAuth;
