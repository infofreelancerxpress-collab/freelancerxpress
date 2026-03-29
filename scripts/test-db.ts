import prisma from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    console.log("Connecting to database...");
    const members = await prisma.teamMember.findMany();
    console.log("Successfully fetched members:", members);
  } catch (error) {
    console.error("Error details:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
