// "use client";

// import { Button } from '@/components/ui/button'
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <div className="max-w-2xl text-center">
//         <h1 className="mb-4 text-4xl font-bold">AI-Powered Resume Builder</h1>
//         <p className="mb-8 text-xl text-gray-600">
//           Create professional resumes with AI-powered suggestions and ATS optimization.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Link href="/resume">
//             <Button size="lg">Create Resume</Button>
//           </Link>
//           <Link href="/dashboard/template">
//             <Button variant="outline" size="lg">
//               View Templates
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      {/* Glassmorphic Card */}
      <div className="relative max-w-2xl text-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10">
        <h1 className="mb-4 text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Resume Builder
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          Create professional resumes with AI-powered suggestions and ATS optimization.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/resume">
            <Button
              size="lg"
              className="px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            >
              Create Resume
            </Button>
          </Link>

          <Link href="/dashboard/template">
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 text-lg font-semibold border-blue-400 text-blue-300 hover:bg-blue-900/20 transition-all duration-300"
            >
              View Templates
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
