import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={cn("mt-20")} id="main-content">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
