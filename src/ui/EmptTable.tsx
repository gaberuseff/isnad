import {EmptyState, Table} from "@heroui/react";
import {IconInbox} from "@tabler/icons-react";
import type {ReactNode} from "react";

export type TableColumn = {
  key: string;
  label: string;
  isRowHeader?: boolean;
  align?: "start" | "center" | "end";
};

type Props = {
  cols?: TableColumn[];
  title?: string;
  description?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  action?: ReactNode;
};

function EmptTable({
  cols = [],
  title = "لا توجد بيانات متاحة",
  description = "لم يتم إضافة أو العثور على أي عناصر لعرضها هنا.",
  icon,
  ariaLabel = "جدول فارغ",
  action,
}: Props) {
  return (
    <div className="w-full">
      <Table className="w-full">
        <Table.ScrollContainer className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xs">
          <Table.Content
            aria-label={ariaLabel}
            className="min-w-[750px] w-full text-sm">
            {cols.length > 0 && (
              <Table.Header className="bg-surface-secondary/60 border-b border-border">
                {cols.map((col) => (
                  <Table.Column
                    key={col.key}
                    isRowHeader={col.isRowHeader}
                    className={`py-3.5 px-4 font-semibold text-foreground ${
                      col.align === "center" ? "text-center" : "text-start"
                    }`}>
                    {col.label}
                  </Table.Column>
                ))}
              </Table.Header>
            )}

            <Table.Body
              renderEmptyState={() => (
                <EmptyState className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-surface-secondary text-muted flex items-center justify-center">
                    {icon || <IconInbox size={24} stroke={1.8} />}
                  </div>

                  <div className="flex flex-col gap-1 max-w-sm">
                    <span className="text-sm font-semibold text-foreground">
                      {title}
                    </span>
                    {description && (
                      <span className="text-xs text-muted leading-relaxed">
                        {description}
                      </span>
                    )}
                  </div>

                  {action && <div className="mt-2">{action}</div>}
                </EmptyState>
              )}>
              {[]}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}

export default EmptTable;
export {EmptTable as EmptyTable};
