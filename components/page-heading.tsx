interface PageHeadingProps {
  title: string
  description: string
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="inline-block font-heading text-2xl tracking-tight md:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
      <hr className="my-6 md:my-4" />
    </>
  )
}

export default PageHeading
