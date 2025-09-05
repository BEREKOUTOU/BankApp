import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const BiometricAuth = ({ onSuccess, onError }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Check if biometric authentication is supported
    const checkBiometricSupport = async () => {
      if (
        window.PublicKeyCredential &&
        (await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())
      ) {
        setIsSupported(true);
        setAuthMethod("fingerprint");
      } else if (navigator.credentials && navigator.credentials?.create) {
        setIsSupported(true);
        setAuthMethod("face");
      }
    };

    checkBiometricSupport();

    // Check if biometrics are already registered
    const registered = localStorage.getItem("biometricRegistered") === "true";
    setIsRegistered(registered);
  }, []);

  const registerBiometric = async () => {
    setIsRegistering(true);
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: "BankApp Af",
            id: window.location.hostname,
          },
          user: {
            id: new Uint8Array([1, 2, 3, 4]), // Simple user ID
            name: "user@bankapp.af",
            displayName: "BankApp User",
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
        },
      });

      if (credential) {
        localStorage.setItem("biometricRegistered", "true");
        localStorage.setItem(
          "biometricCredentialId",
          btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
        );
        setIsRegistered(true);
        // After registration, proceed to authenticate
        await authenticateBiometric();
      }
    } catch (error) {
      onError &&
        onError(
          "Erreur lors de l'enregistrement biométrique: " + error.message
        );
    } finally {
      setIsRegistering(false);
    }
  };

  const authenticateBiometric = async () => {
    setIsAuthenticating(true);
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credentialId = localStorage.getItem("biometricCredentialId");
      const allowCredentials = credentialId
        ? [
            {
              type: "public-key",
              id: Uint8Array.from(atob(credentialId), (c) => c.charCodeAt(0)),
            },
          ]
        : [];

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: challenge,
          allowCredentials: allowCredentials,
          userVerification: "required",
          timeout: 60000,
        },
      });

      if (assertion) {
        onSuccess && onSuccess();
      }
    } catch (error) {
      onError &&
        onError("Authentification biométrique échouée: " + error.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBiometricAuth = async () => {
    if (!isRegistered) {
      await registerBiometric();
    } else {
      await authenticateBiometric();
    }
  };

  const getAuthIcon = () => {
    switch (authMethod) {
      case "fingerprint":
        return "Fingerprint";
      case "face":
        return "ScanFace";
      default:
        return "Shield";
    }
  };

  const getAuthLabel = () => {
    switch (authMethod) {
      case "fingerprint":
        return "Empreinte digitale";
      case "face":
        return "Reconnaissance faciale";
      default:
        return "Authentification biométrique";
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Authentification rapide
          </span>
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={handleBiometricAuth}
          loading={isAuthenticating || isRegistering}
          disabled={isAuthenticating || isRegistering}
          className="w-full h-16 flex-col space-y-2"
        >
          <div className="flex items-center justify-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isAuthenticating
                  ? "bg-primary/20 animate-pulse"
                  : "bg-primary/10 hover:bg-primary/20"
              }`}
            >
              <Icon
                name={getAuthIcon()}
                size={24}
                className={`transition-colors duration-300 ${
                  isAuthenticating
                    ? "text-primary animate-pulse"
                    : "text-primary"
                }`}
              />
            </div>
          </div>
          <div className="text-sm font-medium">
            {isRegistering
              ? "Enregistrement..."
              : isAuthenticating
              ? "Authentification..."
              : !isRegistered
              ? "Enregistrer " + getAuthLabel()
              : getAuthLabel()}
          </div>
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Info" size={12} />
        <span>
          {authMethod === "fingerprint"
            ? "Placez votre doigt sur le capteur"
            : "Regardez votre caméra pour vous authentifier"}
        </span>
      </div>

      {/* Biometric Setup Prompt */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground mb-1">
              Connexion ultra-rapide
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Activez l'authentification biométrique pour vous connecter en une
              seconde lors de vos prochaines visites.
            </div>
            <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs">
              Configurer maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuth;
