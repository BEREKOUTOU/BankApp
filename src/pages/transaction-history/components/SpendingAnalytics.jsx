import React from 'react';
import Icon from '../../../components/AppIcon';

const SpendingAnalytics = ({ 
  transactions = [],
  selectedPeriod = 'month',
  className = ""
}) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  // Calculate analytics
  const calculateAnalytics = () => {
    const now = new Date();
    const currentMonth = now?.getMonth();
    const currentYear = now?.getFullYear();
    
    const currentPeriodTransactions = transactions?.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate?.getMonth() === currentMonth && 
             transactionDate?.getFullYear() === currentYear;
    });

    const totalIncome = currentPeriodTransactions?.filter(t => t?.type === 'credit')?.reduce((sum, t) => sum + t?.amount, 0);

    const totalExpenses = currentPeriodTransactions?.filter(t => t?.type === 'debit')?.reduce((sum, t) => sum + t?.amount, 0);

    // Category breakdown
    const categoryTotals = currentPeriodTransactions?.filter(t => t?.type === 'debit')?.reduce((acc, t) => {
        acc[t.category] = (acc?.[t?.category] || 0) + t?.amount;
        return acc;
      }, {});

    const topCategories = Object.entries(categoryTotals)?.sort(([,a], [,b]) => b - a)?.slice(0, 5)?.map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
      }));

    return {
      totalIncome,
      totalExpenses,
      netAmount: totalIncome - totalExpenses,
      transactionCount: currentPeriodTransactions?.length,
      topCategories,
      averageTransaction: currentPeriodTransactions?.length > 0 
        ? totalExpenses / currentPeriodTransactions?.filter(t => t?.type === 'debit')?.length 
        : 0
    };
  };

  const analytics = calculateAnalytics();

  const getCategoryIcon = (category) => {
    const icons = {
      'shopping': 'ShoppingBag',
      'food': 'UtensilsCrossed',
      'transport': 'Car',
      'entertainment': 'Film',
      'health': 'Heart',
      'utilities': 'Zap',
      'salary': 'Banknote',
      'transfer': 'ArrowLeftRight',
      'investment': 'TrendingUp',
      'subscription': 'RefreshCw',
      'cash': 'Banknote',
      'other': 'MoreHorizontal'
    };
    return icons?.[category] || 'MoreHorizontal';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'shopping': 'Achats',
      'food': 'Alimentation',
      'transport': 'Transport',
      'entertainment': 'Loisirs',
      'health': 'Santé',
      'utilities': 'Services',
      'salary': 'Salaire',
      'transfer': 'Virements',
      'investment': 'Investissements',
      'subscription': 'Abonnements',
      'cash': 'Espèces',
      'other': 'Autres'
    };
    return labels?.[category] || category;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Analyse des dépenses</h3>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Calendar" size={12} />
            <span>Ce mois</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Revenus</span>
            </div>
            <div className="font-mono text-lg font-semibold text-success">
              {formatAmount(analytics?.totalIncome)}
            </div>
          </div>

          <div className="p-4 bg-muted/50 border border-border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingDown" size={16} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">Dépenses</span>
            </div>
            <div className="font-mono text-lg font-semibold text-foreground">
              {formatAmount(analytics?.totalExpenses)}
            </div>
          </div>
        </div>

        {/* Net Amount */}
        <div className={`p-4 rounded-lg border ${
          analytics?.netAmount >= 0 
            ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={analytics?.netAmount >= 0 ? "Plus" : "Minus"} 
                size={16} 
                className={analytics?.netAmount >= 0 ? "text-success" : "text-error"} 
              />
              <span className="text-sm font-medium text-foreground">Solde net</span>
            </div>
            <div className={`font-mono text-lg font-semibold ${
              analytics?.netAmount >= 0 ? 'text-success' : 'text-error'
            }`}>
              {analytics?.netAmount >= 0 ? '+' : ''}{formatAmount(analytics?.netAmount)}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-mono font-semibold text-foreground">
              {analytics?.transactionCount}
            </div>
            <div className="text-xs text-muted-foreground">Transactions</div>
          </div>
          <div>
            <div className="text-2xl font-mono font-semibold text-foreground">
              {formatAmount(analytics?.averageTransaction)}
            </div>
            <div className="text-xs text-muted-foreground">Moyenne</div>
          </div>
        </div>

        {/* Top Categories */}
        {analytics?.topCategories?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Top catégories</h4>
            <div className="space-y-3">
              {analytics?.topCategories?.map(({ category, amount, percentage }) => (
                <div key={category} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getCategoryIcon(category)} size={14} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground truncate">
                        {getCategoryLabel(category)}
                      </span>
                      <span className="text-sm font-mono text-foreground">
                        {formatAmount(amount)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {percentage?.toFixed(1)}% du total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Conseil du mois</p>
              <p className="text-muted-foreground">
                {analytics?.netAmount >= 0 
                  ? "Excellent ! Vous avez un solde positif ce mois-ci. Pensez à épargner une partie de ce surplus."
                  : "Vos dépenses dépassent vos revenus. Analysez vos catégories de dépenses pour identifier des économies possibles."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalytics;