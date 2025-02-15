// // src/app/dashboard/page.tsx
// import { Sidebar } from '@/components/layout/sidebar'

// export default function Dashboard() {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* Add dashboard cards/widgets here */}
//         </div>
//       </main>
//     </div>
//   )
// }

// src/app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">AI-Powered Resume Builder</h1>
        <p className="mb-8 text-xl text-gray-600">
          Create professional resumes with AI-powered suggestions and ATS optimization.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard/resumes/new">
            <Button size="lg">Create Resume</Button>
          </Link>
          <Link href="/dashboard/templates">
            <Button variant="outline" size="lg">
              View Templates
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}