import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import PersonalInformation from "./components/PersonalInformation";
import SecuritySettings from "./components/SecuritySettings";
import NotificationPreferences from "./components/NotificationPreferences";
import PrivacyControls from "./components/PrivacyControls";
import AccessibilityOptions from "./components/AccessibilityOptions";
import AdvancedSettings from "./components/AdvancedSettings";
import ActionToolbar from "../../components/ui/ActionToolbar";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const ProfileSettings = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(
    (effect) => {
      // Check if user is authenticated
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated !== "true") {
        navigate("/login");
      }
    },
    [navigate]
  );
  const [userProfile, setUserProfile] = useState({
    firstName: "Boniface",
    lastName: "Berekoutou",
    email: "boniface.berekoutou@gemail.com",
    phone: "+33 7 75 95 44 11",
    address: "8 Rue de Bretagne, Cherbourg-en-Cotentin, France",
    dateOfBirth: "1999-05-30",
    nationality: "R C A ",
    language: "fr, en",
    region: "France",
    currency: "EUR",
  });

  const sections = [
    {
      id: "personal",
      label: "Informations personnelles",
      icon: "User",
      description: "Gérez vos informations de base",
    },
    {
      id: "security",
      label: "Sécurité",
      icon: "Shield",
      description: "Paramètres de sécurité et authentification",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "Bell",
      description: "Préférences de notifications et alertes",
    },
    {
      id: "privacy",
      label: "Confidentialité",
      icon: "Lock",
      description: "Contrôles de confidentialité et partage",
    },
    {
      id: "accessibility",
      label: "Accessibilité",
      icon: "Eye",
      description: "Options d'accessibilité et affichage",
    },
    {
      id: "advanced",
      label: "Paramètres avancés",
      icon: "Settings",
      description: "Gestion du compte et données",
    },
  ];

  const handleProfileUpdate = (updates) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    // In real app, this would make an API call
    console.log("Saving profile changes:", userProfile);
    setHasUnsavedChanges(false);

    // Show success notification
    // toast.success('Profil mis à jour avec succès');
  };

  const handlePhotoUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e?.target?.result);
        setHasUnsavedChanges(true);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setProfilePhoto(null);
    setHasUnsavedChanges(true);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInformation
            profile={userProfile}
            onUpdate={handleProfileUpdate}
            profilePhoto={profilePhoto}
            onPhotoUpload={() => fileInputRef?.current?.click()}
            onPhotoRemove={handlePhotoRemove}
          />
        );
      case "security":
        return (
          <SecuritySettings
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        );
      case "notifications":
        return (
          <NotificationPreferences
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        );
      case "privacy":
        return (
          <PrivacyControls
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        );
      case "accessibility":
        return (
          <AccessibilityOptions
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        );
      case "advanced":
        return (
          <AdvancedSettings
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Paramètres du profil - BankApp Af</title>
        <meta
          name="description"
          content="Gérez vos paramètres de profil, sécurité et préférences dans BankApp Pro"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center">
                    <Icon name="Settings" size={28} className="mr-3" />
                    Paramètres du profil
                  </h1>
                  <p className="text-primary-foreground/80 text-sm lg:text-base">
                    Personnalisez votre expérience et gérez vos préférences
                  </p>
                </div>

                {hasUnsavedChanges && (
                  <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    <div className="flex items-center text-sm text-white/80">
                      <Icon name="AlertCircle" size={16} className="mr-2" />
                      Modifications non sauvegardées
                    </div>
                    <Button
                      onClick={handleSaveChanges}
                      className="bg-white text-primary hover:bg-white/90"
                      iconName="Save"
                      iconPosition="left"
                    >
                      Enregistrer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg shadow-elevation-1 sticky top-20">
                  <div className="p-6">
                    <nav className="space-y-2">
                      {sections?.map((section) => (
                        <button
                          key={section?.id}
                          onClick={() => setActiveSection(section?.id)}
                          className={`w-full text-left p-4 rounded-lg transition-smooth ${
                            activeSection === section?.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center">
                            <Icon
                              name={section?.icon}
                              size={20}
                              className="mr-3"
                            />
                            <div>
                              <div className="font-medium">
                                {section?.label}
                              </div>
                              <div
                                className={`text-xs mt-1 ${
                                  activeSection === section?.id
                                    ? "text-primary-foreground/80"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {section?.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9">
                <div className="bg-card border border-border rounded-lg shadow-elevation-1">
                  <div className="p-8">{renderActiveSection()}</div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Section Selector */}
              <div className="bg-card border border-border rounded-lg shadow-elevation-1 mb-6">
                <div className="p-4">
                  <select
                    value={activeSection}
                    onChange={(e) => setActiveSection(e?.target?.value)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {sections?.map((section) => (
                      <option key={section?.id} value={section?.id}>
                        {section?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="bg-card border border-border rounded-lg shadow-elevation-1">
                <div className="p-6">{renderActiveSection()}</div>
              </div>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          {/* Action Toolbar for Mobile */}
          <ActionToolbar
            context="profile-settings"
            position="fixed-bottom"
            className="lg:hidden"
          />
        </main>
      </div>
    </>
  );
};

export default ProfileSettings;
