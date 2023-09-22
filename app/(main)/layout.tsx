import Container from "@/components/layout/container"
import Footer from "@/components/layout/footer"
import MainNavbar from "@/components/layout/main-nav"
import Logo from "@/components/logo"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md">
        <div className="container md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <div className="flex h-20 items-center space-x-8 py-6">
            <Logo />
            <MainNavbar />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
