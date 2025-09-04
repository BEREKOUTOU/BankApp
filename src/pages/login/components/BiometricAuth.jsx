import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricAuth = ({ onSuccess, onError }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);

  useEffect(() => {
    // Check if biometric authentication is supported
    const checkBiometricSupport = async () => {
      if (window.PublicKeyCredential && 
          (await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())) {
        setIsSupported(true);
        setAuthMethod('fingerprint');
      } else if (navigator.credentials && navigator.credentials?.create) {
        setIsSupported(true);
        setAuthMethod('face');
      }
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);

    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3;
      
      if (success) {
        onSuccess && onSuccess();
      } else {
        onError && onError('Authentification biométrique échouée');
      }
    } catch (error) {
      onError && onError('Erreur lors de l\'authentification biométrique');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getAuthIcon = () => {
    switch (authMethod) {
      case 'fingerprint': return 'Fingerprint';
      case 'face': return 'ScanFace';
      default: return 'Shield';
    }
  };

  const getAuthLabel = () => {
    switch (authMethod) {
      case 'fingerprint': return 'Empreinte digitale';
      case 'face': return 'Reconnaissance faciale';
      default: return 'Authentification biométrique';
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Authentification rapide
          </span>
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={handleBiometricAuth}
          loading={isAuthenticating}
          disabled={isAuthenticating}
          className="w-full h-16 flex-col space-y-2"
        >
          <div className="flex items-center justify-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isAuthenticating 
                ? 'bg-primary/20 animate-pulse' :'bg-primary/10 hover:bg-primary/20'
            }`}>
              <Icon 
                name={getAuthIcon()} 
                size={24} 
                className={`transition-colors duration-300 ${
                  isAuthenticating ? 'text-primary animate-pulse' : 'text-primary'
                }`} 
              />
            </div>
          </div>
          <div className="text-sm font-medium">
            {isAuthenticating ? 'Authentification...' : getAuthLabel()}
          </div>
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Info" size={12} />
        <span>
          {authMethod === 'fingerprint' ?'Placez votre doigt sur le capteur' :'Regardez votre caméra pour vous authentifier'
          }
        </span>
      </div>

      {/* Biometric Setup Prompt */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground mb-1">
              Connexion ultra-rapide
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Activez l'authentification biométrique pour vous connecter en une seconde 
              lors de vos prochaines visites.
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-8 text-xs"
            >
              Configurer maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuth;