import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceHistory } from "@/types/invoice";
import { format } from "date-fns";
import { Edit, Printer, Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface InvoiceHistoryListProps {
  invoices: InvoiceHistory[];
  onEdit: (invoice: InvoiceHistory) => void;
  onDelete: (id: string) => void;
  onPrint: (invoice: InvoiceHistory) => void;
}

export function InvoiceHistoryList({
  invoices,
  onEdit,
  onDelete,
  onPrint,
}: InvoiceHistoryListProps) {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Invoice deleted",
      description: "The invoice has been successfully deleted.",
    });
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold">Invoice History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{format(invoice.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{invoice.clientInfo.name}</TableCell>
              <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(invoice)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPrint(invoice)}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}