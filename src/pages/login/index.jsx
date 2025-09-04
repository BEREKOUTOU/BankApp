import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import BiometricAuth from './components/BiometricAuth';
import TwoFactorAuth from './components/TwoFactorAuth';

const Login = () => {
  const navigate = useNavigate();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentYear] = useState(new Date()?.getFullYear());

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    // For demo, randomly show 2FA (70% chance)
    if (Math.random() > 0.3) {
      setShowTwoFactor(true);
    } else {
      // Direct login without 2FA
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const handleTwoFactorSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setShowTwoFactor(false);
    navigate('/dashboard');
  };

  const handleTwoFactorCancel = () => {
    setShowTwoFactor(false);
    setUserEmail('');
  };

  const handleBiometricSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  const handleBiometricError = (error) => {
    console.error('Biometric authentication failed:', error);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-elevation-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Banknote" size={24} color="white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">BankApp Af</span>
                <div className="text-xs text-muted-foreground">Banque digitale sécurisée</div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
              <Icon name="Shield" size={16} />
              <span>Connexion sécurisée</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto lg:mx-0">
                {/* Welcome Section */}
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Bienvenue sur BankApp Af
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Connectez-vous à votre espace bancaire sécurisé pour gérer vos finances en toute simplicité.
                  </p>
                </div>

                {/* Login Form */}
                <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-6 lg:p-8 mb-6">
                  <LoginForm onSuccess={handleLoginSuccess} />
                </div>

                {/* Biometric Authentication */}
                <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
                  <BiometricAuth 
                    onSuccess={handleBiometricSuccess}
                    onError={handleBiometricError}
                  />
                </div>

                {/* Quick Access */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-elevation-1 transition-smooth cursor-pointer">
                    <Icon name="HelpCircle" size={24} className="text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">Aide</div>
                    <div className="text-xs text-muted-foreground">Support 24/7</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-elevation-1 transition-smooth cursor-pointer">
                    <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-foreground">Agences</div>
                    <div className="text-xs text-muted-foreground">Trouvez-nous</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Banknote" size={20} color="white" />
                </div>
                <span className="text-lg font-bold text-foreground">BankApp Af</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Votre partenaire bancaire digital de confiance. Gérez vos finances avec sécurité et simplicité.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                  <Icon name="Facebook" size={16} />
                </div>
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                  <Icon name="Twitter" size={16} />
                </div>
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-smooth cursor-pointer">
                  <Icon name="Linkedin" size={16} />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Ouvrir un compte</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Nos tarifs</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Sécurité</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Chat en ligne</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Nous contacter</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} BankApp Af. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Mentions légales</a>
              <a href="#" className="hover:text-foreground transition-smooth">Confidentialité</a>
              <a href="#" className="hover:text-foreground transition-smooth">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Two Factor Authentication Modal */}
      <TwoFactorAuth
        isVisible={showTwoFactor}
        userEmail={userEmail}
        onSuccess={handleTwoFactorSuccess}
        onCancel={handleTwoFactorCancel}
      />
    </div>
  );
};

export default Login;