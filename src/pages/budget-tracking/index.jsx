import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import BudgetOverview from "./components/BudgetOverview";
import CategoryBudgets from "./components/CategoryBudgets";
import BudgetAnalytics from "./components/BudgetAnalytics";
import { useNavigate } from "react-router-dom";
import BudgetGoals from "./components/BudgetGoals";
import ActionToolbar from "../../components/ui/ActionToolbar";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const BudgetTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const navigate = useNavigate();

  // Sample budget data
  useEffect(() => {
    const sampleBudgets = [
      {
        id: "1",
        category: "Alimentation",
        allocated: 600,
        spent: 456.78,
        icon: "ShoppingCart",
        color: "#059669",
      },
      {
        id: "2",
        category: "Transport",
        allocated: 300,
        spent: 289.45,
        icon: "Car",
        color: "#4A90A4",
      },
      {
        id: "3",
        category: "Loisirs",
        allocated: 200,
        spent: 145.2,
        icon: "GameController2",
        color: "#E17B47",
      },
      {
        id: "4",
        category: "Logement",
        allocated: 1200,
        spent: 1200.0,
        icon: "Home",
        color: "#DC2626",
      },
      {
        id: "5",
        category: "Santé",
        allocated: 150,
        spent: 89.3,
        icon: "Heart",
        color: "#D97706",
      },
    ];

    setBudgets(sampleBudgets);
    setTotalBudget(
      sampleBudgets?.reduce((sum, budget) => sum + budget?.allocated, 0)
    );
    setTotalSpent(
      sampleBudgets?.reduce((sum, budget) => sum + budget?.spent, 0)
    );
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const periodOptions = [
    { value: "current", label: "Mois actuel" },
    { value: "last", label: "Mois dernier" },
    { value: "year", label: "Cette année" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    })?.format(amount);
  };

  const getRemainingBudget = () => {
    return totalBudget - totalSpent;
  };

  const getBudgetProgress = () => {
    return totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  };

  return (
    <>
      <Helmet>
        <title>Suivi des budgets - BankApp Pro</title>
        <meta
          name="description"
          content="Gérez et suivez vos budgets par catégorie pour un meilleur contrôle financier"
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
                    <Icon name="PieChart" size={28} className="mr-3" />
                    Suivi des budgets
                  </h1>
                  <p className="text-primary-foreground/80 text-sm lg:text-base">
                    Gérez vos dépenses par catégorie et atteignez vos objectifs
                    financiers
                  </p>
                </div>

                <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e?.target?.value)}
                    className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    {periodOptions?.map((option) => (
                      <option
                        key={option?.value}
                        value={option?.value}
                        className="text-foreground"
                      >
                        {option?.label}
                      </option>
                    ))}
                  </select>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white border-white/20 hover:bg-white/10"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Nouveau budget
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <BudgetOverview
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              remainingBudget={getRemainingBudget()}
              progress={getBudgetProgress()}
              formatCurrency={formatCurrency}
            />

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 mt-8">
              {/* Left Column */}
              <div className="lg:col-span-8">
                <CategoryBudgets
                  budgets={budgets}
                  formatCurrency={formatCurrency}
                />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 space-y-6">
                <BudgetAnalytics
                  budgets={budgets}
                  formatCurrency={formatCurrency}
                />
                <BudgetGoals />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6 mt-8">
              <CategoryBudgets
                budgets={budgets}
                formatCurrency={formatCurrency}
              />
              <BudgetAnalytics
                budgets={budgets}
                formatCurrency={formatCurrency}
              />
              <BudgetGoals />
            </div>
          </div>

          {/* Action Toolbar for Mobile */}
          <ActionToolbar
            context="budget-tracking"
            position="fixed-bottom"
            className="lg:hidden"
          />
        </main>
      </div>
    </>
  );
};

export default BudgetTracking;
