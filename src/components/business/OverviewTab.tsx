
import { Card } from "@/components/ui/card";
import BusinessStatsCard from "@/components/BusinessStatsCard";
import { BarChart, Users, User, LineChart } from "lucide-react";

export const OverviewTab = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BusinessStatsCard
          title="Total Revenue"
          value="$45,231.89"
          icon={BarChart}
          trend={{ value: 20.1, isPositive: true }}
        />
        <BusinessStatsCard
          title="Subscriptions"
          value={2350}
          icon={Users}
          trend={{ value: 180.1, isPositive: true }}
        />
        <BusinessStatsCard
          title="Active Users"
          value={1234}
          icon={User}
          trend={{ value: 19, isPositive: true }}
        />
        <BusinessStatsCard
          title="Sales Revenue"
          value="$45,231.89"
          icon={LineChart}
          trend={{ value: 20.1, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <div className="h-[400px] p-6">
            <h2 className="text-lg font-bold">Overview</h2>
            <div className="mt-4">
              {/* Chart implementation would go here */}
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Chart visualization will be displayed here</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-span-3">
          <div className="h-[400px] p-6">
            <h2 className="text-lg font-bold">Recent Sales</h2>
            <div className="mt-4 space-y-4">
              {/* Sales list would go here */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+$350.00</p>
                  <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">JS</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">jane.smith@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+$250.00</p>
                  <p className="text-xs text-muted-foreground">Today, 1:15 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">RJ</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Robert Johnson</p>
                  <p className="text-xs text-muted-foreground">robert.j@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+$180.00</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 4:45 PM</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
