import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AccountCard from './components/AccountCard';
import QuickActions from './components/QuickActions';
import SpendingInsights from './components/SpendingInsights';
import RecentTransactions from './components/RecentTransactions';
import FinancialGoals from './components/FinancialGoals';
import UpcomingBills from './components/UpcomingBills';
import SecurityIndicator from '../../components/ui/SecurityIndicator';
import ActionToolbar from '../../components/ui/ActionToolbar';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Boniface Berekoutou');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const accounts = [
    {
      id: '1',
      type: 'checking',
      number: '****1234',
      balance: 2450.75,
      availableBalance: 2450.75,
      recentTransactions: [
        {
          description: 'Carrefour Market',
          amount: -45.67,
          type: 'debit'
        },
        {
          description: 'Virement reçu',
          amount: 250.00,
          type: 'credit'
        }
      ]
    },
    {
      id: '2',
      type: 'savings',
      number: '****5678',
      balance: 15680.20,
      availableBalance: 15680.20,
      recentTransactions: [
        {
          description: 'Virement automatique',
          amount: 300.00,
          type: 'credit'
        }
      ]
    },
    {
      id: '3',
      type: 'credit',
      number: '****9012',
      balance: -892.45,
      availableBalance: 2107.55,
      recentTransactions: [
        {
          description: 'Amazon',
          amount: -89.99,
          type: 'debit'
        },
        {
          description: 'Station Total',
          amount: -62.40,
          type: 'debit'
        }
      ]
    }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalBalance = accounts?.filter(account => account?.type !== 'credit')?.reduce((sum, account) => sum + account?.balance, 0);

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord - BankApp Pro</title>
        <meta name="description" content="Gérez vos comptes et finances en toute sécurité avec BankApp Pro" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                    {getGreeting()}, {userName}
                  </h1>
                  <p className="text-primary-foreground/80 text-sm lg:text-base">
                    {formatDate(currentTime)}
                  </p>
                </div>
                
                <div className="hidden lg:flex items-center space-x-4">
                  <SecurityIndicator />
                  <div className="text-right">
                    <div className="text-sm text-primary-foreground/80">Patrimoine total</div>
                    <div className="text-xl font-bold font-mono">
                      {formatBalance(totalBalance)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Total Balance */}
          <div className="lg:hidden bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Patrimoine total</div>
                <div className="text-xl font-bold font-mono text-foreground">
                  {formatBalance(totalBalance)}
                </div>
              </div>
              <SecurityIndicator />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Account Cards */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Mes comptes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {accounts?.map((account) => (
                  <AccountCard key={account?.id} account={account} />
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-3 space-y-6">
                <QuickActions />
                <FinancialGoals />
              </div>

              {/* Center Column */}
              <div className="lg:col-span-6">
                <RecentTransactions />
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-6">
                <SpendingInsights />
                <UpcomingBills />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              <QuickActions />
              <RecentTransactions />
              <SpendingInsights />
              <FinancialGoals />
              <UpcomingBills />
            </div>
          </div>

          {/* Action Toolbar for Mobile */}
          <ActionToolbar 
            context="dashboard"
            position="fixed-bottom"
            className="lg:hidden"
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;