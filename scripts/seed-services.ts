import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const services = [
  { title: 'Web Design', description: 'Create stunning, responsive websites that captivate your audience and drive conversions.' },
  { title: 'Graphics & Logo Design', description: 'Build a memorable brand identity with professional logo and graphic design services.' },
  { title: 'Email Marketing', description: 'Engage your audience with targeted email campaigns that convert subscribers into customers.' },
  { title: 'Facebook Page Boosting', description: 'Amplify your reach and engagement with strategic Facebook advertising campaigns.' },
  { title: 'Social Media Marketing', description: 'Build your brand and connect with customers across all major social platforms.' },
  { title: 'Banner Design', description: 'Eye-catching banner designs for web, social media, and advertising campaigns.' },
  { title: 'SEO', description: 'Improve your search engine rankings and drive organic traffic with proven SEO strategies.' },
  { title: 'Server-Side Tracking', description: 'Accurate, privacy-friendly tracking using server-side analytics and event measurement.' },
];

async function main() {
  const existingCount = await prisma.service.count();
  if (existingCount > 0) {
    console.log(`Services already exist (${existingCount}). Skipping seed.`);
    return;
  }

  for (const s of services) {
    await prisma.service.create({ data: s });
    console.log(`Created: ${s.title}`);
  }

  const count = await prisma.service.count();
  console.log(`\nDone! ${count} services seeded.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
