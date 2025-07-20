import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


export const useFingerprint = () => {
  const [fpHash, setFpHash] = useState<string | null>(null);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setFpHash(visitorId);
    };

    getFingerprint();
  }, []);

  return fpHash;
};