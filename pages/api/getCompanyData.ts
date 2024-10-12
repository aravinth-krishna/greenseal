import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const companies = await prisma.company.findMany({
        select: {
          id: true,
          name: true,
          industry: true,
          logo: true,
          web_url: true,
          environment_grade: true,
          environment_level: true,
          environment_score: true,
          last_processing_date: true,
        },
      });
      res.status(200).json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({
        error: `Error fetching companies: ${(error as Error).message}`,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
