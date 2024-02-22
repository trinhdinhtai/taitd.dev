interface StatCardProps {
  card: { title: string; link?: string; value?: string | number }
}

export default function StartCard({ card }: StatCardProps) {
  const { title, value, link } = card

  return (
    <a
      className="flex flex-col rounded-lg border border-transparent bg-background p-4 shadow hover:border-gray-300 dark:border-gray-800 dark:hover:border-neutral-600"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <h1 className="my-2 text-3xl font-bold text-gray-600 group-hover:text-black dark:text-gray-200 dark:group-hover:text-white">
        {value ?? (
          <div className="h-8 w-28 animate-pulse rounded-sm bg-gray-300 dark:bg-neutral-700" />
        )}
      </h1>

      <span className="font-medium text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white">
        {title}
      </span>
    </a>
  )
}
