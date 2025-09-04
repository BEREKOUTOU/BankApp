import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialGoals = ({ className = "" }) => {
  const financialGoals = [
    {
      id: '1',
      title: 'Vacances d\'été',
      description: 'Voyage en Espagne',
      targetAmount: 2500.00,
      currentAmount: 1850.00,
      deadline: new Date('2025-06-15'),
      icon: 'Plane',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Fonds d\'urgence',
      description: '6 mois de salaire',
      targetAmount: 15000.00,
      currentAmount: 8500.00,
      deadline: new Date('2025-12-31'),
      icon: 'Shield',
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Nouvelle voiture',
      description: 'Apport personnel',
      targetAmount: 8000.00,
      currentAmount: 3200.00,
      deadline: new Date('2026-03-01'),
      icon: 'Car',
      color: 'bg-orange-500'
    }
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Échéance dépassée';
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Demain';
    if (diffDays < 30) return `${diffDays} jours`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} mois`;
    return `${Math.ceil(diffDays / 365)} ans`;
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Objectifs financiers</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          iconSize={16}
        >
          Ajouter
        </Button>
      </div>
      <div className="space-y-4">
        {financialGoals?.map((goal) => {
          const progressPercentage = getProgressPercentage(goal?.currentAmount, goal?.targetAmount);
          const remainingAmount = goal?.targetAmount - goal?.currentAmount;
          
          return (
            <div key={goal?.id} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${goal?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={goal?.icon} size={18} color="white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{goal?.title}</h4>
                      <p className="text-sm text-muted-foreground">{goal?.description}</p>
                    </div>
                    <div className="text-right ml-3">
                      <div className="text-sm font-mono font-semibold text-foreground">
                        {formatAmount(goal?.currentAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        sur {formatAmount(goal?.targetAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {progressPercentage?.toFixed(0)}% atteint
                      </span>
                      <span className="text-muted-foreground">
                        {getTimeRemaining(goal?.deadline)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(goal?.currentAmount, goal?.targetAmount)}`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    
                    {remainingAmount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Reste: {formatAmount(remainingAmount)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={10} className="text-success" />
                          <span className="text-success">
                            +{formatAmount(goal?.currentAmount * 0.1)}/mois
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Target" size={14} />
          <span>3 objectifs actifs • 72% de progression moyenne</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoals;