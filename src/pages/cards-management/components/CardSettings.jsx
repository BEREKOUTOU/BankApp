import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CardSettings = ({ card, onCardUpdate, formatCurrency, isMobile = false }) => {
  const [settings, setSettings] = useState({
    dailyLimit: card?.dailyLimit || 1500,
    monthlyLimit: card?.monthlyLimit || 3000,
    contactlessEnabled: true,
    onlinePaymentsEnabled: true,
    internationalEnabled: false,
    notificationsEnabled: true,
    securityAlerts: true,
    spendingAlerts: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // In real app, this would make an API call
    console.log('Saving settings:', settings);
    setIsEditing(false);
    
    // Update card with new limits
    if (card?.type === 'debit') {
      onCardUpdate({
        ...card,
        dailyLimit: settings?.dailyLimit,
        monthlyLimit: settings?.monthlyLimit
      });
    }
  };

  const handleBlockCard = () => {
    // In real app, this would make an API call
    onCardUpdate({
      ...card,
      status: card?.status === 'active' ? 'blocked' : 'active'
    });
  };

  const handleRequestReplacement = () => {
    // In real app, this would make an API call
    console.log('Requesting card replacement');
  };

  return (
    <div className="space-y-6">
      {/* Card Actions */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={18} className="mr-2" />
          Actions de sécurité
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant={card?.status === 'active' ? 'destructive' : 'default'}
            onClick={handleBlockCard}
            iconName={card?.status === 'active' ? 'Lock' : 'Unlock'}
            iconPosition="left"
            className="w-full justify-start"
          >
            {card?.status === 'active' ? 'Bloquer la carte' : 'Débloquer la carte'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleRequestReplacement}
            iconName="RefreshCw"
            iconPosition="left"
            className="w-full justify-start"
          >
            Demander un remplacement
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="w-full justify-start"
          >
            Télécharger le RIB
          </Button>
          
          <Button
            variant="outline"
            iconName="Phone"
            iconPosition="left"
            className="w-full justify-start"
          >
            Signaler une fraude
          </Button>
        </div>
      </div>
      {/* Spending Limits (for debit cards) */}
      {card?.type === 'debit' && (
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Icon name="CreditCard" size={18} className="mr-2" />
              Limites de dépenses
            </h3>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              iconName={isEditing ? "Check" : "Edit"}
              iconPosition="left"
            >
              {isEditing ? 'Enregistrer' : 'Modifier'}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Limite quotidienne
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={settings?.dailyLimit}
                  onChange={(e) => handleSettingChange('dailyLimit', Number(e?.target?.value))}
                  className="w-full"
                  min="100"
                  max="5000"
                  step="100"
                />
              ) : (
                <div className="text-lg font-mono text-foreground">
                  {formatCurrency(settings?.dailyLimit)}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Utilisé aujourd'hui: {formatCurrency(card?.usedDaily)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Limite mensuelle
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={settings?.monthlyLimit}
                  onChange={(e) => handleSettingChange('monthlyLimit', Number(e?.target?.value))}
                  className="w-full"
                  min="500"
                  max="10000"
                  step="500"
                />
              ) : (
                <div className="text-lg font-mono text-foreground">
                  {formatCurrency(settings?.monthlyLimit)}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                Utilisé ce mois: {formatCurrency(card?.usedMonthly)}
              </div>
            </div>
            
            {isEditing && (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSaveSettings}
                  iconName="Check"
                  iconPosition="left"
                  className="flex-1"
                >
                  Enregistrer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  iconName="X"
                  iconPosition="left"
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Payment Settings */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={18} className="mr-2" />
          Paramètres de paiement
        </h3>
        
        <div className="space-y-4">
          {/* Contactless */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Paiement sans contact</div>
              <div className="text-sm text-muted-foreground">Activez les paiements NFC</div>
            </div>
            <button
              onClick={() => handleSettingChange('contactlessEnabled', !settings?.contactlessEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.contactlessEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.contactlessEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Online Payments */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Paiements en ligne</div>
              <div className="text-sm text-muted-foreground">Autorisez les achats sur internet</div>
            </div>
            <button
              onClick={() => handleSettingChange('onlinePaymentsEnabled', !settings?.onlinePaymentsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.onlinePaymentsEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.onlinePaymentsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* International */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Paiements internationaux</div>
              <div className="text-sm text-muted-foreground">Utilisez votre carte à l'étranger</div>
            </div>
            <button
              onClick={() => handleSettingChange('internationalEnabled', !settings?.internationalEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.internationalEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.internationalEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Bell" size={18} className="mr-2" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          {/* General Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Notifications générales</div>
              <div className="text-sm text-muted-foreground">Recevez toutes les notifications</div>
            </div>
            <button
              onClick={() => handleSettingChange('notificationsEnabled', !settings?.notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.notificationsEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Security Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Alertes de sécurité</div>
              <div className="text-sm text-muted-foreground">Notifications pour activité suspecte</div>
            </div>
            <button
              onClick={() => handleSettingChange('securityAlerts', !settings?.securityAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.securityAlerts ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Spending Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Alertes de dépenses</div>
              <div className="text-sm text-muted-foreground">Notifications pour gros montants</div>
            </div>
            <button
              onClick={() => handleSettingChange('spendingAlerts', !settings?.spendingAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings?.spendingAlerts ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings?.spendingAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSettings;