'use client';

import Image from 'next/image';
import { useState } from 'react';

export function Logo() {
  const [logoError, setLogoError] = useState(false);

  if (logoError) {
    return null;
  }

  return (
    <div className="relative h-12 w-12">
      <Image
        src="/logo.png"
        alt="Redzone Boss Logo"
        fill
        className="object-contain"
        priority
        onError={() => setLogoError(true)}
      />
    </div>
  );
}
