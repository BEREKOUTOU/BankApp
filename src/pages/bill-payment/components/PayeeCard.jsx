import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PayeeCard = ({ 
  payee, 
  onSelect, 
  onEdit, 
  onDelete, 
  isSelected = false,
  className = "" 
}) => {
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
      year: 'numeric'
    })?.format(new Date(date));
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-elevation-2 ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      } ${className}`}
      onClick={() => onSelect(payee)}
    >
      <div className="flex items-start space-x-3">
        {/* Company Logo */}
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {payee?.logo ? (
            <Image 
              src={payee?.logo} 
              alt={payee?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="Building2" size={20} className="text-muted-foreground" />
          )}
        </div>

        {/* Payee Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{payee?.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{payee?.category}</p>
              
              {payee?.accountNumber && (
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {payee?.accountNumber}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onEdit(payee);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="Edit2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onDelete(payee);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>

          {/* Last Payment Info */}
          {payee?.lastPayment && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dernier paiement</span>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatAmount(payee?.lastPayment?.amount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(payee?.lastPayment?.date)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Status */}
          {payee?.status && (
            <div className="mt-2">
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                payee?.status === 'active' ? 'bg-success/10 text-success' :
                payee?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                <Icon 
                  name={
                    payee?.status === 'active' ? 'CheckCircle' :
                    payee?.status === 'pending'? 'Clock' : 'AlertCircle'
                  } 
                  size={10} 
                />
                <span>
                  {payee?.status === 'active' ? 'Actif' :
                   payee?.status === 'pending'? 'En attente' : 'Inactif'}
                </span>
              </div>
            </div>
          )}

          {/* Recurring Payment Indicator */}
          {payee?.isRecurring && (
            <div className="mt-2">
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                <Icon name="Repeat" size={10} />
                <span>Récurrent</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PayeeCard;