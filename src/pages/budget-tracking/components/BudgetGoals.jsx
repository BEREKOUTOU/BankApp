import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BudgetGoals = () => {
  const [goals] = useState([
    {
      id: '1',
      title: 'Épargne d\'urgence',
      target: 5000,
      current: 2850,
      deadline: '2024-12-31',
      priority: 'high',
      icon: 'Shield'
    },
    {
      id: '2',
      title: 'Vacances d\'été',
      target: 2000,
      current: 750,
      deadline: '2024-06-30',
      priority: 'medium',
      icon: 'Plane'
    },
    {
      id: '3',
      title: 'Nouveau laptop',
      target: 1500,
      current: 400,
      deadline: '2024-09-30',
      priority: 'low',
      icon: 'Laptop'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getProgress = (current, target) => {
    return target > 0 ? (current / target) * 100 : 0;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      default:
        return 'bg-success/10';
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Target" size={18} className="mr-2" />
        Objectifs d'épargne
      </h3>
      
      <div className="space-y-4">
        {goals?.map((goal) => {
          const progress = getProgress(goal?.current, goal?.target);
          const remaining = goal?.target - goal?.current;
          const daysRemaining = getDaysRemaining(goal?.deadline);
          
          return (
            <div key={goal?.id} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getPriorityBg(goal?.priority)}`}>
                    <Icon 
                      name={goal?.icon} 
                      size={16} 
                      className={getPriorityColor(goal?.priority)} 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{goal?.title}</h4>
                    <div className="text-xs text-muted-foreground">
                      {daysRemaining > 0 ? `${daysRemaining} jours restants` : 'Échéance dépassée'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-muted-foreground">
                    {formatCurrency(goal?.current)} / {formatCurrency(goal?.target)}
                  </div>
                  <div className="text-xs text-success">
                    {progress?.toFixed(0)}%
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="h-1.5 bg-success rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                Encore {formatCurrency(remaining)} à économiser
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="Plus"
          iconPosition="left"
        >
          Nouvel objectif
        </Button>
      </div>
    </div>
  );
};

export default BudgetGoals;