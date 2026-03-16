type MetricCardProps = {
  title: string;
  value: string;
  detail?: string;
};

export function MetricCard({ title, value, detail }: MetricCardProps) {
  return (
    <article className="listing-card">
      <h3>{title}</h3>
      <p className="listing-provider">{value}</p>
      {detail ? <p className="listing-description">{detail}</p> : null}
    </article>
  );
}
