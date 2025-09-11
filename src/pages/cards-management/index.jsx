import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import CardsList from "./components/CardsList";
import CardDetails from "./components/CardDetails";
import CardTransactions from "./components/CardTransactions";
import CardSettings from "./components/CardSettings";
import ActionToolbar from "../../components/ui/ActionToolbar";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const CardsManagement = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Sample cards data
  useEffect(() => {
    const sampleCards = [
      {
        id: "1",
        type: "debit",
        number: "**** **** **** 1234",
        fullNumber: "4532 1234 5678 1234",
        holderName: "Boniface Berekoutou",
        expiryDate: "12/27",
        cvv: "123",
        bankName: "BankApp Af",
        status: "active",
        balance: 2450.75,
        dailyLimit: 1500,
        monthlyLimit: 3000,
        usedDaily: 320.5,
        usedMonthly: 1890.25,
        color: "#1E3A5F",
        gradient: "from-primary to-secondary",
      },
      {
        id: "2",
        type: "credit",
        number: "**** **** **** 5678",
        fullNumber: "5412 3456 7890 5678",
        holderName: "Boniface Berekoutou",
        expiryDate: "09/30",
        cvv: "456",
        bankName: "BankApp Af",
        status: "active",
        creditLimit: 5000,
        availableCredit: 3107.55,
        usedCredit: 1892.45,
        minPayment: 95.5,
        nextPaymentDate: "2024-02-15",
        color: "#4A90A4",
        gradient: "from-secondary to-accent",
      },
      {
        id: "3",
        type: "prepaid",
        number: "**** **** **** 9012",
        fullNumber: "6011 2345 6789 9012",
        holderName: "Boniface Berekoutou",
        expiryDate: "03/25",
        cvv: "789",
        bankName: "BankApp Af",
        status: "blocked",
        balance: 150.0,
        maxBalance: 1000,
        color: "#E17B47",
        gradient: "from-accent to-warning",
      },
    ];

    setCards(sampleCards);
    setSelectedCard(sampleCards?.[0]);
  }, [navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    })?.format(amount);
  };

  const getCardTypeLabel = (type) => {
    switch (type) {
      case "debit":
        return "Carte de débit";
      case "credit":
        return "Carte de crédit";
      case "prepaid":
        return "Carte prépayée";
      default:
        return "Carte";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "blocked":
        return "Bloquée";
      case "expired":
        return "Expirée";
      default:
        return "Inconnue";
    }
  };

  const tabs = [
    { id: "overview", label: "Aperçu", icon: "CreditCard" },
    { id: "transactions", label: "Transactions", icon: "List" },
    { id: "settings", label: "Paramètres", icon: "Settings" },
  ];

  return (
    <>
      <Helmet>
        <title>Gestion des cartes - BankApp Af</title>
        <meta
          name="description"
          content="Gérez vos cartes bancaires, consultez les transactions et configurez les paramètres de sécurité"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center">
                    <Icon name="CreditCard" size={28} className="mr-3" />
                    Gestion des cartes
                  </h1>
                  <p className="text-primary-foreground/80 text-sm lg:text-base">
                    Contrôlez et gérez toutes vos cartes bancaires en un seul
                    endroit
                  </p>
                </div>

                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white border-white/20 hover:bg-white/10"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Exporter
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white border-white/20 hover:bg-white/10"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Nouvelle carte
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6">
              {/* Cards List Sidebar */}
              <div className="lg:col-span-4">
                <CardsList
                  cards={cards}
                  selectedCard={selectedCard}
                  onCardSelect={setSelectedCard}
                  formatCurrency={formatCurrency}
                  getCardTypeLabel={getCardTypeLabel}
                  getStatusLabel={getStatusLabel}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8">
                {/* Tab Navigation */}
                <div className="bg-card border border-border rounded-lg mb-6 shadow-elevation-1">
                  <div className="border-b border-border">
                    <nav className="flex">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center px-6 py-4 text-sm font-medium transition-smooth ${
                            activeTab === tab?.id
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon name={tab?.icon} size={16} className="mr-2" />
                          {tab?.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-6">
                    {activeTab === "overview" && selectedCard && (
                      <CardDetails
                        card={selectedCard}
                        formatCurrency={formatCurrency}
                        getCardTypeLabel={getCardTypeLabel}
                        getStatusLabel={getStatusLabel}
                      />
                    )}

                    {activeTab === "transactions" && selectedCard && (
                      <CardTransactions
                        card={selectedCard}
                        formatCurrency={formatCurrency}
                      />
                    )}

                    {activeTab === "settings" && selectedCard && (
                      <CardSettings
                        card={selectedCard}
                        onCardUpdate={setSelectedCard}
                        formatCurrency={formatCurrency}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <CardsList
                cards={cards}
                selectedCard={selectedCard}
                onCardSelect={setSelectedCard}
                formatCurrency={formatCurrency}
                getCardTypeLabel={getCardTypeLabel}
                getStatusLabel={getStatusLabel}
                isMobile={true}
              />

              {selectedCard && (
                <div className="bg-card border border-border rounded-lg shadow-elevation-1">
                  <div className="border-b border-border">
                    <nav className="flex">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex-1 flex items-center justify-center px-3 py-4 text-xs font-medium transition-smooth ${
                            activeTab === tab?.id
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon name={tab?.icon} size={14} className="mr-1" />
                          {tab?.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-4">
                    {activeTab === "overview" && (
                      <CardDetails
                        card={selectedCard}
                        formatCurrency={formatCurrency}
                        getCardTypeLabel={getCardTypeLabel}
                        getStatusLabel={getStatusLabel}
                        isMobile={true}
                      />
                    )}

                    {activeTab === "transactions" && (
                      <CardTransactions
                        card={selectedCard}
                        formatCurrency={formatCurrency}
                        isMobile={true}
                      />
                    )}

                    {activeTab === "settings" && (
                      <CardSettings
                        card={selectedCard}
                        onCardUpdate={setSelectedCard}
                        formatCurrency={formatCurrency}
                        isMobile={true}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Toolbar for Mobile */}
          <ActionToolbar
            context="cards-management"
            position="fixed-bottom"
            className="lg:hidden"
          />
        </main>
      </div>
    </>
  );
};

export default CardsManagement;
