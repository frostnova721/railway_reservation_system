import prisma from "../src/prisma";

export class SeatDB {
  public book = async (compartmentId: number, seatNumber: number, userId: number) => {
    const seat = await prisma.seat.findFirst({
      where: { compartmentId, seatNumber },
      select: { id: true, available: true },
    });
    if (!seat) {
      console.log("Seat not found!");
      return false;
    }
    if (!seat.available) {
      console.log("This seat is already booked!");
      return false;
    }
    await prisma.seat.update({
      where: { id: seat.id },
      data: {
        available: false,
        bookedBy: userId,
      },
    });
    console.log(`Seat ${seatNumber} in compartment ${compartmentId} booked successfully!`);
    return true;
  };

  public getBooked = async (userId: number) => {
    return await prisma.seat.findMany({
      where: {
        id: userId,
      }, include: {
        compartment : {
          include : {
            train : true
          },
        }
      }
    })
  }
}
