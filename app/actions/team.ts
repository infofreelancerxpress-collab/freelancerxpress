"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { teamMemberSchema, TeamMemberFormValues } from "@/lib/validations/team";
import imagekit from "@/lib/imagekit";

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: members };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return { success: false, error: "Failed to fetch team members" };
  }
}

export async function createTeamMember(data: TeamMemberFormValues) {
  try {
    const validatedData = teamMemberSchema.parse(data);
    const member = await prisma.teamMember.create({
      data: validatedData,
    });
    revalidatePath("/dashboard/team");
    return { success: true, data: member };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: "Failed to create team member" };
  }
}

export async function updateTeamMember(id: string, data: TeamMemberFormValues) {
  try {
    const validatedData = teamMemberSchema.parse(data);
    const member = await prisma.teamMember.update({
      where: { id },
      data: validatedData,
    });
    revalidatePath("/dashboard/team");
    return { success: true, data: member };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });
    revalidatePath("/dashboard/team");
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: "Failed to delete team member" };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: file.name,
      folder: "/",
    });

    return { success: true, data: response.url, fileId: response.fileId };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
