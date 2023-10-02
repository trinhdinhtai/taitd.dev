interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl">
      {children}
    </div>
  )
}

export default Container
