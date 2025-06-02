import Form from "next/form";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { renderToString } from "react-dom/server";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const country = formData.get("country") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const cardNumber = formData.get("cardNumber") as string;
    const expiryDate = new Date(formData.get("expiryDate") as string);

    await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        user: {
          connect: { id: 1 },
        },
      },
    });

    redirect("/");
  }

  return;
}
