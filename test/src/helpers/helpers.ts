export const getSiteUrl = (url: string): string => {
  return url.replace(/(https?:\/\/)?(www\.)?/, "");
};
export const formatText = (text: string) => {
  return text
    .split("_")
    .map((word, index) => {
      if (word.length > 3) {
        word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      if (index !== 0) {
        word = word.toLowerCase();
      }
      return word;
    })
    .join("-");
};

const colorBySite: Record<string, string> = {
  "games.company.com": "#E14165",
  "market.company.com": "#C2C2FF",
  "delivery.company.com": "#8686FF",
};

export const getIndicatorColor = (site: string): string => {
  return colorBySite[site] || "#E14165";
};

const colorByStatus: Record<string, string> = {
  ONLINE: "#1BDA9D",
  PAUSED: "#FF8346",
  STOPPED: "#FE4848",
  DRAFT: "#5C5C5C",
};

export const getStatusTextColor = (status: string): string => {
  return colorByStatus[status] || "#5C5C5C";
};
