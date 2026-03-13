import classNames from "classnames";

type GridCols = 1 | 2 | 3 | 4 | 5 | 6;
type GridGap = 2 | 4 | 6 | 8 | 10 | 12;

const colsMap: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const colsResponsiveMap = {
  sm: { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6" },
  md: { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6" },
  lg: { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" },
  xl: { 1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6" },
} as const;

const gapMap: Record<GridGap, string> = {
  2: "gap-2",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

export type GridProps = {
  children: React.ReactNode;
  cols?: GridCols;
  colsSm?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  colsXl?: GridCols;
  gap?: GridGap;
  className?: string;
};

export default function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 6,
  className,
}: GridProps) {
  const classes = [
    "grid",
    colsMap[cols],
    colsSm && colsResponsiveMap.sm[colsSm],
    colsMd && colsResponsiveMap.md[colsMd],
    colsLg && colsResponsiveMap.lg[colsLg],
    colsXl && colsResponsiveMap.xl[colsXl],
    gapMap[gap],
  ].filter(Boolean);

  return <div className={classNames(classes, className)}>{children}</div>;
}
