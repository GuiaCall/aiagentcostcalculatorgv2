export interface InvoiceHistory {
  id: string;
  invoiceNumber: string;
  date: Date;
  clientInfo: ClientInfo;
  agencyInfo: AgencyInfo;
  totalAmount: number;
  taxRate: number;
  margin: number;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface ClientInfo {
  name: string;
  address: string;
  tvaNumber: string;
  contactPerson: ContactPerson;
}