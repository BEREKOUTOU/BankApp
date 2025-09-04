import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = ({ className = "" }) => {
  const navigate = useNavigate();

  const recentTransactions = [
    {
      id: '1',
      type: 'debit',
      description: 'Carrefour Market',
      category: 'Alimentation',
      amount: -45.67,
      date: new Date('2025-08-30T14:30:00'),
      status: 'completed',
      icon: 'ShoppingCart'
    },
    {
      id: '2',
      type: 'credit',
      description: 'Virement reçu - Marie Dupont',
      category: 'Virement',
      amount: 250.00,
      date: new Date('2025-08-30T09:15:00'),
      status: 'completed',
      icon: 'ArrowDownLeft'
    },
    {
      id: '3',
      type: 'debit',
      description: 'Station Total',
      category: 'Transport',
      amount: -62.40,
      date: new Date('2025-08-29T18:45:00'),
      status: 'completed',
      icon: 'Car'
    },
    {
      id: '4',
      type: 'debit',
      description: 'Netflix',
      category: 'Abonnements',
      amount: -15.99,
      date: new Date('2025-08-29T12:00:00'),
      status: 'completed',
      icon: 'Play'
    },
    {
      id: '5',
      type: 'debit',
      description: 'Pharmacie Centrale',
      category: 'Santé',
      amount: -28.50,
      date: new Date('2025-08-28T16:20:00'),
      status: 'completed',
      icon: 'Heart'
    }
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(Math.abs(amount));
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transactions récentes</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/transaction-history')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Voir tout
        </Button>
      </div>
      <div className="space-y-3">
        {recentTransactions?.map((transaction) => (
          <div 
            key={transaction?.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer"
            onClick={() => navigate('/transaction-history')}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              transaction?.type === 'credit' ? 'bg-success/10' : 'bg-muted'
            }`}>
              <Icon 
                name={transaction?.icon} 
                size={18} 
                className={transaction?.type === 'credit' ? 'text-success' : 'text-muted-foreground'} 
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">
                    {transaction?.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {transaction?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(transaction?.date)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(transaction?.date)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right ml-3">
                  <div className={`font-mono font-semibold ${
                    transaction?.type === 'credit' ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
                  </div>
                  {transaction?.status === 'completed' && (
                    <div className="flex items-center justify-end mt-1">
                      <Icon name="Check" size={12} className="text-success" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Solde après transactions</span>
          <span className="font-mono font-semibold text-foreground">
            2 450,75 €
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;