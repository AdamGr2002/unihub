"use client"

import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'
import Link from "next/link"

export default function MembersPage() {
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth()
  const currentUser = useQuery(api.users.getCurrentUser, isAuthenticated ? undefined : "skip")
  const members = useQuery(api.memberships.getMembers, (currentUser as any)?.clubId ? { clubId: (currentUser as any).clubId } : "skip")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button asChild>
          <Link href="/members/add">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Member
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Club</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member._id}>
              <TableCell>
                <Link href={`/members/${member._id}`} className="hover:underline">
                  {member.userId}
                </Link>
              </TableCell>
              <TableCell>{member.clubId}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

