import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import SplashScreen1 from '@/src/screens/SplashScreen1';

export default function SplashScreen1Route() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/splash2');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen1 />;
}
