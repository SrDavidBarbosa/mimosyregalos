import { useState, useEffect } from 'react';

interface UseWizardResult {
  step: number;
  next: () => void;
  back: () => void;
  isMobile: boolean;
}

export function useWizard(): UseWizardResult {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => (s > 1 ? s - 1 : s));

  return { step, next, back, isMobile };
}