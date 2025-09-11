import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import StepIndicator from "./components/StepIndicator";
import AccountSelection from "./components/AccountSelection";
import RecipientSelection from "./components/RecipientSelection";
import TransferDetails from "./components/TransferDetails";
import TransferSummary from "./components/TransferSummary";
import TransferConfirmation from "./components/TransferConfirmation";

const TransferMoney = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [transferData, setTransferData] = useState(null);
  const [transferResult, setTransferResult] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Compte source",
      description: "Sélectionner le compte à débiter",
    },
    {
      id: 2,
      title: "Bénéficiaire",
      description: "Choisir le destinataire",
    },
    {
      id: 3,
      title: "Détails",
      description: "Montant et informations",
    },
    {
      id: 4,
      title: "Confirmation",
      description: "Vérifier et confirmer",
    },
  ];

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handleRecipientSelect = (recipient) => {
    setSelectedRecipient(recipient);
  };

  const handleTransferDataChange = (data) => {
    setTransferData(data);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = (result) => {
    setTransferResult(result);
    setCurrentStep(5); // Move to confirmation step
  };

  const handleBackToTransfers = () => {
    navigate("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountSelection
            selectedAccount={selectedAccount}
            onAccountSelect={handleAccountSelect}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RecipientSelection
            selectedRecipient={selectedRecipient}
            onRecipientSelect={handleRecipientSelect}
            onNext={handleNext}
            onBack={handleBack}
            sourceAccount={selectedAccount}
          />
        );
      case 3:
        return (
          <TransferDetails
            transferData={transferData}
            onTransferDataChange={handleTransferDataChange}
            onNext={handleNext}
            onBack={handleBack}
            sourceAccount={selectedAccount}
            recipient={selectedRecipient}
          />
        );
      case 4:
        return (
          <TransferSummary
            sourceAccount={selectedAccount}
            recipient={selectedRecipient}
            transferData={transferData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <TransferConfirmation
            transferResult={transferResult}
            sourceAccount={selectedAccount}
            recipient={selectedRecipient}
            transferData={transferData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToTransfers}
                  iconName="ArrowLeft"
                  className="lg:hidden"
                />

                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    {currentStep === 5
                      ? "Virement confirmé"
                      : "Nouveau virement"}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {currentStep === 5
                      ? "Votre virement a été traité avec succès"
                      : "Transférez de l'argent en toute sécurité"}
                  </p>
                </div>
              </div>

              {/* Desktop Back Button */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  onClick={handleBackToTransfers}
                  iconName="X"
                  iconPosition="left"
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        {currentStep <= 4 && (
          <StepIndicator
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
          />
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <div className="bg-card border border-border rounded-lg shadow-elevation-1">
            <div className="p-6 lg:p-8">{renderStepContent()}</div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="bg-muted/30 border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Connexion sécurisée SSL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span>Chiffrement 256-bit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Conforme SEPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferMoney;
