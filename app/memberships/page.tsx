import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const openPositions = [
  { id: 1, title: 'Social Media Manager', department: 'Marketing' },
  { id: 2, title: 'Event Coordinator', department: 'Operations' },
  { id: 3, title: 'Graphic Designer', department: 'Creative' },
]

export default function Recruitment() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Recruitment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {openPositions.map((position) => (
            <Card key={position.id}>
              <CardHeader>
                <CardTitle>{position.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Department:</strong> {position.department}</p>
                <Button className="mt-4">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

