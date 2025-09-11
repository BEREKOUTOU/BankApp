import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import AccountSelector from '../../../components/ui/AccountSelector';

const PaymentForm = ({ 
  selectedPayee, 
  onSubmit, 
  onCancel,
  className = "" 
}) => {
  const [formData, setFormData] = useState({
    amount: '',
    reference: '',
    dueDate: '',
    notes: '',
    isRecurring: false,
    frequency: 'monthly',
    selectedAccount: null
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const accounts = [
    { id: '1', name: 'Compte Courant', number: '****1234', balance: 2450.75, type: 'checking' },
    { id: '2', name: 'Livret A', number: '****5678', balance: 15680.20, type: 'savings' },
    { id: '3', name: 'Compte Professionnel', number: '****9012', balance: 8920.45, type: 'business' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'quarterly', label: 'Trimestriel' },
    { value: 'yearly', label: 'Annuel' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Veuillez saisir un montant valide';
    }

    if (!formData?.selectedAccount) {
      newErrors.account = 'Veuillez sélectionner un compte';
    } else if (parseFloat(formData?.amount) > formData?.selectedAccount?.balance) {
      newErrors.amount = 'Solde insuffisant';
    }

    if (!formData?.reference?.trim()) {
      newErrors.reference = 'La référence est obligatoire';
    }

    if (!formData?.dueDate) {
      newErrors.dueDate = 'Veuillez sélectionner une date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onSubmit({
        ...formData,
        payee: selectedPayee,
        timestamp: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  if (!selectedPayee) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Sélectionnez un bénéficiaire
        </h3>
        <p className="text-muted-foreground">
          Choisissez un bénéficiaire pour commencer le paiement
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="CreditCard" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Paiement de facture</h2>
            <p className="text-sm text-muted-foreground">
              Paiement à {selectedPayee?.name}
            </p>
          </div>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Account Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Compte à débiter
          </label>
          <AccountSelector
            accounts={accounts}
            selectedAccount={formData?.selectedAccount}
            onAccountSelect={(account) => handleInputChange('selectedAccount', account)}
          />
          {errors?.account && (
            <p className="text-sm text-destructive">{errors?.account}</p>
          )}
        </div>

        {/* Amount */}
        <Input
          label="Montant"
          type="number"
          placeholder="0,00"
          value={formData?.amount}
          onChange={(e) => handleInputChange('amount', e?.target?.value)}
          error={errors?.amount}
          required
          min="0.01"
          step="0.01"
          className="text-right font-mono"
        />

        {/* Reference */}
        <Input
          label="Référence"
          type="text"
          placeholder="Numéro de facture ou référence"
          value={formData?.reference}
          onChange={(e) => handleInputChange('reference', e?.target?.value)}
          error={errors?.reference}
          required
          description="Cette référence apparaîtra sur votre relevé"
        />

        {/* Due Date */}
        <Input
          label="Date d'échéance"
          type="date"
          value={formData?.dueDate}
          onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
          error={errors?.dueDate}
          required
          min={getTodayDate()}
        />

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Notes (optionnel)
          </label>
          <textarea
            placeholder="Ajoutez une note pour ce paiement..."
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            rows={3}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth resize-none"
          />
        </div>

        {/* Recurring Payment */}
        <div className="space-y-4">
          <Checkbox
            label="Paiement récurrent"
            description="Configurer ce paiement pour qu'il se répète automatiquement"
            checked={formData?.isRecurring}
            onChange={(e) => handleInputChange('isRecurring', e?.target?.checked)}
          />

          {formData?.isRecurring && (
            <div className="ml-6 space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Fréquence
                </label>
                <select
                  value={formData?.frequency}
                  onChange={(e) => handleInputChange('frequency', e?.target?.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                >
                  {frequencyOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start space-x-2 p-3 bg-primary/5 border border-primary/20 rounded-md">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-primary mb-1">Paiement automatique</p>
                  <p className="text-muted-foreground">
                    Le paiement sera automatiquement effectué selon la fréquence choisie. 
                    Vous pouvez l'annuler à tout moment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction Limits Warning */}
        {formData?.amount && parseFloat(formData?.amount) > 1000 && (
          <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">Authentification requise</p>
              <p className="text-muted-foreground">
                Ce montant nécessite une authentification supplémentaire pour des raisons de sécurité.
              </p>
            </div>
          </div>
        )}

        {/* Summary */}
        {formData?.amount && formData?.selectedAccount && (
          <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <h4 className="font-medium text-foreground">Résumé du paiement</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant:</span>
                <span className="font-semibold">{formatAmount(parseFloat(formData?.amount) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais:</span>
                <span className="font-semibold">Gratuit</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1">
                <span className="font-medium text-foreground">Total:</span>
                <span className="font-semibold text-foreground">
                  {formatAmount(parseFloat(formData?.amount) || 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
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
            type="submit"
            variant="default"
            className="flex-1"
            loading={isProcessing}
            disabled={!formData?.amount || !formData?.selectedAccount || !formData?.reference}
          >
            {isProcessing ? 'Traitement...' : 'Payer maintenant'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;