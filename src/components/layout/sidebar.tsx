
// src/components/layout/sidebar.tsx
import Link from 'next/link'

export const Sidebar = () => {
  const menuItems = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/resumes', label: 'My Resumes' },
    { href: '/dashboard/templates', label: 'Templates' },
    { href: '/dashboard/settings', label: 'Settings' },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex flex-col space-y-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}