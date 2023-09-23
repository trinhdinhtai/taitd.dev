interface GridContainerProps {
  children: React.ReactNode
}

const GridContainer = ({ children }: GridContainerProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 py-2 sm:grid-cols-3">{children}</div>
  )
}

export default GridContainer
