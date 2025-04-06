
// // src/components/layout/navbar.tsx
// import { User } from '@/types'
// import { Button } from '../ui/button'
// import Link from 'next/link'

// interface NavbarProps {
//   user?: User
// }

// export const Navbar = ({ user }: NavbarProps) => {
//   return (
//     <nav className="border-b bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between">
//           <div className="flex">
//             <Link href="/" className="flex items-center">
//               <span className="text-xl font-bold">Resume Builder</span>
//             </Link>
//           </div>
//           <div className="flex items-center">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <Link href="/dashboard">Dashboard</Link>
//                 <Button variant="outline">Sign Out</Button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link href="/auth/login">
//                   <Button variant="outline">Sign In</Button>
//                 </Link>
//                 <Link href="/auth/register">
//                   <Button>Sign Up</Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// // src/components/layout/navbar.tsx
// "use client"

// import Link from 'next/link'

// export const Navbar = () => {
//   return (
//     <nav className="border-b bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 justify-between">
//           <div className="flex">
//             <Link href="/" className="flex items-center">
//               <span className="text-xl font-bold">Resume Builder</span>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link href="/dashboard">Dashboard</Link>
//             <Link href="/dashboard/template">Templates</Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/40 shadow-md z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Resume Builder
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/dashboard/template">Templates</NavLink>
            <NavLink href="/dashboard/prepare">Prepare</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-white hover:text-blue-400 transition-all duration-300"
    >
      {children}
    </Link>
  );
};
