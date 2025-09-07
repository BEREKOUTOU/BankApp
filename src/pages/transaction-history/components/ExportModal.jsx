import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  onExport 
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [includeOptions, setIncludeOptions] = useState({
    balance: true,
    categories: true,
    references: true,
    locations: false
  });
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      format: exportFormat,
      dateRange,
      includeOptions,
      filename: `transactions_${dateRange?.start}_${dateRange?.end}.${exportFormat}`
    };
    
    onExport && onExport(exportData);
    setIsExporting(false);
    onClose();
  };

  const formatOptions = [
    { id: 'pdf', label: 'PDF', description: 'Relevé formaté pour impression', icon: 'FileText' },
    { id: 'csv', label: 'CSV', description: 'Données pour tableur (Excel, Sheets)', icon: 'Table' },
    { id: 'json', label: 'JSON', description: 'Format de données structurées', icon: 'Code' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Exporter les transactions</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isExporting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Format d'export</h3>
            <div className="space-y-2">
              {formatOptions?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => setExportFormat(format?.id)}
                  disabled={isExporting}
                  className={`w-full p-3 rounded-lg border text-left transition-smooth ${
                    exportFormat === format?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      exportFormat === format?.id ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={format?.icon} 
                        size={16} 
                        color={exportFormat === format?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{format?.label}</div>
                      <div className="text-sm text-muted-foreground">{format?.description}</div>
                    </div>
                    {exportFormat === format?.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Période</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="Du"
                value={dateRange?.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
                disabled={isExporting}
              />
              <Input
                type="date"
                label="Au"
                value={dateRange?.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
                disabled={isExporting}
              />
            </div>
          </div>

          {/* Include Options */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Informations à inclure</h3>
            <div className="space-y-3">
              {Object.entries({
                balance: 'Solde après transaction',
                categories: 'Catégories',
                references: 'Références de transaction',
                locations: 'Lieux des transactions'
              })?.map(([key, label]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeOptions?.[key]}
                    onChange={(e) => setIncludeOptions(prev => ({ 
                      ...prev, 
                      [key]: e?.target?.checked 
                    }))}
                    disabled={isExporting}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
                  />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Info */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Note importante</p>
                <p>L'export peut prendre quelques instants selon la période sélectionnée. Le fichier sera téléchargé automatiquement.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Annuler
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            disabled={!dateRange?.start || !dateRange?.end}
            iconName="Download"
            iconPosition="left"
          >
            {isExporting ? 'Export en cours...' : 'Exporter'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;