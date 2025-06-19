import { escapeRegex } from "@/shared/utils/str/escapeRegex";
import { useTheme } from "@mui/material/styles";
import { CSSProperties } from "react";

export interface HighlightManyProps {
  text: string;
  searches: string[];
  color?: string;
  autoHighlight?: boolean;
  matchStyle?: CSSProperties;
  matchClass?: string;
  normalStyle?: CSSProperties;
  normalClass?: string;
}

export const HighlightMany = ({
  text,
  searches,
  color,
  autoHighlight = true,
  matchStyle,
  matchClass,
  normalStyle,
  normalClass,
}: HighlightManyProps) => {
  const theme = useTheme();
  const highlightColor = color || theme.palette.primary.main;

  // Filter out any empty or whitespace-only search terms.
  const validSearches = searches.filter((s) => s.trim().length > 0);

  // If there are no valid searches, just return the text.
  if (validSearches.length === 0) {
    return <>{text}</>;
  }

  // Escape each search term for use in the regex.
  const escapedSearches = validSearches.map((s) => escapeRegex(s));

  // Build a regex that matches any of the search terms (case-insensitive).
  const regex = new RegExp(`(${escapedSearches.join("|")})`, "gi");

  // Split the text by the regex, which will include the matched terms.
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Check if the current part is one of the search terms.
        const isMatch = validSearches.some(
          (search) => part.toLowerCase() === search.toLowerCase()
        );
        const effectiveStyle = isMatch ? matchStyle : normalStyle;
        const effectiveClass = isMatch ? matchClass : normalClass;

        return (
          <span
            key={index}
            style={{
              color: autoHighlight && isMatch ? highlightColor : "inherit",
              whiteSpace: "pre", // or "pre-wrap" if needed
              ...effectiveStyle,
            }}
            className={effectiveClass}
          >
            {part}
          </span>
        );
      })}
    </>
  );
};
