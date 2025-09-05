import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInformation = ({ 
  profile, 
  onUpdate, 
  profilePhoto, 
  onPhotoUpload, 
  onPhotoRemove 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('fr-FR');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`?.toUpperCase();
  };

  const countries = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'CA', name: 'Canada' },
    { code: 'US', name: 'États-Unis' }
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Informations personnelles</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez vos informations de profil et préférences de base
          </p>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Modifier
          </Button>
        )}
      </div>
      {/* Profile Photo Section */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Camera" size={18} className="mr-2" />
          Photo de profil
        </h3>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Photo de profil"
                className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                <span className="text-xl font-semibold text-primary">
                  {getInitials(profile?.firstName, profile?.lastName)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPhotoUpload}
              iconName="Camera"
              iconPosition="left"
            >
              {profilePhoto ? 'Changer la photo' : 'Ajouter une photo'}
            </Button>
            
            {profilePhoto && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPhotoRemove}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error"
              >
                Supprimer
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          Formats acceptés: JPG, PNG. Taille maximale: 5MB. Recommandé: 400x400px.
        </p>
      </div>
      {/* Basic Information */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="User" size={18} className="mr-2" />
          Informations de base
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prénom *
            </label>
            {isEditing ? (
              <Input
                value={formData?.firstName}
                onChange={(e) => handleInputChange('firstName', e?.target?.value)}
                placeholder="Votre prénom"
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.firstName}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nom *
            </label>
            {isEditing ? (
              <Input
                value={formData?.lastName}
                onChange={(e) => handleInputChange('lastName', e?.target?.value)}
                placeholder="Votre nom"
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.lastName}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date de naissance
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={formData?.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {formatDate(profile?.dateOfBirth)}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nationalité
            </label>
            {isEditing ? (
              <select
                value={formData?.nationality}
                onChange={(e) => handleInputChange('nationality', e?.target?.value)}
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {countries?.map((country) => (
                  <option key={country?.code} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.nationality}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Mail" size={18} className="mr-2" />
          Coordonnées
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Adresse e-mail *
              <span className="ml-2 inline-flex items-center">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-xs text-success ml-1">Vérifiée</span>
              </span>
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                placeholder="votre.email@example.com"
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.email}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Téléphone *
              <span className="ml-2 inline-flex items-center">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-xs text-success ml-1">Vérifiée</span>
              </span>
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="+33 6 12 34 56 78"
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.phone}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Adresse
            </label>
            {isEditing ? (
              <Input
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                placeholder="123 Rue de la Paix, 75001 Paris"
              />
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.address}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Regional Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Globe" size={18} className="mr-2" />
          Paramètres régionaux
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Langue
            </label>
            {isEditing ? (
              <select
                value={formData?.language}
                onChange={(e) => handleInputChange('language', e?.target?.value)}
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {languages?.map((lang) => (
                  <option key={lang?.code} value={lang?.code}>
                    {lang?.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {languages?.find(lang => lang?.code === profile?.language)?.name || profile?.language}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Région
            </label>
            {isEditing ? (
              <select
                value={formData?.region}
                onChange={(e) => handleInputChange('region', e?.target?.value)}
                className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {countries?.map((country) => (
                  <option key={country?.code} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-foreground p-3 bg-card border border-border rounded-md">
                {profile?.region}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Enregistrer les modifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;