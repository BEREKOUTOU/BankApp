import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSummaryCard = ({ account, onQuickAction }) => {
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const getAccountIcon = (type) => {
    switch (type) {
      case 'savings': return 'PiggyBank';
      case 'business': return 'Building2';
      case 'credit': return 'CreditCard';
      default: return 'Wallet';
    }
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'savings': return 'Livret d\'épargne';
      case 'business': return 'Compte professionnel';
      case 'credit': return 'Carte de crédit';
      default: return 'Compte courant';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getAccountIcon(account?.type)} size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{account?.name}</h2>
            <p className="text-sm text-muted-foreground">{getAccountTypeLabel(account?.type)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Solde actuel</p>
          <p className="text-2xl font-bold text-foreground">{formatBalance(account?.currentBalance)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
          <p className="text-xl font-semibold text-success">{formatBalance(account?.availableBalance)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 p-3 bg-muted/30 rounded-md">
        <div>
          <p className="text-xs text-muted-foreground">Numéro de compte</p>
          <p className="font-mono text-sm text-foreground">{account?.maskedNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">IBAN</p>
          <p className="font-mono text-sm text-foreground">{account?.iban}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="default" 
          size="sm"
          iconName="ArrowLeftRight"
          iconPosition="left"
          onClick={() => onQuickAction('transfer')}
        >
          Virement
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          onClick={() => onQuickAction('schedule')}
        >
          Programmer
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onQuickAction('download')}
        >
          Relevé
        </Button>
      </div>
    </div>
  );
};

export default AccountSummaryCard;