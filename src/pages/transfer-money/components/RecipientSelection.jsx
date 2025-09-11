import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecipientSelection = ({ selectedRecipient, onRecipientSelect, onNext, onBack, sourceAccount }) => {
  const [activeTab, setActiveTab] = useState('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [internalAccounts] = useState([
    {
      id: 'int-001',
      name: 'Livret A',
      type: 'savings',
      number: '****5678',
      balance: 15680.20,
      isOwn: true
    },
    {
      id: 'int-002',
      name: 'Compte Épargne',
      type: 'savings',
      number: '****3456',
      balance: 5240.80,
      isOwn: true
    }
  ]);

  const [externalBeneficiaries] = useState([
    {
      id: 'ext-001',
      name: 'Marie Dubois',
      iban: 'FR76 1234 5678 9012 3456 7890 123',
      bank: 'Crédit Agricole',
      type: 'personal',
      verified: true,
      favorite: true
    },
    {
      id: 'ext-002',
      name: 'Jean Martin',
      iban: 'FR14 2004 1010 0505 0001 3M02 606',
      bank: 'BNP Paribas',
      type: 'personal',
      verified: true,
      favorite: false
    },
    {
      id: 'ext-003',
      name: 'SAS TechCorp',
      iban: 'FR76 3000 3000 1100 0000 1234 567',
      bank: 'Société Générale',
      type: 'business',
      verified: true,
      favorite: false
    },
    {
      id: 'ext-004',
      name: 'Sophie Laurent',
      iban: 'FR76 1751 2000 0000 1234 5678 901',
      bank: 'La Banque Postale',
      type: 'personal',
      verified: false,
      favorite: false
    }
  ]);

  const getAccountIcon = (type) => {
    switch (type) {
      case 'savings': return 'PiggyBank';
      case 'business': return 'Building2';
      case 'personal': return 'User';
      default: return 'CreditCard';
    }
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(balance);
  };

  const formatIban = (iban) => {
    return iban?.replace(/(.{4})/g, '$1 ')?.trim();
  };

  const filteredInternalAccounts = internalAccounts?.filter(account => account?.id !== sourceAccount?.id)?.filter(account =>
      account?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      account?.number?.includes(searchTerm)
    );

  const filteredExternalBeneficiaries = externalBeneficiaries?.filter(beneficiary =>
    beneficiary?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    beneficiary?.iban?.includes(searchTerm?.replace(/\s/g, '')) ||
    beneficiary?.bank?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleRecipientSelect = (recipient) => {
    onRecipientSelect(recipient);
  };

  const canProceed = selectedRecipient !== null;

  const tabs = [
    { id: 'internal', label: 'Mes comptes', icon: 'CreditCard' },
    { id: 'external', label: 'Bénéficiaires externes', icon: 'Users' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Sélectionner le bénéficiaire
        </h2>
        <p className="text-muted-foreground">
          Choisissez le compte ou bénéficiaire qui recevra le virement
        </p>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 pb-3 border-b-2 transition-all duration-200
                ${activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Search */}
      <div className="relative">
        <Input
          type="search"
          placeholder={activeTab === 'internal' ? 'Rechercher un compte...' : 'Rechercher un bénéficiaire...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pl-10"
        />
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'internal' && (
          <>
            {filteredInternalAccounts?.length > 0 ? (
              filteredInternalAccounts?.map((account) => (
                <div
                  key={account?.id}
                  className={`
                    relative border rounded-lg p-4 cursor-pointer transition-all duration-200
                    ${selectedRecipient?.id === account?.id 
                      ? 'border-primary bg-primary/5 shadow-elevation-1' 
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-elevation-1'
                    }
                  `}
                  onClick={() => handleRecipientSelect(account)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${selectedRecipient?.id === account?.id 
                        ? 'border-primary bg-primary' :'border-border bg-background'
                      }
                    `}>
                      {selectedRecipient?.id === account?.id && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>

                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getAccountIcon(account?.type)} size={24} color="var(--color-primary)" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {account?.name}
                        </h3>
                        <div className="font-mono font-semibold text-foreground">
                          {formatBalance(account?.balance)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {account?.number}
                      </div>
                    </div>

                    {selectedRecipient?.id === account?.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                <p>Aucun compte trouvé</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'external' && (
          <>
            {filteredExternalBeneficiaries?.length > 0 ? (
              filteredExternalBeneficiaries?.map((beneficiary) => (
                <div
                  key={beneficiary?.id}
                  className={`
                    relative border rounded-lg p-4 cursor-pointer transition-all duration-200
                    ${selectedRecipient?.id === beneficiary?.id 
                      ? 'border-primary bg-primary/5 shadow-elevation-1' 
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-elevation-1'
                    }
                  `}
                  onClick={() => handleRecipientSelect(beneficiary)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${selectedRecipient?.id === beneficiary?.id 
                        ? 'border-primary bg-primary' :'border-border bg-background'
                      }
                    `}>
                      {selectedRecipient?.id === beneficiary?.id && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>

                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getAccountIcon(beneficiary?.type)} size={24} color="var(--color-primary)" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {beneficiary?.name}
                        </h3>
                        {beneficiary?.favorite && (
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                        )}
                        {beneficiary?.verified ? (
                          <Icon name="ShieldCheck" size={14} className="text-success" />
                        ) : (
                          <Icon name="Clock" size={14} className="text-warning" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="font-mono">{formatIban(beneficiary?.iban)}</div>
                        <div>{beneficiary?.bank}</div>
                      </div>
                    </div>

                    {selectedRecipient?.id === beneficiary?.id && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                <p>Aucun bénéficiaire trouvé</p>
              </div>
            )}

            {/* Add Beneficiary Button */}
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full"
              iconName="Plus"
              iconPosition="left"
            >
              Ajouter un bénéficiaire
            </Button>
          </>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 sm:flex-none"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Retour
        </Button>
        
        <div className="flex-1" />
        
        <Button
          variant="default"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 sm:flex-none sm:min-w-32"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default RecipientSelection;