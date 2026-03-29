import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import SplashScreen2 from '@/src/screens/SplashScreen2';

export default function SplashScreen2Route() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen2 />;
}

