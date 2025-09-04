import React from 'react';
import Icon from '../../../components/AppIcon';

const SpendingInsights = ({ className = "" }) => {
  const spendingData = [
    {
      category: 'Alimentation',
      amount: 450.80,
      budget: 600.00,
      icon: 'ShoppingCart',
      color: 'bg-blue-500'
    },
    {
      category: 'Transport',
      amount: 180.50,
      budget: 200.00,
      icon: 'Car',
      color: 'bg-green-500'
    },
    {
      category: 'Loisirs',
      amount: 320.25,
      budget: 300.00,
      icon: 'Gamepad2',
      color: 'bg-orange-500'
    },
    {
      category: 'Santé',
      amount: 85.00,
      budget: 150.00,
      icon: 'Heart',
      color: 'bg-red-500'
    }
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getProgressPercentage = (amount, budget) => {
    return Math.min((amount / budget) * 100, 100);
  };

  const getProgressColor = (amount, budget) => {
    const percentage = (amount / budget) * 100;
    if (percentage > 100) return 'bg-error';
    if (percentage > 80) return 'bg-warning';
    return 'bg-success';
  };

  const totalSpent = spendingData?.reduce((sum, item) => sum + item?.amount, 0);
  const totalBudget = spendingData?.reduce((sum, item) => sum + item?.budget, 0);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Dépenses du mois</h3>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="font-mono font-semibold text-foreground">
            {formatAmount(totalSpent)}
          </div>
        </div>
      </div>
      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Budget mensuel</span>
          <span className="text-sm font-medium text-foreground">
            {formatAmount(totalBudget)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(totalSpent, totalBudget)}`}
            style={{ width: `${getProgressPercentage(totalSpent, totalBudget)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {getProgressPercentage(totalSpent, totalBudget)?.toFixed(0)}% utilisé
          </span>
          <span className="text-xs text-muted-foreground">
            Reste: {formatAmount(totalBudget - totalSpent)}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {spendingData?.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${item?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={item?.icon} size={16} color="white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">
                  {item?.category}
                </span>
                <span className="text-sm font-mono text-foreground">
                  {formatAmount(item?.amount)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(item?.amount, item?.budget)}`}
                    style={{ width: `${getProgressPercentage(item?.amount, item?.budget)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatAmount(item?.budget)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={14} />
          <span>+12% par rapport au mois dernier</span>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;