
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

// src/components/layout/navbar.tsx
"use client"

import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Resume Builder</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/templates">Templates</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}