"use server";

export const getCars = async (): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/cars/all/`);
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
