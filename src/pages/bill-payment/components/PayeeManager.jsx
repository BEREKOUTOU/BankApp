import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PayeeManager = ({ 
  payees = [], 
  onAddPayee, 
  onUpdatePayee, 
  onDeletePayee,
  className = "" 
}) => {
  const [isAddingPayee, setIsAddingPayee] = useState(false);
  const [editingPayee, setEditingPayee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    accountNumber: '',
    iban: '',
    bic: '',
    address: '',
    logo: ''
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Électricité',
    'Gaz',
    'Eau',
    'Téléphone',
    'Internet',
    'Assurance',
    'Banque',
    'Impôts',
    'Loyer',
    'Autre'
  ];

  const filteredPayees = payees?.filter(payee =>
    payee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    payee?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateIBAN = (iban) => {
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
    return ibanRegex?.test(iban?.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    }

    if (!formData?.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie';
    }

    if (formData?.iban && !validateIBAN(formData?.iban)) {
      newErrors.iban = 'IBAN invalide';
    }

    if (!formData?.accountNumber?.trim() && !formData?.iban?.trim()) {
      newErrors.accountNumber = 'Numéro de compte ou IBAN requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    const payeeData = {
      ...formData,
      id: editingPayee ? editingPayee?.id : Date.now()?.toString(),
      status: 'active',
      createdAt: editingPayee ? editingPayee?.createdAt : new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };

    if (editingPayee) {
      onUpdatePayee(payeeData);
    } else {
      onAddPayee(payeeData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      accountNumber: '',
      iban: '',
      bic: '',
      address: '',
      logo: ''
    });
    setErrors({});
    setIsAddingPayee(false);
    setEditingPayee(null);
  };

  const handleEdit = (payee) => {
    setFormData({
      name: payee?.name,
      category: payee?.category,
      accountNumber: payee?.accountNumber || '',
      iban: payee?.iban || '',
      bic: payee?.bic || '',
      address: payee?.address || '',
      logo: payee?.logo || ''
    });
    setEditingPayee(payee);
    setIsAddingPayee(true);
  };

  const handleDelete = (payee) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${payee?.name} ?`)) {
      onDeletePayee(payee?.id);
    }
  };

  const formatIBAN = (iban) => {
    return iban?.replace(/(.{4})/g, '$1 ')?.trim();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Gérer les bénéficiaires</h2>
          <p className="text-sm text-muted-foreground">
            {payees?.length} bénéficiaire{payees?.length !== 1 ? 's' : ''} enregistré{payees?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setIsAddingPayee(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Nouveau bénéficiaire
        </Button>
      </div>
      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un bénéficiaire..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
        />
      </div>
      {/* Add/Edit Form */}
      {isAddingPayee && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {editingPayee ? 'Modifier le bénéficiaire' : 'Nouveau bénéficiaire'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom du bénéficiaire"
                type="text"
                placeholder="Ex: EDF, Orange, etc."
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Catégorie *
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories?.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="text-sm text-destructive">{errors?.category}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Numéro de compte"
                type="text"
                placeholder="Numéro de compte du bénéficiaire"
                value={formData?.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e?.target?.value)}
                error={errors?.accountNumber}
              />

              <Input
                label="IBAN"
                type="text"
                placeholder="FR76 1234 5678 9012 3456 7890 123"
                value={formData?.iban}
                onChange={(e) => handleInputChange('iban', e?.target?.value?.toUpperCase())}
                error={errors?.iban}
                description="Format international du numéro de compte"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Code BIC (optionnel)"
                type="text"
                placeholder="BNPAFRPP"
                value={formData?.bic}
                onChange={(e) => handleInputChange('bic', e?.target?.value?.toUpperCase())}
                description="Code d'identification de la banque"
              />

              <Input
                label="URL du logo (optionnel)"
                type="url"
                placeholder="https://example.com/logo.png"
                value={formData?.logo}
                onChange={(e) => handleInputChange('logo', e?.target?.value)}
              />
            </div>

            <Input
              label="Adresse (optionnel)"
              type="text"
              placeholder="Adresse du bénéficiaire"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
            />

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="default"
                className="flex-1"
              >
                {editingPayee ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Payees List */}
      <div className="space-y-4">
        {filteredPayees?.length > 0 ? (
          filteredPayees?.map((payee) => (
            <div key={payee?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Building2" size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{payee?.name}</h4>
                    <p className="text-sm text-muted-foreground">{payee?.category}</p>
                    {payee?.iban && (
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        {formatIBAN(payee?.iban)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payee?.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  }`}>
                    {payee?.status === 'active' ? 'Actif' : 'Inactif'}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(payee)}
                  >
                    <Icon name="Edit2" size={14} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(payee)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? 'Aucun résultat' : 'Aucun bénéficiaire'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Aucun bénéficiaire ne correspond à votre recherche' :'Commencez par ajouter un bénéficiaire pour vos paiements'
              }
            </p>
            {!searchTerm && (
              <Button
                variant="outline"
                onClick={() => setIsAddingPayee(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Ajouter un bénéficiaire
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PayeeManager;