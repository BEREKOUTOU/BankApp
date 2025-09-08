import React from 'react';
import Icon from '../../../components/AppIcon';

const CardsList = ({ 
  cards, 
  selectedCard, 
  onCardSelect, 
  formatCurrency, 
  getCardTypeLabel, 
  getStatusLabel,
  isMobile = false 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'blocked':
        return 'text-error bg-error/10';
      case 'expired':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'debit':
        return 'CreditCard';
      case 'credit':
        return 'CreditCard';
      case 'prepaid':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const getCardBalance = (card) => {
    switch (card?.type) {
      case 'debit': case'prepaid':
        return formatCurrency(card?.balance);
      case 'credit':
        return formatCurrency(card?.availableCredit);
      default:
        return formatCurrency(0);
    }
  };

  const getCardBalanceLabel = (type) => {
    switch (type) {
      case 'debit':
        return 'Solde';
      case 'credit':
        return 'Crédit disponible';
      case 'prepaid':
        return 'Solde';
      default:
        return 'Solde';
    }
  };

  if (isMobile) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="CreditCard" size={18} className="mr-2" />
            Mes cartes ({cards?.length})
          </h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 gap-3">
            {cards?.map((card) => (
              <button
                key={card?.id}
                onClick={() => onCardSelect(card)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCard?.id === card?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Icon name={getCardIcon(card?.type)} size={20} className="mr-2" color={card?.color} />
                    <div>
                      <div className="font-medium text-foreground text-sm">{getCardTypeLabel(card?.type)}</div>
                      <div className="text-xs font-mono text-muted-foreground">{card?.number}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card?.status)}`}>
                    {getStatusLabel(card?.status)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{getCardBalanceLabel(card?.type)}</div>
                  <div className="font-mono text-sm font-medium text-foreground">
                    {getCardBalance(card)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2" />
          Mes cartes ({cards?.length})
        </h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {cards?.map((card) => (
            <button
              key={card?.id}
              onClick={() => onCardSelect(card)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedCard?.id === card?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Icon name={getCardIcon(card?.type)} size={24} className="mr-3" color={card?.color} />
                  <div>
                    <div className="font-medium text-foreground">{getCardTypeLabel(card?.type)}</div>
                    <div className="text-sm font-mono text-muted-foreground">{card?.number}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(card?.status)}`}>
                  {getStatusLabel(card?.status)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{getCardBalanceLabel(card?.type)}</div>
                <div className="font-mono text-lg font-medium text-foreground">
                  {getCardBalance(card)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsList;