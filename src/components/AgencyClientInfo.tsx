import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AgencyInfo, ClientInfo } from "@/types/invoice";

interface AgencyClientInfoProps {
  onAgencyInfoChange: (info: AgencyInfo) => void;
  onClientInfoChange: (info: ClientInfo) => void;
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
}

export function AgencyClientInfo({
  onAgencyInfoChange,
  onClientInfoChange,
  agencyInfo,
  clientInfo,
}: AgencyClientInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Agency Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="agencyName">Agency Name</Label>
            <Input
              id="agencyName"
              value={agencyInfo.name}
              onChange={(e) => onAgencyInfoChange({ ...agencyInfo, name: e.target.value })}
              placeholder="Your Agency Name"
            />
          </div>
          <div>
            <Label htmlFor="agencyPhone">Phone Number</Label>
            <Input
              id="agencyPhone"
              value={agencyInfo.phone}
              onChange={(e) => onAgencyInfoChange({ ...agencyInfo, phone: e.target.value })}
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <Label htmlFor="agencyAddress">Address</Label>
            <Input
              id="agencyAddress"
              value={agencyInfo.address}
              onChange={(e) => onAgencyInfoChange({ ...agencyInfo, address: e.target.value })}
              placeholder="123 Agency Street"
            />
          </div>
          <div>
            <Label htmlFor="agencyEmail">Email</Label>
            <Input
              id="agencyEmail"
              type="email"
              value={agencyInfo.email}
              onChange={(e) => onAgencyInfoChange({ ...agencyInfo, email: e.target.value })}
              placeholder="contact@agency.com"
            />
          </div>
          <div>
            <Label htmlFor="agencyWebsite">Website</Label>
            <Input
              id="agencyWebsite"
              value={agencyInfo.website}
              onChange={(e) => onAgencyInfoChange({ ...agencyInfo, website: e.target.value })}
              placeholder="www.agency.com"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">Client Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client Name/Company</Label>
            <Input
              id="clientName"
              value={clientInfo.name}
              onChange={(e) => onClientInfoChange({ ...clientInfo, name: e.target.value })}
              placeholder="Client Name"
            />
          </div>
          <div>
            <Label htmlFor="clientAddress">Address</Label>
            <Input
              id="clientAddress"
              value={clientInfo.address}
              onChange={(e) => onClientInfoChange({ ...clientInfo, address: e.target.value })}
              placeholder="Client Address"
            />
          </div>
          <div>
            <Label htmlFor="clientTVA">TVA Number (if applicable)</Label>
            <Input
              id="clientTVA"
              value={clientInfo.tvaNumber}
              onChange={(e) => onClientInfoChange({ ...clientInfo, tvaNumber: e.target.value })}
              placeholder="TVA Number"
            />
          </div>
          <div>
            <Label htmlFor="contactPersonName">Contact Person Name</Label>
            <Input
              id="contactPersonName"
              value={clientInfo.contactPerson.name}
              onChange={(e) => onClientInfoChange({
                ...clientInfo,
                contactPerson: { ...clientInfo.contactPerson, name: e.target.value }
              })}
              placeholder="Contact Person Name"
            />
          </div>
          <div>
            <Label htmlFor="contactPersonPhone">Contact Person Phone</Label>
            <Input
              id="contactPersonPhone"
              value={clientInfo.contactPerson.phone}
              onChange={(e) => onClientInfoChange({
                ...clientInfo,
                contactPerson: { ...clientInfo.contactPerson, phone: e.target.value }
              })}
              placeholder="Contact Person Phone"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}