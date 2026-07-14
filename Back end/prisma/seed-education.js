"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Seeding education courses...");
    const courses = [
        // after-10th
        { title: "Intermediate (MPC/BiPC)", category: "Science Stream", duration: "2 Yrs", salary: "N/A", icon: "BookOpen", color: "bg-blue-600", careers: ["Preparation for Engineering/Medical"], educationLevel: "after_10th" },
        { title: "Polytechnic / Diploma", category: "Engineering Diploma", duration: "3 Yrs", salary: "2-4", icon: "Cpu", color: "bg-indigo-600", careers: ["Junior Engineer", "Technician", "Supervisor"], educationLevel: "after_10th" },
        { title: "ITI", category: "Industrial Training", duration: "1-2 Yrs", salary: "1-3", icon: "Wrench", color: "bg-orange-500", careers: ["Electrician", "Mechanic", "Fitter"], educationLevel: "after_10th" },
        { title: "Paramedical Diploma", category: "Healthcare Support", duration: "2 Yrs", salary: "2-5", icon: "Activity", color: "bg-red-500", careers: ["Lab Technician", "X-Ray Tech", "Nursing Asst"], educationLevel: "after_10th" },
        { title: "Fine Arts / Design", category: "Vocational", duration: "2-3 Yrs", salary: "2-5", icon: "Camera", color: "bg-pink-500", careers: ["Photographer", "Animator", "Interior Decorator"], educationLevel: "after_10th" },
        // after-12th
        { title: "Engineering & Tech", category: "B.Tech / B.E.", duration: "4 Yrs", salary: "4-12", icon: "Laptop", color: "bg-blue-600", careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer"], educationLevel: "after_12th" },
        { title: "Medical & Healthcare", category: "MBBS, BDS, BAMS", duration: "5.5 Yrs", salary: "5-15", icon: "HeartPulse", color: "bg-red-500", careers: ["Doctor", "Surgeon", "Dentist", "Therapist"], educationLevel: "after_12th" },
        { title: "Agriculture", category: "B.Sc Agriculture", duration: "4 Yrs", salary: "3-8", icon: "Leaf", color: "bg-green-600", careers: ["Agronomist", "Research Scientist", "Forest Officer"], educationLevel: "after_12th" },
        { title: "Commerce", category: "B.Com, BBA, CA", duration: "3-5 Yrs", salary: "4-10", icon: "Calculator", color: "bg-indigo-600", careers: ["Chartered Accountant", "Financial Analyst", "HR Manager"], educationLevel: "after_12th" },
        { title: "Arts & Humanities", category: "BA, Journalism", duration: "3 Yrs", salary: "3-7", icon: "Palette", color: "bg-pink-500", careers: ["Journalist", "Psychologist", "Content Writer"], educationLevel: "after_12th" },
        { title: "Law", category: "Integrated LLB", duration: "5 Yrs", salary: "4-15", icon: "Scale", color: "bg-amber-600", careers: ["Corporate Lawyer", "Judge", "Legal Advisor"], educationLevel: "after_12th" },
        { title: "Hotel Management", category: "BHM", duration: "3-4 Yrs", salary: "3-8", icon: "Building", color: "bg-teal-600", careers: ["Hotel Manager", "Chef", "Event Coordinator"], educationLevel: "after_12th" },
        { title: "Aviation", category: "Pilot, Cabin Crew", duration: "1-3 Yrs", salary: "5-20", icon: "Plane", color: "bg-sky-500", careers: ["Commercial Pilot", "Air Hostess", "ATC"], educationLevel: "after_12th" },
        { title: "Defence", category: "NDA", duration: "3-4 Yrs", salary: "6-12", icon: "Shield", color: "bg-slate-700", careers: ["Army Officer", "Navy Officer", "Air Force Pilot"], educationLevel: "after_12th" },
        // bachelors
        { title: "Bachelor of Technology", category: "B.Tech / B.E.", duration: "4 Yrs", salary: "4-15", icon: "Laptop", color: "bg-blue-600", careers: ["SDE", "Data Engineer", "Product Manager"], educationLevel: "bachelors" },
        { title: "Bachelor of Medicine", category: "MBBS", duration: "5.5 Yrs", salary: "6-20", icon: "HeartPulse", color: "bg-red-500", careers: ["Doctor", "Physician", "Specialist"], educationLevel: "bachelors" },
        { title: "Bachelor of Science", category: "B.Sc (Hons)", duration: "3-4 Yrs", salary: "3-8", icon: "Microscope", color: "bg-green-600", careers: ["Research Analyst", "Lab Tech", "Teacher"], educationLevel: "bachelors" },
        { title: "Bachelor of Commerce", category: "B.Com", duration: "3 Yrs", salary: "3-8", icon: "Calculator", color: "bg-indigo-600", careers: ["Accountant", "Tax Consultant", "Banker"], educationLevel: "bachelors" },
        { title: "Bachelor of Arts", category: "B.A.", duration: "3 Yrs", salary: "2-7", icon: "Palette", color: "bg-pink-500", careers: ["Writer", "Civil Servant", "Historian"], educationLevel: "bachelors" },
        { title: "Bachelor of Business", category: "BBA", duration: "3 Yrs", salary: "4-10", icon: "Briefcase", color: "bg-amber-600", careers: ["Marketing Manager", "HR Exec", "Sales Lead"], educationLevel: "bachelors" },
        { title: "Bachelor of Law", category: "LLB", duration: "3-5 Yrs", salary: "4-15", icon: "Scale", color: "bg-teal-600", careers: ["Lawyer", "Legal Advisor", "Judge"], educationLevel: "bachelors" },
        { title: "Computer Applications", category: "BCA", duration: "3 Yrs", salary: "3-10", icon: "Database", color: "bg-sky-500", careers: ["Web Developer", "System Analyst", "IT Admin"], educationLevel: "bachelors" },
        // masters
        { title: "Master of Technology", category: "M.Tech / M.E.", duration: "2 Yrs", salary: "8-25", icon: "Laptop", color: "bg-blue-600", careers: ["Senior Engineer", "R&D Scientist", "Tech Lead"], educationLevel: "masters" },
        { title: "Master of Business", category: "MBA", duration: "2 Yrs", salary: "10-30", icon: "TrendingUp", color: "bg-emerald-600", careers: ["Management Consultant", "CEO", "Investment Banker"], educationLevel: "masters" },
        { title: "Master of Science", category: "M.Sc", duration: "2 Yrs", salary: "5-15", icon: "FlaskConical", color: "bg-indigo-500", careers: ["Data Scientist", "Research Analyst", "Professor"], educationLevel: "masters" },
        { title: "Master of Arts", category: "M.A.", duration: "2 Yrs", salary: "4-10", icon: "Briefcase", color: "bg-pink-500", careers: ["Economist", "Author", "Policy Analyst"], educationLevel: "masters" },
        { title: "Medicine Specialization", category: "MD / MS", duration: "3 Yrs", salary: "12-40", icon: "Stethoscope", color: "bg-red-500", careers: ["Cardiologist", "Neurologist", "Chief Surgeon"], educationLevel: "masters" },
        { title: "Master of Laws", category: "LLM", duration: "1-2 Yrs", salary: "8-20", icon: "Scale", color: "bg-amber-600", careers: ["Senior Legal Counsel", "Partner", "Academic"], educationLevel: "masters" },
        // phd
        { title: "STEM Research", category: "Science & Tech", duration: "3-5 Yrs", salary: "8-25", icon: "Microscope", color: "bg-orange-600", careers: ["Principal Investigator", "Data Scientist", "Professor"], educationLevel: "phd" },
        { title: "Humanities & Arts", category: "Social Sciences", duration: "3-5 Yrs", salary: "6-15", icon: "BookOpen", color: "bg-amber-600", careers: ["Author", "Policy Advisor", "Historian"], educationLevel: "phd" },
        { title: "Management & Biz", category: "Business Admin", duration: "3-4 Yrs", salary: "12-30", icon: "BrainCircuit", color: "bg-red-600", careers: ["Corporate Strategist", "Think Tank Member", "Dean"], educationLevel: "phd" },
        { title: "Medical & Clinical", category: "Healthcare", duration: "3-6 Yrs", salary: "15-40+", icon: "Globe", color: "bg-teal-600", careers: ["Medical Director", "Epidemiologist", "R&D Head"], educationLevel: "phd" }
    ];
    await prisma.educationCourse.deleteMany({});
    await prisma.educationCourse.createMany({
        data: courses.map(c => ({
            ...c,
            careers: JSON.stringify(c.careers)
        }))
    });
    console.log("Education courses seeded successfully!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-education.js.map