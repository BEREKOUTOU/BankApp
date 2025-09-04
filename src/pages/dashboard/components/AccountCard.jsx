import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountCard = ({ account, className = "" }) => {
  const navigate = useNavigate();

  const getAccountIcon = (type) => {
    switch (type) {
      case 'savings': return 'PiggyBank';
      case 'credit': return 'CreditCard';
      case 'business': return 'Building2';
      default: return 'Wallet';
    }
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'savings': return 'Livret A';
      case 'credit': return 'Carte de crédit';
      case 'business': return 'Compte Pro';
      default: return 'Compte Courant';
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const getBalanceColor = (balance, type) => {
    if (type === 'credit') {
      return balance < 0 ? 'text-error' : 'text-success';
    }
    return balance < 0 ? 'text-error' : 'text-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getAccountIcon(account?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{getAccountTypeLabel(account?.type)}</h3>
            <p className="text-sm text-muted-foreground">{account?.number}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/account-details')}
          iconName="ChevronRight"
          iconSize={16}
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold font-mono mb-1">
          <span className={getBalanceColor(account?.balance, account?.type)}>
            {formatBalance(account?.balance)}
          </span>
        </div>
        {account?.availableBalance && (
          <p className="text-sm text-muted-foreground">
            Disponible: {formatBalance(account?.availableBalance)}
          </p>
        )}
      </div>
      {account?.recentTransactions && account?.recentTransactions?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Dernières opérations</h4>
          {account?.recentTransactions?.slice(0, 2)?.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <Icon 
                    name={transaction?.type === 'debit' ? 'ArrowDown' : 'ArrowUp'} 
                    size={12} 
                    className={transaction?.type === 'debit' ? 'text-error' : 'text-success'} 
                  />
                </div>
                <span className="text-sm text-foreground truncate max-w-32">
                  {transaction?.description}
                </span>
              </div>
              <span className={`text-sm font-mono ${transaction?.type === 'debit' ? 'text-error' : 'text-success'}`}>
                {transaction?.type === 'debit' ? '-' : '+'}{formatBalance(Math.abs(transaction?.amount))}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountCard;