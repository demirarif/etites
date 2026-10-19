import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "ghost" | "ink";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: ReactNode | null;
  block?: boolean;
  className?: string;
};

function classes({ variant = "primary", size = "md", block, className }: Common) {
  return ["btn", `btn--${variant}`, size === "sm" && "btn--sm", block && "btn--block", className]
    .filter(Boolean)
    .join(" ");
}

function Body({ children, icon }: { children: ReactNode; icon?: ReactNode | null }) {
  return (
    <span className="btn__body">
      <span className="btn__label">{children}</span>
      {icon !== null && <span className="btn__icon">{icon ?? <ArrowRight />}</span>}
    </span>
  );
}

export function ButtonLink(props: Common & { href: string; external?: boolean }) {
  const { href, external, children, icon } = props;
  if (external) {
    return (
      <a className={classes(props)} href={href} target="_blank" rel="noopener noreferrer">
        <Body icon={icon}>{children}</Body>
      </a>
    );
  }
  return (
    <Link className={classes(props)} href={href}>
      <Body icon={icon}>{children}</Body>
    </Link>
  );
}

export function Button(
  props: Common & { type?: "button" | "submit"; onClick?: () => void; disabled?: boolean; ariaLabel?: string },
) {
  return (
    <button
      type={props.type ?? "button"}
      className={classes(props)}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
    >
      <Body icon={props.icon}>{props.children}</Body>
    </button>
  );
}
