import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isSticky = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: filters?.dateStart || '',
    end: filters?.dateEnd || ''
  });
  const [amountRange, setAmountRange] = useState({
    min: filters?.amountMin || '',
    max: filters?.amountMax || ''
  });

  const categories = [
    { id: 'shopping', label: 'Achats', icon: 'ShoppingBag' },
    { id: 'food', label: 'Alimentation', icon: 'UtensilsCrossed' },
    { id: 'transport', label: 'Transport', icon: 'Car' },
    { id: 'entertainment', label: 'Loisirs', icon: 'Film' },
    { id: 'health', label: 'Santé', icon: 'Heart' },
    { id: 'utilities', label: 'Services', icon: 'Zap' },
    { id: 'salary', label: 'Salaire', icon: 'Banknote' },
    { id: 'transfer', label: 'Virement', icon: 'ArrowLeftRight' },
    { id: 'investment', label: 'Investissement', icon: 'TrendingUp' },
    { id: 'subscription', label: 'Abonnement', icon: 'RefreshCw' }
  ];

  const transactionTypes = [
    { id: 'all', label: 'Tous' },
    { id: 'credit', label: 'Crédits' },
    { id: 'debit', label: 'Débits' },
    { id: 'pending', label: 'En attente' }
  ];

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = filters?.categories || [];
    const newCategories = currentCategories?.includes(categoryId)
      ? currentCategories?.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleTypeChange = (type) => {
    onFiltersChange({ ...filters, type });
  };

  const handleDateRangeChange = (field, value) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    onFiltersChange({ 
      ...filters, 
      dateStart: newRange?.start, 
      dateEnd: newRange?.end 
    });
  };

  const handleAmountRangeChange = (field, value) => {
    const newRange = { ...amountRange, [field]: value };
    setAmountRange(newRange);
    onFiltersChange({ 
      ...filters, 
      amountMin: newRange?.min, 
      amountMax: newRange?.max 
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.categories?.length > 0) count++;
    if (filters?.type && filters?.type !== 'all') count++;
    if (filters?.dateStart || filters?.dateEnd) count++;
    if (filters?.amountMin || filters?.amountMax) count++;
    if (filters?.search) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`bg-card border-b border-border transition-smooth ${
      isSticky ? 'sticky top-16 z-30 shadow-elevation-1' : ''
    }`}>
      <div className="p-4">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "Filter"}
            iconPosition="left"
          >
            Filtres
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Effacer
            </Button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par marchand, description..."
              value={filters?.search || ''}
              onChange={(e) => onFiltersChange({ ...filters, search: e?.target?.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Content */}
        <div className={`space-y-4 ${isExpanded || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'}`}>
          {/* Transaction Types */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Type de transaction</h3>
            <div className="flex flex-wrap gap-2">
              {transactionTypes?.map((type) => (
                <button
                  key={type?.id}
                  onClick={() => handleTypeChange(type?.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                    (filters?.type || 'all') === type?.id
                      ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Période</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="Du"
                value={dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
              <Input
                type="date"
                label="Au"
                value={dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Montant</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Min (€)"
                placeholder="0"
                value={amountRange?.min}
                onChange={(e) => handleAmountRangeChange('min', e?.target?.value)}
              />
              <Input
                type="number"
                label="Max (€)"
                placeholder="1000"
                value={amountRange?.max}
                onChange={(e) => handleAmountRangeChange('max', e?.target?.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Catégories</h3>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => {
                const isSelected = filters?.categories?.includes(category?.id);
                return (
                  <button
                    key={category?.id}
                    onClick={() => handleCategoryToggle(category?.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon name={category?.icon} size={14} />
                    <span>{category?.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="hidden lg:flex justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Effacer tous les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;