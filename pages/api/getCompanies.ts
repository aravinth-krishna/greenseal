import prisma from "@/lib/prismaClient";

async function getCompanies() {
  const companies = await prisma.company.findMany();

  return companies;
}

const companies = async () => {
  const companies = await getCompanies();

  return companies;
};

export default companies;
