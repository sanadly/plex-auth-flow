
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

const ConfigurationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5" />
        <h2 className="text-2xl font-semibold">الإعدادات</h2>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>إشعارات البريد الإلكتروني</Label>
              <p className="text-sm text-muted-foreground">
                تلقي إشعارات عبر البريد الإلكتروني عند وجود نشاط جديد
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تنبيهات النظام</Label>
              <p className="text-sm text-muted-foreground">
                عرض إشعارات النظام في لوحة التحكم
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>الوضع التلقائي</Label>
              <p className="text-sm text-muted-foreground">
                تفعيل الميزات التلقائية للنظام
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfigurationTab;
