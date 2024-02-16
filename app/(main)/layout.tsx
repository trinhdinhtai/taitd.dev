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
        <div className="container lg:max-w-4xl xl:max-w-6xl">
          <div className="flex h-20 items-center space-x-8 py-6">
            <Logo />
            <MainNavbar />
          </div>
        </div>
      </header>
      <main className="container flex-1 py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
