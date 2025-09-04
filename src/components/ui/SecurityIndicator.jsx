import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SecurityIndicator = ({ 
  sessionTimeout = 1800, // 30 minutes in seconds
  warningThreshold = 300, // 5 minutes warning
  className = ""
}) => {
  const [timeRemaining, setTimeRemaining] = useState(sessionTimeout);
  const [showWarning, setShowWarning] = useState(false);
  const [securityLevel, setSecurityLevel] = useState('high'); // 'high', 'medium', 'low'
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        if (newTime <= warningThreshold && newTime > 0) {
          setShowWarning(true);
        }
        
        if (newTime <= 0) {
          // Handle session timeout
          handleSessionTimeout();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [warningThreshold]);

  const handleSessionTimeout = () => {
    // In a real app, this would redirect to login
    console.log('Session expired');
  };

  const extendSession = () => {
    setTimeRemaining(sessionTimeout);
    setShowWarning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getSecurityIcon = () => {
    switch (securityLevel) {
      case 'high': return 'ShieldCheck';
      case 'medium': return 'Shield';
      case 'low': return 'ShieldAlert';
      default: return 'Shield';
    }
  };

  const getSecurityColor = () => {
    switch (securityLevel) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-error';
      default: return 'text-success';
    }
  };

  const getSecurityBg = () => {
    switch (securityLevel) {
      case 'high': return 'bg-success/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-error/10';
      default: return 'bg-success/10';
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-2">
          {/* Main Security Badge */}
          <div 
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-smooth ${getSecurityBg()} ${getSecurityColor()}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={getSecurityIcon()} size={12} />
            <span className="hidden lg:inline">
              {securityLevel === 'high' ? 'Sécurisé' : 
               securityLevel === 'medium' ? 'Attention' : 'Risque'}
            </span>
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={10} />
          </div>

          {/* Session Timer (visible when warning) */}
          {showWarning && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded text-xs font-mono">
              <Icon name="Clock" size={10} />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>

        {/* Expanded Security Panel */}
        {isExpanded && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)} />
            <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">État de sécurité</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>

                {/* Security Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Connexion</span>
                    <div className={`flex items-center space-x-1 ${getSecurityColor()}`}>
                      <Icon name={getSecurityIcon()} size={14} />
                      <span className="text-sm font-medium">
                        {securityLevel === 'high' ? 'Sécurisée' : 
                         securityLevel === 'medium' ? 'Modérée' : 'À risque'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Session</span>
                    <span className="text-sm font-mono text-foreground">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Chiffrement</span>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Lock" size={14} />
                      <span className="text-sm font-medium">TLS 1.3</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Authentification</span>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Key" size={14} />
                      <span className="text-sm font-medium">2FA Activé</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border space-y-2">
                  {showWarning && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={extendSession}
                      className="w-full"
                      iconName="RefreshCw"
                      iconPosition="left"
                    >
                      Prolonger la session
                    </Button>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Historique
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      Paramètres
                    </Button>
                  </div>
                </div>

                {/* Security Tips */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-start space-x-2 p-2 bg-muted/50 rounded-md">
                    <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Conseil sécurité</p>
                      <p>Ne partagez jamais vos identifiants et déconnectez-vous sur les ordinateurs partagés.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Session Warning Modal */}
      {showWarning && timeRemaining <= 60 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-elevation-3 p-6 max-w-md mx-4">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="AlertTriangle" size={24} className="text-warning" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Session expirée bientôt
                </h3>
                <p className="text-sm text-muted-foreground">
                  Votre session expirera dans <span className="font-mono font-semibold text-warning">{formatTime(timeRemaining)}</span>
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowWarning(false)}
                  className="flex-1"
                >
                  Ignorer
                </Button>
                <Button
                  variant="default"
                  onClick={extendSession}
                  className="flex-1"
                >
                  Prolonger
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityIndicator;