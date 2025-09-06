import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StatementsTab = ({ accountId }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const statements = [
    {
      id: '1',
      month: 'Janvier',
      year: '2025',
      period: '01/01/2025 - 31/01/2025',
      status: 'available',
      size: '2.3 MB',
      downloadDate: null,
      transactionCount: 45
    },
    {
      id: '2',
      month: 'Décembre',
      year: '2024',
      period: '01/12/2024 - 31/12/2024',
      status: 'downloaded',
      size: '1.8 MB',
      downloadDate: '15/01/2025',
      transactionCount: 38
    },
    {
      id: '3',
      month: 'Novembre',
      year: '2024',
      period: '01/11/2024 - 30/11/2024',
      status: 'downloaded',
      size: '2.1 MB',
      downloadDate: '05/12/2024',
      transactionCount: 42
    },
    {
      id: '4',
      month: 'Octobre',
      year: '2024',
      period: '01/10/2024 - 31/10/2024',
      status: 'downloaded',
      size: '1.9 MB',
      downloadDate: '03/11/2024',
      transactionCount: 39
    },
    {
      id: '5',
      month: 'Septembre',
      year: '2024',
      period: '01/09/2024 - 30/09/2024',
      status: 'downloaded',
      size: '2.4 MB',
      downloadDate: '02/10/2024',
      transactionCount: 47
    },
    {
      id: '6',
      month: 'Août',
      year: '2024',
      period: '01/08/2024 - 31/08/2024',
      status: 'downloaded',
      size: '1.6 MB',
      downloadDate: '01/09/2024',
      transactionCount: 31
    }
  ];

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const filteredStatements = statements?.filter(statement => statement?.year === selectedYear);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'FileText';
      case 'downloaded': return 'Download';
      case 'processing': return 'Clock';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-primary';
      case 'downloaded': return 'text-success';
      case 'processing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'downloaded': return 'Téléchargé';
      case 'processing': return 'En cours';
      default: return 'Indisponible';
    }
  };

  const handleDownload = (statement) => {
    // In a real app, this would trigger the download
    console.log('Downloading statement:', statement);
  };

  const handleBulkDownload = () => {
    // In a real app, this would download all statements for the year
    console.log('Downloading all statements for', selectedYear);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Select
            label="Année"
            options={yearOptions}
            value={selectedYear}
            onChange={setSelectedYear}
            className="w-32"
          />
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkDownload}
            iconName="Download"
            iconPosition="left"
          >
            Télécharger tout
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
          >
            Recevoir par email
          </Button>
        </div>
      </div>
      {/* Statements List/Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredStatements?.map((statement) => (
            <div key={statement?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getStatusIcon(statement?.status)} 
                      size={18} 
                      className={getStatusColor(statement?.status)} 
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      Relevé {statement?.month} {statement?.year}
                    </h4>
                    <p className="text-sm text-muted-foreground">{statement?.period}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>{statement?.transactionCount} transactions</span>
                      <span>•</span>
                      <span>{statement?.size}</span>
                      {statement?.downloadDate && (
                        <>
                          <span>•</span>
                          <span>Téléchargé le {statement?.downloadDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(statement?.status)} bg-current/10`}>
                    {getStatusLabel(statement?.status)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(statement)}
                    iconName="Download"
                  >
                    <span className="hidden sm:inline">Télécharger</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStatements?.map((statement) => (
            <div key={statement?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto">
                  <Icon 
                    name={getStatusIcon(statement?.status)} 
                    size={24} 
                    className={getStatusColor(statement?.status)} 
                  />
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground">
                    {statement?.month} {statement?.year}
                  </h4>
                  <p className="text-sm text-muted-foreground">{statement?.period}</p>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>{statement?.transactionCount} transactions</p>
                  <p>{statement?.size}</p>
                  {statement?.downloadDate && (
                    <p>Téléchargé le {statement?.downloadDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(statement?.status)} bg-current/10`}>
                    {getStatusLabel(statement?.status)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(statement)}
                    iconName="Download"
                    iconPosition="left"
                    fullWidth
                  >
                    Télécharger
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredStatements?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">Aucun relevé disponible</h3>
          <p className="text-muted-foreground">Aucun relevé n'est disponible pour l'année {selectedYear}</p>
        </div>
      )}
      {/* Information Panel */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">À propos des relevés</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Les relevés sont générés automatiquement chaque mois</li>
              <li>• Vous pouvez télécharger vos relevés au format PDF</li>
              <li>• Les relevés sont conservés pendant 10 ans</li>
              <li>• Vous pouvez configurer l'envoi automatique par email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementsTab;