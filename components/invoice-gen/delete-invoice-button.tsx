"use client";

import { deleteInvoice } from "@/app/invoice-gen/actions/invoices";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteInvoiceButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    
    setIsDeleting(true);
    try {
      await deleteInvoice(id);
      toast.success("Invoice deleted successfully");
      router.push("/invoice-gen/invoices");
    } catch (error) {
      toast.error("Failed to delete invoice");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button 
      variant="destructive" className="bg-destructive text-destructive-foreground shadow-[0_6px_0_0_hsl(3,65%,45%)] hover:brightness-[1.05] active:translate-y-[2px] active:shadow-none"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="mr-2 h-5 w-5" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
