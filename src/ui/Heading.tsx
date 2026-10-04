import type {ComponentPropsWithoutRef, ElementType, ReactNode} from "react";

export type HeadingSize =
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-xs font-semibold",
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-lg font-bold",
  xl: "text-xl font-bold",
  "2xl": "text-2xl font-bold",
  "3xl": "text-3xl font-extrabold",
  "4xl": "text-4xl font-extrabold",
};

export type HeadingProps<T extends ElementType = "h1"> = {
  as?: T;
  size?: HeadingSize;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "children">;

function Heading<T extends ElementType = "h1">({
  as,
  size = "md",
  className = "",
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as || "h1";
  const sizeStyle = sizeClasses[size] || "";

  return (
    <Component className={`${sizeStyle} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export default Heading;
