import { escapeRegex } from "@/shared/utils/str/escapeRegex";
import { useTheme } from "@mui/material/styles";
import { CSSProperties } from "react";

export interface HighlightProps {
  text: string;
  search: string;
  color?: string;
  autoHighlight?: boolean;
  matchStyle?: CSSProperties;
  matchClass?: string;
  normalStyle?: CSSProperties;
  normalClass?: string;
}

export const Highlight = ({
  text,
  search,
  color,
  matchStyle,
  matchClass,
  normalClass,
  normalStyle,
  autoHighlight = true,
}: HighlightProps) => {
  const theme = useTheme();
  const highlightColor = color || theme.palette.primary.main; // Используем MUI primary color по умолчанию

  const escapedHighlight = escapeRegex(search);
  const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === search.toLowerCase();
        const effectiveStyles = isMatch ? matchStyle : normalStyle;
        const effectiveClass = isMatch ? matchClass : normalClass;
        return (
          <span
            key={index}
            style={{
              color: autoHighlight && isMatch ? highlightColor : "inherit",
              whiteSpace: "pre", // или pre-wrap
              ...effectiveStyles,
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
