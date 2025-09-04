import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'client@bankapp.fr', password: 'Client123!', type: 'client' },
    { email: 'premium@bankapp.fr', password: 'Premium456!', type: 'premium' },
    { email: 'business@bankapp.fr', password: 'Business789!', type: 'business' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (isLocked) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Successful login
        localStorage.setItem('userType', validCredential?.type);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrors({ 
            general: 'Compte temporairement verrouillé après 3 tentatives. Réessayez dans 15 minutes.' 
          });
          
          // Auto unlock after 15 minutes (for demo, using 30 seconds)
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 30000);
        } else {
          setErrors({ 
            general: `Identifiants incorrects. ${3 - newAttempts} tentative(s) restante(s).` 
          });
        }
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Adresse email"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="votre@email.fr"
          error={errors?.email}
          required
          disabled={isLocked}
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Votre mot de passe"
            error={errors?.password}
            required
            disabled={isLocked}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            disabled={isLocked}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* General Error Message */}
        {errors?.general && (
          <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          disabled={isLocked}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>

        {/* Secondary Actions */}
        <div className="space-y-4">
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLocked}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            disabled={isLocked}
            className="h-12"
          >
            Créer un compte
          </Button>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Comptes de démonstration :</p>
              <div className="space-y-1">
                <p><strong>Client :</strong> client@bankapp.fr / Client123!</p>
                <p><strong>Premium :</strong> premium@bankapp.fr / Premium456!</p>
                <p><strong>Business :</strong> business@bankapp.fr / Business789!</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;