import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransferSummary = ({ 
  sourceAccount, 
  recipient, 
  transferData, 
  onConfirm, 
  onBack 
}) => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityCode, setSecurityCode] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const formatIban = (iban) => {
    return iban?.replace(/(.{4})/g, '$1 ')?.trim();
  };

  const getTransferFee = () => {
    if (recipient?.type === 'external' || !recipient?.isOwn) {
      return transferData?.amount > 1000 ? 2.50 : 0;
    }
    return 0;
  };

  const getTotalAmount = () => {
    return transferData?.amount + getTransferFee();
  };

  const getExecutionLabel = () => {
    if (transferData?.executionDate === 'immediate') {
      return 'Immédiat';
    }
    return `Programmé le ${new Date(transferData?.scheduledDate)?.toLocaleDateString('fr-FR')}`;
  };

  const getRecurringLabel = () => {
    if (!transferData?.isRecurring) return null;
    
    const frequencies = {
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      quarterly: 'Trimestriel',
      yearly: 'Annuel'
    };
    
    return frequencies?.[transferData?.recurringFrequency];
  };

  const requiresSecurityCode = () => {
    return transferData?.amount > 1000 || recipient?.type === 'external';
  };

  const handleConfirmClick = () => {
    if (requiresSecurityCode()) {
      setShowSecurityModal(true);
    } else {
      processTransfer();
    }
  };

  const handleSecuritySubmit = () => {
    // Mock security code validation
    if (securityCode === '123456') {
      setShowSecurityModal(false);
      processTransfer();
    } else {
      setSecurityError('Code de sécurité incorrect. Code de test : 123456');
    }
  };

  const processTransfer = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transferResult = {
      id: `TRF-${Date.now()}`,
      status: 'confirmed',
      reference: `REF${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
      estimatedProcessingTime: transferData?.executionDate === 'immediate' ? 'Quelques minutes' : '1-2 jours ouvrés'
    };
    
    onConfirm(transferResult);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Confirmer le virement
          </h2>
          <p className="text-muted-foreground">
            Vérifiez les détails avant de confirmer votre virement
          </p>
        </div>

        {/* Transfer Overview */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* Amount */}
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-foreground mb-2">
              {formatBalance(transferData?.amount)}
            </div>
            <div className="text-sm text-muted-foreground">
              {transferData?.reference}
            </div>
          </div>

          {/* Transfer Flow */}
          <div className="space-y-4">
            {/* Source Account */}
            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="CreditCard" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{sourceAccount?.name}</div>
                <div className="text-sm text-muted-foreground">{sourceAccount?.number}</div>
                <div className="text-xs text-muted-foreground">
                  Solde après virement : {formatBalance(sourceAccount?.available - getTotalAmount())}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Débit</div>
                <div className="font-mono font-semibold text-error">
                  -{formatBalance(getTotalAmount())}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="ArrowDown" size={16} className="text-primary" />
              </div>
            </div>

            {/* Recipient */}
            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={recipient?.type === 'business' ? 'Building2' : 'User'} size={24} color="var(--color-success)" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{recipient?.name}</div>
                <div className="text-sm text-muted-foreground font-mono">
                  {recipient?.number || formatIban(recipient?.iban)}
                </div>
                {recipient?.bank && (
                  <div className="text-xs text-muted-foreground">{recipient?.bank}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Crédit</div>
                <div className="font-mono font-semibold text-success">
                  +{formatBalance(transferData?.amount)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Détails du virement</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Montant :</span>
              <span className="font-mono">{formatBalance(transferData?.amount)}</span>
            </div>
            
            {getTransferFee() > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais :</span>
                <span className="font-mono">{formatBalance(getTransferFee())}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exécution :</span>
              <span>{getExecutionLabel()}</span>
            </div>
            
            {getRecurringLabel() && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Récurrence :</span>
                <span>{getRecurringLabel()}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-medium">
                <span>Total à débiter :</span>
                <span className="font-mono">{formatBalance(getTotalAmount())}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        {requiresSecurityCode() && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-foreground mb-1">
                  Authentification requise
                </div>
                <div className="text-muted-foreground">
                  Ce virement nécessite une authentification par code de sécurité pour des raisons de sécurité.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEPA Compliance */}
        {recipient?.iban && (
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Virement SEPA sécurisé</span>
            <span>•</span>
            <span>Conforme aux normes européennes</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 sm:flex-none"
            iconName="ArrowLeft"
            iconPosition="left"
            disabled={isProcessing}
          >
            Retour
          </Button>
          
          <div className="flex-1" />
          
          <Button
            variant="default"
            onClick={handleConfirmClick}
            loading={isProcessing}
            className="flex-1 sm:flex-none sm:min-w-40"
            iconName="Check"
            iconPosition="left"
          >
            {isProcessing ? 'Traitement...' : 'Confirmer le virement'}
          </Button>
        </div>
      </div>
      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-elevation-3 p-6 max-w-md mx-4 w-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Code de sécurité requis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Saisissez votre code de sécurité pour confirmer ce virement
                </p>
              </div>

              <Input
                label="Code de sécurité"
                type="password"
                value={securityCode}
                onChange={(e) => {
                  setSecurityCode(e?.target?.value);
                  setSecurityError('');
                }}
                placeholder="Entrez votre code"
                error={securityError}
                className="text-center font-mono text-lg"
                maxLength={6}
              />

              <div className="text-xs text-muted-foreground">
                Code de test pour la démonstration : <span className="font-mono font-semibold">123456</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSecurityModal(false);
                    setSecurityCode('');
                    setSecurityError('');
                  }}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  onClick={handleSecuritySubmit}
                  disabled={!securityCode}
                  className="flex-1"
                >
                  Confirmer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferSummary;