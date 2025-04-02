import prisma from "../src/prisma";

export default class TrainDB {
  public createTrain = async (
    name: string,
    compartments: number
  ): Promise<boolean> => {
    await prisma.train.create({
      data: {
        name: name,
        compartments: {
          create: Array.from({ length: compartments }).map(() => ({
            seats: {
              create: Array.from({ length: 24 }).map((_, i) => ({
                seatNumber: i + 1,
              })),
            },
          })),
        },
      },
    });

    return true;
  };

  public getTrain = async (id: number | null) => {
    if (!id) {
      return await prisma.train.findMany({
        include: { compartments: { include: { seats: true } } },
      });
    } else {
      const train = await prisma.train.findFirst({
        where: { id },
        include: { compartments: { include: { seats: true } } },
      });
      return train ? [train] : [];
    }
  };

  public removeTrain = async (id: number) => {
    await prisma.train.delete({ where: { id: id } });
  };
}
