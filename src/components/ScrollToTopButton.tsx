import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90"
      size="icon"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
