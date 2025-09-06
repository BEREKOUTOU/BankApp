import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, placeholder = "Rechercher des transactions..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center space-x-3">
        {/* Mobile Search Toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name="Search" size={18} />
          </Button>
        </div>

        {/* Desktop Search or Expanded Mobile Search */}
        <div className={`flex-1 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Search Stats */}
        <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>30 jours</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} />
            <span>156 transactions</span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isExpanded && (
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
        )}
      </div>
      {/* Mobile Search Stats */}
      {isExpanded && (
        <div className="lg:hidden mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>30 derniers jours</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} />
              <span>156 transactions trouvées</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;