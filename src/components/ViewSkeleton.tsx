export function ViewSkeleton() {
  return (
    <div className="view-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-subtitle" />
      <div className="skeleton-kpi-row">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-block skeleton-kpi" />
        ))}
      </div>
      <div className="skeleton-block skeleton-hero" />
      <div className="skeleton-grid-2">
        <div className="skeleton-block skeleton-card" />
        <div className="skeleton-block skeleton-card" />
      </div>
    </div>
  );
}
