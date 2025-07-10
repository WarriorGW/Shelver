import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, HelpCircle, XCircle } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface NotificationDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: React.ReactNode;
  type?: "success" | "error" | "warning" | "info";
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

function NotificationDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  type = "info",
  confirmText,
  onConfirm,
  cancelText,
}: NotificationDialogProps) {
  const iconMap = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertTriangle className="text-yellow-500" size={24} />,
    info: <HelpCircle className="text-blue-500" size={24} />,
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="gap-y-5">
          <div className="flex items-center gap-2">
            {iconMap[type]}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription asChild>
            <div>{description}</div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {cancelText && (
            <DialogClose asChild>
              <Button variant="outline">{cancelText}</Button>
            </DialogClose>
          )}
          {confirmText && (
            <DialogClose asChild>
              <Button
                onClick={() => {
                  onConfirm?.();
                  setIsOpen(false);
                }}
              >
                {confirmText}
              </Button>
            </DialogClose>
          )}
          {!confirmText && !cancelText && (
            <DialogClose asChild>
              <Button>Cerrar</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
