import { Card } from "@/components/ui/card";

export const CustomersTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Customer Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right py-3 px-2">Customer</th>
                <th className="text-right py-3 px-2">Status</th>
                <th className="text-right py-3 px-2">Last Order</th>
                <th className="text-right py-3 px-2">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <div className="font-medium">Customer {i}</div>
                        <div className="text-sm text-gray-500">customer{i}@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-2">2023-06-{10 + i}</td>
                  <td className="py-3 px-2">${1000 * i}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
