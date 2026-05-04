"use client";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
  title?: string;
  text?: string;
};

export function DeleteConfirmButton({
  title = "ยืนยันการลบ",
  text = "ข้อมูลนี้จะถูกลบออกจากระบบ",
}: Props) {
  async function confirmDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;

    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
      width: 320,
      buttonsStyling: false,
      customClass: {
        popup: "text-sm",
        title: "text-lg",
        htmlContainer: "text-sm",
        actions: "gap-2",
        confirmButton:
          "inline-flex h-[34px] min-w-20 items-center justify-center border border-[#ffd6cf] bg-[#b63d2f] px-4 text-sm font-medium text-white",
        cancelButton:
          "inline-flex h-[34px] min-w-20 items-center justify-center border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text-muted)]",
      },
    });

    if (result.isConfirmed) form.requestSubmit();
  }

  return (
    <button
      type="button"
      onClick={confirmDelete}
      className="inline-flex h-[34px] w-[34px] items-center justify-center border border-[#ffd6cf] text-[#b63d2f] hover:bg-[#fff4f1]"
      title="ลบ"
    >
      <Trash2 size={15} />
    </button>
  );
}
