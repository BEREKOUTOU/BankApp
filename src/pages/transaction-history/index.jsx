import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import AccountSelector from "../../components/ui/AccountSelector";
import ActionToolbar from "../../components/ui/ActionToolbar";
import SecurityIndicator from "../../components/ui/SecurityIndicator";
import TransactionCard from "./components/TransactionCard";
import FilterBar from "./components/FilterBar";
import MonthlyGroupHeader from "./components/MonthlyGroupHeader";
import TransactionDetailsModal from "./components/TransactionDetailsModal";
import ExportModal from "./components/ExportModal";
import SpendingAnalytics from "./components/SpendingAnalytics";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    categories: [],
    dateStart: "",
    dateEnd: "",
    amountMin: "",
    amountMax: "",
  });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [collapsedMonths, setCollapsedMonths] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Authentication check
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  // Mock transaction data
  const mockTransactions = [
    {
      id: "1",
      date: "2025-01-15T14:30:00Z",
      merchant: "Carrefour Market",
      description: "Courses alimentaires",
      amount: 87.45,
      type: "debit",
      category: "food",
      status: "completed",
      reference: "CB1234567890",
      account: "Compte Courant ****1234",
      location: "Paris 15ème",
      balance: 2363.3,
      additionalInfo: "Paiement par carte bancaire",
    },
    {
      id: "2",
      date: "2025-01-14T09:15:00Z",
      merchant: "Salaire Entreprise XYZ",
      description: "Virement salaire janvier",
      amount: 3200.0,
      type: "credit",
      category: "salary",
      status: "completed",
      reference: "VIR2025011401",
      account: "Compte Courant ****1234",
      balance: 2450.75,
    },
    {
      id: "3",
      date: "2025-01-13T16:45:00Z",
      merchant: "Netflix",
      description: "Abonnement mensuel",
      amount: 15.99,
      type: "debit",
      category: "subscription",
      status: "completed",
      reference: "PRELEVEMENT_NET",
      account: "Compte Courant ****1234",
      balance: 2434.76,
    },
    {
      id: "4",
      date: "2025-01-12T11:20:00Z",
      merchant: "Station Total",
      description: "Carburant",
      amount: 65.3,
      type: "debit",
      category: "transport",
      status: "completed",
      reference: "CB9876543210",
      account: "Compte Courant ****1234",
      location: "Autoroute A6",
      balance: 2450.75,
    },
    {
      id: "5",
      date: "2025-01-10T19:30:00Z",
      merchant: "Restaurant Le Bistrot",
      description: "Dîner",
      amount: 45.8,
      type: "debit",
      category: "food",
      status: "completed",
      reference: "CB5555666677",
      account: "Compte Courant ****1234",
      location: "Paris 11ème",
      balance: 2516.05,
    },
    {
      id: "6",
      date: "2025-01-08T14:00:00Z",
      merchant: "Virement vers Marie Dupont",
      description: "Remboursement restaurant",
      amount: 22.9,
      type: "debit",
      category: "transfer",
      status: "completed",
      reference: "VIR2025010801",
      account: "Compte Courant ****1234",
      balance: 2561.85,
    },
    {
      id: "7",
      date: "2025-01-05T10:15:00Z",
      merchant: "Pharmacie Centrale",
      description: "Médicaments",
      amount: 28.5,
      type: "debit",
      category: "health",
      status: "completed",
      reference: "CB1111222233",
      account: "Compte Courant ****1234",
      balance: 2584.75,
    },
    {
      id: "8",
      date: "2025-01-03T08:45:00Z",
      merchant: "EDF",
      description: "Facture électricité décembre",
      amount: 89.2,
      type: "debit",
      category: "utilities",
      status: "completed",
      reference: "PRELEVEMENT_EDF",
      account: "Compte Courant ****1234",
      balance: 2613.25,
    },
    {
      id: "9",
      date: "2024-12-28T15:30:00Z",
      merchant: "Amazon",
      description: "Commande en ligne",
      amount: 156.99,
      type: "debit",
      category: "shopping",
      status: "completed",
      reference: "CB7777888899",
      account: "Compte Courant ****1234",
      balance: 2702.45,
    },
    {
      id: "10",
      date: "2024-12-25T12:00:00Z",
      merchant: "Virement reçu Pierre Martin",
      description: "Cadeau Noël",
      amount: 100.0,
      type: "credit",
      category: "transfer",
      status: "completed",
      reference: "VIR2024122501",
      account: "Compte Courant ****1234",
      balance: 2859.44,
    },
  ];

  // Mock accounts data
  const mockAccounts = [
    {
      id: "1",
      name: "Compte Courant",
      number: "****1234",
      balance: 2450.75,
      type: "checking",
    },
    {
      id: "2",
      name: "Livret A",
      number: "****5678",
      balance: 15680.2,
      type: "savings",
    },
    {
      id: "3",
      name: "Compte Professionnel",
      number: "****9012",
      balance: 8920.45,
      type: "business",
    },
  ];

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...mockTransactions];

    // Apply filters
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(
        (t) =>
          t?.merchant?.toLowerCase()?.includes(searchTerm) ||
          t?.description?.toLowerCase()?.includes(searchTerm) ||
          t?.reference?.toLowerCase()?.includes(searchTerm)
      );
    }

    if (filters?.type && filters?.type !== "all") {
      if (filters?.type === "pending") {
        filtered = filtered?.filter((t) => t?.status === "pending");
      } else {
        filtered = filtered?.filter((t) => t?.type === filters?.type);
      }
    }

    if (filters?.categories && filters?.categories?.length > 0) {
      filtered = filtered?.filter((t) =>
        filters?.categories?.includes(t?.category)
      );
    }

    if (filters?.dateStart) {
      filtered = filtered?.filter(
        (t) => new Date(t.date) >= new Date(filters.dateStart)
      );
    }

    if (filters?.dateEnd) {
      filtered = filtered?.filter(
        (t) => new Date(t.date) <= new Date(filters.dateEnd)
      );
    }

    if (filters?.amountMin) {
      filtered = filtered?.filter(
        (t) => t?.amount >= parseFloat(filters?.amountMin)
      );
    }

    if (filters?.amountMax) {
      filtered = filtered?.filter(
        (t) => t?.amount <= parseFloat(filters?.amountMax)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a?.amount - b?.amount;
          break;
        case "merchant":
          comparison = (a?.merchant || a?.description)?.localeCompare(
            b?.merchant || b?.description
          );
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [mockTransactions, filters, sortBy, sortOrder]);

  // Group transactions by month
  const groupedTransactions = useMemo(() => {
    const groups = {};

    filteredAndSortedTransactions?.forEach((transaction) => {
      const date = new Date(transaction.date);
      const key = `${date?.getFullYear()}-${date?.getMonth()}`;

      if (!groups?.[key]) {
        groups[key] = {
          year: date?.getFullYear(),
          month: date?.getMonth() + 1,
          transactions: [],
          totalIncome: 0,
          totalExpenses: 0,
        };
      }

      groups?.[key]?.transactions?.push(transaction);

      if (transaction?.type === "credit") {
        groups[key].totalIncome += transaction?.amount;
      } else {
        groups[key].totalExpenses += transaction?.amount;
      }
    });

    return Object.values(groups)?.sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1);
      const dateB = new Date(b.year, b.month - 1);
      return dateB - dateA;
    });
  }, [filteredAndSortedTransactions]);

  const handleTransactionSelect = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleBulkSelect = (transaction) => {
    setSelectedTransactions((prev) => {
      const isSelected = prev?.some((t) => t?.id === transaction?.id);
      if (isSelected) {
        return prev?.filter((t) => t?.id !== transaction?.id);
      } else {
        return [...prev, transaction];
      }
    });
  };

  const handleDispute = (transaction) => {
    console.log("Disputing transaction:", transaction);
    // In a real app, this would open a dispute form or navigate to dispute page
  };

  const handleExport = (exportData) => {
    console.log("Exporting data:", exportData);
    // In a real app, this would trigger the actual export
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      categories: [],
      dateStart: "",
      dateEnd: "",
      amountMin: "",
      amountMax: "",
    });
  };

  const toggleMonthCollapse = (monthKey) => {
    setCollapsedMonths((prev) => {
      const newSet = new Set(prev);
      if (newSet?.has(monthKey)) {
        newSet?.delete(monthKey);
      } else {
        newSet?.add(monthKey);
      }
      return newSet;
    });
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const customActions = [
    {
      id: "export",
      label: "Exporter",
      icon: "Download",
      variant: "outline",
      primary: true,
      onClick: () => setShowExportModal(true),
    },
    {
      id: "analytics",
      label: showAnalytics ? "Masquer analyse" : "Analyse",
      icon: "BarChart3",
      variant: "ghost",
      primary: false,
      onClick: () => setShowAnalytics(!showAnalytics),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 border-r border-border bg-card">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Account Selector */}
                  <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">
                      Compte sélectionné
                    </h2>
                    <AccountSelector
                      accounts={mockAccounts}
                      selectedAccount={selectedAccount}
                      onAccountSelect={setSelectedAccount}
                    />
                  </div>

                  {/* Filters */}
                  <FilterBar
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={handleClearFilters}
                    isSticky={false}
                  />

                  {/* Sort Options */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">
                      Tri
                    </h3>
                    <div className="space-y-2">
                      {[
                        { id: "date", label: "Date", icon: "Calendar" },
                        { id: "amount", label: "Montant", icon: "Euro" },
                        { id: "merchant", label: "Marchand", icon: "Store" },
                      ]?.map((option) => (
                        <button
                          key={option?.id}
                          onClick={() => handleSortChange(option?.id)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-smooth ${
                            sortBy === option?.id
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name={option?.icon} size={14} />
                            <span>{option?.label}</span>
                          </div>
                          {sortBy === option?.id && (
                            <Icon
                              name={
                                sortOrder === "asc" ? "ArrowUp" : "ArrowDown"
                              }
                              size={14}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Security Indicator */}
                  <div className="pt-4 border-t border-border">
                    <SecurityIndicator />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Mobile Header */}
              <div className="lg:hidden bg-card border-b border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-semibold text-foreground">
                    Historique
                  </h1>
                  <div className="flex items-center space-x-2">
                    <SecurityIndicator />
                  </div>
                </div>
                <AccountSelector
                  accounts={mockAccounts}
                  selectedAccount={selectedAccount}
                  onAccountSelect={setSelectedAccount}
                />
              </div>

              {/* Filter Bar */}
              <div className="lg:hidden">
                <FilterBar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                  isSticky={true}
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 flex">
                {/* Transactions List */}
                <div className="flex-1 overflow-y-auto">
                  {/* Action Toolbar */}
                  <div className="sticky top-3 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
                    <div className="p-4">
                      <ActionToolbar
                        actions={customActions}
                        context="transaction"
                      />
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="p-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Icon
                            name="Loader2"
                            size={32}
                            className="animate-spin text-primary mx-auto mb-4"
                          />
                          <p className="text-muted-foreground">
                            Chargement des transactions...
                          </p>
                        </div>
                      </div>
                    ) : groupedTransactions?.length > 0 ? (
                      <div className="space-y-6">
                        {groupedTransactions?.map((group) => {
                          const monthKey = `${group?.year}-${group?.month}`;
                          const isCollapsed = collapsedMonths?.has(monthKey);

                          return (
                            <div key={monthKey}>
                              <MonthlyGroupHeader
                                month={group?.month}
                                year={group?.year}
                                totalTransactions={group?.transactions?.length}
                                totalIncome={group?.totalIncome}
                                totalExpenses={group?.totalExpenses}
                                isCollapsed={isCollapsed}
                                onToggle={() => toggleMonthCollapse(monthKey)}
                              />
                              {!isCollapsed && (
                                <div className="space-y-3 mt-4">
                                  {group?.transactions?.map((transaction) => (
                                    <TransactionCard
                                      key={transaction?.id}
                                      transaction={transaction}
                                      onSelect={handleTransactionSelect}
                                      isSelected={selectedTransactions?.some(
                                        (t) => t?.id === transaction?.id
                                      )}
                                      showAccount={mockAccounts?.length > 1}
                                      onDispute={handleDispute}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <Icon
                            name="Receipt"
                            size={48}
                            className="text-muted-foreground mx-auto mb-4"
                          />
                          <h3 className="text-lg font-medium text-foreground mb-2">
                            Aucune transaction trouvée
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Aucune transaction ne correspond à vos critères de
                            recherche.
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            iconName="RefreshCw"
                            iconPosition="left"
                          >
                            Effacer les filtres
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Analytics Panel */}
                {showAnalytics && (
                  <div className="hidden lg:block w-80 border-l border-border bg-card">
                    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                      <SpendingAnalytics
                        transactions={filteredAndSortedTransactions}
                        className="m-4"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Analytics */}
        {showAnalytics && (
          <div className="lg:hidden bg-card border-t border-border">
            <SpendingAnalytics
              transactions={filteredAndSortedTransactions}
              className="m-4"
            />
          </div>
        )}

        {/* Mobile Action Toolbar */}
        <div className="lg:hidden">
          <ActionToolbar
            actions={customActions}
            context="transaction"
            position="fixed-bottom"
          />
        </div>
      </div>
      {/* Modals */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedTransaction(null);
        }}
        onDispute={handleDispute}
      />
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default TransactionHistory;
