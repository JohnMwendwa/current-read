export const getYear = (date: Date) => {
  return new Date(date).getFullYear();
};

export const getDay = (date: Date) => {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });
};
