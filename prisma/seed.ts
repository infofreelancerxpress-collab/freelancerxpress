import "dotenv/config";
import prisma from "../lib/prisma";
import { initialTeamMembers } from "../data/team";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Start seeding ...");

  for (const member of initialTeamMembers) {
    const user = await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: {
        id: member.id,
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        linkedin: member.linkedin,
        twitter: member.twitter,
        email: member.email,
        isActive: true,
      },
    });
    console.log(`Created team member: ${user.name}`);
  }

  const adminEmail = "admin@freelancerxpress.com";
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin User",
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log("Admin user already exists.");
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
