type DailyOperation = {
  day: string;
  rentals: number;
  disputes: number;
  revenue: number;
  tokens: number;
};

type ProviderRevenue = {
  providerDisplayName: string;
  revenue: number;
};

type ModelUsage = {
  model: string;
  requests: number;
  tokens: number;
};

type AdminInsightsPanelProps = {
  currencyCode: string;
  dailyOperations: DailyOperation[];
  topProviders: ProviderRevenue[];
  topModels: ModelUsage[];
};

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

export function AdminInsightsPanel({
  currencyCode,
  dailyOperations,
  topProviders,
  topModels,
}: AdminInsightsPanelProps) {
  const maxRentals = Math.max(
    ...dailyOperations.map((item) => item.rentals),
    1,
  );
  const maxRevenue = Math.max(...topProviders.map((item) => item.revenue), 1);
  const maxTokens = Math.max(...topModels.map((item) => item.tokens), 1);

  return (
    <div className="provider-stack">
      <div className="provider-section">
        <div className="section-head">
          <div>
            <h2>Operational trend</h2>
            <p className="section-copy">
              Seven-day view of rentals, disputes, revenue, and token usage.
            </p>
          </div>
        </div>
        <div className="insight-grid insight-grid-wide">
          {dailyOperations.map((day) => (
            <article className="insight-card" key={day.day}>
              <div className="insight-card-head">
                <span>{day.day}</span>
                <strong>{day.rentals} rentals</strong>
              </div>
              <div className="insight-bar-track">
                <div
                  className="insight-bar-fill"
                  style={{ width: `${(day.rentals / maxRentals) * 100}%` }}
                />
              </div>
              <p className="listing-description">
                Revenue: {formatMoney(day.revenue, currencyCode)}
              </p>
              <p className="listing-description">
                Tokens: {day.tokens.toLocaleString()} | Disputes: {day.disputes}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="insight-grid">
        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Top providers</h2>
              <p className="section-copy">
                Providers generating the most metered revenue.
              </p>
            </div>
          </div>
          {topProviders.length === 0 ? (
            <div className="empty-state">
              <p>No provider revenue yet.</p>
            </div>
          ) : (
            <div className="insight-stack">
              {topProviders.map((provider) => (
                <article
                  className="insight-card"
                  key={provider.providerDisplayName}
                >
                  <div className="insight-card-head">
                    <span>{provider.providerDisplayName}</span>
                    <strong>
                      {formatMoney(provider.revenue, currencyCode)}
                    </strong>
                  </div>
                  <div className="insight-bar-track">
                    <div
                      className="insight-bar-fill"
                      style={{
                        width: `${(provider.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="provider-section">
          <div className="section-head">
            <div>
              <h2>Top models</h2>
              <p className="section-copy">
                Models driving the highest token volume this week.
              </p>
            </div>
          </div>
          {topModels.length === 0 ? (
            <div className="empty-state">
              <p>No model usage yet.</p>
            </div>
          ) : (
            <div className="insight-stack">
              {topModels.map((model) => (
                <article className="insight-card" key={model.model}>
                  <div className="insight-card-head">
                    <span>{model.model}</span>
                    <strong>{model.tokens.toLocaleString()} tokens</strong>
                  </div>
                  <div className="insight-bar-track">
                    <div
                      className="insight-bar-fill insight-bar-fill-accent"
                      style={{ width: `${(model.tokens / maxTokens) * 100}%` }}
                    />
                  </div>
                  <p className="listing-description">
                    {model.requests} requests
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
