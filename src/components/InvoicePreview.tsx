import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgencyInfo, ClientInfo } from "@/types/invoice";
import { format } from "date-fns";

interface InvoicePreviewProps {
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
  totalMinutes: number;
  totalCost: number;
  taxRate: number;
  themeColor: string;
}

export function InvoicePreview({
  agencyInfo,
  clientInfo,
  totalMinutes,
  totalCost,
  taxRate,
  themeColor,
}: InvoicePreviewProps) {
  const tax = totalCost * (taxRate / 100);
  const total = totalCost + tax;

  return (
    <Card className="p-6 space-y-6 print:shadow-none" style={{ borderColor: themeColor }}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: themeColor }}>{agencyInfo.name}</h2>
          <p className="text-sm text-gray-600">{agencyInfo.address}</p>
          <p className="text-sm text-gray-600">{agencyInfo.phone}</p>
          <p className="text-sm text-gray-600">{agencyInfo.email}</p>
          <p className="text-sm text-gray-600">{agencyInfo.website}</p>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-semibold">{clientInfo.name}</h3>
          <p className="text-sm text-gray-600">{clientInfo.address}</p>
          {clientInfo.tvaNumber && (
            <p className="text-sm text-gray-600">TVA: {clientInfo.tvaNumber}</p>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>INVOICE</h1>
        <p className="text-sm text-gray-600">Date: {format(new Date(), 'dd/MM/yyyy')}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Minutes</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>AI Voice Agent Services</TableCell>
            <TableCell className="text-right">{totalMinutes}</TableCell>
            <TableCell className="text-right">${(totalCost / totalMinutes).toFixed(4)}/min</TableCell>
            <TableCell className="text-right">${totalCost.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <div className="w-72 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({taxRate}%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg" style={{ color: themeColor }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 text-sm text-gray-600">
        <p>Payment Terms: Net 30</p>
        <p>Please include invoice number with payment</p>
      </div>
    </Card>
  );
}