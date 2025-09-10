import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetAnalytics = ({ budgets, formatCurrency }) => {
  const getTopSpendingCategories = () => {
    return budgets?.slice()?.sort((a, b) => b?.spent - a?.spent)?.slice(0, 3);
  };

  const getBudgetHealthScore = () => {
    const avgProgress = budgets?.reduce((sum, budget) => {
      return sum + (budget?.spent / budget?.allocated) * 100;
    }, 0) / budgets?.length;
    
    if (avgProgress <= 70) return { score: 'Excellent', color: 'text-success', icon: 'CheckCircle' };
    if (avgProgress <= 85) return { score: 'Bon', color: 'text-warning', icon: 'AlertCircle' };
    return { score: 'Attention', color: 'text-error', icon: 'AlertTriangle' };
  };

  const getMonthlyTrend = () => {
    // Mock trend data - in real app this would come from historical data
    return {
      trend: 'up',
      percentage: 12,
      comparison: 'vs mois dernier'
    };
  };

  const topCategories = getTopSpendingCategories();
  const healthScore = getBudgetHealthScore();
  const monthlyTrend = getMonthlyTrend();

  return (
    <div className="space-y-6">
      {/* Budget Health Score */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={18} className="mr-2" />
          Santé financière
        </h3>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-3`}>
            <Icon name={healthScore?.icon} size={24} className={healthScore?.color} />
          </div>
          <div className={`text-lg font-medium ${healthScore?.color}`}>
            {healthScore?.score}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Gestion budgétaire
          </div>
        </div>
      </div>

      {/* Top Spending Categories */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={18} className="mr-2" />
          Top dépenses
        </h3>
        
        <div className="space-y-3">
          {topCategories?.map((category, index) => (
            <div key={category?.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-3">
                  {index + 1}
                </div>
                <div className="flex items-center">
                  <Icon name={category?.icon} size={16} className="mr-2" color={category?.color} />
                  <span className="text-sm text-foreground">{category?.category}</span>
                </div>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {formatCurrency(category?.spent)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={18} className="mr-2" />
          Tendance mensuelle
        </h3>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
            monthlyTrend?.trend === 'up' ? 'bg-error/10' : 'bg-success/10'
          }`}>
            <Icon 
              name={monthlyTrend?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={20} 
              className={monthlyTrend?.trend === 'up' ? 'text-error' : 'text-success'} 
            />
          </div>
          <div className={`text-lg font-medium ${
            monthlyTrend?.trend === 'up' ? 'text-error' : 'text-success'
          }`}>
            {monthlyTrend?.trend === 'up' ? '+' : '-'}{monthlyTrend?.percentage}%
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {monthlyTrend?.comparison}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Conseil du jour
        </h3>
        <p className="text-sm text-primary/80">
          Analysez vos dépenses hebdomadaires pour mieux répartir votre budget et éviter les dépassements en fin de mois.
        </p>
      </div>
    </div>
  );
};

export default BudgetAnalytics;