import prisma from "../src/prisma";
import jwt from "jsonwebtoken";

export default class UserDB {
  public static register = async (
    name: string,
    password: string,
    email: string
  ): Promise<boolean> => {
    try {
      await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  private static JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET";

  public static login = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    const user = await prisma.user.findUnique({
      where: { email: email, AND: { password: password } },
    });

    if (!user) return null;
    const tkn = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      this.JWT_SECRET
    );
    return tkn;
  };

  public static get = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };
}
