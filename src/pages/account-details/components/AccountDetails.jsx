import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountDetails = ({ account }) => {
  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const accountDetails = [
    {
      label: 'Numéro de compte complet',
      value: 'FR76 3000 6000 0112 3456 7890 189',
      icon: 'Hash',
      copyable: true
    },
    {
      label: 'Code BIC/SWIFT',
      value: 'AGRIFRPP',
      icon: 'Building',
      copyable: true
    },
    {
      label: 'Agence',
      value: 'Paris République - 00123',
      icon: 'MapPin',
      copyable: false
    },
    {
      label: 'Date d\'ouverture',
      value: '15 mars 2020',
      icon: 'Calendar',
      copyable: false
    },
    {
      label: 'Devise',
      value: 'Euro (EUR)',
      icon: 'Euro',
      copyable: false
    },
    {
      label: 'Statut du compte',
      value: 'Actif',
      icon: 'CheckCircle',
      copyable: false,
      status: 'success'
    }
  ];

  const limits = [
    {
      label: 'Plafond de virement journalier',
      current: 2500,
      maximum: 5000,
      icon: 'ArrowLeftRight'
    },
    {
      label: 'Plafond de retrait journalier',
      current: 500,
      maximum: 1000,
      icon: 'CreditCard'
    },
    {
      label: 'Plafond de paiement journalier',
      current: 1500,
      maximum: 3000,
      icon: 'ShoppingCart'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // In a real app, show a toast notification
    console.log('Copied to clipboard:', text);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-foreground';
    }
  };

  const getProgressPercentage = (current, maximum) => {
    return (current / maximum) * 100;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-error';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Informations détaillées</h3>
        
        <div className="space-y-4">
          {accountDetails?.map((detail, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
              <div className="flex items-center space-x-3">
                <Icon name={detail?.icon} size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{detail?.label}</p>
                  <p className={`font-medium ${detail?.status ? getStatusColor(detail?.status) : 'text-foreground'}`}>
                    {detail?.value}
                  </p>
                </div>
              </div>
              
              {detail?.copyable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(detail?.value)}
                  iconName="Copy"
                >
                  Copier
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Account Limits */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Plafonds et limites</h3>
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Modifier
          </Button>
        </div>
        
        <div className="space-y-6">
          {limits?.map((limit, index) => {
            const percentage = getProgressPercentage(limit?.current, limit?.maximum);
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={limit?.icon} size={18} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{limit?.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatBalance(limit?.current)} / {formatBalance(limit?.maximum)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Utilisé: {percentage?.toFixed(0)}%</span>
                  <span>Disponible: {formatBalance(limit?.maximum - limit?.current)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Account History */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Historique du compte</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={18} className="text-success" />
              <div>
                <p className="font-medium text-foreground">Compte ouvert</p>
                <p className="text-sm text-muted-foreground">15 mars 2020</p>
              </div>
            </div>
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
              Il y a 5 ans
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={18} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Carte bancaire activée</p>
                <p className="text-sm text-muted-foreground">22 mars 2020</p>
              </div>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Actif
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={18} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Banque mobile activée</p>
                <p className="text-sm text-muted-foreground">10 avril 2020</p>
              </div>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Actif
            </span>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-6">Support et contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Phone" size={18} className="text-primary" />
              <span className="font-medium text-foreground">Service client</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">0 800 123 456</p>
            <p className="text-xs text-muted-foreground">Gratuit depuis un fixe</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="MessageCircle" size={18} className="text-primary" />
              <span className="font-medium text-foreground">Chat en ligne</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Disponible 24h/24</p>
            <Button variant="outline" size="sm">
              Démarrer le chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;