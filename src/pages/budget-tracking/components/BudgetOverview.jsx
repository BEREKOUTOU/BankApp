import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetOverview = ({ totalBudget, totalSpent, remainingBudget, progress, formatCurrency }) => {
  const getProgressColor = () => {
    if (progress >= 90) return 'bg-error';
    if (progress >= 75) return 'bg-warning';
    return 'bg-success';
  };

  const getProgressTextColor = () => {
    if (progress >= 90) return 'text-error';
    if (progress >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Wallet" size={20} className="mr-2" />
        Vue d'ensemble du budget
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Budget */}
        <div className="text-center md:text-left">
          <div className="text-sm text-muted-foreground mb-1">Budget total</div>
          <div className="text-2xl font-bold text-foreground font-mono">
            {formatCurrency(totalBudget)}
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Icon name="Target" size={14} className="mr-1" />
            Objectif mensuel
          </div>
        </div>

        {/* Total Spent */}
        <div className="text-center md:text-left">
          <div className="text-sm text-muted-foreground mb-1">Dépensé</div>
          <div className="text-2xl font-bold text-foreground font-mono">
            {formatCurrency(totalSpent)}
          </div>
          <div className={`flex items-center mt-2 text-sm ${getProgressTextColor()}`}>
            <Icon name="TrendingUp" size={14} className="mr-1" />
            {progress?.toFixed(1)}% du budget
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="text-center md:text-left">
          <div className="text-sm text-muted-foreground mb-1">Restant</div>
          <div className={`text-2xl font-bold font-mono ${remainingBudget >= 0 ? 'text-success' : 'text-error'}`}>
            {formatCurrency(remainingBudget)}
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} className="mr-1" />
            {remainingBudget >= 0 ? 'Disponible' : 'Dépassement'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progression du budget</span>
          <span>{progress?.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {progress > 100 && (
          <div className="flex items-center mt-2 text-sm text-error">
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            Budget dépassé de {formatCurrency(Math.abs(remainingBudget))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOverview;