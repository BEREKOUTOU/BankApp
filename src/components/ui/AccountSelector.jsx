import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AccountSelector = ({ 
  accounts = [
    { id: '1', name: 'Compte Courant', number: '****1234', balance: 2450.75, type: 'checking' },
    { id: '2', name: 'Livret A', number: '****5678', balance: 15680.20, type: 'savings' },
    { id: '3', name: 'Compte Professionnel', number: '****9012', balance: 8920.45, type: 'business' }
  ],
  selectedAccount = null,
  onAccountSelect = () => {},
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts?.filter(account =>
    account?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    account?.number?.includes(searchTerm)
  );

  const currentAccount = selectedAccount || accounts?.[0];

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

  const handleAccountSelect = (account) => {
    onAccountSelect(account);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getAccountIcon(currentAccount?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <div className="font-medium text-foreground">{currentAccount?.name}</div>
            <div className="text-sm text-muted-foreground">{currentAccount?.number}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-semibold text-foreground">
            {formatBalance(currentAccount?.balance)}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
        </div>
      </Button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 max-h-80 overflow-hidden">
            {/* Search */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un compte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            {/* Account List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredAccounts?.length > 0 ? (
                filteredAccounts?.map((account) => (
                  <button
                    key={account?.id}
                    onClick={() => handleAccountSelect(account)}
                    className={`w-full p-4 flex items-center space-x-3 hover:bg-muted transition-smooth text-left ${
                      currentAccount?.id === account?.id ? 'bg-primary/5 border-r-2 border-primary' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getAccountIcon(account?.type)} size={20} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{account?.name}</div>
                      <div className="text-sm text-muted-foreground">{account?.number}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono font-semibold text-foreground">
                        {formatBalance(account?.balance)}
                      </div>
                      {currentAccount?.id === account?.id && (
                        <Icon name="Check" size={16} className="text-primary ml-auto mt-1" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Aucun compte trouvé</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-border bg-muted/30">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  <Icon name="Plus" size={14} className="mr-1" />
                  Nouveau compte
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  <Icon name="Settings" size={14} className="mr-1" />
                  Gérer
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSelector;