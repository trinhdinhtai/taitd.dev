interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container max-w-4xl py-6 lg:py-10">{children}</div>
}

export default Container
