import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up existing data...");
  await prisma.scholarship.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.resource.deleteMany({});

  console.log("Seeding scholarships...");
  await prisma.scholarship.createMany({
    data: [
      {
        title: "National Merit Scholarship",
        description: "A prestigious scholarship awarded based on PSAT/NMSQT scores.",
        amount: "$2,500",
        deadline: new Date("2026-10-15"),
        organization: "National Merit Scholarship Corporation",
        url: "https://www.nationalmerit.org/"
      },
      {
        title: "Women in Tech Grant",
        description: "Supporting women pursuing degrees in Computer Science and Engineering.",
        amount: "$5,000",
        deadline: new Date("2026-11-01"),
        organization: "Tech Forward Initiative",
        url: "https://womenintech.org/scholarships"
      }
    ]
  });

  console.log("Seeding events...");
  await prisma.event.createMany({
    data: [
      {
        title: "Future of AI Career Fair",
        description: "Connect with top tech companies hiring in AI and Machine Learning.",
        date: new Date("2026-08-20T10:00:00Z"),
        location: "Virtual",
        type: "career_fair",
        url: "https://www.aicareerfair.example.com"
      },
      {
        title: "Resume Building Masterclass",
        description: "Learn how to craft a resume that gets past ATS systems.",
        date: new Date("2026-08-05T14:00:00Z"),
        location: "Virtual",
        type: "webinar",
        url: "https://www.resumebuilder.example.com/masterclass"
      }
    ]
  });

  console.log("Seeding resources...");
  await prisma.resource.createMany({
    data: [
      {
        title: "System Design Interview Guide",
        description: "Comprehensive guide for tackling system design interviews at FAANG.",
        category: "Computer Science",
        url: "https://github.com/donnemartin/system-design-primer"
      },
      {
        title: "Data Structures Cheatsheet",
        description: "Quick reference for big-O complexities and algorithms.",
        category: "Computer Science",
        url: "https://www.bigocheatsheet.com/"
      }
    ]
  });

  console.log("Seeding mentors...");
  const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Mentor 1
  await prisma.user.upsert({
    where: { email: 'mentor1@beyou.com' },
    update: {},
    create: {
      email: 'mentor1@beyou.com',
      name: 'Dr. Sarah Jenkins',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'Former Admissions Director at top medical colleges with 15+ years helping students crack NEET and secure placements.',
          company: 'Med Prep Academy',
          role: 'Chief Medical Counselor',
          expertise: JSON.stringify(['NEET UG', 'Medical', 'Interviews', 'Career Planning']),
          yearsExperience: 15,
          hourlyRate: 800,
          rating: 4.9,
          totalSessions: 340
        }
      }
    }
  });

  // Mentor 2
  await prisma.user.upsert({
    where: { email: 'mentor2@beyou.com' },
    update: {},
    create: {
      email: 'mentor2@beyou.com',
      name: 'Rahul Sharma (IAS)',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'UPSC CSE Rank 45 (2022). I help aspirants strategize their preparation, manage time, and master answer writing.',
          company: 'Government of India',
          role: 'IAS Officer',
          expertise: JSON.stringify(['UPSC CSE', 'Government Exams', 'Strategy', 'Answer Writing']),
          yearsExperience: 3,
          hourlyRate: 0,
          rating: 4.95,
          totalSessions: 125
        }
      }
    }
  });

  // Mentor 3
  await prisma.user.upsert({
    where: { email: 'mentor3@beyou.com' },
    update: {},
    create: {
      email: 'mentor3@beyou.com',
      name: 'Priya Desai',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'Senior Software Engineer at Google. Mentoring students for JEE Advanced, GATE, and FAANG technical interviews.',
          company: 'Google',
          role: 'Senior Software Engineer',
          expertise: JSON.stringify(['Engineering', 'JEE Advanced', 'GATE', 'Tech Interviews']),
          yearsExperience: 7,
          hourlyRate: 500,
          rating: 4.8,
          totalSessions: 89
        }
      }
    }
  });

  // Mentor 4 (Design)
  await prisma.user.upsert({
    where: { email: 'mentor4@beyou.com' },
    update: {},
    create: {
      email: 'mentor4@beyou.com',
      name: 'Aisha Khan',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'Lead UX Designer with a passion for helping students build their portfolios for NID and top design schools.',
          company: 'Creative Studios',
          role: 'Lead UX Designer',
          expertise: JSON.stringify(['Design', 'NID', 'Portfolio', 'UI/UX']),
          yearsExperience: 8,
          hourlyRate: 400,
          rating: 4.85,
          totalSessions: 156
        }
      }
    }
  });

  // Mentor 5 (Sports)
  await prisma.user.upsert({
    where: { email: 'mentor5@beyou.com' },
    update: {},
    create: {
      email: 'mentor5@beyou.com',
      name: 'Vikram Singh',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'National level badminton coach. I guide athletes on sports scholarships, training regimes, and balancing academics.',
          company: 'National Sports Academy',
          role: 'Head Coach',
          expertise: JSON.stringify(['Sports', 'Scholarships', 'Athletics', 'Training']),
          yearsExperience: 12,
          hourlyRate: 300,
          rating: 4.7,
          totalSessions: 210
        }
      }
    }
  });

  // Mentor 6 (Study Abroad)
  await prisma.user.upsert({
    where: { email: 'mentor6@beyou.com' },
    update: {},
    create: {
      email: 'mentor6@beyou.com',
      name: 'Emily Chen',
      password: hashedPassword,
      role: 'mentor',
      mentorProfile: {
        create: {
          bio: 'Admissions Consultant for Ivy League universities. I help with essays, SAT prep, and finding the right fit for your undergrad.',
          company: 'Global Ed Counsel',
          role: 'Admissions Consultant',
          expertise: JSON.stringify(['Study Abroad', 'Ivy League', 'SAT', 'Essays']),
          yearsExperience: 6,
          hourlyRate: 1000,
          rating: 4.95,
          totalSessions: 420
        }
      }
    }
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
