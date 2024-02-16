interface PageHeadingProps {
  title: string
  description: string
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <>
      <div className="space-y-1 md:space-y-4">
        <h1 className="inline-block font-heading text-2xl tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground md:text-xl">{description}</p>
      </div>
      <hr className="my-6 md:my-8" />
    </>
  )
}

export default PageHeading
