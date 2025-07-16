export const getNameDisplay = (stat: string): string => {
  return stat
    .replace(/_/g, " ")
    .split(" ")
    .map((word) =>
      word.toLowerCase() === "hp" ? "HP" : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}