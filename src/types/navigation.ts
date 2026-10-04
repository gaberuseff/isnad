import type {TablerIcon} from "@tabler/icons-react";

export interface NavLinkItem {
  href: string;
  label: string;
  Icon: TablerIcon;
}

export interface NavProps {
  links: NavLinkItem[];
}
