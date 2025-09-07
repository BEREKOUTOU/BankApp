import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionCard = ({ 
  transaction, 
  onSelect, 
  isSelected = false, 
  showAccount = false,
  onDispute 
}) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(Math.abs(amount));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
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
    <div 
      className={`bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-elevation-2 cursor-pointer ${
        isSelected ? 'ring-2 ring-primary/20 border-primary' : ''
      }`}
      onClick={() => onSelect && onSelect(transaction)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Category Icon */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            transaction?.type === 'credit' ? 'bg-success/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={getCategoryIcon(transaction?.category)} 
              size={20} 
              color={transaction?.type === 'credit' ? 'var(--color-success)' : 'var(--color-primary)'} 
            />
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-foreground truncate pr-2">
                {transaction?.merchant || transaction?.description}
              </h3>
              <div className="text-right flex-shrink-0">
                <div className={`font-mono font-semibold ${
                  transaction?.type === 'credit' ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction?.type === 'credit' ? '+' : '-'}{formatAmount(transaction?.amount)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>{formatDate(transaction?.date)}</span>
                <span>•</span>
                <span>{formatTime(transaction?.date)}</span>
                {transaction?.reference && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-xs">{transaction?.reference}</span>
                  </>
                )}
              </div>
            </div>

            {/* Account Info (if showing multiple accounts) */}
            {showAccount && transaction?.account && (
              <div className="flex items-center space-x-1 mt-2">
                <Icon name="CreditCard" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{transaction?.account}</span>
              </div>
            )}

            {/* Status Badge */}
            <div className="flex items-center justify-between mt-2">
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(transaction?.status)} ${getStatusColor(transaction?.status)}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  transaction?.status === 'completed' ? 'bg-success' :
                  transaction?.status === 'pending' ? 'bg-warning' : 'bg-error'
                }`} />
                <span>
                  {transaction?.status === 'completed' ? 'Terminé' :
                   transaction?.status === 'pending' ? 'En attente' : 'Échoué'}
                </span>
              </div>

              {/* Action Menu */}
              <div className="flex items-center space-x-1">
                {transaction?.status === 'completed' && transaction?.type === 'debit' && (
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onDispute && onDispute(transaction);
                    }}
                    className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                    title="Contester"
                  >
                    <Icon name="AlertTriangle" size={14} />
                  </button>
                )}
                <button
                  onClick={(e) => e?.stopPropagation()}
                  className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                  title="Plus d'options"
                >
                  <Icon name="MoreVertical" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;