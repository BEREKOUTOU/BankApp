import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailsModal = ({ 
  transaction, 
  isOpen, 
  onClose, 
  onDispute 
}) => {
  if (!isOpen || !transaction) return null;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(Math.abs(amount));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'shopping': 'ShoppingBag',
      'food': 'UtensilsCrossed',
      'transport': 'Car',
      'entertainment': 'Film',
      'health': 'Heart',
      'utilities': 'Zap',
      'salary': 'Banknote',
      'transfer': 'ArrowLeftRight',
      'investment': 'TrendingUp',
      'subscription': 'RefreshCw',
      'cash': 'Banknote',
      'other': 'MoreHorizontal'
    };
    return icons?.[category] || 'MoreHorizontal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'pending': return 'bg-warning/10';
      case 'failed': return 'bg-error/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Détails de la transaction</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Transaction Overview */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              transaction?.type === 'credit' ? 'bg-success/10' : 'bg-primary/10'
            }`}>
              <Icon 
                name={getCategoryIcon(transaction?.category)} 
                size={32} 
                color={transaction?.type === 'credit' ? 'var(--color-success)' : 'var(--color-primary)'} 
              />
            </div>
            
            <div className={`text-3xl font-mono font-bold mb-2 ${
              transaction?.type === 'credit' ? 'text-success' : 'text-foreground'
            }`}>
              {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
            </div>
            
            <h3 className="text-lg font-medium text-foreground mb-1">
              {transaction?.merchant || transaction?.description}
            </h3>
            
            <p className="text-muted-foreground">
              {formatDate(transaction?.date)}
            </p>
          </div>

          {/* Status */}
          <div className="flex justify-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium ${getStatusBg(transaction?.status)} ${getStatusColor(transaction?.status)}`}>
              <div className={`w-2 h-2 rounded-full ${
                transaction?.status === 'completed' ? 'bg-success' :
                transaction?.status === 'pending' ? 'bg-warning' : 'bg-error'
              }`} />
              <span>
                {transaction?.status === 'completed' ? 'Transaction terminée' :
                 transaction?.status === 'pending' ? 'Transaction en attente' : 'Transaction échouée'}
              </span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Référence</label>
                <p className="font-mono text-sm text-foreground mt-1">
                  {transaction?.reference || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Catégorie</label>
                <p className="text-sm text-foreground mt-1 capitalize">
                  {transaction?.category}
                </p>
              </div>
            </div>

            {transaction?.account && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Compte</label>
                <p className="text-sm text-foreground mt-1">{transaction?.account}</p>
              </div>
            )}

            {transaction?.location && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Lieu</label>
                <p className="text-sm text-foreground mt-1">{transaction?.location}</p>
              </div>
            )}

            {transaction?.description && transaction?.description !== transaction?.merchant && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm text-foreground mt-1">{transaction?.description}</p>
              </div>
            )}

            {transaction?.balance && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Solde après transaction</label>
                <p className="font-mono text-sm text-foreground mt-1">
                  {formatAmount(transaction?.balance)}
                </p>
              </div>
            )}
          </div>

          {/* Additional Information */}
          {transaction?.additionalInfo && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Informations complémentaires</h4>
              <p className="text-sm text-muted-foreground">{transaction?.additionalInfo}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Export transaction')}
              >
                Exporter
              </Button>
              <Button
                variant="outline"
                iconName="Printer"
                iconPosition="left"
                onClick={() => console.log('Print transaction')}
              >
                Imprimer
              </Button>
            </div>

            {transaction?.status === 'completed' && transaction?.type === 'debit' && (
              <Button
                variant="destructive"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={() => {
                  onDispute && onDispute(transaction);
                  onClose();
                }}
              >
                Contester cette transaction
              </Button>
            )}

            <Button
              variant="ghost"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => console.log('Contact support')}
            >
              Contacter le support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;