export function LandingHeroSkeleton() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      {/* Title and description */}
      <div className="max-w-3xl mx-auto mb-12 space-y-4">
        <div className="h-12 w-full max-w-2xl mx-auto bg-muted rounded animate-pulse" />
        <div className="h-6 w-full max-w-xl mx-auto bg-muted rounded animate-pulse" />
        <div className="h-6 w-full max-w-lg mx-auto bg-muted rounded animate-pulse" />
      </div>

      {/* Signup form skeleton */}
      <div className="max-w-md mx-auto mb-20 p-6 rounded-lg border bg-card">
        <div className="space-y-4">
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
          <div className="h-10 w-full bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Game preview skeleton */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="h-8 w-48 mx-auto mb-4 bg-muted rounded animate-pulse" />
        <div className="h-6 w-full max-w-2xl mx-auto mb-8 bg-muted rounded animate-pulse" />
        <div className="w-full h-96 bg-muted rounded-xl animate-pulse" />
        <div className="mt-4 h-4 w-64 mx-auto bg-muted rounded animate-pulse" />
      </div>

      {/* Vision and Join Us cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="p-6 rounded-lg border bg-card space-y-3">
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="p-6 rounded-lg border bg-card space-y-3">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto">
        <div className="h-8 w-40 mx-auto mb-8 bg-muted rounded animate-pulse" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-lg border bg-card space-y-3">
              <div className="h-6 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
