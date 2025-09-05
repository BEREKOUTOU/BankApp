import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessibilityOptions = ({ profile, onUpdate }) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    highContrast: false,
    darkMode: false,
    screenReaderSupport: false,
    keyboardNavigation: true,
    reducedMotion: false,
    colorBlindSupport: false,
    voiceAssistant: false,
    largeClickTargets: false,
    simplifiedLayout: false
  });

  const handleToggle = (key) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveAccessibilitySettings = () => {
    // In real app, this would make an API call and apply settings
    console.log('Saving accessibility settings:', accessibilitySettings);
    onUpdate({ accessibilitySettings });
    
    // Apply settings to document
    applyAccessibilitySettings();
  };

  const applyAccessibilitySettings = () => {
    const root = document.documentElement;
    
    // Font size
    switch (accessibilitySettings?.fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      case 'extra-large':
        root.style.fontSize = '22px';
        break;
      default:
        root.style.fontSize = '16px';
    }
    
    // High contrast
    if (accessibilitySettings?.highContrast) {
      root.classList?.add('high-contrast');
    } else {
      root.classList?.remove('high-contrast');
    }
    
    // Dark mode
    if (accessibilitySettings?.darkMode) {
      root.classList?.add('dark');
    } else {
      root.classList?.remove('dark');
    }
    
    // Reduced motion
    if (accessibilitySettings?.reducedMotion) {
      root.style?.setProperty('--animation-duration', '0ms');
    } else {
      root.style?.removeProperty('--animation-duration');
    }
  };

  const resetToDefaults = () => {
    setAccessibilitySettings({
      fontSize: 'medium',
      highContrast: false,
      darkMode: false,
      screenReaderSupport: false,
      keyboardNavigation: true,
      reducedMotion: false,
      colorBlindSupport: false,
      voiceAssistant: false,
      largeClickTargets: false,
      simplifiedLayout: false
    });
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Petite (14px)', preview: 'text-sm' },
    { value: 'medium', label: 'Moyenne (16px)', preview: 'text-base' },
    { value: 'large', label: 'Grande (18px)', preview: 'text-lg' },
    { value: 'extra-large', label: 'Très grande (22px)', preview: 'text-xl' }
  ];

  const accessibilityFeatures = [
    {
      category: 'Vision',
      icon: 'Eye',
      features: [
        {
          key: 'highContrast',
          label: 'Contraste élevé',
          description: 'Augmente le contraste pour améliorer la lisibilité',
          enabled: accessibilitySettings?.highContrast
        },
        {
          key: 'darkMode',
          label: 'Mode sombre',
          description: 'Interface sombre pour réduire la fatigue oculaire',
          enabled: accessibilitySettings?.darkMode
        },
        {
          key: 'colorBlindSupport',
          label: 'Support daltonisme',
          description: 'Adapte les couleurs pour les personnes daltoniennes',
          enabled: accessibilitySettings?.colorBlindSupport
        }
      ]
    },
    {
      category: 'Motricité',
      icon: 'Hand',
      features: [
        {
          key: 'largeClickTargets',
          label: 'Cibles de clic agrandies',
          description: 'Augmente la taille des boutons et liens',
          enabled: accessibilitySettings?.largeClickTargets
        },
        {
          key: 'keyboardNavigation',
          label: 'Navigation au clavier',
          description: 'Navigation complète au clavier sans souris',
          enabled: accessibilitySettings?.keyboardNavigation
        }
      ]
    },
    {
      category: 'Cognition',
      icon: 'Brain',
      features: [
        {
          key: 'simplifiedLayout',
          label: 'Interface simplifiée',
          description: 'Réduit la complexité visuelle de l\'interface',
          enabled: accessibilitySettings?.simplifiedLayout
        },
        {
          key: 'reducedMotion',
          label: 'Animations réduites',
          description: 'Réduit ou supprime les animations et transitions',
          enabled: accessibilitySettings?.reducedMotion
        }
      ]
    },
    {
      category: 'Assistance',
      icon: 'Headphones',
      features: [
        {
          key: 'screenReaderSupport',
          label: 'Support lecteur d\'écran',
          description: 'Optimise l\'interface pour les lecteurs d\'écran',
          enabled: accessibilitySettings?.screenReaderSupport
        },
        {
          key: 'voiceAssistant',
          label: 'Assistant vocal',
          description: 'Active les commandes vocales pour la navigation',
          enabled: accessibilitySettings?.voiceAssistant
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Options d'accessibilité</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personnalisez l'interface pour répondre à vos besoins d'accessibilité
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Réinitialiser
          </Button>
          <Button
            onClick={saveAccessibilitySettings}
            iconName="Save"
            iconPosition="left"
          >
            Appliquer
          </Button>
        </div>
      </div>
      {/* Font Size Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Type" size={18} className="mr-2" />
          Taille de police
        </h3>
        
        <div className="space-y-4">
          {fontSizeOptions?.map((option) => (
            <div key={option?.value} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`font-${option?.value}`}
                  name="fontSize"
                  value={option?.value}
                  checked={accessibilitySettings?.fontSize === option?.value}
                  onChange={(e) => handleSelectChange('fontSize', e?.target?.value)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <label 
                  htmlFor={`font-${option?.value}`}
                  className="font-medium text-foreground cursor-pointer"
                >
                  {option?.label}
                </label>
              </div>
              <div className={`${option?.preview} text-foreground`}>
                Exemple de texte
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="text-sm text-primary">
            <Icon name="Info" size={16} className="inline mr-2" />
            La taille de police affectera tous les textes de l'application
          </div>
        </div>
      </div>
      {/* Accessibility Features by Category */}
      {accessibilityFeatures?.map((category) => (
        <div key={category?.category} className="bg-background border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name={category?.icon} size={18} className="mr-2" />
            {category?.category}
          </h3>
          
          <div className="space-y-4">
            {category?.features?.map((feature) => (
              <div key={feature?.key} className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="font-medium text-foreground mb-1">{feature?.label}</div>
                  <div className="text-sm text-muted-foreground">{feature?.description}</div>
                </div>
                <button
                  onClick={() => handleToggle(feature?.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    feature?.enabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      feature?.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Keyboard Shortcuts */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Keyboard" size={18} className="mr-2" />
          Raccourcis clavier
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Navigation</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">Tab</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Activer</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">Entrée</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retour</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">Échap</kbd>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Menu principal</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">Alt + M</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recherche</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">Ctrl + K</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Aide</span>
              <kbd className="px-2 py-1 bg-muted rounded text-foreground">F1</kbd>
            </div>
          </div>
        </div>
      </div>
      {/* Screen Reader Information */}
      {accessibilitySettings?.screenReaderSupport && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-success mb-4 flex items-center">
            <Icon name="Volume2" size={18} className="mr-2" />
            Support lecteur d'écran activé
          </h3>
          
          <div className="text-sm text-success/80 space-y-2">
            <p>• Navigation optimisée pour NVDA, JAWS et VoiceOver</p>
            <p>• Descriptions détaillées des éléments interactifs</p>
            <p>• Annonces des changements de contenu dynamique</p>
            <p>• Structure sémantique renforcée des pages</p>
          </div>
          
          <div className="mt-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-success border-success/30 hover:bg-success/10"
              iconName="ExternalLink"
              iconPosition="left"
            >
              Guide d'utilisation
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-success border-success/30 hover:bg-success/10"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Signaler un problème
            </Button>
          </div>
        </div>
      )}
      {/* Preview Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="Eye" size={18} className="mr-2" />
          Aperçu des paramètres
        </h3>
        
        <div className="space-y-3">
          <div className="p-4 bg-white border rounded-lg">
            <div className={`font-medium ${accessibilitySettings?.fontSize === 'large' ? 'text-lg' : accessibilitySettings?.fontSize === 'extra-large' ? 'text-xl' : 'text-base'}`}>
              Exemple de titre de section
            </div>
            <div className={`text-muted-foreground mt-1 ${accessibilitySettings?.fontSize === 'large' ? 'text-base' : accessibilitySettings?.fontSize === 'extra-large' ? 'text-lg' : 'text-sm'}`}>
              Exemple de texte descriptif avec les paramètres actuels
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2 bg-primary text-white rounded-md ${
                accessibilitySettings?.largeClickTargets ? 'px-6 py-3' : ''
              }`}
            >
              Bouton d'exemple
            </button>
            <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted">
              Bouton secondaire
            </button>
          </div>
        </div>
        
        <p className="text-sm text-primary/80 mt-4">
          Cet aperçu montre comment vos paramètres d'accessibilité affectent l'interface.
        </p>
      </div>
    </div>
  );
};

export default AccessibilityOptions;