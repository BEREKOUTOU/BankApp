import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import TransactionHistory from "./pages/transaction-history";
import Dashboard from "./pages/dashboard";
import BillPayment from "./pages/bill-payment";
import AccountDetailsPage from "./pages/account-details";
import TransferMoney from "./pages/transfer-money";
import BudgetTracking from "./pages/budget-tracking";
import CardsManagement from "./pages/cards-management";
import ProfileSettings from "./pages/profile-settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
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
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
