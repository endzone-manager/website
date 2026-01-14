'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { cn } from '@/lib/utils';

interface WrapperLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  eventName?: string;
}

export function WrapperLink({
  children,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  className,
  eventName = 'link_clicked',
  ...props
}: WrapperLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const posthog = usePostHog();

  const handleClick = () => {
    // Get current page (from) and destination page (to)
    const fromPage = pathname || '/';
    const toPage = href.startsWith('http') ? href : href;

    // Track link click event with from and to page information
    posthog?.capture(eventName, {
      from_page: fromPage,
      to_page: toPage,
      link_url: href,
      link_target: target,
      link_text: typeof children === 'string' ? children : 'Link',
    });

    // Navigate if internal link
    if (target === '_self' || !href.startsWith('http')) {
      router.push(href);
    }
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
