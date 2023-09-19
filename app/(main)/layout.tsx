import { navbarLinks } from "@/config/navbarLinks"
import MainNavbar from "@/components/layout/main-nav"
import Logo from "@/components/logo"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 max-w-4xl bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Logo />
          <MainNavbar items={navbarLinks} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default MainLayout
