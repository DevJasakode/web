"use client";

// // DashboardPage.tsx
// import { SummaryCard } from "./components/SummaryCard";
// import { WorldMapCard } from "./components/WorldMapCard";

// export function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-6 gap-4">
//         <SummaryCard label="Users" value={28} sub="Total / Local Admins" />
//         <SummaryCard label="Customers" value={172} />
//         <SummaryCard label="Area in Hectare" value={1241} />
//         <SummaryCard label="Fields" value={152} />
//         <SummaryCard label="Crops" value={124} />
//         <SummaryCard label="Active Plans" value={794} />
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <div className="col-span-2">
//           <WorldMapCard />
//         </div>

//         {/* chart lain masuk sini */}
//       </div>
//     </div>
//   );
// }

// DashboardPage.tsx
import { WorldMapCard } from "./components/WorldMapCard";
import { TopUsersChart } from "./components/TopUsersChart";
import { DonutChart } from "./components/DonutChart";
import { TopProductsChart } from "./components/TopProductsChart";
import { GaugeChart } from "./components/GaugeChart";

export function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <WorldMapCard />
      </div>
      <TopUsersChart />

      <TopProductsChart />
      <DonutChart />
      <GaugeChart />
    </div>
  );
}
