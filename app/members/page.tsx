import Navigation from '../components/Navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const members = [
  { id: 1, name: 'John Doe', role: 'President', joinDate: '2022-09-01' },
  { id: 2, name: 'Jane Smith', role: 'Treasurer', joinDate: '2022-09-15' },
  { id: 3, name: 'Bob Johnson', role: 'Member', joinDate: '2023-01-10' },
]

export default function Members() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Member Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}

