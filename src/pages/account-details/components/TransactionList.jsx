import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionList = ({ accountId, filters, searchTerm }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const mockTransactions = [
    {
      id: '1',
      date: '2025-01-30',
      time: '14:32',
      merchant: 'Carrefour Market',
      category: 'Alimentation',
      amount: -45.67,
      type: 'debit',
      status: 'completed',
      description: 'Achat en magasin'
    },
    {
      id: '2',
      date: '2025-01-30',
      time: '09:15',
      merchant: 'Salaire Entreprise XYZ',
      category: 'Salaire',
      amount: 2850.00,
      type: 'credit',
      status: 'completed',
      description: 'Virement salaire janvier'
    },
    {
      id: '3',
      date: '2025-01-29',
      time: '16:45',
      merchant: 'Station Total',
      category: 'Transport',
      amount: -62.30,
      type: 'debit',
      status: 'pending',
      description: 'Carburant'
    },
    {
      id: '4',
      date: '2025-01-29',
      time: '12:20',
      merchant: 'Restaurant Le Bistrot',
      category: 'Restaurants',
      amount: -28.50,
      type: 'debit',
      status: 'completed',
      description: 'Déjeuner'
    },
    {
      id: '5',
      date: '2025-01-28',
      time: '19:30',
      merchant: 'Netflix',
      category: 'Divertissement',
      amount: -15.99,
      type: 'debit',
      status: 'completed',
      description: 'Abonnement mensuel'
    },
    {
      id: '6',
      date: '2025-01-28',
      time: '10:00',
      merchant: 'Virement de Marie D.',
      category: 'Virement',
      amount: 150.00,
      type: 'credit',
      status: 'completed',
      description: 'Remboursement restaurant'
    },
    {
      id: '7',
      date: '2025-01-27',
      time: '15:22',
      merchant: 'Pharmacie Centrale',
      category: 'Santé',
      amount: -23.45,
      type: 'debit',
      status: 'completed',
      description: 'Médicaments'
    },
    {
      id: '8',
      date: '2025-01-26',
      time: '11:30',
      merchant: 'EDF Facture',
      category: 'Factures',
      amount: -89.20,
      type: 'debit',
      status: 'completed',
      description: 'Facture électricité'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...mockTransactions];
      
      if (searchTerm) {
        filtered = filtered?.filter(t => 
          t?.merchant?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          t?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
      }

      if (filters?.category && filters?.category !== 'all') {
        filtered = filtered?.filter(t => t?.category === filters?.category);
      }

      if (filters?.type && filters?.type !== 'all') {
        filtered = filtered?.filter(t => t?.type === filters?.type);
      }

      if (filters?.dateRange?.start && filters?.dateRange?.end) {
        filtered = filtered?.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate >= new Date(filters.dateRange.start) && 
                 transactionDate <= new Date(filters.dateRange.end);
        });
      }

      setTransactions(filtered);
      setLoading(false);
    }, 500);
  }, [filters, searchTerm]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(Math.abs(amount));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Alimentation': 'ShoppingCart',
      'Transport': 'Car',
      'Restaurants': 'UtensilsCrossed',
      'Divertissement': 'Play',
      'Santé': 'Heart',
      'Factures': 'FileText',
      'Salaire': 'Banknote',
      'Virement': 'ArrowLeftRight'
    };
    return icons?.[category] || 'Circle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'failed': return 'Échoué';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)]?.map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-2 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Aucune transaction trouvée</h3>
          <p className="text-muted-foreground">Essayez de modifier vos filtres de recherche</p>
        </div>
      ) : (
        transactions?.map((transaction) => (
          <div key={transaction?.id} className="bg-card border border-border rounded-lg p-2 hover:shadow-elevation-2 transition-smooth">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getCategoryIcon(transaction?.category)} size={18} className="text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground truncate">{transaction?.merchant}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-semibold ${transaction?.type === 'credit' ? 'text-success' : 'text-foreground'}`}>
                      {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <span>{formatDate(transaction?.date)}</span>
                    <span>•</span>
                    <span>{transaction?.time}</span>
                    <span>•</span>
                    <span>{transaction?.category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction?.status)} bg-current/10`}>
                      {getStatusLabel(transaction?.status)}
                    </span>
                  </div>
                </div>
                
                {transaction?.description && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">{transaction?.description}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      {hasMore && transactions?.length > 0 && (
        <div className="text-center pt-4">
          <Button variant="outline" onClick={() => {}}>
            Charger plus de transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;