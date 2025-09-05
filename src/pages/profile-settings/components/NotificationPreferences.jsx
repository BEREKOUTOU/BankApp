import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPreferences = ({ profile, onUpdate }) => {
  const [notifications, setNotifications] = useState({
    // Push notifications
    pushEnabled: true,
    transactionAlerts: true,
    securityAlerts: true,
    accountUpdates: true,
    promotionalOffers: false,
    
    // SMS notifications
    smsEnabled: true,
    smsTransactions: true,
    smsSecurity: true,
    smsMarketing: false,
    
    // Email notifications
    emailEnabled: true,
    emailStatements: true,
    emailSecurity: true,
    emailUpdates: true,
    emailNewsletter: false,
    
    // Notification timing
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    
    // Categories
    banking: true,
    cards: true,
    transfers: true,
    bills: true,
    budgets: true,
    investments: false
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleTimeChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveNotificationPreferences = () => {
    // In real app, this would make an API call
    console.log('Saving notification preferences:', notifications);
    onUpdate({ notificationPreferences: notifications });
  };

  const notificationChannels = [
    {
      id: 'push',
      label: 'Notifications push',
      description: 'Notifications sur votre appareil',
      icon: 'Smartphone',
      settings: [
        { key: 'transactionAlerts', label: 'Alertes de transaction', enabled: notifications?.transactionAlerts },
        { key: 'securityAlerts', label: 'Alertes de sécurité', enabled: notifications?.securityAlerts },
        { key: 'accountUpdates', label: 'Mises à jour du compte', enabled: notifications?.accountUpdates },
        { key: 'promotionalOffers', label: 'Offres promotionnelles', enabled: notifications?.promotionalOffers }
      ]
    },
    {
      id: 'sms',
      label: 'Notifications SMS',
      description: 'Messages texte sur votre téléphone',
      icon: 'MessageSquare',
      settings: [
        { key: 'smsTransactions', label: 'Transactions importantes', enabled: notifications?.smsTransactions },
        { key: 'smsSecurity', label: 'Alertes de sécurité', enabled: notifications?.smsSecurity },
        { key: 'smsMarketing', label: 'Messages promotionnels', enabled: notifications?.smsMarketing }
      ]
    },
    {
      id: 'email',
      label: 'Notifications e-mail',
      description: 'E-mails envoyés à votre adresse',
      icon: 'Mail',
      settings: [
        { key: 'emailStatements', label: 'Relevés de compte', enabled: notifications?.emailStatements },
        { key: 'emailSecurity', label: 'Alertes de sécurité', enabled: notifications?.emailSecurity },
        { key: 'emailUpdates', label: 'Mises à jour de service', enabled: notifications?.emailUpdates },
        { key: 'emailNewsletter', label: 'Newsletter', enabled: notifications?.emailNewsletter }
      ]
    }
  ];

  const categories = [
    { key: 'banking', label: 'Services bancaires', icon: 'Banknote', enabled: notifications?.banking },
    { key: 'cards', label: 'Cartes de paiement', icon: 'CreditCard', enabled: notifications?.cards },
    { key: 'transfers', label: 'Virements', icon: 'ArrowLeftRight', enabled: notifications?.transfers },
    { key: 'bills', label: 'Factures et paiements', icon: 'Receipt', enabled: notifications?.bills },
    { key: 'budgets', label: 'Gestion budgétaire', icon: 'PieChart', enabled: notifications?.budgets },
    { key: 'investments', label: 'Investissements', icon: 'TrendingUp', enabled: notifications?.investments }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Préférences de notification</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personnalisez la façon dont vous souhaitez être informé
          </p>
        </div>
        <Button
          onClick={saveNotificationPreferences}
          iconName="Save"
          iconPosition="left"
        >
          Enregistrer
        </Button>
      </div>
      {/* Notification Channels */}
      <div className="space-y-6">
        {notificationChannels?.map((channel) => (
          <div key={channel?.id} className="bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Icon name={channel?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{channel?.label}</h3>
                  <p className="text-sm text-muted-foreground">{channel?.description}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleToggle(`${channel?.id}Enabled`)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications?.[`${channel?.id}Enabled`] ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications?.[`${channel?.id}Enabled`] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {notifications?.[`${channel?.id}Enabled`] && (
              <div className="space-y-3 pl-13">
                {channel?.settings?.map((setting) => (
                  <div key={setting?.key} className="flex items-center justify-between">
                    <div className="font-medium text-foreground">{setting?.label}</div>
                    <button
                      onClick={() => handleToggle(setting?.key)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                        setting?.enabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                          setting?.enabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quiet Hours */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Moon" size={18} className="mr-2" />
          Heures de silence
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Activer les heures de silence</div>
              <div className="text-sm text-muted-foreground">Suspendre les notifications non urgentes</div>
            </div>
            <button
              onClick={() => handleToggle('quietHours')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                notifications?.quietHours ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  notifications?.quietHours ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {notifications?.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Début
                </label>
                <input
                  type="time"
                  value={notifications?.quietStart}
                  onChange={(e) => handleTimeChange('quietStart', e?.target?.value)}
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Fin
                </label>
                <input
                  type="time"
                  value={notifications?.quietEnd}
                  onChange={(e) => handleTimeChange('quietEnd', e?.target?.value)}
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Notification Categories */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Grid3X3" size={18} className="mr-2" />
          Catégories de notification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories?.map((category) => (
            <div key={category?.key} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                </div>
                <div className="font-medium text-foreground">{category?.label}</div>
              </div>
              
              <button
                onClick={() => handleToggle(category?.key)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                  category?.enabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                    category?.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Notification Preview */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="Bell" size={18} className="mr-2" />
          Aperçu des notifications
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">Virement effectué</div>
              <div className="text-sm text-muted-foreground">250,00 € transféré vers votre compte épargne</div>
            </div>
            <div className="text-xs text-muted-foreground">il y a 2 min</div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">Budget dépassé</div>
              <div className="text-sm text-muted-foreground">Votre budget "Alimentation" a dépassé la limite fixée</div>
            </div>
            <div className="text-xs text-muted-foreground">il y a 1h</div>
          </div>
        </div>
        
        <p className="text-sm text-primary/80 mt-4">
          Voici comment vos notifications apparaîtront selon vos préférences actuelles.
        </p>
      </div>
    </div>
  );
};

export default NotificationPreferences;