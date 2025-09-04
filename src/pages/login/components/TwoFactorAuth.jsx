import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TwoFactorAuth = ({ 
  isVisible = false, 
  onSuccess, 
  onCancel,
  userEmail = 'user@example.com'
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [method, setMethod] = useState('sms'); // 'sms' or 'app'

  const correctCode = '123456'; // Mock 2FA code

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleCodeChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !code?.[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const enteredCode = code?.join('');
    if (enteredCode?.length !== 6) {
      setError('Veuillez saisir le code complet à 6 chiffres');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API verification
    setTimeout(() => {
      if (enteredCode === correctCode) {
        onSuccess && onSuccess();
      } else {
        setError('Code incorrect. Veuillez réessayer.');
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimeLeft(300);
    setCode(['', '', '', '', '', '']);
    setError('');
    
    // Simulate sending new code
    setTimeout(() => {
      // In real app, this would trigger SMS/email
      console.log('New 2FA code sent');
    }, 1000);
  };

  const switchMethod = (newMethod) => {
    setMethod(newMethod);
    setCode(['', '', '', '', '', '']);
    setError('');
    setTimeLeft(300);
    setCanResend(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 p-6 w-full max-w-md mx-4">
        <div className="text-center space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Authentification à deux facteurs
            </h2>
            <p className="text-sm text-muted-foreground">
              {method === 'sms' 
                ? `Un code à 6 chiffres a été envoyé par SMS au numéro se terminant par ***${userEmail?.slice(-4)}`
                : 'Saisissez le code généré par votre application d\'authentification'
              }
            </p>
          </div>

          {/* Method Selector */}
          <div className="flex space-x-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => switchMethod('sms')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-smooth ${
                method === 'sms' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Smartphone" size={16} />
              <span>SMS</span>
            </button>
            <button
              onClick={() => switchMethod('app')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-smooth ${
                method === 'app' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Key" size={16} />
              <span>App</span>
            </button>
          </div>

          {/* Code Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center space-x-2">
              {code?.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  disabled={isLoading}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center justify-center space-x-2 text-error">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Timer */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Code valide pendant <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="text-sm text-error">Code expiré</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                disabled={code?.join('')?.length !== 6 || timeLeft === 0}
                fullWidth
              >
                {isLoading ? 'Vérification...' : 'Vérifier le code'}
              </Button>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={!canResend && timeLeft > 0}
                  className="flex-1"
                >
                  {canResend || timeLeft === 0 ? 'Renvoyer le code' : 'Renvoyer'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </form>

          {/* Demo Info */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground text-left">
                <p className="font-medium text-foreground mb-1">Code de démonstration :</p>
                <p>Utilisez le code <strong>123456</strong> pour continuer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;