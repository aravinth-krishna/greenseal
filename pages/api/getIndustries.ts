import prisma from "@/lib/prismaClient";

async function getIndustries() {
  const industries = await prisma.company.findMany({
    distinct: ["industry"],
    select: {
      industry: true,
    },
  });

  return industries;
}

const industries = async () => {
  const industries = await getIndustries();

  return industries;
};

export default industries;
