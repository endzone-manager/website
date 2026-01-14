export function FooterSkeleton() {
  return (
    <footer className="w-full border-t mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-40 bg-muted rounded animate-pulse" />
            <span className="hidden md:inline">•</span>
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
