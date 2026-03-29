'use client';

import { useState } from "react";
import { TeamMember } from "@/lib/generated/prisma/client";
import { TeamMemberCard } from "./team-card"; // Updated import path
import { TeamForm } from "./team-form"; // Updated import path
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteTeamMember } from "@/app/actions/team";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TeamManagerProps {
    initialMembers: TeamMember[];
}

export function TeamManager({ initialMembers }: TeamManagerProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const handleEdit = (member: TeamMember) => {
        setEditingMember(member);
    };

    const handleDelete = async () => {
        if (!deletingId) return;

        try {
            const res = await deleteTeamMember(deletingId);
            if (res.success) {
                toast.success("Team member deleted");
                setDeletingId(null);
                router.refresh();
            } else {
                toast.error(res.error || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleSuccess = () => {
        setIsAddOpen(false);
        setEditingMember(null);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground">
                        Manage your team members and their roles.
                    </p>
                </div>
                <Button className="cursor-pointer" onClick={() => setIsAddOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {initialMembers.map((member) => (
                    <TeamMemberCard
                        key={member.id}
                        member={member}
                        onEdit={handleEdit}
                        onDelete={setDeletingId}
                    />
                ))}
            </div>

            {initialMembers.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No team members found. Add one to get started.
                </div>
            )}

            {/* Add Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                        <DialogDescription>
                            Add a new member to your team. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <TeamForm onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Team Member</DialogTitle>
                        <DialogDescription>
                            Make changes to the team member profile here.
                        </DialogDescription>
                    </DialogHeader>
                    {editingMember && (
                        <TeamForm initialData={editingMember} onSuccess={handleSuccess} />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the team member from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
