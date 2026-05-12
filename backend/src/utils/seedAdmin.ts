import bcrypt from "bcrypt";

import { prisma } from "../config/prisma";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: "admin@test.com",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "123456",
      10
    );

    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@test.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin created");
  } catch (error) {
    console.log(error);
  }
};