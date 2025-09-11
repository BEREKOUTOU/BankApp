import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSelection = ({ selectedAccount, onAccountSelect, onNext }) => {
  const [accounts] = useState([
    {
      id: 'acc-001',
      name: 'Compte Courant',
      type: 'checking',
      number: '****1234',
      balance: 2450.75,
      currency: 'EUR',
      available: 2450.75
    },
    {
      id: 'acc-002',
      name: 'Livret A',
      type: 'savings',
      number: '****5678',
      balance: 15680.20,
      currency: 'EUR',
      available: 15680.20
    },
    {
      id: 'acc-003',
      name: 'Compte Professionnel',
      type: 'business',
      number: '****9012',
      balance: 8920.45,
      currency: 'EUR',
      available: 8920.45
    },
    {
      id: 'acc-004',
      name: 'Compte Épargne',
      type: 'savings',
      number: '****3456',
      balance: 5240.80,
      currency: 'EUR',
      available: 5240.80
    }
  ]);

  const getAccountIcon = (type) => {
    switch (type) {
      case 'savings': return 'PiggyBank';
      case 'business': return 'Building2';
      default: return 'CreditCard';
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'checking': return 'Compte Courant';
      case 'savings': return 'Compte Épargne';
      case 'business': return 'Compte Professionnel';
      default: return 'Compte';
    }
  };

  const handleAccountSelect = (account) => {
    onAccountSelect(account);
  };

  const canProceed = selectedAccount !== null;

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Sélectionner le compte à débiter
        </h2>
        <p className="text-muted-foreground">
          Choisissez le compte depuis lequel vous souhaitez effectuer le virement
        </p>
      </div>
      <div className="space-y-3">
        {accounts?.map((account) => (
          <div
            key={account?.id}
            className={`
              relative border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${selectedAccount?.id === account?.id 
                ? 'border-primary bg-primary/5 shadow-elevation-1' 
                : 'border-border bg-card hover:border-primary/50 hover:shadow-elevation-1'
              }
            `}
            onClick={() => handleAccountSelect(account)}
          >
            <div className="flex items-center space-x-4">
              {/* Radio Button */}
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${selectedAccount?.id === account?.id 
                  ? 'border-primary bg-primary' :'border-border bg-background'
                }
              `}>
                {selectedAccount?.id === account?.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>

              {/* Account Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getAccountIcon(account?.type)} size={24} color="var(--color-primary)" />
              </div>

              {/* Account Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">
                    {account?.name}
                  </h3>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-foreground">
                      {formatBalance(account?.balance)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <span>{getAccountTypeLabel(account?.type)}</span>
                    <span>•</span>
                    <span>{account?.number}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Disponible: {formatBalance(account?.available)}
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedAccount?.id === account?.id && (
                <div className="flex-shrink-0">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
              )}
            </div>

            {/* Account Status */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="Shield" size={12} />
                  <span>Sécurisé</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Virement instantané</span>
                </div>
              </div>
              
              {account?.balance < 100 && (
                <div className="flex items-center space-x-1 text-warning">
                  <Icon name="AlertTriangle" size={12} />
                  <span>Solde faible</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          iconName="Plus"
          iconPosition="left"
        >
          Nouveau compte
        </Button>
        
        <div className="flex-1" />
        
        <Button
          variant="default"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 sm:flex-none sm:min-w-32"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default AccountSelection;