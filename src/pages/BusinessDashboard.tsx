import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfigurationTab from "@/components/business/ConfigurationTab";

const BusinessDashboard = () => {
  return (
    <div className="p-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="loyalty">برنامج الولاء</TabsTrigger>
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="configuration">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Content for Overview tab */}
          <p>This is the Overview tab content.</p>
        </TabsContent>

        <TabsContent value="loyalty">
          {/* Content for Loyalty tab */}
          <p>This is the Loyalty tab content.</p>
        </TabsContent>

        <TabsContent value="customers">
          {/* Content for Customers tab */}
          <p>This is the Customers tab content.</p>
        </TabsContent>

        <TabsContent value="configuration">
          <ConfigurationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;
