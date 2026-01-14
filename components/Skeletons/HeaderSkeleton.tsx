export function HeaderSkeleton() {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-muted animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        </div>
        <nav className="flex items-center gap-4">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </nav>
      </div>
    </header>
  );
}
