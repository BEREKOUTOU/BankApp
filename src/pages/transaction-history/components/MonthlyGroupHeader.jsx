import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlyGroupHeader = ({ 
  month, 
  year, 
  totalTransactions, 
  totalIncome, 
  totalExpenses,
  isCollapsed = false,
  onToggle 
}) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getMonthName = (month) => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months?.[month - 1];
  };

  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="bg-muted/30 border-y border-border sticky top-32 z-20">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {getMonthName(month)} {year}
              </h2>
              <p className="text-sm text-muted-foreground">
                {totalTransactions} transaction{totalTransactions > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-4 hidden lg:flex">
              {/* Income */}
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Revenus</div>
                <div className="font-mono font-semibold text-success">
                  +{formatAmount(totalIncome)}
                </div>
              </div>

              {/* Expenses */}
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Dépenses</div>
                <div className="font-mono font-semibold text-foreground">
                  -{formatAmount(totalExpenses)}
                </div>
              </div>

              {/* Net */}
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Solde</div>
                <div className={`font-mono font-semibold ${
                  netAmount >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {netAmount >= 0 ? '+' : ''}{formatAmount(netAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Summary */}
        <div className="lg:hidden mt-3 pt-3 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Revenus</div>
              <div className="font-mono text-sm font-semibold text-success">
                +{formatAmount(totalIncome)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Dépenses</div>
              <div className="font-mono text-sm font-semibold text-foreground">
                -{formatAmount(totalExpenses)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Solde</div>
              <div className={`font-mono text-sm font-semibold ${
                netAmount >= 0 ? 'text-success' : 'text-error'
              }`}>
                {netAmount >= 0 ? '+' : ''}{formatAmount(netAmount)}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MonthlyGroupHeader;