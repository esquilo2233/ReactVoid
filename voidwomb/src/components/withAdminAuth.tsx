// src/components/withAdminAuth.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../utils/SupabaseService';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace('/Adm'); // Redirect to login page if not authenticated
        } else {
          // Check if the user is an admin
          const fetchUser = async () => {
            const { data, error } = await supabase
              .from('users')
              .select('is_staff')
              .eq('id', user.id)
              .single();
            if (error || !data?.is_staff) {
              router.replace('/'); // Redirect to home page if not an admin
            } else {
              setIsAdmin(true);
            }
          };
          fetchUser();
        }
      }
    }, [user, loading, router]);

    if (loading || !isAdmin) {
      return <div>Loading...</div>; // Show a loading state or redirect to login
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
