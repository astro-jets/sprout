"use server";

type serviceProps = {
  _id: string;
  name: string;
  price: string;
  list: string[];
}[];

export const newService = async (formData: {}): Promise<
  | {
      message: string;
      status: string;
    }
  | any
> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/services/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getServices = async (): Promise<
  { service: serviceProps } | any
> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/services/all/`);
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
