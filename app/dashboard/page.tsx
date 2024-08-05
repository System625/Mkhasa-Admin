"use client";

import React, { useEffect, useState } from "react";
import { Wrapper } from "@/components/wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import DashboardMetric from "@/components/dashboardMetric";
import EarningsChart from "@/components/earningChart";
import TopSellingProductsTable from "@/components/topSellingTable";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust this value as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (isLoading || status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <Wrapper>
      <div className="flex mb-5">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <DashboardMetric title="Pending Order" count={25} icon="material-symbols:pending" color="#F24E1E" />
            <DashboardMetric title="Dispatched" count={20} icon="solar:delivery-bold" color="#4ECB71" />
            <DashboardMetric title="Low Inventory Orders" count={15} icon="material-symbols:inventory" color="#4E7CCB" />
            <DashboardMetric title="Delivered Orders" count={32} icon="hugeicons:package-delivered" color="#4ECB71" />
          </div>
        </div>
      </div>
      <div className="mb-20">
        <EarningsChart />
      </div>
      <TopSellingProductsTable />
    </Wrapper>
  );
};

export default Dashboard;
