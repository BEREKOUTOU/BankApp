import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingBills = ({ className = "" }) => {
  const navigate = useNavigate();

  const upcomingBills = [
    {
      id: '1',
      name: 'EDF - Électricité',
      amount: 89.50,
      dueDate: new Date('2025-09-05'),
      status: 'pending',
      category: 'Énergie',
      icon: 'Zap',
      color: 'bg-yellow-500',
      autopay: true
    },
    {
      id: '2',
      name: 'Orange - Mobile',
      amount: 35.99,
      dueDate: new Date('2025-09-08'),
      status: 'pending',
      category: 'Télécom',
      icon: 'Smartphone',
      color: 'bg-orange-500',
      autopay: true
    },
    {
      id: '3',
      name: 'Assurance Auto',
      amount: 125.00,
      dueDate: new Date('2025-09-15'),
      status: 'pending',
      category: 'Assurance',
      icon: 'Car',
      color: 'bg-blue-500',
      autopay: false
    },
    {
      id: '4',
      name: 'Netflix',
      amount: 15.99,
      dueDate: new Date('2025-09-20'),
      status: 'pending',
      category: 'Divertissement',
      icon: 'Play',
      color: 'bg-red-500',
      autopay: true
    }
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getDaysUntilDue = (dueDate) => {
    const now = new Date();
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateLabel = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    
    if (days < 0) return 'En retard';
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Demain';
    if (days <= 7) return `Dans ${days} jours`;
    
    return dueDate?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getDueDateColor = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    
    if (days < 0) return 'text-error';
    if (days <= 3) return 'text-warning';
    return 'text-muted-foreground';
  };

  const totalUpcoming = upcomingBills?.reduce((sum, bill) => sum + bill?.amount, 0);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Factures à venir</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/bill-payment')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Gérer
        </Button>
      </div>
      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total à payer ce mois</span>
          <span className="font-mono font-semibold text-foreground">
            {formatAmount(totalUpcoming)}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {upcomingBills?.map((bill) => (
          <div 
            key={bill?.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth cursor-pointer"
            onClick={() => navigate('/bill-payment')}
          >
            <div className={`w-10 h-10 ${bill?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={bill?.icon} size={18} color="white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground truncate">
                      {bill?.name}
                    </p>
                    {bill?.autopay && (
                      <div className="flex items-center space-x-1 px-2 py-0.5 bg-success/10 text-success rounded-full text-xs">
                        <Icon name="Repeat" size={10} />
                        <span>Auto</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {bill?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={`text-xs font-medium ${getDueDateColor(bill?.dueDate)}`}>
                      {getDueDateLabel(bill?.dueDate)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right ml-3">
                  <div className="font-mono font-semibold text-foreground">
                    {formatAmount(bill?.amount)}
                  </div>
                  {getDaysUntilDue(bill?.dueDate) <= 3 && (
                    <div className="flex items-center justify-end mt-1">
                      <Icon name="AlertCircle" size={12} className="text-warning" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 mr-2"
            iconName="Calendar"
            iconPosition="left"
          >
            Planifier
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="CreditCard"
            iconPosition="left"
          >
            Payer maintenant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingBills;