import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TransferDetails = ({ 
  transferData, 
  onTransferDataChange, 
  onNext, 
  onBack, 
  sourceAccount, 
  recipient 
}) => {
  const [amount, setAmount] = useState(transferData?.amount || '');
  const [reference, setReference] = useState(transferData?.reference || '');
  const [executionDate, setExecutionDate] = useState(transferData?.executionDate || 'immediate');
  const [scheduledDate, setScheduledDate] = useState(transferData?.scheduledDate || '');
  const [isRecurring, setIsRecurring] = useState(transferData?.isRecurring || false);
  const [recurringFrequency, setRecurringFrequency] = useState(transferData?.recurringFrequency || 'monthly');
  const [errors, setErrors] = useState({});

  const executionOptions = [
    { value: 'immediate', label: 'Immédiat' },
    { value: 'scheduled', label: 'Programmé' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'quarterly', label: 'Trimestriel' },
    { value: 'yearly', label: 'Annuel' }
  ];

  const formatAmount = (value) => {
    const numericValue = value?.replace(/[^\d,]/g, '');
    const parts = numericValue?.split(',');
    if (parts?.[0]) {
      parts[0] = parts?.[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return parts?.join(',');
  };

  const parseAmount = (formattedAmount) => {
    return parseFloat(formattedAmount?.replace(/\s/g, '')?.replace(',', '.')) || 0;
  };

  const validateForm = () => {
    const newErrors = {};
    const numericAmount = parseAmount(amount);

    if (!amount || numericAmount <= 0) {
      newErrors.amount = 'Le montant est requis et doit être supérieur à 0';
    } else if (numericAmount > sourceAccount?.available) {
      newErrors.amount = 'Montant supérieur au solde disponible';
    } else if (numericAmount > 10000) {
      newErrors.amount = 'Montant supérieur à la limite quotidienne (10 000 €)';
    }

    if (!reference?.trim()) {
      newErrors.reference = 'La référence est requise';
    } else if (reference?.length > 140) {
      newErrors.reference = 'La référence ne peut pas dépasser 140 caractères';
    }

    if (executionDate === 'scheduled' && !scheduledDate) {
      newErrors.scheduledDate = 'La date d\'exécution est requise';
    }

    if (executionDate === 'scheduled' && scheduledDate) {
      const selectedDate = new Date(scheduledDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.scheduledDate = 'La date ne peut pas être antérieure à aujourd\'hui';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAmountChange = (e) => {
    const value = e?.target?.value;
    const formatted = formatAmount(value);
    setAmount(formatted);
  };

  const handleNext = () => {
    if (validateForm()) {
      const transferDetails = {
        amount: parseAmount(amount),
        formattedAmount: amount,
        reference,
        executionDate,
        scheduledDate: executionDate === 'scheduled' ? scheduledDate : null,
        isRecurring,
        recurringFrequency: isRecurring ? recurringFrequency : null
      };
      
      onTransferDataChange(transferDetails);
      onNext();
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  const getTransferFee = () => {
    const numericAmount = parseAmount(amount);
    if (recipient?.type === 'external' || !recipient?.isOwn) {
      return numericAmount > 1000 ? 2.50 : 0;
    }
    return 0;
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      validateForm();
    }
  }, [amount, reference, executionDate, scheduledDate]);

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Détails du virement
        </h2>
        <p className="text-muted-foreground">
          Saisissez le montant et les informations du virement
        </p>
      </div>
      {/* Transfer Summary */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">De :</span>
          <div className="text-right">
            <div className="font-medium text-foreground">{sourceAccount?.name}</div>
            <div className="text-muted-foreground">{sourceAccount?.number}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <Icon name="ArrowDown" size={16} className="text-muted-foreground" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Vers :</span>
          <div className="text-right">
            <div className="font-medium text-foreground">{recipient?.name}</div>
            <div className="text-muted-foreground">
              {recipient?.number || (recipient?.iban && recipient?.iban?.slice(-4))}
            </div>
          </div>
        </div>
      </div>
      {/* Amount Input */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Montant"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0,00"
            error={errors?.amount}
            required
            className="text-right text-2xl font-mono pr-12"
          />
          <div className="absolute right-3 top-9 text-muted-foreground font-medium">
            €
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Solde disponible :</span>
          <span className="font-mono font-semibold text-foreground">
            {formatBalance(sourceAccount?.available || 0)}
          </span>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[50, 100, 200, 500]?.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount?.toString())}
              className="text-xs"
            >
              {quickAmount} €
            </Button>
          ))}
        </div>
      </div>
      {/* Reference */}
      <Input
        label="Référence"
        type="text"
        value={reference}
        onChange={(e) => setReference(e?.target?.value)}
        placeholder="Motif du virement"
        description="Cette information apparaîtra sur vos relevés"
        error={errors?.reference}
        required
        maxLength={140}
      />
      {/* Execution Date */}
      <div className="space-y-4">
        <Select
          label="Date d'exécution"
          options={executionOptions}
          value={executionDate}
          onChange={setExecutionDate}
          required
        />

        {executionDate === 'scheduled' && (
          <Input
            label="Date programmée"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e?.target?.value)}
            min={getTodayDate()}
            error={errors?.scheduledDate}
            required
          />
        )}
      </div>
      {/* Recurring Transfer */}
      <div className="space-y-4">
        <Checkbox
          label="Virement récurrent"
          description="Répéter ce virement automatiquement"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e?.target?.checked)}
        />

        {isRecurring && (
          <Select
            label="Fréquence"
            options={frequencyOptions}
            value={recurringFrequency}
            onChange={setRecurringFrequency}
            required
          />
        )}
      </div>
      {/* Transfer Summary */}
      {amount && parseAmount(amount) > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-foreground">Récapitulatif</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Montant :</span>
              <span className="font-mono">{amount} €</span>
            </div>
            
            {getTransferFee() > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais :</span>
                <span className="font-mono">{formatBalance(getTransferFee())}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-2">
              <div className="flex justify-between font-medium">
                <span>Total à débiter :</span>
                <span className="font-mono">
                  {formatBalance(parseAmount(amount) + getTransferFee())}
                </span>
              </div>
            </div>
          </div>

          {/* Execution Info */}
          <div className="pt-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>
                {executionDate === 'immediate' ?'Exécution immédiate' 
                  : `Exécution le ${new Date(scheduledDate)?.toLocaleDateString('fr-FR')}`
                }
              </span>
            </div>
            
            {recipient?.type !== 'internal' && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Info" size={12} />
                <span>Délai de traitement : 1-2 jours ouvrés</span>
              </div>
            )}
          </div>
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
        >
          Retour
        </Button>
        
        <div className="flex-1" />
        
        <Button
          variant="default"
          onClick={handleNext}
          className="flex-1 sm:flex-none sm:min-w-32"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default TransferDetails;