import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import ActionToolbar from "../../components/ui/ActionToolbar";
import SecurityIndicator from "../../components/ui/SecurityIndicator";
import PayeeCard from "./components/PayeeCard";
import PaymentForm from "./components/PaymentForm";
import PayeeManager from "./components/PayeeManager";
import RecentPayments from "./components/RecentPayments";
import PaymentConfirmation from "./components/PaymentConfirmation";

const BillPayment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("payment"); // 'payment', 'manage', 'confirmation'
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [payees, setPayees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock payees data
  const mockPayees = [
    {
      id: "1",
      name: "EDF",
      category: "Électricité",
      accountNumber: "FR76 1234 5678 9012 3456 7890 123",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
      lastPayment: {
        amount: 89.5,
        date: "2024-08-15T00:00:00Z",
      },
      status: "active",
      isRecurring: true,
    },
    {
      id: "2",
      name: "Orange",
      category: "Téléphone",
      accountNumber: "FR76 9876 5432 1098 7654 3210 987",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      lastPayment: {
        amount: 45.99,
        date: "2024-08-10T00:00:00Z",
      },
      status: "active",
      isRecurring: false,
    },
    {
      id: "3",
      name: "Veolia",
      category: "Eau",
      accountNumber: "FR76 5555 6666 7777 8888 9999 000",
      logo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center",
      lastPayment: {
        amount: 67.8,
        date: "2024-07-28T00:00:00Z",
      },
      status: "active",
      isRecurring: true,
    },
    {
      id: "4",
      name: "Assurance Auto",
      category: "Assurance",
      accountNumber: "FR76 1111 2222 3333 4444 5555 666",
      logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop&crop=center",
      lastPayment: {
        amount: 156.2,
        date: "2024-08-01T00:00:00Z",
      },
      status: "pending",
      isRecurring: true,
    },
  ];

  useEffect(() => {
    setPayees(mockPayees);
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const filteredPayees = payees?.filter(
    (payee) =>
      payee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      payee?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handlePayeeSelect = (payee) => {
    setSelectedPayee(payee);
    if (window.innerWidth < 1024) {
      setActiveTab("payment");
    }
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setActiveTab("confirmation");
  };

  const handlePaymentConfirm = (confirmationData) => {
    // In a real app, this would make an API call
    console.log("Payment confirmed:", confirmationData);

    // Show success message and redirect
    alert(
      `Paiement de ${new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      })?.format(confirmationData?.amount)} effectué avec succès !`
    );

    // Reset state
    setPaymentData(null);
    setSelectedPayee(null);
    setActiveTab("payment");
  };

  const handleAddPayee = (newPayee) => {
    setPayees((prev) => [...prev, newPayee]);
  };

  const handleUpdatePayee = (updatedPayee) => {
    setPayees((prev) =>
      prev?.map((payee) =>
        payee?.id === updatedPayee?.id ? updatedPayee : payee
      )
    );
  };

  const handleDeletePayee = (payeeId) => {
    setPayees((prev) => prev?.filter((payee) => payee?.id !== payeeId));
    if (selectedPayee && selectedPayee?.id === payeeId) {
      setSelectedPayee(null);
    }
  };

  const handleRepeatPayment = (payment) => {
    const payee = payees?.find((p) => p?.name === payment?.payeeName);
    if (payee) {
      setSelectedPayee(payee);
      setActiveTab("payment");
    }
  };

  const tabs = [
    {
      id: "payment",
      label: "Payer maintenant",
      icon: "CreditCard",
      count: filteredPayees?.length,
    },
    {
      id: "manage",
      label: "Gérer bénéficiaires",
      icon: "Users",
      count: payees?.length,
    },
  ];

  const toolbarActions = [
    {
      id: "export",
      label: "Exporter",
      icon: "Download",
      variant: "outline",
      primary: false,
      onClick: () => console.log("Export payments"),
    },
    {
      id: "print",
      label: "Imprimer",
      icon: "Printer",
      variant: "ghost",
      primary: false,
      onClick: () => console.log("Print payments"),
    },
  ];

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
                className="lg:hidden"
              />
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Paiement de factures
                </h1>
                <p className="text-muted-foreground mt-1">
                  Payez vos factures et gérez vos bénéficiaires en toute
                  sécurité
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <SecurityIndicator />
              <Button
                variant="outline"
                onClick={() => navigate("/transaction-history")}
                iconName="History"
                iconPosition="left"
              >
                Historique
              </Button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      activeTab === tab?.id
                        ? "bg-primary/10 text-primary"
                        : "bg-muted-foreground/10 text-muted-foreground"
                    }`}
                  >
                    {tab?.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Sidebar - Payees */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Bénéficiaires
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("manage")}
                      iconName="Settings"
                    />
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Icon
                      name="Search"
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Rechercher un bénéficiaire..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                    />
                  </div>
                </div>

                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {filteredPayees?.map((payee) => (
                    <PayeeCard
                      key={payee?.id}
                      payee={payee}
                      onSelect={handlePayeeSelect}
                      onEdit={(payee) => {
                        setSelectedPayee(payee);
                        setActiveTab("manage");
                      }}
                      onDelete={handleDeletePayee}
                      isSelected={selectedPayee?.id === payee?.id}
                      className="group"
                    />
                  ))}

                  {filteredPayees?.length === 0 && (
                    <div className="text-center py-8">
                      <Icon
                        name="Search"
                        size={32}
                        className="text-muted-foreground mx-auto mb-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        {searchTerm
                          ? "Aucun résultat trouvé"
                          : "Aucun bénéficiaire"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-5">
              {activeTab === "confirmation" ? (
                <PaymentConfirmation
                  paymentData={paymentData}
                  onConfirm={handlePaymentConfirm}
                  onCancel={() => {
                    setPaymentData(null);
                    setActiveTab("payment");
                  }}
                  onBack={() => setActiveTab("payment")}
                />
              ) : activeTab === "manage" ? (
                <PayeeManager
                  payees={payees}
                  onAddPayee={handleAddPayee}
                  onUpdatePayee={handleUpdatePayee}
                  onDeletePayee={handleDeletePayee}
                />
              ) : (
                <PaymentForm
                  selectedPayee={selectedPayee}
                  onSubmit={handlePaymentSubmit}
                  onCancel={() => setSelectedPayee(null)}
                />
              )}
            </div>

            {/* Right Sidebar - Recent Payments */}
            <div className="lg:col-span-3">
              <RecentPayments
                onViewDetails={(payment) =>
                  console.log("View details:", payment)
                }
                onRepeatPayment={handleRepeatPayment}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {activeTab === "confirmation" ? (
              <PaymentConfirmation
                paymentData={paymentData}
                onConfirm={handlePaymentConfirm}
                onCancel={() => {
                  setPaymentData(null);
                  setActiveTab("payment");
                }}
                onBack={() => setActiveTab("payment")}
              />
            ) : activeTab === "manage" ? (
              <PayeeManager
                payees={payees}
                onAddPayee={handleAddPayee}
                onUpdatePayee={handleUpdatePayee}
                onDeletePayee={handleDeletePayee}
              />
            ) : (
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Rechercher un bénéficiaire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  />
                </div>

                {/* Payees Grid */}
                <div className="space-y-3">
                  {filteredPayees?.map((payee) => (
                    <PayeeCard
                      key={payee?.id}
                      payee={payee}
                      onSelect={handlePayeeSelect}
                      onEdit={(payee) => {
                        setSelectedPayee(payee);
                        setActiveTab("manage");
                      }}
                      onDelete={handleDeletePayee}
                      isSelected={selectedPayee?.id === payee?.id}
                      className="group"
                    />
                  ))}
                </div>

                {/* Payment Form */}
                {selectedPayee && (
                  <PaymentForm
                    selectedPayee={selectedPayee}
                    onSubmit={handlePaymentSubmit}
                    onCancel={() => setSelectedPayee(null)}
                  />
                )}

                {/* Recent Payments */}
                <RecentPayments
                  onViewDetails={(payment) =>
                    console.log("View details:", payment)
                  }
                  onRepeatPayment={handleRepeatPayment}
                />
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="mt-8">
            <ActionToolbar
              actions={toolbarActions}
              context="payment"
              position="contextual"
            />
          </div>
        </div>
      </main>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex-1"
            iconName="Home"
            iconPosition="left"
          >
            Accueil
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/transaction-history")}
            className="flex-1"
            iconName="History"
            iconPosition="left"
          >
            Historique
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;
