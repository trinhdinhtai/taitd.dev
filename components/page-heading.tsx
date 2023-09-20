interface PageHeadingProps {
  title: string
  description: string
}

const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <>
      <div className="flex-1 space-y-4">
        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>
      <hr className="my-8" />
    </>
  )
}

export default PageHeading
