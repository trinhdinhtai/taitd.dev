interface ExperienceItemProps {
  experience: {
    title: string
    location: string
    date: string
    description: string
  }
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  const { title, location, date, description } = experience
  return (
    <div className="md:space-x-4] relative mx-12 grid pb-12 before:absolute before:left-[-35px] before:block before:h-full before:border-l-2 before:border-primary/20 before:content-[''] md:grid-cols-5 md:gap-10">
      <div className="relative pb-12 md:col-span-2">
        <div className="sticky top-0">
          <span className="absolute -left-[48px] rounded-full text-5xl text-muted-foreground">
            &bull;
          </span>

          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {location}
          </h4>
          <time className="m-0 p-0 text-sm text-gray-600/80 dark:text-white/80">
            {date}
          </time>
        </div>
      </div>

      <div className="relative flex flex-col gap-2 pb-4 text-gray-600 dark:text-gray-300 md:col-span-3">
        {description}
      </div>
    </div>
  )
}
