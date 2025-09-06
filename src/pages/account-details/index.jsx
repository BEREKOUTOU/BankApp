import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import AccountSummaryCard from "./components/AccountSummaryCard";
import TransactionList from "./components/TransactionList";
import FilterPanel from "./components/FilterPanel";
import AccountTabs from "./components/AccountTabs";
import SearchBar from "./components/SearchBar";
import AccountSettings from "./components/AccountSettings";
import AccountDetails from "./components/AccountDetails";
import StatementsTab from "./components/StatementsTab";

const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Authentication check
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    type: "all",
    amountRange: "all",
    dateRange: { start: "", end: "" },
  });

  // Mock account data
  const account = {
    id: "1",
    name: "Compte Courant Principal",
    type: "checking",
    currentBalance: 2450.75,
    availableBalance: 2350.75,
    maskedNumber: "****1234",
    iban: "FR76 **** **** **** ****",
    fullIban: "FR76 3000 6000 0112 3456 7890 189",
  };

  useEffect(() => {
    // Get tab from URL params if available
    const params = new URLSearchParams(location.search);
    const tab = params?.get("tab");
    if (
      tab &&
      ["transactions", "statements", "settings", "details"]?.includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const params = new URLSearchParams(location.search);
    params?.set("tab", tab);
    navigate(`${location?.pathname}?${params?.toString()}`, { replace: true });
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "transfer":
        navigate("/transfer-money");
        break;
      case "schedule":
        navigate("/bill-payment");
        break;
      case "download":
        setActiveTab("statements");
        break;
      default:
        console.log("Quick action:", action);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "transactions":
        return (
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} />
            <div className="lg:grid lg:grid-cols-4 lg:gap-6 space-y-6 lg:space-y-0">
              <div className="lg:col-span-3">
                <TransactionList
                  accountId={account?.id}
                  filters={filters}
                  searchTerm={searchTerm}
                />
              </div>

              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isCollapsed={isFilterCollapsed}
                  onToggleCollapse={() =>
                    setIsFilterCollapsed(!isFilterCollapsed)
                  }
                />
              </div>
            </div>
          </div>
        );

      case "statements":
        return <StatementsTab accountId={account?.id} />;

      case "settings":
        return <AccountSettings account={account} />;

      case "details":
        return <AccountDetails account={account} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Détails du compte
                </h1>
                <p className="text-muted-foreground">{account?.name}</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Exporter
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Printer"
                iconPosition="left"
              >
                Imprimer
              </Button>
            </div>
          </div>

          {/* Account Summary */}
          <div className="mb-8">
            <AccountSummaryCard
              account={account}
              onQuickAction={handleQuickAction}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <AccountTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Tab Content */}
          <div className="min-h-96">{renderTabContent()}</div>
        </div>
      </main>
      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation-3 p-4">
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={() => handleQuickAction("transfer")}
            iconName="ArrowLeftRight"
            iconPosition="left"
            className="flex-1"
          >
            Virement
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickAction("schedule")}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Programmer
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab("statements")}
            iconName="Download"
            className="px-4"
          ></Button>
        </div>
      </div>
      {/* Add bottom padding for mobile to account for fixed toolbar */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default AccountDetailsPage;
