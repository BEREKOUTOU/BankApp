import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CardTransactions = ({ card, formatCurrency, isMobile = false }) => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Sample transactions for the selected card
    const sampleTransactions = [
      {
        id: '1',
        date: '2024-01-28',
        merchant: 'Amazon',
        category: 'Shopping',
        amount: -89.99,
        type: 'purchase',
        status: 'completed',
        location: 'En ligne'
      },
      {
        id: '2',
        date: '2024-01-27',
        merchant: 'Station Total',
        category: 'Carburant',
        amount: -62.40,
        type: 'purchase',
        status: 'completed',
        location: 'Paris, France'
      },
      {
        id: '3',
        date: '2024-01-26',
        merchant: 'Carrefour Market',
        category: 'Alimentation',
        amount: -45.67,
        type: 'purchase',
        status: 'completed',
        location: 'Paris, France'
      },
      {
        id: '4',
        date: '2024-01-25',
        merchant: 'Netflix',
        category: 'Divertissement',
        amount: -15.99,
        type: 'subscription',
        status: 'completed',
        location: 'En ligne'
      },
      {
        id: '5',
        date: '2024-01-24',
        merchant: 'Remboursement',
        category: 'Remboursement',
        amount: 25.00,
        type: 'refund',
        status: 'completed',
        location: 'En ligne'
      }
    ];
    
    setTransactions(sampleTransactions);
  }, [card]);

  const getFilteredTransactions = () => {
    let filtered = transactions;
    
    if (filterType !== 'all') {
      filtered = filtered?.filter(transaction => transaction?.type === filterType);
    }
    
    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return Math.abs(b?.amount) - Math.abs(a?.amount);
        case 'merchant':
          return a?.merchant?.localeCompare(b?.merchant);
        default:
          return new Date(b?.date) - new Date(a?.date);
      }
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'purchase':
        return 'ShoppingCart';
      case 'subscription':
        return 'RefreshCw';
      case 'refund':
        return 'RotateCcw';
      case 'withdrawal':
        return 'Minus';
      default:
        return 'CreditCard';
    }
  };

  const getTransactionColor = (amount) => {
    return amount < 0 ? 'text-error' : 'text-success';
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'alimentation':
        return 'ShoppingCart';
      case 'carburant':
        return 'Car';
      case 'shopping':
        return 'ShoppingBag';
      case 'divertissement':
        return 'GameController2';
      default:
        return 'CreditCard';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Toutes les transactions</option>
            <option value="purchase">Achats</option>
            <option value="subscription">Abonnements</option>
            <option value="refund">Remboursements</option>
            <option value="withdrawal">Retraits</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="date">Trier par date</option>
            <option value="amount">Trier par montant</option>
            <option value="merchant">Trier par marchand</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Exporter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Search"
            iconPosition="left"
          >
            Rechercher
          </Button>
        </div>
      </div>
      {/* Transactions List */}
      <div className="space-y-3">
        {getFilteredTransactions()?.length > 0 ? (
          getFilteredTransactions()?.map((transaction) => (
            <div 
              key={transaction?.id}
              className="bg-background border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon 
                      name={getCategoryIcon(transaction?.category)} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{transaction?.merchant}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction?.category} • {transaction?.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(transaction?.date)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-mono font-medium ${getTransactionColor(transaction?.amount)}`}>
                    {transaction?.amount > 0 ? '+' : ''}{formatCurrency(transaction?.amount)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name={getTransactionIcon(transaction?.type)} size={12} className="mr-1" />
                    {transaction?.status}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Aucune transaction</h3>
            <p className="text-sm text-muted-foreground">
              Aucune transaction trouvée pour les filtres sélectionnés
            </p>
          </div>
        )}
      </div>
      {/* Transaction Summary */}
      {getFilteredTransactions()?.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-semibold text-primary mb-2">Résumé des transactions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Total transactions</div>
              <div className="font-medium text-foreground">{getFilteredTransactions()?.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Dépenses totales</div>
              <div className="font-medium text-error">
                {formatCurrency(
                  getFilteredTransactions()
                    ?.filter(t => t?.amount < 0)
                    ?.reduce((sum, t) => sum + Math.abs(t?.amount), 0)
                )}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Remboursements</div>
              <div className="font-medium text-success">
                {formatCurrency(
                  getFilteredTransactions()
                    ?.filter(t => t?.amount > 0)
                    ?.reduce((sum, t) => sum + t?.amount, 0)
                )}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Période</div>
              <div className="font-medium text-foreground">Ce mois</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTransactions;