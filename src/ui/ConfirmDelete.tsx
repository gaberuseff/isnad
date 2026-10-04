import {Button, Modal} from "@heroui/react";
import {IconTrash} from "@tabler/icons-react";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  resourceName?: string;
  description?: string;
  isPending?: boolean;
}

function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  resourceName = "هذا العنصر",
  description,
  isPending = false,
}: ConfirmDeleteProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open && !isPending) {
          onClose();
        }
      }}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="sm">
          <Modal.Dialog className="p-0">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-4">
                <IconTrash size={24} stroke={1.8} />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                حذف {resourceName}
              </h3>

              <p className="text-sm text-muted leading-relaxed mb-6">
                {description ||
                  `هل أنت متأكد من رغبتك في حذف ${resourceName}؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.`}
              </p>

              <div className="flex items-center gap-3 w-full">
                <Button
                  variant="secondary"
                  className="flex-1"
                  isDisabled={isPending}
                  onPress={onClose}>
                  إلغاء
                </Button>

                <Button
                  variant="danger"
                  className="flex-1"
                  isDisabled={isPending}
                  onPress={onConfirm}>
                  {isPending ? "جاري الحذف..." : "تأكيد الحذف"}
                </Button>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default ConfirmDelete;
