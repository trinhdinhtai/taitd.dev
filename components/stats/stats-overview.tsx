export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {statCards.map((card) => (
        <StatCard key={card.title} card={card} />
      ))}
    </div>
  )
}
