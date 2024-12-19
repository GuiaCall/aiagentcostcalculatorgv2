import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Profile {
  id: string;
  name: string | null;
  location: string | null;
  bio: string | null;
}

interface Subscription {
  plan_type: string;
  invoice_count: number;
  status: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
    fetchSubscription();
    fetchInvoices();
  }, []);

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive",
      });
      return;
    }

    setProfile(data);
  };

  const fetchSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscription",
        variant: "destructive",
      });
      return;
    }

    setSubscription(data);
  };

  const fetchInvoices = async () => {
    // Implement invoice fetching logic here
    setInvoices([]);
  };

  const updateProfile = async (updatedProfile: Partial<Profile>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('profiles')
      .update(updatedProfile)
      .eq('id', session.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
    setIsEditing(false);
    fetchProfile();
  };

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
        {/* Profile Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Profile</h2>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile?.name || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev!, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile?.location || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev!, location: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profile?.bio || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev!, bio: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => updateProfile(profile!)}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><span className="font-semibold">Name:</span> {profile?.name || 'Not set'}</p>
              <p><span className="font-semibold">Location:</span> {profile?.location || 'Not set'}</p>
              <p><span className="font-semibold">Bio:</span> {profile?.bio || 'Not set'}</p>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </Card>

        {/* Subscription Info */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Subscription</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Plan:</span> {subscription?.plan_type || 'Free'}</p>
            <p><span className="font-semibold">Status:</span> {subscription?.status || 'Active'}</p>
            <p><span className="font-semibold">Invoices Created:</span> {subscription?.invoice_count || 0}</p>
            {subscription?.plan_type === 'free' && (
              <Button onClick={() => window.location.href = '/pricing'}>
                Upgrade to Premium
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
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

      {/* Recent Invoices */}
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
              {invoices.slice(0, 5).map((invoice) => (
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