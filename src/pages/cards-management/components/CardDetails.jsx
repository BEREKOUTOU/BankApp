import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CardDetails = ({ 
  card, 
  formatCurrency, 
  getCardTypeLabel, 
  getStatusLabel,
  isMobile = false 
}) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'blocked':
        return 'text-error';
      case 'expired':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getLimitProgress = (used, limit) => {
    return limit > 0 ? (used / limit) * 100 : 0;
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-error';
    if (progress >= 70) return 'bg-warning';
    return 'bg-success';
  };

  const copyToClipboard = (text) => {
    navigator?.clipboard?.writeText(text)?.then(() => {
      // Show toast notification in real app
      console.log('Copied to clipboard');
    });
  };

  return (
    <div className="space-y-6">
      {/* Virtual Card Display */}
      <div className="relative">
        <div 
          className={`relative w-full h-48 ${isMobile ? 'h-40' : 'h-48'} bg-gradient-to-r ${card?.gradient} rounded-xl p-6 text-white shadow-elevation-3 overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-white/20 rounded-full" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white/80 text-sm">{card?.bankName}</div>
                <div className="text-xs text-white/60">{getCardTypeLabel(card?.type)}</div>
              </div>
              <Icon name="Wifi" size={20} className="text-white/60" />
            </div>
            
            <div>
              <div className="font-mono text-lg tracking-wide mb-2">
                {showFullNumber ? card?.fullNumber : card?.number}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60">TITULAIRE</div>
                  <div className="text-sm font-medium">{card?.holderName}</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">EXPIRE</div>
                  <div className="text-sm font-medium">{card?.expiryDate}</div>
                </div>
                {showCVV && (
                  <div>
                    <div className="text-xs text-white/60">CVV</div>
                    <div className="text-sm font-medium">{card?.cvv}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex justify-center mt-4 space-x-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setShowFullNumber(!showFullNumber)}
            iconName={showFullNumber ? "EyeOff" : "Eye"}
            iconPosition="left"
          >
            {showFullNumber ? "Masquer" : "Afficher"} numéro
          </Button>
          
          <Button
            variant="outline"
            size="xs"
            onClick={() => setShowCVV(!showCVV)}
            iconName={showCVV ? "EyeOff" : "Eye"}
            iconPosition="left"
          >
            {showCVV ? "Masquer" : "Afficher"} CVV
          </Button>
          
          <Button
            variant="outline"
            size="xs"
            onClick={() => copyToClipboard(card?.fullNumber)}
            iconName="Copy"
            iconPosition="left"
          >
            Copier
          </Button>
        </div>
      </div>

      {/* Card Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status */}
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Statut</div>
            <div className={`font-medium ${getStatusColor(card?.status)}`}>
              {getStatusLabel(card?.status)}
            </div>
          </div>
        </div>

        {/* Balance/Credit Info */}
        {card?.type === 'debit' || card?.type === 'prepaid' ? (
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Solde disponible</div>
              <div className="font-mono font-medium text-foreground">
                {formatCurrency(card?.balance)}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Crédit disponible</div>
              <div className="font-mono font-medium text-foreground">
                {formatCurrency(card?.availableCredit)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Limits and Usage (for debit cards) */}
      {card?.type === 'debit' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Limites et utilisation</h3>
          
          {/* Daily Limit */}
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Limite quotidienne</div>
              <div className="text-sm font-mono text-foreground">
                {formatCurrency(card?.usedDaily)} / {formatCurrency(card?.dailyLimit)}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  getProgressColor(getLimitProgress(card?.usedDaily, card?.dailyLimit))
                }`}
                style={{ width: `${Math.min(getLimitProgress(card?.usedDaily, card?.dailyLimit), 100)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Reste {formatCurrency(card?.dailyLimit - card?.usedDaily)} aujourd'hui
            </div>
          </div>

          {/* Monthly Limit */}
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Limite mensuelle</div>
              <div className="text-sm font-mono text-foreground">
                {formatCurrency(card?.usedMonthly)} / {formatCurrency(card?.monthlyLimit)}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  getProgressColor(getLimitProgress(card?.usedMonthly, card?.monthlyLimit))
                }`}
                style={{ width: `${Math.min(getLimitProgress(card?.usedMonthly, card?.monthlyLimit), 100)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Reste {formatCurrency(card?.monthlyLimit - card?.usedMonthly)} ce mois
            </div>
          </div>
        </div>
      )}

      {/* Credit Card Info */}
      {card?.type === 'credit' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Informations de crédit</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Limite de crédit</div>
              <div className="font-mono text-lg font-medium text-foreground">
                {formatCurrency(card?.creditLimit)}
              </div>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Crédit utilisé</div>
              <div className="font-mono text-lg font-medium text-foreground">
                {formatCurrency(card?.usedCredit)}
              </div>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Paiement minimum</div>
              <div className="font-mono text-lg font-medium text-error">
                {formatCurrency(card?.minPayment)}
              </div>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Prochaine échéance</div>
              <div className="font-medium text-foreground">
                {new Date(card?.nextPaymentDate)?.toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetails;