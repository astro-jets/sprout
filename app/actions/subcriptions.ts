"use server";

type subscriptionProps = {
  services: {
    _id: string;
    name: string;
    price: string;
    list: string[];
  }[];
};

export const newSubscription = async (
  serviceId: string,
  userId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/subscriptions/new`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ user: userId, service: serviceId }),
      }
    );

    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getSubscriptions = async (
  id: string
): Promise<{ subscriptions: subscriptionProps } | any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/subscriptions/all/?user=${id}`
    );
    const res = await response.json();
    console.log(res);
    return res;
  } catch (e) {
    return e;
  }
};
