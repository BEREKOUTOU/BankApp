import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'Alimentation', label: 'Alimentation' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Restaurants', label: 'Restaurants' },
    { value: 'Divertissement', label: 'Divertissement' },
    { value: 'Santé', label: 'Santé' },
    { value: 'Factures', label: 'Factures' },
    { value: 'Salaire', label: 'Salaire' },
    { value: 'Virement', label: 'Virement' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous les types' },
    { value: 'credit', label: 'Crédits' },
    { value: 'debit', label: 'Débits' }
  ];

  const amountRangeOptions = [
    { value: 'all', label: 'Tous les montants' },
    { value: '0-50', label: '0 € - 50 €' },
    { value: '50-100', label: '50 € - 100 €' },
    { value: '100-500', label: '100 € - 500 €' },
    { value: '500+', label: 'Plus de 500 €' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...localFilters?.dateRange, [field]: value };
    const newFilters = { ...localFilters, dateRange: newDateRange };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      category: 'all',
      type: 'all',
      amountRange: 'all',
      dateRange: { start: '', end: '' }
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return localFilters?.category !== 'all' || 
           localFilters?.type !== 'all' || 
           localFilters?.amountRange !== 'all' ||
           localFilters?.dateRange?.start || 
           localFilters?.dateRange?.end;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filtres</h3>
          {hasActiveFilters() && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Actifs
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <Icon name="X" size={14} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleCollapse}
            className="lg:hidden"
          >
            <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 space-y-4">
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Période</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="date"
                label="Du"
                value={localFilters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
                className="text-sm"
              />
              <Input
                type="date"
                label="Au"
                value={localFilters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Select
              label="Catégorie"
              options={categoryOptions}
              value={localFilters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <Select
              label="Type de transaction"
              options={typeOptions}
              value={localFilters?.type}
              onChange={(value) => handleFilterChange('type', value)}
            />
          </div>

          {/* Amount Range Filter */}
          <div className="space-y-2">
            <Select
              label="Montant"
              options={amountRangeOptions}
              value={localFilters?.amountRange}
              onChange={(value) => handleFilterChange('amountRange', value)}
            />
          </div>

          {/* Quick Filters */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">Filtres rapides</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  handleDateRangeChange('start', weekAgo?.toISOString()?.split('T')?.[0]);
                  handleDateRangeChange('end', today?.toISOString()?.split('T')?.[0]);
                }}
              >
                7 derniers jours
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                  handleDateRangeChange('start', monthAgo?.toISOString()?.split('T')?.[0]);
                  handleDateRangeChange('end', today?.toISOString()?.split('T')?.[0]);
                }}
              >
                30 derniers jours
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleFilterChange('type', 'credit')}
              >
                Crédits uniquement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;