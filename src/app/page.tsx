// // app/page.tsx
// "use client";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export default function Home() {
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
//       </SignedIn>
//     </main>
//   );
// }


// "use client";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation"; // Import router

// export default function ResumeForm() {
//   const router = useRouter(); // Initialize router
  
//   const handleSave = () => {
//     // console.log(resume);
//     router.push("/dashboard"); // Navigate to dashboard after saving
//   };

//   return (
//     <main className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold">Create Your Resume</h1>

//       {/* Your existing form */}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-6">
//         <Button variant="outline" onClick={() => router.push("/")}>
//           Go Home
//         </Button>
//         <Button className="ml-auto" onClick={handleSave}>
//           Save & Go to Dashboard
//         </Button>
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">AI-Powered Resume Builder</h1>

      <SignedOut>
        <SignInButton>
          <Button className="mt-4">Sign In to Get Started</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <p className="mt-4">Go to your dashboard to create your resume.</p>
        <Button className="mt-4" onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </SignedIn>
    </main>
  );
}
