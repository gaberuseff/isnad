import {Button} from "@heroui/react";
import {IconAlertTriangle, IconRefresh} from "@tabler/icons-react";

interface ErrorStateProps {
  error?: string | Error | null;
  title?: string;
  onRetry?: () => void;
}

function ErrorState({
  error,
  title = "حدث خطأ غير متوقع",
  onRetry,
}: ErrorStateProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "تعذر إكمال العملية، يرجى المحاولة مرة أخرى.";

  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
      <div className="flex flex-col items-center text-center max-w-sm w-full p-6 border border-border bg-surface rounded-2xl shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-3">
          <IconAlertTriangle size={24} stroke={1.8} />
        </div>

        <h3 className="text-base font-semibold text-foreground mb-1">
          {title}
        </h3>

        <p className="text-xs text-muted leading-relaxed mb-4">
          {errorMessage}
        </p>

        {onRetry && (
          <Button
            size="sm"
            variant="secondary"
            className="gap-2 text-xs font-medium"
            onPress={onRetry}>
            <IconRefresh size={14} stroke={2} />
            <span>إعادة المحاولة</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;
