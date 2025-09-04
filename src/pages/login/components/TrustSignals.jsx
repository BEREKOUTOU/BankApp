import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'ACPR',
      description: 'Autorité de Contrôle Prudentiel et de Résolution',
      icon: 'Shield',
      verified: true
    },
    {
      id: 2,
      name: 'SEPA',
      description: 'Single Euro Payments Area',
      icon: 'CreditCard',
      verified: true
    },
    {
      id: 3,
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      icon: 'Lock',
      verified: true
    },
    {
      id: 4,
      name: 'ISO 27001',
      description: 'Sécurité de l\'information',
      icon: 'ShieldCheck',
      verified: true
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      title: 'Chiffrement SSL/TLS',
      description: 'Toutes vos données sont protégées par un chiffrement de niveau bancaire',
      icon: 'Lock'
    },
    {
      id: 2,
      title: 'Authentification 2FA',
      description: 'Double authentification pour une sécurité renforcée',
      icon: 'Smartphone'
    },
    {
      id: 3,
      title: 'Surveillance 24/7',
      description: 'Monitoring continu des transactions suspectes',
      icon: 'Eye'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Certifications et Conformité
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-elevation-1 transition-smooth"
            >
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-2">
                <Icon name={cert?.icon} size={24} className="text-success" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm text-foreground mb-1">
                  {cert?.name}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {cert?.description}
                </div>
                {cert?.verified && (
                  <div className="flex items-center justify-center mt-2">
                    <Icon name="CheckCircle" size={14} className="text-success mr-1" />
                    <span className="text-xs text-success font-medium">Vérifié</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="ShieldCheck" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sécurité de Niveau Bancaire
          </h3>
          <p className="text-sm text-muted-foreground">
            Vos données et transactions sont protégées par les plus hauts standards de sécurité
          </p>
        </div>

        <div className="space-y-4">
          {securityFeatures?.map((feature) => (
            <div key={feature?.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-foreground mb-1">
                  {feature?.title}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Statement */}
      <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Award" size={20} className="text-success" />
          <span className="font-semibold text-success">Banque Agréée</span>
        </div>
        <p className="text-xs text-muted-foreground">
          BankApp Pro est une banque agréée par l'ACPR et garantit vos dépôts jusqu'à 100 000€ 
          par le Fonds de Garantie des Dépôts et de Résolution (FGDR).
        </p>
      </div>
      {/* Customer Testimonials */}
      <div className="space-y-4">
        <h4 className="text-center font-semibold text-foreground">
          Ils nous font confiance
        </h4>
        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">Marie L.</div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              "Interface intuitive et sécurité au top. Je recommande vivement BankApp Pro 
              pour la gestion quotidienne de mes finances."
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-secondary" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">Jean-Pierre M.</div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              "Excellent service client et fonctionnalités complètes. 
              La transition vers le digital n'a jamais été aussi simple."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;