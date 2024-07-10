"use server";

import { compileTemplate, sendMail } from "@/lib/mail";

type emailDataProps = {
  name: string;
  email: string;
  url: string;
};

export const newLesson = async (
  formData: {},
  emailData: emailDataProps
): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/lessons/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const res = await response.json();
    // Sending an email
    if (res) {
      await sendMail({
        name: emailData.name,
        subject: res.title as string,
        to: emailData.email,
        body: compileTemplate(
          emailData.name,
          emailData.url,
          res.message as string
        ),
      });
    }
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getlessons = async (): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/lessons/all/`, {
      next: { revalidate: 0 },
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const updateLesson = async (
  status: string,
  id: string,
  emailData: emailDataProps
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/lessons/update/?status=${status}&lesson=${id}`,
      {
        method: "PATCH",
        next: { revalidate: 0 },
      }
    );
    const res = await response.json();
    if (res) {
      // Sending an email
      if (res) {
        await sendMail({
          name: emailData.name,
          subject: res.title as string,
          to: emailData.email,
          body: compileTemplate(
            emailData.name,
            emailData.url,
            res.message as string
          ),
        });
      }
    }
    return res;
  } catch (e) {
    console.error(e);
  }
};
