interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container py-6 md:max-w-2xl lg:max-w-4xl lg:py-10 xl:max-w-6xl">
      {children}
    </div>
  )
}

export default Container
