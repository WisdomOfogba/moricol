// import PurchaseHistoryCard from "../../components/purchase-history-card";

import Link from "next/link";



export default function TrainingProfilePurchaseHistory() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center bg-primary-50 px-4 sm:px-14 gap-4">
      <h1 className="text-2xl text-center font-bold">
      No purchase Data yet,<br /> Purchase a course now and start <br /> tracking your your Purchase History Today
      </h1>
      <Link className="py-2 px-4 rounded-md bg-primary-500 text-base font-medium text-white" href="/dashboard/training">Purchase a Course Today</Link>
    </div>
  );
  // return (
  //   <main className="px-14 py-12">
  //     <section>
  //       <h2 className="mb-6 text-2xl font-semibold text-[#1D2026]">
  //         Purchase History
  //       </h2>

  //       <ul className="space-y-6">
  //         <li>
  //           <PurchaseHistoryCard />
  //         </li>
  //         <li>
  //           <PurchaseHistoryCard />
  //         </li>
  //         <li>
  //           <PurchaseHistoryCard />
  //         </li>
  //         <li>
  //           <PurchaseHistoryCard />
  //         </li>
  //       </ul>
  //     </section>
  //   </main>
  // );
}
