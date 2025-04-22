
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/business/OverviewTab";
import { CustomersTab } from "@/components/business/CustomersTab";
import { ConfigurationTab } from "@/components/business/ConfigurationTab";

const BusinessDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <CustomersTab />
        </TabsContent>
        <TabsContent value="configuration" className="space-y-4">
          <ConfigurationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard;
