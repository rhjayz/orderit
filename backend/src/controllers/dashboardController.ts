import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../config/db";

type FilterType = "Today" | "This Week" | "This Month";

interface transactionProps {
  createdAt: Date;
  price: number;
}

interface yearDataProps {
  year: number;
  totalPrice: number;
  transaction: transactionProps[];
}

interface periodeDataProps {
  periode: number;
  years: Record<number, yearDataProps>;
}

export const index = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const state = await prisma.branch.findMany({
    where: { idUser: userId },
  });

  res.json(state);
});

export const dateRange = (
  filterButton: FilterType
): { startDate: Date; endDate: Date } => {
  let currentDate = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (filterButton) {
    case "Today":
      startDate = new Date(currentDate.setHours(0, 0, 0, 0));
      endDate = new Date(currentDate.setHours(23, 59, 59, 999));
      break;

    case "This Week":
      startDate = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
      );
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() - endDate.getDay() + 6);
      endDate.setHours(23, 59, 59, 999);
      break;

    case "This Month":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      endDate.setHours(23, 59, 59, 999);
      break;

    default:
      startDate = currentDate;
      endDate = currentDate;
      break;
  }

  return { startDate, endDate };
};

export const filterCard = asyncHandler(async (req: Request, res: Response) => {
  const { userId, selectedBranch, activeButton, selectedDate } = req.query;

  const filterButton = activeButton as FilterType;
  const id = userId as string;
  const branch = selectedBranch as string;
  const selectedDateStr = selectedDate ? String(selectedDate).trim() : null;
  const parseDate = selectedDateStr ? new Date(selectedDateStr) : null;
  const { startDate, endDate } = dateRange(filterButton);
  const dataChecked =
    parseDate && !isNaN(parseDate.getTime()) ? parseDate : startDate;

  const [state, setState] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        branch: {
          idUser: id,
        },
        createdAt: {
          gte: dataChecked,
          lte: endDate,
        },
        ...(branch ? { idBranch: branch } : {}),
      },
      include: {
        branch: true,
        user: true,
      },
    }),
    prisma.transaction.aggregate({
      _sum: { price: true },
      _count: { id: true },
      where: {
        branch: {
          idUser: id,
        },
        ...(branch ? { idBranch: branch } : {}),
        createdAt: {
          gte: dataChecked,
          lte: endDate,
        },
      },
    }),
  ]);

  res.json({
    state,
    totalPrice: setState._sum.price || 0,
    order: setState._count.id || 0,
  });
});

export const chartDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.query.userId as string;
    const startYear = 2021;
    const range = 8;

    const state = await prisma.transaction.findMany({
      where: {
        branch: {
          idUser: id,
        },
        createdAt: {
          gte: new Date("2021-01-01"),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const GroupingYearData = (transaction: transactionProps[]) => {
      return transaction.reduce<Record<number, periodeDataProps>>(
        (acc, trx) => {
          const year = new Date(trx.createdAt).getFullYear();
          const periode = Math.floor(year / 8) * 8;

          if (!acc[periode]) acc[periode] = { periode, years: {} };
          if (!acc[periode].years[year])
            acc[periode].years[year] = { year, totalPrice: 0, transaction: [] };

          acc[periode].years[year].totalPrice += trx.price;
          acc[periode].years[year].transaction.push(trx);

          return acc;
        },
        {}
      );
    };

    const groupedData = GroupingYearData(state);
    const formattedData = Object.values(groupedData).map((periode) => ({
      periode: periode.periode,
      years: Object.values(periode.years),
    }));

    const existingYears = new Map(
      formattedData.flatMap((d) => d.years.map((y) => [y.year, y.totalPrice]))
    );

    const result = Array.from({ length: range }, (_, i) => {
      const year = startYear + i;
      return {
        year,
        totalPrice: existingYears.get(year) || 0,
      };
    });

    res.json(result);
  }
);

export const filterTable = asyncHandler(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const checkBox = req.query.isChecked as string;
  const search = req.query.filterSearch as string;
  const limit = req.query.filterShow as string;

  const check = {
    id,
    checkBox,
    search,
    limit,
  };
  console.log("echo", check);
});
