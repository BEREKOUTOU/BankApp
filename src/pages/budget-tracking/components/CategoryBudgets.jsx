import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryBudgets = ({ budgets, formatCurrency }) => {
  const [sortBy, setSortBy] = useState('category');

  const getSortedBudgets = () => {
    return budgets?.slice()?.sort((a, b) => {
      switch (sortBy) {
        case 'spent':
          return b?.spent - a?.spent;
        case 'remaining':
          return (b?.allocated - b?.spent) - (a?.allocated - a?.spent);
        case 'progress':
          return (b?.spent / b?.allocated) - (a?.spent / a?.allocated);
        default:
          return a?.category?.localeCompare(b?.category);
      }
    });
  };

  const getProgressPercentage = (budget) => {
    return budget?.allocated > 0 ? (budget?.spent / budget?.allocated) * 100 : 0;
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-error';
    if (progress >= 80) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusIcon = (progress) => {
    if (progress >= 100) return { icon: 'AlertTriangle', color: 'text-error' };
    if (progress >= 80) return { icon: 'AlertCircle', color: 'text-warning' };
    return { icon: 'CheckCircle', color: 'text-success' };
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name="BarChart3" size={20} className="mr-2" />
            Budgets par catégorie
          </h2>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="category">Trier par catégorie</option>
              <option value="spent">Trier par dépensé</option>
              <option value="remaining">Trier par restant</option>
              <option value="progress">Trier par progression</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Gérer
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {getSortedBudgets()?.map((budget) => {
            const progress = getProgressPercentage(budget);
            const remaining = budget?.allocated - budget?.spent;
            const status = getStatusIcon(progress);
            
            return (
              <div key={budget?.id} className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${budget?.color}20` }}
                    >
                      <Icon 
                        name={budget?.icon} 
                        size={20} 
                        color={budget?.color} 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{budget?.category}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name={status?.icon} size={14} className={`mr-1 ${status?.color}`} />
                        {progress?.toFixed(0)}% utilisé
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono text-sm text-muted-foreground">
                      {formatCurrency(budget?.spent)} / {formatCurrency(budget?.allocated)}
                    </div>
                    <div className={`text-sm font-medium ${remaining >= 0 ? 'text-success' : 'text-error'}`}>
                      {remaining >= 0 ? 'Reste ' : 'Dépassé de '}{formatCurrency(Math.abs(remaining))}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  {progress > 100 && (
                    <div className="absolute top-0 right-0 w-1 h-2 bg-error rounded-r-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            iconName="Plus"
            iconPosition="left"
          >
            Ajouter une catégorie de budget
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBudgets;