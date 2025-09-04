import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ActionToolbar = ({ 
  actions = [],
  context = 'default',
  className = "",
  position = 'contextual' // 'contextual' | 'fixed-bottom'
}) => {
  const [showMore, setShowMore] = useState(false);

  const defaultActions = {
    transfer: {
      id: 'transfer',
      label: 'Virement',
      icon: 'ArrowLeftRight',
      variant: 'default',
      primary: true,
      onClick: () => console.log('Transfer action')
    },
    payment: {
      id: 'payment',
      label: 'Paiement',
      icon: 'CreditCard',
      variant: 'outline',
      primary: true,
      onClick: () => console.log('Payment action')
    },
    export: {
      id: 'export',
      label: 'Exporter',
      icon: 'Download',
      variant: 'ghost',
      primary: false,
      onClick: () => console.log('Export action')
    },
    print: {
      id: 'print',
      label: 'Imprimer',
      icon: 'Printer',
      variant: 'ghost',
      primary: false,
      onClick: () => console.log('Print action')
    },
    share: {
      id: 'share',
      label: 'Partager',
      icon: 'Share2',
      variant: 'ghost',
      primary: false,
      onClick: () => console.log('Share action')
    },
    filter: {
      id: 'filter',
      label: 'Filtrer',
      icon: 'Filter',
      variant: 'ghost',
      primary: false,
      onClick: () => console.log('Filter action')
    }
  };

  const contextActions = {
    dashboard: ['transfer', 'payment', 'export'],
    account: ['transfer', 'export', 'print', 'filter'],
    transaction: ['export', 'print', 'filter', 'share'],
    transfer: ['export', 'print'],
    payment: ['export', 'print']
  };

  const getActionsForContext = () => {
    if (actions?.length > 0) return actions;
    
    const contextActionIds = contextActions?.[context] || contextActions?.default;
    return contextActionIds?.map(id => defaultActions?.[id])?.filter(Boolean);
  };

  const availableActions = getActionsForContext();
  const primaryActions = availableActions?.filter(action => action?.primary);
  const secondaryActions = availableActions?.filter(action => !action?.primary);

  const baseClasses = position === 'fixed-bottom' 
    ? "fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation-3 z-40 p-4"
    : "flex items-center justify-between bg-card border border-border rounded-lg p-3 shadow-elevation-1";

  return (
    <div className={`${baseClasses} ${className}`}>
      {position === 'fixed-bottom' ? (
        // Mobile Fixed Bottom Layout
        (<div className="flex items-center space-x-3 max-w-screen-xl mx-auto">
          <div className="flex space-x-2 flex-1">
            {primaryActions?.slice(0, 2)?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                onClick={action?.onClick}
                className="flex-1"
                iconName={action?.icon}
                iconPosition="left"
              >
                {action?.label}
              </Button>
            ))}
          </div>
          {secondaryActions?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMore(!showMore)}
              >
                <Icon name="MoreVertical" size={20} />
              </Button>
              
              {showMore && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)} />
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
                    <div className="py-1">
                      {secondaryActions?.map((action) => (
                        <button
                          key={action?.id}
                          onClick={() => {
                            action?.onClick();
                            setShowMore(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                        >
                          <Icon name={action?.icon} size={16} />
                          <span>{action?.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>)
      ) : (
        // Desktop Contextual Layout
        (<>
          <div className="flex items-center space-x-3">
            {primaryActions?.map((action) => (
              <Button
                key={action?.id}
                variant={action?.variant}
                onClick={action?.onClick}
                iconName={action?.icon}
                iconPosition="left"
                size="sm"
              >
                {action?.label}
              </Button>
            ))}
          </div>
          {secondaryActions?.length > 0 && (
            <div className="flex items-center space-x-2">
              {/* Show first 2 secondary actions directly on desktop */}
              {secondaryActions?.slice(0, 2)?.map((action) => (
                <Button
                  key={action?.id}
                  variant={action?.variant}
                  onClick={action?.onClick}
                  size="sm"
                  iconName={action?.icon}
                >
                  <span className="hidden lg:inline">{action?.label}</span>
                </Button>
              ))}
              
              {/* More menu for remaining actions */}
              {secondaryActions?.length > 2 && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                  
                  {showMore && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)} />
                      <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
                        <div className="py-1">
                          {secondaryActions?.slice(2)?.map((action) => (
                            <button
                              key={action?.id}
                              onClick={() => {
                                action?.onClick();
                                setShowMore(false);
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                            >
                              <Icon name={action?.icon} size={16} />
                              <span>{action?.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </>)
      )}
    </div>
  );
};

export default ActionToolbar;