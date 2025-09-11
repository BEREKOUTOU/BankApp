import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPayments = ({ 
  payments = [],
  onViewDetails,
  onRepeatPayment,
  className = "" 
}) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending', 'failed'

  const mockPayments = [
    {
      id: '1',
      payeeName: 'EDF',
      payeeCategory: 'Électricité',
      amount: 89.50,
      reference: 'FACT-2024-001',
      date: '2024-08-28T10:30:00Z',
      status: 'completed',
      account: 'Compte Courant ****1234',
      transactionId: 'TXN-20240828-001'
    },
    {
      id: '2',
      payeeName: 'Orange',
      payeeCategory: 'Téléphone',
      amount: 45.99,
      reference: 'MOBILE-08-2024',
      date: '2024-08-25T14:15:00Z',
      status: 'completed',
      account: 'Compte Courant ****1234',
      transactionId: 'TXN-20240825-002'
    },
    {
      id: '3',
      payeeName: 'Veolia',
      payeeCategory: 'Eau',
      amount: 67.80,
      reference: 'EAU-Q3-2024',
      date: '2024-08-30T09:00:00Z',
      status: 'pending',
      account: 'Compte Courant ****1234',
      transactionId: 'TXN-20240830-003'
    },
    {
      id: '4',
      payeeName: 'Assurance Auto',
      payeeCategory: 'Assurance',
      amount: 156.20,
      reference: 'AUTO-08-2024',
      date: '2024-08-29T16:45:00Z',
      status: 'failed',
      account: 'Compte Courant ****1234',
      transactionId: 'TXN-20240829-004',
      errorMessage: 'Solde insuffisant'
    }
  ];

  const allPayments = payments?.length > 0 ? payments : mockPayments;

  const filteredPayments = allPayments?.filter(payment => {
    if (filter === 'all') return true;
    return payment?.status === filter;
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'pending': return 'bg-warning/10';
      case 'failed': return 'bg-destructive/10';
      default: return 'bg-muted/10';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Effectué';
      case 'pending': return 'En cours';
      case 'failed': return 'Échoué';
      default: return 'Inconnu';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Tous', count: allPayments?.length },
    { value: 'completed', label: 'Effectués', count: allPayments?.filter(p => p?.status === 'completed')?.length },
    { value: 'pending', label: 'En cours', count: allPayments?.filter(p => p?.status === 'pending')?.length },
    { value: 'failed', label: 'Échoués', count: allPayments?.filter(p => p?.status === 'failed')?.length }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Paiements récents</h2>
          <p className="text-sm text-muted-foreground">
            Historique de vos derniers paiements de factures
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          Voir tout
        </Button>
      </div>
      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filterOptions?.map(option => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
              filter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{option?.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              filter === option?.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Payments List */}
      <div className="space-y-3">
        {filteredPayments?.length > 0 ? (
          filteredPayments?.map((payment) => (
            <div key={payment?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {/* Status Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(payment?.status)}`}>
                    <Icon 
                      name={getStatusIcon(payment?.status)} 
                      size={20} 
                      className={getStatusColor(payment?.status)} 
                    />
                  </div>

                  {/* Payment Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground truncate">
                          {payment?.payeeName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {payment?.payeeCategory} • {payment?.reference}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(payment?.date)} • {payment?.account}
                        </p>
                      </div>

                      <div className="text-right ml-4">
                        <div className="font-semibold text-foreground">
                          {formatAmount(payment?.amount)}
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(payment?.status)} ${getStatusColor(payment?.status)}`}>
                          <Icon name={getStatusIcon(payment?.status)} size={10} />
                          <span>{getStatusLabel(payment?.status)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {payment?.status === 'failed' && payment?.errorMessage && (
                      <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-xs text-destructive">
                          <Icon name="AlertCircle" size={12} className="inline mr-1" />
                          {payment?.errorMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails && onViewDetails(payment)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  
                  {payment?.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRepeatPayment && onRepeatPayment(payment)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Repeat" size={14} />
                    </Button>
                  )}
                  
                  {payment?.status === 'failed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRepeatPayment && onRepeatPayment(payment)}
                      className="text-primary hover:text-primary"
                    >
                      <Icon name="RefreshCw" size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun paiement trouvé
            </h3>
            <p className="text-muted-foreground">
              {filter === 'all' ?'Vous n\'avez effectué aucun paiement récemment'
                : `Aucun paiement ${getStatusLabel(filter)?.toLowerCase()} trouvé`
              }
            </p>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      {allPayments?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {allPayments?.filter(p => p?.status === 'completed')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Effectués</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {allPayments?.filter(p => p?.status === 'pending')?.length}
            </div>
            <div className="text-xs text-muted-foreground">En cours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {allPayments?.filter(p => p?.status === 'failed')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Échoués</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {formatAmount(allPayments?.filter(p => p?.status === 'completed')?.reduce((sum, p) => sum + p?.amount, 0))}
            </div>
            <div className="text-xs text-muted-foreground">Total payé</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentPayments;