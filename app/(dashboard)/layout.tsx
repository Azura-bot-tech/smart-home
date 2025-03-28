"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserAvatar } from "@/components/ui/user-avatar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-end px-6 py-7 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-black font-bold text-lg">
            <TriangleIcon className="w-6 h-6" />
          </Link>
          <nav className="hidden md:flex space-x-12 self-end">
            <NavItem href="/" label="Home" />
            <NavItem href="/monitor" label="Monitor" />
            <NavItem href="/watering-control" label="Watering Control" />
            <NavItem href="/light-control" label="Light Control" />
            <NavItem href="/settings" label="Settings" />

          </nav>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/help" className="text-muted-foreground hover:text-black">
            Help
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-black">
            Contact
          </Link>
          <UserAvatar />
        </div>
      </header>
      
      
      <main className="flex-1 p-2 pt-5 bg-[#D9D9D9] bg-opacity-5">{children}</main>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname(); 
  const isActive = pathname === href; 

  return (
    <Link
      href={href}
      className={`font-medium transition-colors ${
        isActive ? "text-black font-bold" : "text-muted-foreground hover:text-black"
      }`}
    >
      {label}
    </Link>
  );
}

function TriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );
}