import Navigation from '../components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const events = [
  { id: 1, name: 'Annual General Meeting', date: '2023-09-15', location: 'Main Hall' },
  { id: 2, name: 'Fundraising Gala', date: '2023-10-20', location: 'City Convention Center' },
  { id: 3, name: 'Workshop: Leadership Skills', date: '2023-11-05', location: 'Room 101' },
]

export default function Events() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Event Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

