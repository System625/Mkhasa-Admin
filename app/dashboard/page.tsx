"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [metrics, setMetrics] = useState({
    pendingOrders: 25,
    dispatchedOrders: 20,
    lowInventoryOrders: 15, // Static count as mentioned
    deliveredOrders: 32,
  });

  useEffect(() => {
    let isMounted = true;
    console.log("Status:", status);
    console.log("Session:", session);
  
    if (status === "unauthenticated") {
      console.log("Redirecting to login");
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.id) {
      console.log("Fetching metrics for user ID:", session.user.id);
      fetchMetrics(session.user.id).finally(() => {
        if (isMounted) setIsLoading(false);
      });
    } else if (status === "authenticated") {
      // If authenticated but no user id, still stop loading
      setIsLoading(false);
    }
  
    return () => {
      isMounted = false;
    };
  }, [status, router, session]);

  const fetchMetrics = async (adminId: string) => {
    console.log("Fetching metrics...");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      // For now, we'll use placeholder data
      // In the future, replace these with actual API calls
      setMetrics({
        pendingOrders: 25,
        dispatchedOrders: 20,
        lowInventoryOrders: 15,
        deliveredOrders: 32,
      });

      // Uncomment and modify these lines when your API is ready
      // const [pendingRes, dispatchedRes, deliveredRes] = await Promise.all([
      //   axios.get(`${baseUrl}/count/pending/order/${adminId}`),
      //   axios.get(`${baseUrl}/count/dispatched/order/${adminId}`),
      //   axios.get(`${baseUrl}/count/delivered/order/${adminId}`),
      // ]);
      //
      // setMetrics({
      //   pendingOrders: pendingRes.data.count,
      //   dispatchedOrders: dispatchedRes.data.count,
      //   lowInventoryOrders: 15,
      //   deliveredOrders: deliveredRes.data.count,
      // });

      console.log("Metrics set:", metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

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
            <DashboardMetric title="Pending Order" count={metrics.pendingOrders} icon="material-symbols:pending" color="#F24E1E" />
            <DashboardMetric title="Dispatched" count={metrics.dispatchedOrders} icon="solar:delivery-bold" color="#4ECB71" />
            <DashboardMetric title="Low Inventory Orders" count={metrics.lowInventoryOrders} icon="material-symbols:inventory" color="#4E7CCB" />
            <DashboardMetric title="Delivered Orders" count={metrics.deliveredOrders} icon="hugeicons:package-delivered" color="#4ECB71" />
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