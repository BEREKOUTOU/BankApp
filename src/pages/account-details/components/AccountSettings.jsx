import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = ({ account }) => {
  const [settings, setSettings] = useState({
    nickname: account?.name,
    alertsEnabled: true,
    lowBalanceAlert: true,
    lowBalanceThreshold: 100,
    transactionAlerts: true,
    emailStatements: true,
    smsAlerts: false,
    statementFrequency: 'monthly'
  });

  const [isEditing, setIsEditing] = useState(false);

  const frequencyOptions = [
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'quarterly', label: 'Trimestriel' }
  ];

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSettings({
      nickname: account?.name,
      alertsEnabled: true,
      lowBalanceAlert: true,
      lowBalanceThreshold: 100,
      transactionAlerts: true,
      emailStatements: true,
      smsAlerts: false,
      statementFrequency: 'monthly'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Informations du compte</h3>
          <Button
            variant={isEditing ? "outline" : "ghost"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "X" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom du compte"
              value={settings?.nickname}
              onChange={(e) => setSettings({...settings, nickname: e?.target?.value})}
              disabled={!isEditing}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Type de compte
              </label>
              <div className="px-3 py-2 bg-muted/30 border border-border rounded-md text-sm text-muted-foreground">
                Compte courant
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Numéro de compte
              </label>
              <div className="px-3 py-2 bg-muted/30 border border-border rounded-md text-sm font-mono text-muted-foreground">
                {account?.maskedNumber}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                IBAN
              </label>
              <div className="px-3 py-2 bg-muted/30 border border-border rounded-md text-sm font-mono text-muted-foreground">
                {account?.iban}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
            <Button variant="default" onClick={handleSave}>
              Enregistrer
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        )}
      </div>
      {/* Alert Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alertes et notifications</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Activer les alertes"
            checked={settings?.alertsEnabled}
            onChange={(e) => setSettings({...settings, alertsEnabled: e?.target?.checked})}
          />

          {settings?.alertsEnabled && (
            <div className="ml-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Checkbox
                  label="Alerte solde faible"
                  checked={settings?.lowBalanceAlert}
                  onChange={(e) => setSettings({...settings, lowBalanceAlert: e?.target?.checked})}
                />
                {settings?.lowBalanceAlert && (
                  <div className="flex-1 max-w-xs">
                    <Input
                      type="number"
                      placeholder="Seuil en €"
                      value={settings?.lowBalanceThreshold}
                      onChange={(e) => setSettings({...settings, lowBalanceThreshold: parseInt(e?.target?.value)})}
                    />
                  </div>
                )}
              </div>

              <Checkbox
                label="Alertes de transaction"
                checked={settings?.transactionAlerts}
                onChange={(e) => setSettings({...settings, transactionAlerts: e?.target?.checked})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <Checkbox
                  label="Notifications par email"
                  checked={settings?.emailStatements}
                  onChange={(e) => setSettings({...settings, emailStatements: e?.target?.checked})}
                />
                <Checkbox
                  label="Notifications par SMS"
                  checked={settings?.smsAlerts}
                  onChange={(e) => setSettings({...settings, smsAlerts: e?.target?.checked})}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Statement Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Relevés de compte</h3>
        
        <div className="space-y-4">
          <Select
            label="Fréquence des relevés"
            options={frequencyOptions}
            value={settings?.statementFrequency}
            onChange={(value) => setSettings({...settings, statementFrequency: value})}
          />

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
            <div>
              <p className="font-medium text-foreground">Dernier relevé</p>
              <p className="text-sm text-muted-foreground">Janvier 2025 - Téléchargé le 01/01/2025</p>
            </div>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Télécharger
            </Button>
          </div>
        </div>
      </div>
      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sécurité</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground">Authentification à deux facteurs</p>
                <p className="text-sm text-muted-foreground">Protection renforcée activée</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Gérer
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Appareils autorisés</p>
                <p className="text-sm text-muted-foreground">3 appareils connectés</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;