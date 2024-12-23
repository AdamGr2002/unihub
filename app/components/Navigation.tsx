import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-gray-300">Dashboard</Link></li>
        <li><Link href="/members" className="hover:text-gray-300">Members</Link></li>
        <li><Link href="/events" className="hover:text-gray-300">Events</Link></li>
        <li><Link href="/recruitment" className="hover:text-gray-300">Recruitment</Link></li>
      </ul>
    </nav>
  )
}

export default Navigation

