export function RouteLoading({ message = "Loading workspace…" }: { message?: string }) {
  return (
    <div className="route-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="route-loading-card">
        <div className="route-loading-brand">
          <div className="route-loading-icon" />
          <div>
            <div className="route-loading-title">Highclere Velocity</div>
            <div className="route-loading-sub">AI Mortgage Intelligence</div>
          </div>
        </div>
        <div className="route-loading-spinner" />
        <div className="route-loading-text">{message}</div>
      </div>
    </div>
  );
}
