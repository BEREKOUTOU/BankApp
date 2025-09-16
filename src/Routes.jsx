import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/login"));
const TransactionHistory = lazy(() => import("./pages/transaction-history"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const BillPayment = lazy(() => import("./pages/bill-payment"));
const AccountDetailsPage = lazy(() => import("./pages/account-details"));
const TransferMoney = lazy(() => import("./pages/transfer-money"));
const BudgetTracking = lazy(() => import("./pages/budget-tracking"));
const CardsManagement = lazy(() => import("./pages/cards-management"));
const ProfileSettings = lazy(() => import("./pages/profile-settings"));

const Routes = () => {
  return (
    <BrowserRouter basename="/BankApp/">
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <RouterRoutes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transaction-history"
              element={
                <ProtectedRoute>
                  <TransactionHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bill-payment"
              element={
                <ProtectedRoute>
                  <BillPayment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account-details"
              element={
                <ProtectedRoute>
                  <AccountDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-money"
              element={
                <ProtectedRoute>
                  <TransferMoney />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget-tracking"
              element={
                <ProtectedRoute>
                  <BudgetTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards-management"
              element={
                <ProtectedRoute>
                  <CardsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-settings"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
