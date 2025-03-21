// import Link from 'next/link';
// import {
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   Settings,
//   ShoppingCart,
//   Users2,
//   ListChecks,
//   Wallet,
//   PieChart,
//   Target,

// } from 'lucide-react';

// import CommonBreadcrumb from './breadcrump';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger
// } from '@/components/ui/tooltip';
// import { Analytics } from '@vercel/analytics/react';
// import { User } from './user';
// import { VercelLogo } from '@/components/icons';
// import Providers from './providers';
// import { NavItem } from './nav-item';
// import { SearchInput } from './search';

// export default function DashboardLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Providers>
//       <main className="flex min-h-screen w-full flex-col bg-muted/40">
//         <DesktopNav />
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//             <MobileNav />
//             <CommonBreadcrumb />
//             <SearchInput />
//             <User />
//           </header>
//           <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
//             {children}
//           </main>
//         </div>
//         <Analytics />
//       </main>
//     </Providers>
//   );
// }

// function DesktopNav() {
//   return (
//     <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//       <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//         <Link
//           href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs"
//           className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//         >
//           <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
//           <span className="sr-only">Acme Inc</span>
//         </Link>

//         <NavItem href="/" label="Dashboard">
//           <Home className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/transactions" label="Orders">
//           <ListChecks className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/wallet" label="Products">
//           <Wallet className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/report" label="Customers">
//           <PieChart className="h-5 w-5" />
//         </NavItem>

//         <NavItem href="/goal" label="Analytics">
//           <Target className="h-5 w-5" />
//         </NavItem>
//       </nav>
//       <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Link
//               href="#"
//               className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//             >
//               <Settings className="h-5 w-5" />
//               <span className="sr-only">Settings</span>
//             </Link>
//           </TooltipTrigger>
//           <TooltipContent side="right">Settings</TooltipContent>
//         </Tooltip>
//       </nav>
//     </aside>
//   );
// }

// function MobileNav() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" variant="outline" className="sm:hidden">
//           <PanelLeft className="h-5 w-5" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="sm:max-w-xs">
//         <nav className="grid gap-6 text-lg font-medium">
//           <Link
//             href="#"
//             className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//           >
//             <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//             <span className="sr-only">Vercel</span>
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <Home className="h-5 w-5" />
//             Dashboard
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <ShoppingCart className="h-5 w-5" />
//             Orders
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-foreground"
//           >
//             <Package className="h-5 w-5" />
//             Products
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <Users2 className="h-5 w-5" />
//             Customers
//           </Link>
//           <Link
//             href="#"
//             className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//           >
//             <LineChart className="h-5 w-5" />
//             Settings
//           </Link>
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import Link from "next/link";
import { Home, Monitor, Settings, Droplet, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-black font-medium">
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