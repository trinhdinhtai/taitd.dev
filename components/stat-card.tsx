interface StatCardProps {
  card: { title: string; link: string; value: string | number }
}

export default function StartCard({ card }: StatCardProps) {
  return (
    <a
      className="flex flex-col rounded-lg bg-background p-4 shadow dark:border"
      href={card.link}
      target="_blank"
      rel="noreferrer"
    >
      <h1 className="my-2 text-3xl font-bold text-gray-600 group-hover:text-black dark:text-gray-200 dark:group-hover:text-white">
        {card.value || "-"}
      </h1>

      <span className="font-medium text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white">
        {card.title}
      </span>
    </a>
  )
}
