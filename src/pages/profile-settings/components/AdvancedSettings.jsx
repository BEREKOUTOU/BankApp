import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedSettings = ({ profile, onUpdate }) => {
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [exportInProgress, setExportInProgress] = useState(false);

  const handleExportData = async () => {
    setExportInProgress(true);
    
    // Simulate API call
    setTimeout(() => {
      setExportInProgress(false);
      console.log('Data export initiated');
      // In real app, this would trigger a download or email
    }, 3000);
  };

  const handleAccountDeactivation = () => {
    if (window.confirm('Êtes-vous sûr de vouloir désactiver temporairement votre compte ? Vous pourrez le réactiver en vous reconnectant.')) {
      console.log('Account deactivation initiated');
    }
  };

  const handleAccountDeletion = () => {
    const confirmation = window.prompt(
      'Cette action est IRRÉVERSIBLE. Tapez "SUPPRIMER MON COMPTE" pour confirmer:'
    );
    
    if (confirmation === 'SUPPRIMER MON COMPTE') {
      console.log('Account deletion initiated');
      alert('Votre demande de suppression de compte a été enregistrée. Vous recevrez un e-mail de confirmation.');
    } else if (confirmation !== null) {
      alert('Confirmation incorrecte. Aucune action effectuée.');
    }
  };

  const downloadHistory = [
    {
      id: '1',
      type: 'Données personnelles',
      date: '2024-01-15',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: '2',
      type: 'Historique des transactions',
      date: '2023-12-01',
      size: '15.8 MB',
      status: 'completed'
    },
    {
      id: '3',
      type: 'Relevés de compte',
      date: '2023-11-15',
      size: '8.2 MB',
      status: 'expired'
    }
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Application mobile',
      created: '2024-01-10',
      lastUsed: '2024-01-28',
      permissions: ['read', 'transactions'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Service comptabilité',
      created: '2023-12-05',
      lastUsed: '2024-01-20',
      permissions: ['read'],
      status: 'active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case'completed':
        return 'text-success bg-success/10';
      case 'expired':
        return 'text-warning bg-warning/10';
      case 'revoked':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Paramètres avancés</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gestion du compte, exportation de données et paramètres techniques
          </p>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Download" size={18} className="mr-2" />
          Exportation des données
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg text-center">
              <Icon name="User" size={24} className="mx-auto text-primary mb-2" />
              <div className="font-medium text-foreground mb-1">Données personnelles</div>
              <div className="text-sm text-muted-foreground">Profil, contacts, préférences</div>
            </div>
            
            <div className="p-4 border border-border rounded-lg text-center">
              <Icon name="List" size={24} className="mx-auto text-primary mb-2" />
              <div className="font-medium text-foreground mb-1">Transactions</div>
              <div className="text-sm text-muted-foreground">Historique complet des opérations</div>
            </div>
            
            <div className="p-4 border border-border rounded-lg text-center">
              <Icon name="FileText" size={24} className="mx-auto text-primary mb-2" />
              <div className="font-medium text-foreground mb-1">Documents</div>
              <div className="text-sm text-muted-foreground">Relevés, contrats, justificatifs</div>
            </div>
          </div>
          
          <Button
            onClick={handleExportData}
            disabled={exportInProgress}
            iconName={exportInProgress ? "Loader" : "Download"}
            iconPosition="left"
            className="w-full md:w-auto"
          >
            {exportInProgress ? 'Préparation en cours...' : 'Exporter toutes mes données'}
          </Button>
          
          {exportInProgress && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="flex items-center text-sm text-primary">
                <Icon name="Info" size={16} className="mr-2" />
                L'exportation peut prendre quelques minutes. Vous recevrez un e-mail avec le lien de téléchargement.
              </div>
            </div>
          )}
        </div>

        {/* Download History */}
        <div className="mt-6">
          <h4 className="font-semibold text-foreground mb-3">Historique des téléchargements</h4>
          <div className="space-y-2">
            {downloadHistory?.map((download) => (
              <div key={download?.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Archive" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{download?.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(download?.date)?.toLocaleDateString('fr-FR')} • {download?.size}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(download?.status)}`}>
                    {download?.status === 'completed' ? 'Terminé' : 'Expiré'}
                  </div>
                  
                  {download?.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                    >
                      Télécharger
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Management */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Key" size={18} className="mr-2" />
          Gestion des API
        </h3>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Gérez les clés API et les accès tiers à votre compte
          </div>
          
          {apiKeys?.map((apiKey) => (
            <div key={apiKey?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Key" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{apiKey?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Créée le {new Date(apiKey?.created)?.toLocaleDateString('fr-FR')} • 
                    Dernière utilisation: {new Date(apiKey?.lastUsed)?.toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {apiKey?.permissions?.map((permission) => (
                      <span key={permission} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apiKey?.status)}`}>
                  Actif
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                >
                  Gérer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  className="text-error hover:text-error"
                >
                  Révoquer
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
          >
            Créer une nouvelle clé API
          </Button>
        </div>
      </div>

      {/* Account Activity */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={18} className="mr-2" />
          Activité du compte
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Connexions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">89</div>
            <div className="text-sm text-muted-foreground">Transactions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground">Appareils</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-sm text-muted-foreground">Jours actif</div>
          </div>
        </div>
      </div>

      {/* Support & Help */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="HelpCircle" size={18} className="mr-2" />
          Support et aide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <Icon name="MessageSquare" size={20} className="text-primary mb-2" />
            <div className="font-medium text-foreground mb-1">Centre d'aide</div>
            <div className="text-sm text-muted-foreground mb-3">
              Consultez notre base de connaissances et FAQ
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
            >
              Ouvrir l'aide
            </Button>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <Icon name="Phone" size={20} className="text-primary mb-2" />
            <div className="font-medium text-foreground mb-1">Contact support</div>
            <div className="text-sm text-muted-foreground mb-3">
              Contactez notre équipe de support technique
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-background border border-error/20 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowDangerZone(!showDangerZone)}
          className="w-full p-6 text-left hover:bg-error/5 transition-smooth"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="AlertTriangle" size={18} className="text-error mr-2" />
              <h3 className="text-lg font-semibold text-error">Zone dangereuse</h3>
            </div>
            <Icon 
              name={showDangerZone ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-error" 
            />
          </div>
          <p className="text-sm text-error/80 mt-1">
            Actions irréversibles de gestion du compte
          </p>
        </button>
        
        {showDangerZone && (
          <div className="border-t border-error/20 p-6 bg-error/5">
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-white border border-error/20 rounded-lg">
                <div>
                  <div className="font-medium text-foreground mb-1">Désactiver le compte</div>
                  <div className="text-sm text-muted-foreground">
                    Désactive temporairement votre compte. Vous pourrez le réactiver en vous reconnectant.
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleAccountDeactivation}
                  iconName="Pause"
                  iconPosition="left"
                  className="text-warning border-warning/30 hover:bg-warning/10"
                >
                  Désactiver
                </Button>
              </div>
              
              <div className="flex items-start justify-between p-4 bg-white border border-error/20 rounded-lg">
                <div>
                  <div className="font-medium text-foreground mb-1">Supprimer le compte</div>
                  <div className="text-sm text-muted-foreground">
                    Supprime définitivement votre compte et toutes vos données. Cette action est irréversible.
                  </div>
                  <div className="text-xs text-error mt-1">
                    ⚠️ Tous vos comptes bancaires seront fermés et vos données supprimées
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleAccountDeletion}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Supprimer
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <div className="text-sm text-error">
                <Icon name="Shield" size={14} className="inline mr-1" />
                <strong>Protection:</strong> Une période de grâce de 30 jours s'applique avant la suppression définitive des données.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSettings;