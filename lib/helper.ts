export const formatPriceInDollar = (price: number) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return dollarsAmount;
};

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  return date
    .toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(" AM", "")
    .replace(" PM", "");
}

// Function to format numbers with commas
export const formatNumber = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  return numericValue
    ? new Intl.NumberFormat("en-US").format(Number(numericValue))
    : "";
};
