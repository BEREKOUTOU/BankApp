import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ className = "" }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'transfer',
      label: 'Virement',
      icon: 'ArrowLeftRight',
      variant: 'default',
      description: 'Transférer de l\'argent',
      path: '/transfer-money'
    },
    {
      id: 'bill-payment',
      label: 'Paiement facture',
      icon: 'Receipt',
      variant: 'outline',
      description: 'Payer vos factures',
      path: '/bill-payment'
    },
    {
      id: 'budget-tracking',
      label: 'Gérer budget',
      icon: 'PieChart',
      variant: 'outline',
      description: 'Suivre vos budgets',
      path: '/budget-tracking'
    },
    {
      id: 'cards-management',
      label: 'Gérer cartes',
      icon: 'CreditCard',
      variant: 'outline',
      description: 'Paramètres des cartes',
      path: '/cards-management'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Actions rapides</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={() => navigate(action?.path)}
            className="w-full justify-start h-auto p-4"
            iconName={action?.icon}
            iconPosition="left"
            iconSize={20}
          >
            <div className="text-left">
              <div className="font-medium">{action?.label}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {action?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          iconName="Plus"
          iconPosition="left"
        >
          Plus d'actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;