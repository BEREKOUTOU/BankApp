import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControls = ({ profile, onUpdate }) => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    marketingConsent: false,
    analyticsConsent: true,
    thirdPartySharing: false,
    accountVisibility: 'private',
    transactionSharing: false,
    personalizedAds: false,
    locationTracking: false,
    cookiesAccepted: true,
    dataRetention: '5years'
  });

  const handleToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePrivacySettings = () => {
    // In real app, this would make an API call
    console.log('Saving privacy settings:', privacySettings);
    onUpdate({ privacySettings });
  };

  const downloadData = () => {
    // In real app, this would initiate a data export
    console.log('Initiating data download');
  };

  const deleteAllData = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      console.log('Initiating account deletion');
    }
  };

  const privacySections = [
    {
      title: 'Partage de données',
      description: 'Contrôlez comment vos données sont partagées et utilisées',
      icon: 'Share',
      settings: [
        {
          key: 'dataSharing',
          label: 'Partage de données avec des partenaires',
          description: 'Autoriser le partage de données anonymisées avec nos partenaires bancaires',
          enabled: privacySettings?.dataSharing
        },
        {
          key: 'marketingConsent',
          label: 'Communications marketing',
          description: 'Recevoir des offres personnalisées et du contenu marketing',
          enabled: privacySettings?.marketingConsent
        },
        {
          key: 'analyticsConsent',
          label: 'Données d\'analyse',
          description: 'Permettre l\'analyse de votre utilisation pour améliorer nos services',
          enabled: privacySettings?.analyticsConsent
        },
        {
          key: 'thirdPartySharing',
          label: 'Partage avec des tiers',
          description: 'Autoriser le partage de données avec des services tiers sélectionnés',
          enabled: privacySettings?.thirdPartySharing
        }
      ]
    },
    {
      title: 'Visibilité du compte',
      description: 'Gérez la visibilité de vos informations de compte',
      icon: 'Eye',
      settings: [
        {
          key: 'transactionSharing',
          label: 'Partage des transactions',
          description: 'Permettre le partage anonyme de vos habitudes de dépenses pour l\'analyse',
          enabled: privacySettings?.transactionSharing
        }
      ]
    },
    {
      title: 'Publicité et suivi',
      description: 'Contrôlez la publicité ciblée et le suivi',
      icon: 'Target',
      settings: [
        {
          key: 'personalizedAds',
          label: 'Publicités personnalisées',
          description: 'Recevoir des publicités adaptées à vos intérêts et habitudes',
          enabled: privacySettings?.personalizedAds
        },
        {
          key: 'locationTracking',
          label: 'Suivi de localisation',
          description: 'Permettre l\'utilisation de votre localisation pour des services géolocalisés',
          enabled: privacySettings?.locationTracking
        },
        {
          key: 'cookiesAccepted',
          label: 'Cookies de suivi',
          description: 'Autoriser les cookies pour améliorer votre expérience utilisateur',
          enabled: privacySettings?.cookiesAccepted
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Contrôles de confidentialité</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez vos données personnelles et leur utilisation
          </p>
        </div>
        <Button
          onClick={savePrivacySettings}
          iconName="Save"
          iconPosition="left"
        >
          Enregistrer
        </Button>
      </div>
      {/* Privacy Score */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="ShieldCheck" size={18} className="mr-2" />
          Score de confidentialité
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">85</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">Excellent</div>
              <div className="text-sm text-muted-foreground">
                Vos paramètres de confidentialité sont bien configurés
              </div>
            </div>
          </div>
          
          <div className="w-32">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 bg-primary rounded-full transition-all duration-500"
                style={{ width: '85%' }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">85/100</div>
          </div>
        </div>
      </div>
      {/* Privacy Settings Sections */}
      {privacySections?.map((section) => (
        <div key={section?.title} className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
            <Icon name={section?.icon} size={18} className="mr-2" />
            {section?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{section?.description}</p>
          
          <div className="space-y-4">
            {section?.settings?.map((setting) => (
              <div key={setting?.key} className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="font-medium text-foreground mb-1">{setting?.label}</div>
                  <div className="text-sm text-muted-foreground">{setting?.description}</div>
                </div>
                <button
                  onClick={() => handleToggle(setting?.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    setting?.enabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      setting?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Account Visibility */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={18} className="mr-2" />
          Visibilité du compte
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Niveau de visibilité
            </label>
            <select
              value={privacySettings?.accountVisibility}
              onChange={(e) => handleSelectChange('accountVisibility', e?.target?.value)}
              className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="public">Public - Visible par tous les utilisateurs</option>
              <option value="friends">Amis - Visible par vos contacts uniquement</option>
              <option value="private">Privé - Visible par vous seul</option>
            </select>
          </div>
        </div>
      </div>
      {/* Data Retention */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Archive" size={18} className="mr-2" />
          Conservation des données
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Durée de conservation
            </label>
            <select
              value={privacySettings?.dataRetention}
              onChange={(e) => handleSelectChange('dataRetention', e?.target?.value)}
              className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="1year">1 an après la fermeture du compte</option>
              <option value="3years">3 ans après la fermeture du compte</option>
              <option value="5years">5 ans après la fermeture du compte (recommandé)</option>
              <option value="10years">10 ans après la fermeture du compte</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Durée légale minimale requise pour les données bancaires
            </p>
          </div>
        </div>
      </div>
      {/* Data Management Actions */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Database" size={18} className="mr-2" />
          Gestion des données
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center mb-3">
              <Icon name="Download" size={20} className="text-primary mr-2" />
              <div className="font-medium text-foreground">Exporter mes données</div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Téléchargez une copie de toutes vos données personnelles
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadData}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              Télécharger mes données
            </Button>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center mb-3">
              <Icon name="Trash2" size={20} className="text-error mr-2" />
              <div className="font-medium text-foreground">Supprimer mon compte</div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Supprimez définitivement votre compte et toutes vos données
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteAllData}
              iconName="Trash2"
              iconPosition="left"
              className="w-full"
            >
              Supprimer le compte
            </Button>
          </div>
        </div>
      </div>
      {/* GDPR Information */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
          <Icon name="Info" size={18} className="mr-2" />
          Vos droits RGPD
        </h3>
        
        <div className="text-sm text-primary/80 space-y-2">
          <p>• <strong>Droit d'accès:</strong> Vous pouvez demander l'accès à vos données personnelles</p>
          <p>• <strong>Droit de rectification:</strong> Vous pouvez corriger vos données inexactes</p>
          <p>• <strong>Droit à l'effacement:</strong> Vous pouvez demander la suppression de vos données</p>
          <p>• <strong>Droit à la portabilité:</strong> Vous pouvez récupérer vos données dans un format lisible</p>
          <p>• <strong>Droit d'opposition:</strong> Vous pouvez vous opposer au traitement de vos données</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="mt-4 text-primary border-primary/30 hover:bg-primary/10"
          iconName="ExternalLink"
          iconPosition="left"
        >
          En savoir plus sur vos droits
        </Button>
      </div>
    </div>
  );
};

export default PrivacyControls;