// "use client";

// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold">AI-Powered Resume Builder</h1>

//       <SignedOut>
//         <SignInButton>
//           <Button className="mt-4">Sign In to Get Started</Button>
//         </SignInButton>
//       </SignedOut>

//       <SignedIn>
//         <UserButton />
//         <p className="mt-4">Go to your dashboard to create your resume.</p>
//         <Button className="mt-4" onClick={() => router.push("/dashboard")}>
//           Go to Dashboard
//         </Button>
//       </SignedIn>
//     </main>
//   );
// }


// "use client";

// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//       <div className="bg-white text-gray-900 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
//         <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//           AI-Powered Resume Builder
//         </h1>

//         <SignedOut>
//           <SignInButton>
//             <Button className="mt-6 w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300">
//               Sign In to Get Started
//             </Button>
//           </SignInButton>
//         </SignedOut>

//         <SignedIn>
//           <div className="mt-6">
//             <UserButton />
//             <p className="mt-4 text-lg text-gray-700">
//               Go to your dashboard to create your resume.
//             </p>
//             <Button
//               className="mt-6 w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-all duration-300"
//               onClick={() => router.push("/dashboard")}
//             >
//               Go to Dashboard
//             </Button>
//           </div>
//         </SignedIn>
//       </div>
//     </main>
//   );
// }


"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      {/* Glassmorphic Card */}
      <div className="relative max-w-lg w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Resume Builder
        </h1>

        <SignedOut>
          <SignInButton>
            <Button className="mt-6 w-full py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300">
              Sign In to Get Started
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="mt-6">
            <UserButton />
            <p className="mt-4 text-lg text-gray-300">
              Go to your dashboard to create your resume.
            </p>
            <Button
              className="mt-6 w-full py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 transition-all duration-300"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </SignedIn>
      </div>
    </main>
  );
}
