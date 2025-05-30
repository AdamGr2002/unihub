"use client"

import { useState } from "react"; // Import useState
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
// Link is no longer needed for the Add Member button itself
// import Link from "next/link"
import { AddMemberForm } from "@/components/add-member-form"; // Import the form
import { Id } from "@/convex/_generated/dataModel"; // Import Id for type safety

export default function MembersPage() {
  const [showAddMemberForm, setShowAddMemberForm] = useState(false); // State for form visibility
  const { isLoading: isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(api.users.getCurrentUser, isAuthenticated ? undefined : "skip");

  // Attempt to get clubId. This logic is based on your existing query.
  // It's crucial that `currentUser` somehow provides a valid `clubId` or this page
  // has another way to determine the club context.
  // Using `as any` is unsafe and should be addressed by properly typing `currentUser`
  // or the source from which `clubId` is derived.
  const clubIdToUse = (currentUser as (typeof currentUser & { clubId?: Id<"clubs"> }))?.clubId;

  const members = useQuery(
    api.memberships.getMembers,
    clubIdToUse ? { clubId: clubIdToUse } : "skip"
  );

  const handleAddMemberClick = () => {
    if (clubIdToUse) {
      setShowAddMemberForm(true);
    } else {
      // Handle the case where clubId is not available (e.g., show a toast)
      console.error("Club ID is not available to add a member.");
      // You might want to use a toast notification here for better UX
    }
  };

  const handleFormClose = () => {
    setShowAddMemberForm(false);
    // The form itself calls router.refresh(), so the members list should update.
  };

  if (isAuthenticated === undefined || (isAuthenticated && !currentUser)) {
    return <div>Loading user data...</div>; // Or a proper loading skeleton
  }

  return (
    <div className="space-y-4 p-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button onClick={handleAddMemberClick}> {/* Changed from Link to onClick */}
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Conditionally render the AddMemberForm */}
      {showAddMemberForm && clubIdToUse && (
        <div className="my-6 p-6 border rounded-lg shadow-sm bg-card"> {/* Added styling for the form section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Member</h2>
            <Button variant="ghost" size="sm" onClick={handleFormClose}>Close</Button>
          </div>
          <AddMemberForm clubId={clubIdToUse} onClose={handleFormClose} />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead> {/* Changed from 'id' for clarity */}
            <TableHead>Club ID</TableHead> {/* Changed from 'Club' */}
            <TableHead>Role</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member._id}>
              <TableCell>
                {/* Assuming you want to link to a user's profile, not member._id details page */}
                {/* <Link href={`/profile/${member.userId}`} className="hover:underline"> */}
                {member.userId}
                {/* </Link> */}
              </TableCell>
              <TableCell>{member.clubId}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {!members || members.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

