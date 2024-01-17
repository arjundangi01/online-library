export const getDate = (createdAt) => {
  const date = new Date(createdAt);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return { day, month };
};

export const monthObj = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const yearObj = {
  2024: "2024",
  2023: "2023",
};
