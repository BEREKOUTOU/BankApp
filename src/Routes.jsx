import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
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
          {/* Define your route here */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/bill-payment" element={<BillPayment />} />
          <Route path="/account-details" element={<AccountDetailsPage />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
          <Route path="/budget-tracking" element={<BudgetTracking />} />
          <Route path="/cards-management" element={<CardsManagement />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
