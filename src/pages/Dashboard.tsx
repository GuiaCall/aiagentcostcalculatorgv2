import { DashboardProfile } from "./Dashboard/DashboardProfile";
import { DashboardSubscription } from "./Dashboard/DashboardSubscription";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      return data || [];
    }
  });

  const getRevenueData = () => {
    const monthlyData = invoices.reduce((acc: any[], invoice: any) => {
      const month = format(new Date(invoice.date), 'MMM yyyy');
      const existingMonth = acc.find(item => item.month === month);
      
      if (existingMonth) {
        existingMonth.amount += invoice.totalAmount;
      } else {
        acc.push({ month, amount: invoice.totalAmount });
      }
      
      return acc;
    }, []);

    return monthlyData.sort((a, b) => 
      new Date(a.month).getTime() - new Date(b.month).getTime()
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <DashboardProfile />
        <DashboardSubscription />
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Revenue Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getRevenueData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Invoice Number</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Client</th>
                <th className="text-right p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((invoice: any) => (
                <tr key={invoice.id} className="border-b">
                  <td className="p-2">{invoice.invoiceNumber}</td>
                  <td className="p-2">{format(new Date(invoice.date), 'dd MMM yyyy')}</td>
                  <td className="p-2">{invoice.clientInfo.name}</td>
                  <td className="p-2 text-right">${invoice.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-muted-foreground">
                    No invoices yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}