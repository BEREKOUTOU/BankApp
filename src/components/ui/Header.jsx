import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: "Tableau de bord",
      path: "/dashboard",
      icon: "LayoutDashboard",
    },
    {
      label: "Comptes",
      path: "/account-details",
      icon: "CreditCard",
      subItems: [
        { label: "Détails du compte", path: "/account-details" },
        { label: "Historique", path: "/transaction-history" },
      ],
    },
    {
      label: "Opérations",
      path: "/transfer-money",
      icon: "ArrowLeftRight",
      subItems: [
        { label: "Virement", path: "/transfer-money" },
        { label: "Paiement factures", path: "/bill-payment" },
      ],
    },
    {
      label: "Gestion",
      path: "/budget-tracking",
      icon: "PieChart",
      subItems: [
        { label: "Suivi budgets", path: "/budget-tracking" },
        { label: "Gestion cartes", path: "/cards-management" },
      ],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const isActivePath = (path, subItems = []) => {
    if (location?.pathname === path) return true;
    return subItems?.some((item) => location?.pathname === item?.path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Banknote" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                BankApp Af
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path, item?.subItems)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                  {item?.subItems && (
                    <Icon
                      name="ChevronDown"
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-200"
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item?.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {item?.subItems?.map((subItem) => (
                        <button
                          key={subItem?.path}
                          onClick={() => handleNavigation(subItem?.path)}
                          className={`w-full text-left px-4 py-2 text-sm transition-smooth ${
                            location?.pathname === subItem?.path
                              ? "text-primary bg-primary/10"
                              : "text-popover-foreground hover:bg-muted"
                          }`}
                        >
                          {subItem?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Security Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
              <Icon name="Shield" size={12} />
              <span>Sécurisé</span>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <span className="hidden lg:block text-sm font-medium">
                  Mon compte
                </span>
                <Icon
                  name="ChevronDown"
                  size={14}
                  className="hidden lg:block group-hover:rotate-180 transition-transform duration-200"
                />
              </Button>

              {/* User Dropdown */}
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => navigate("/profile-settings")}
                    className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => navigate("/profile-settings")}
                    className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    Paramètres
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    Aide
                  </button>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-smooth"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-elevation-3 animate-slide-in">
            <nav className="px-4 py-6 space-y-4">
              {navigationItems?.map((item) => (
                <div key={item?.path} className="space-y-2">
                  <button
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                      isActivePath(item?.path, item?.subItems)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.label}</span>
                  </button>

                  {/* Mobile Sub Items */}
                  {item?.subItems && (
                    <div className="ml-8 space-y-1">
                      {item?.subItems?.map((subItem) => (
                        <button
                          key={subItem?.path}
                          onClick={() => handleNavigation(subItem?.path)}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm transition-smooth ${
                            location?.pathname === subItem?.path
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {subItem?.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Profile Link */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => handleNavigation("/profile-settings")}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth text-foreground hover:bg-muted"
                >
                  <Icon name="Settings" size={20} />
                  <span className="font-medium">Paramètres du profil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth text-destructive hover:bg-destructive/10 mt-2"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>

              {/* Mobile Security Indicator */}
              <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-success/10 text-success rounded-lg text-sm font-medium mt-6">
                <Icon name="Shield" size={16} />
                <span>Connexion sécurisée</span>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
