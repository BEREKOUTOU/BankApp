import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySettings = ({ profile, onUpdate }) => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    biometricEnabled: false,
    loginNotifications: true,
    sessionTimeout: 30,
    deviceTrust: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // In real app, this would make an API call
    console.log('Changing password');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const trustedDevices = [
    {
      id: '1',
      name: 'iPhone 13 Pro',
      type: 'mobile',
      lastUsed: '2024-01-28',
      location: 'Paris, France',
      current: true
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastUsed: '2024-01-27',
      location: 'Paris, France',
      current: false
    },
    {
      id: '3',
      name: 'Chrome sur Windows',
      type: 'browser',
      lastUsed: '2024-01-25',
      location: 'Lyon, France',
      current: false
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile':
        return 'Smartphone';
      case 'desktop':
        return 'Monitor';
      case 'browser':
        return 'Globe';
      default:
        return 'Monitor';
    }
  };

  const getSecurityScore = () => {
    let score = 0;
    if (securitySettings?.twoFactorEnabled) score += 30;
    if (securitySettings?.biometricEnabled) score += 25;
    if (securitySettings?.loginNotifications) score += 20;
    if (securitySettings?.sessionTimeout <= 30) score += 15;
    if (securitySettings?.deviceTrust) score += 10;
    return score;
  };

  const getSecurityLevel = (score) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-success', bg: 'bg-success/10' };
    if (score >= 60) return { level: 'Bon', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'À améliorer', color: 'text-error', bg: 'bg-error/10' };
  };

  const securityLevel = getSecurityLevel(getSecurityScore());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Paramètres de sécurité</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Renforcez la sécurité de votre compte avec nos options avancées
          </p>
        </div>
      </div>
      {/* Security Score */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={18} className="mr-2" />
          Score de sécurité
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full ${securityLevel?.bg} flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${securityLevel?.color}`}>
                {getSecurityScore()}
              </span>
            </div>
            <div>
              <div className={`text-lg font-semibold ${securityLevel?.color}`}>
                {securityLevel?.level}
              </div>
              <div className="text-sm text-muted-foreground">
                Niveau de sécurité de votre compte
              </div>
            </div>
          </div>
          
          <div className="w-32">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  getSecurityScore() >= 80 ? 'bg-success' : 
                  getSecurityScore() >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${getSecurityScore()}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              {getSecurityScore()}/100
            </div>
          </div>
        </div>
      </div>
      {/* Password Management */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Key" size={18} className="mr-2" />
            Mot de passe
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            iconName="Edit"
            iconPosition="left"
          >
            Modifier le mot de passe
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Dernière modification: Il y a 45 jours
        </div>
        
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-card p-4 rounded-lg border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mot de passe actuel
              </label>
              <Input
                type="password"
                value={passwordForm?.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                placeholder="Votre mot de passe actuel"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nouveau mot de passe
              </label>
              <Input
                type="password"
                value={passwordForm?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                placeholder="Nouveau mot de passe"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 caractères, incluant majuscules, minuscules, chiffres et symboles
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <Input
                type="password"
                value={passwordForm?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                placeholder="Confirmer le nouveau mot de passe"
                required
              />
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" iconName="Save" iconPosition="left">
                Changer le mot de passe
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
                iconName="X"
                iconPosition="left"
              >
                Annuler
              </Button>
            </div>
          </form>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Smartphone" size={18} className="mr-2" />
          Authentification à deux facteurs (2FA)
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Authentification par SMS</div>
              <div className="text-sm text-muted-foreground">Code de vérification par SMS</div>
            </div>
            <button
              onClick={() => handleSecurityToggle('twoFactorEnabled')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                securitySettings?.twoFactorEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  securitySettings?.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {securitySettings?.twoFactorEnabled && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center text-sm text-success">
                <Icon name="CheckCircle" size={14} className="mr-2" />
                2FA activé sur {profile?.phone}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Biometric Authentication */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Fingerprint" size={18} className="mr-2" />
          Authentification biométrique
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Touch ID / Face ID</div>
              <div className="text-sm text-muted-foreground">Connexion rapide avec biométrie</div>
            </div>
            <button
              onClick={() => handleSecurityToggle('biometricEnabled')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                securitySettings?.biometricEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  securitySettings?.biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {!securitySettings?.biometricEnabled && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center text-sm text-warning">
                <Icon name="AlertTriangle" size={14} className="mr-2" />
                L'authentification biométrique n'est pas configurée
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Session Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={18} className="mr-2" />
          Paramètres de session
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">Notifications de connexion</div>
              <div className="text-sm text-muted-foreground">Être alerté des nouvelles connexions</div>
            </div>
            <button
              onClick={() => handleSecurityToggle('loginNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                securitySettings?.loginNotifications ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  securitySettings?.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div>
            <div className="font-medium text-foreground mb-2">Délai d'inactivité</div>
            <select
              value={securitySettings?.sessionTimeout}
              onChange={(e) => setSecuritySettings(prev => ({
                ...prev,
                sessionTimeout: Number(e?.target?.value)
              }))}
              className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 heure</option>
              <option value={120}>2 heures</option>
              <option value={240}>4 heures</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Déconnexion automatique après inactivité
            </p>
          </div>
        </div>
      </div>
      {/* Trusted Devices */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Monitor" size={18} className="mr-2" />
          Appareils de confiance
        </h3>
        
        <div className="space-y-3">
          {trustedDevices?.map((device) => (
            <div key={device?.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={getDeviceIcon(device?.type)} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground flex items-center">
                    {device?.name}
                    {device?.current && (
                      <span className="ml-2 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Actuel
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dernière utilisation: {new Date(device?.lastUsed)?.toLocaleDateString('fr-FR')} • {device?.location}
                  </div>
                </div>
              </div>
              
              {!device?.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  className="text-error hover:text-error"
                >
                  Retirer
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;