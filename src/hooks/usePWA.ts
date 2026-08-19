import { useState, useEffect } from 'react';
import { PWAService, PWAState } from '../services/pwaService';

export function usePWA() {
  const [state, setState] = useState<PWAState>(PWAService.getState());

  useEffect(() => {
    const unsubscribe = PWAService.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const installApp = async () => {
    return await PWAService.promptInstall();
  };

  const updateApp = () => {
    PWAService.applyUpdate();
  };

  const clearCache = async () => {
    return await PWAService.clearPWACache();
  };

  return {
    ...state,
    installApp,
    updateApp,
    clearCache
  };
}
