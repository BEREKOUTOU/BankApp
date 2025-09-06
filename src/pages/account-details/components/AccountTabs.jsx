import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'List',
      count: 156
    },
    {
      id: 'statements',
      label: 'Relevés',
      icon: 'FileText',
      count: 12
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: 'Settings'
    },
    {
      id: 'details',
      label: 'Détails',
      icon: 'Info'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="flex overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab?.id
                  ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountTabs;