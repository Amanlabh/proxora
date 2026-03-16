import { MetricCard } from "../components/metric-card";

type RenterOverviewProps = {
  totalCharged: string;
  activeRentalCount: number;
  completedRentalCount: number;
  totalRequests: number;
  totalTokens: number;
  openDisputeCount: number;
  topModels: Array<{
    model: string;
    requests: number;
    tokens: number;
  }>;
};

export function RenterOverview({
  totalCharged,
  activeRentalCount,
  completedRentalCount,
  totalRequests,
  totalTokens,
  openDisputeCount,
  topModels,
}: RenterOverviewProps) {
  return (
    <div className="provider-section">
      <h2>Usage overview</h2>
      <div className="listing-grid">
        <MetricCard title="Total charged" value={totalCharged} />
        <MetricCard
          title="Rentals"
          value={`${activeRentalCount} active / ${completedRentalCount} completed`}
        />
        <MetricCard
          title="Usage totals"
          value={`${totalRequests} requests / ${totalTokens} tokens`}
        />
        <MetricCard title="Open disputes" value={`${openDisputeCount}`} />
      </div>
      {topModels.length > 0 ? (
        <div className="listing-grid">
          {topModels.map((model) => (
            <article className="listing-card" key={model.model}>
              <div className="listing-topline">
                <span className="pill">MODEL</span>
              </div>
              <h3>{model.model}</h3>
              <p className="listing-provider">
                {model.requests} requests / {model.tokens} tokens
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
