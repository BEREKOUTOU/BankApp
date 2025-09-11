import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentConfirmation = ({ 
  paymentData, 
  onConfirm, 
  onCancel, 
  onBack,
  className = "" 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [setupAutoPayment, setSetupAutoPayment] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing
      
      const confirmationData = {
        ...paymentData,
        setupAutoPayment,
        sendNotification,
        transactionId: `TXN-${Date.now()}`,
        processedAt: new Date()?.toISOString(),
        status: 'completed'
      };
      
      onConfirm(confirmationData);
    } catch (error) {
      console.error('Payment processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getProcessingTime = () => {
    const dueDate = new Date(paymentData.dueDate);
    const today = new Date();
    
    if (dueDate?.toDateString() === today?.toDateString()) {
      return 'Immédiat (dans les 2 heures)';
    } else {
      return `Le ${formatDate(dueDate)} avant 10h00`;
    }
  };

  if (!paymentData) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Données de paiement manquantes
        </h3>
        <p className="text-muted-foreground">
          Veuillez retourner à l'étape précédente
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CreditCard" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Confirmer le paiement
        </h2>
        <p className="text-muted-foreground">
          Vérifiez les détails avant de valider votre paiement
        </p>
      </div>
      {/* Payment Summary */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{paymentData?.payee?.name}</h3>
              <p className="text-sm text-muted-foreground">{paymentData?.payee?.category}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Montant</label>
              <div className="text-2xl font-bold text-foreground">
                {formatAmount(parseFloat(paymentData?.amount))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date d'exécution</label>
              <div className="text-lg font-semibold text-foreground">
                {formatDate(paymentData?.dueDate)}
              </div>
              <div className="text-sm text-muted-foreground">
                {getProcessingTime()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Référence</label>
              <div className="font-mono text-foreground">{paymentData?.reference}</div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Compte à débiter</label>
              <div className="text-foreground">
                {paymentData?.selectedAccount?.name}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {paymentData?.selectedAccount?.number}
              </div>
            </div>
          </div>

          {paymentData?.notes && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notes</label>
              <div className="text-foreground">{paymentData?.notes}</div>
            </div>
          )}

          {paymentData?.isRecurring && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Repeat" size={16} className="text-primary" />
                <span className="font-medium text-primary">Paiement récurrent</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ce paiement sera automatiquement répété chaque{' '}
                {paymentData?.frequency === 'weekly' ? 'semaine' :
                 paymentData?.frequency === 'monthly' ? 'mois' :
                 paymentData?.frequency === 'quarterly'? 'trimestre' : 'année'}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Transaction Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4">Détails de la transaction</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Montant du paiement:</span>
            <span className="font-semibold">{formatAmount(parseFloat(paymentData?.amount))}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frais de transaction:</span>
            <span className="font-semibold text-success">Gratuit</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taux de change:</span>
            <span className="font-semibold">N/A (EUR → EUR)</span>
          </div>
          
          <hr className="border-border" />
          
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-foreground">Total à débiter:</span>
            <span className="font-bold text-foreground">
              {formatAmount(parseFloat(paymentData?.amount))}
            </span>
          </div>
        </div>
      </div>
      {/* Options */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-foreground">Options supplémentaires</h4>
        
        <Checkbox
          label="Configurer un paiement automatique"
          description="Répéter automatiquement ce paiement à la même date chaque mois"
          checked={setupAutoPayment}
          onChange={(e) => setSetupAutoPayment(e?.target?.checked)}
        />
        
        <Checkbox
          label="Recevoir une notification"
          description="Être notifié par email et SMS une fois le paiement effectué"
          checked={sendNotification}
          onChange={(e) => setSendNotification(e?.target?.checked)}
        />
      </div>
      {/* Security Notice */}
      <div className="flex items-start space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-primary mb-1">Transaction sécurisée</p>
          <p className="text-muted-foreground">
            Cette transaction est protégée par un chiffrement de niveau bancaire. 
            Vos données sont sécurisées et ne seront jamais partagées.
          </p>
        </div>
      </div>
      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="CreditCard" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Traitement en cours...
          </h3>
          <p className="text-muted-foreground mb-4">
            Veuillez patienter pendant que nous traitons votre paiement
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isProcessing}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Retour
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isProcessing}
        >
          Annuler
        </Button>
        
        <Button
          type="button"
          variant="default"
          onClick={handleConfirm}
          className="flex-1"
          loading={isProcessing}
          disabled={isProcessing}
          iconName="Check"
          iconPosition="left"
        >
          {isProcessing ? 'Traitement...' : 'Confirmer le paiement'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;