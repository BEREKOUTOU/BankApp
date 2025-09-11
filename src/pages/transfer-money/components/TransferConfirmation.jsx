import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransferConfirmation = ({ transferResult, sourceAccount, recipient, transferData }) => {
  const navigate = useNavigate();

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNewTransfer = () => {
    window.location?.reload();
  };

  const handleViewHistory = () => {
    navigate('/transaction-history');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Virement confirmé !
          </h2>
          <p className="text-muted-foreground">
            Votre virement a été traité avec succès
          </p>
        </div>
      </div>
      {/* Transfer Details Card */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Amount */}
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-success mb-2">
            {formatBalance(transferData?.amount)}
          </div>
          <div className="text-sm text-muted-foreground">
            {transferData?.reference}
          </div>
        </div>

        {/* Transaction Reference */}
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">
            Référence de transaction
          </div>
          <div className="font-mono font-semibold text-foreground text-lg">
            {transferResult?.reference}
          </div>
        </div>

        {/* Transfer Summary */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Account */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">De</div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {sourceAccount?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sourceAccount?.number}
                  </div>
                </div>
              </div>
            </div>

            {/* To Account */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Vers</div>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={recipient?.type === 'business' ? 'Building2' : 'User'} size={20} color="var(--color-success)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {recipient?.name}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {recipient?.number || (recipient?.iban && recipient?.iban?.slice(-4))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="border-t border-border pt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date et heure :</span>
            <span className="font-mono">{formatDate(new Date())}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Statut :</span>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-success font-medium">Confirmé</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Temps de traitement estimé :</span>
            <span>{transferResult?.estimatedProcessingTime}</span>
          </div>

          {transferData?.executionDate === 'scheduled' && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date d'exécution :</span>
              <span>{new Date(transferData.scheduledDate)?.toLocaleDateString('fr-FR')}</span>
            </div>
          )}

          {transferData?.isRecurring && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Récurrence :</span>
              <span>
                {transferData?.recurringFrequency === 'weekly' ? 'Hebdomadaire' :
                 transferData?.recurringFrequency === 'monthly' ? 'Mensuel' :
                 transferData?.recurringFrequency === 'quarterly' ? 'Trimestriel' : 'Annuel'}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-foreground mb-1">
              Prochaines étapes
            </div>
            <ul className="text-muted-foreground space-y-1">
              <li>• Vous recevrez une notification une fois le virement traité</li>
              <li>• Le montant sera débité de votre compte dans les prochaines minutes</li>
              <li>• Vous pouvez suivre le statut dans votre historique des transactions</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleNewTransfer}
            className="w-full"
            iconName="Plus"
            iconPosition="left"
          >
            Nouveau virement
          </Button>
          
          <Button
            variant="outline"
            onClick={handleViewHistory}
            className="w-full"
            iconName="History"
            iconPosition="left"
          >
            Voir l'historique
          </Button>
        </div>

        <Button
          variant="default"
          onClick={handleBackToDashboard}
          className="w-full"
          iconName="Home"
          iconPosition="left"
        >
          Retour au tableau de bord
        </Button>
      </div>
      {/* Download Options */}
      <div className="flex justify-center space-x-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Télécharger le reçu
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Share2"
          iconPosition="left"
        >
          Partager
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Printer"
          iconPosition="left"
        >
          Imprimer
        </Button>
      </div>
    </div>
  );
};

export default TransferConfirmation;