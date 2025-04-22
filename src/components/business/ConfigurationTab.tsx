
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const ConfigurationTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="system-alerts">System Alerts</Label>
            <Switch id="system-alerts" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="automatic-mode">Automatic Mode</Label>
            <Switch id="automatic-mode" />
          </div>
        </div>
      </Card>
    </div>
  );
};
