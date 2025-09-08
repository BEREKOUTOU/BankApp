# BankApp Af

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/your-repo/bankapp-af)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-blue.svg)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.6.1-purple.svg)](https://redux-toolkit.js.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [API Integration](#api-integration)
- [Styling](#styling)
- [State Management](#state-management)
- [Routing](#routing)
- [Components](#components)
- [Pages](#pages)
- [Utilities](#utilities)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Support](#support)

## 🌟 Overview

BankApp Af is a modern, secure, and user-friendly banking application built with React and Vite. Designed for African users, it provides comprehensive financial management tools including account monitoring, transaction tracking, bill payments, money transfers, budget tracking, and card management. The application features a responsive design optimized for both desktop and mobile devices, with French language support and localized currency formatting.

The app emphasizes security with features like biometric authentication, two-factor authentication, and secure data handling. It offers an intuitive dashboard with real-time insights into spending patterns, financial goals tracking, and upcoming bill reminders.

## ✨ Features

### 🔐 Authentication & Security

- Secure login with username/password
- Biometric authentication support
- Two-factor authentication (2FA)
- Session management with automatic logout
- Trust signals and security indicators

### 🏠 Dashboard

- Personalized greeting based on time of day
- Real-time account balances display
- Total wealth calculation across all accounts
- Quick access to frequently used actions
- Security status indicator

### 💳 Account Management

- Multiple account types support (checking, savings, credit)
- Detailed account information and settings
- Account summary cards with key metrics
- Transaction history with filtering and search
- Statement generation and download

### 💰 Transaction Management

- Comprehensive transaction history
- Advanced filtering and search capabilities
- Transaction categorization
- Export functionality (PDF, CSV)
- Spending analytics and insights
- Monthly transaction grouping

### 💳 Card Management

- Virtual and physical card management
- Card details and settings
- Card transaction tracking
- Security controls (card locking, limits)
- Card replacement requests

### 💸 Money Transfers

- Internal transfers between accounts
- External transfers to other banks
- Scheduled transfers
- Transfer history and tracking
- Beneficiary management

### 📊 Budget Tracking

- Budget creation and management
- Spending category tracking
- Budget vs actual spending comparison
- Alerts for budget limits
- Financial goal setting and progress tracking

### 🧾 Bill Payments

- Upcoming bill reminders
- Automated bill payment scheduling
- Bill payment history
- Payment method management
- Recurring payment setup

### 👤 Profile & Settings

- Personal information management
- Notification preferences
- Privacy controls
- Accessibility options
- Advanced security settings

### 📱 Mobile-First Design

- Responsive design for all screen sizes
- Touch-optimized interface
- Mobile-specific navigation (bottom toolbar)
- Offline capability for key features
- Progressive Web App (PWA) support

## 🛠 Tech Stack

### Frontend Framework

- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Vite 5.4.19** - Fast build tool and development server

### State Management

- **Redux Toolkit 2.6.1** - State management with Redux
- **React Redux 5.0.1** - Official React bindings for Redux

### Routing

- **React Router DOM 6.0.2** - Declarative routing for React

### Styling

- **Tailwind CSS 3.4.6** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing tool
- **Autoprefixer 10.4.2** - CSS vendor prefixing
- **Framer Motion 10.16.4** - Animation library for React

### UI Components

- **Radix UI** - Unstyled, accessible UI components
- **Lucide React 0.484.0** - Beautiful icon library
- **Class Variance Authority 0.7.1** - Utility for class name variants
- **Tailwind Merge 3.3.1** - Utility for merging Tailwind classes

### Data Visualization

- **Recharts 2.15.2** - Composable charting library built on React components
- **D3 7.9.0** - Data visualization library

### HTTP Client

- **Axios 1.8.4** - Promise-based HTTP client

### Form Handling

- **React Hook Form 7.55.0** - Performant forms with easy validation

### Utilities

- **Date-fns 4.1.0** - Modern JavaScript date utility library
- **React Helmet 6.1.0** - Document head manager for React
- **React Router Hash Link 2.4.3** - Hash link scroll functionality

### Development Tools

- **ESLint** - JavaScript linting utility
- **Testing Library** - Testing utilities for React
- **Vite TSConfig Paths 3.6.0** - TypeScript path mapping for Vite

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: At least 500MB free space
- **Browser**: Modern browser with JavaScript enabled (Chrome 90+, Firefox 88+, Safari 14+)

## 🚀 Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bankapp-af.git
cd bankapp-af
```

### 2. Install Dependencies

```bash
npm install
```

or if using yarn:

```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your environment variables:

```env
VITE_API_BASE_URL=https://api.bankapp-af.com
VITE_APP_NAME=BankApp Af
VITE_APP_VERSION=0.1.0
```

### 4. Start Development Server

```bash
npm run dev
```

or

```bash
npm start
```

The application will be available at `http://localhost:5173`

## 📖 Usage

### First Time Setup

1. Open the application in your browser
2. Navigate to the login page
3. Enter your credentials or use biometric authentication
4. Complete any additional security verification if prompted

### Navigating the Application

- **Dashboard**: Main overview of your accounts and recent activity
- **Account Details**: Detailed view of individual accounts and transactions
- **Transaction History**: Complete history with filtering and search
- **Cards Management**: Manage your debit/credit cards
- **Transfer Money**: Send money to other accounts
- **Bill Payment**: Pay bills and manage recurring payments
- **Budget Tracking**: Monitor and manage your budgets
- **Profile Settings**: Update personal information and preferences

### Key Features Usage

#### Adding a New Transaction

1. Navigate to the relevant account
2. Click "Add Transaction"
3. Fill in transaction details
4. Categorize the transaction
5. Save the transaction

#### Setting Up a Budget

1. Go to Budget Tracking page
2. Click "Create New Budget"
3. Set budget name and category
4. Define spending limit and timeframe
5. Save and start tracking

#### Managing Cards

1. Access Cards Management
2. Select the card to manage
3. Update settings, limits, or security options
4. Save changes

## 📁 Project Structure

```
bankapp-af/
├── public/
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AccountSelector.jsx
│   │   │   ├── ActionToolbar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── SecurityIndicator.jsx
│   │   │   └── Select.jsx
│   │   ├── AppIcon.jsx
│   │   ├── AppImage.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── login/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── BiometricAuth.jsx
│   │   │       ├── LoginForm.jsx
│   │   │       ├── TrustSignals.jsx
│   │   │       └── TwoFactorAuth.jsx
│   │   ├── dashboard/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── AccountCard.jsx
│   │   │       ├── FinancialGoals.jsx
│   │   │       ├── QuickActions.jsx
│   │   │       ├── RecentTransactions.jsx
│   │   │       ├── SpendingInsights.jsx
│   │   │       └── UpcomingBills.jsx
│   │   ├── account-details/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── AccountDetails.jsx
│   │   │       ├── AccountSettings.jsx
│   │   │       ├── AccountSummaryCard.jsx
│   │   │       ├── AccountTabs.jsx
│   │   │       ├── FilterPanel.jsx
│   │   │       ├── SearchBar.jsx
│   │   │       ├── StatementsTab.jsx
│   │   │       └── TransactionList.jsx
│   │   ├── transaction-history/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── ExportModal.jsx
│   │   │       ├── FilterBar.jsx
│   │   │       ├── MonthlyGroupHeader.jsx
│   │   │       ├── SpendingAnalytics.jsx
│   │   │       ├── TransactionCard.jsx
│   │   │       └── TransactionDetailsModal.jsx
│   │   ├── cards-management/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── CardDetails.jsx
│   │   │       ├── CardSettings.jsx
│   │   │       ├── CardsList.jsx
│   │   │       └── CardTransactions.jsx
│   │   ├── profile-settings/
│   │   │   ├── index.jsx
│   │   │   └── components/
│   │   │       ├── AccessibilityOptions.jsx
│   │   │       ├── AdvancedSettings.jsx
│   │   │       ├── NotificationPreferences.jsx
│   │   │       ├── PersonalInformation.jsx
│   │   │       ├── PrivacyControls.jsx
│   │   │       └── SecuritySettings.jsx
│   │   ├── bill-payment.jsx
│   │   ├── budget-tracking.jsx
│   │   ├── transfer-money.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── utils/
│   │   └── cn.js
│   ├── App.jsx
│   ├── index.jsx
│   └── Routes.jsx
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.mjs
└── TODO.md
```

## 📜 Scripts

The following npm scripts are available:

- `npm start` or `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run serve` - Preview the production build locally

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## 🔗 API Integration

The application integrates with backend APIs for:

- User authentication and authorization
- Account and transaction data
- Card management services
- Payment processing
- Notification services

### API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/accounts` - Fetch user accounts
- `GET /api/transactions` - Fetch transaction history
- `POST /api/transfers` - Initiate money transfers
- `GET /api/cards` - Fetch card information

## 🎨 Styling

The application uses Tailwind CSS for styling with custom design tokens:

### Color Scheme

- **Primary**: Blue tones for main actions
- **Secondary**: Complementary colors for secondary elements
- **Accent**: Highlight colors for important information
- **Neutral**: Grays for backgrounds and text

### Typography

- **Font Family**: System fonts for optimal performance
- **Font Sizes**: Responsive scaling from mobile to desktop
- **Line Heights**: Optimized for readability

### Components

- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Inputs**: Styled form inputs with validation states
- **Cards**: Consistent card layouts with shadows and borders
- **Modals**: Overlay components for additional information

## 🗂 State Management

Redux Toolkit is used for global state management:

### Store Structure

```
store/
├── authSlice.js      # Authentication state
├── accountsSlice.js  # Account information
├── transactionsSlice.js # Transaction data
├── cardsSlice.js     # Card management
├── uiSlice.js        # UI state (modals, loading, etc.)
└── index.js          # Store configuration
```

### Key Features

- **Async Thunks**: For API calls and async operations
- **Slices**: Modular state management
- **Selectors**: Memoized state access
- **Middleware**: Custom middleware for logging and error handling

## 🛣 Routing

React Router DOM handles client-side routing:

### Route Structure

- `/` - Login page (default)
- `/login` - Login page
- `/dashboard` - Main dashboard
- `/account-details` - Account details and settings
- `/transaction-history` - Transaction history
- `/cards-management` - Card management
- `/transfer-money` - Money transfer
- `/bill-payment` - Bill payment
- `/budget-tracking` - Budget tracking
- `/profile-settings` - User profile and settings
- `*` - 404 Not Found page

## 🧩 Components

### Reusable UI Components

- **Button**: Customizable button component with variants
- **Input**: Form input with validation and error states
- **Select**: Dropdown select component
- **Checkbox**: Custom checkbox component
- **Header**: Application header with navigation
- **SecurityIndicator**: Security status display

### Page Components

- **AccountCard**: Displays account information
- **TransactionCard**: Shows transaction details
- **QuickActions**: Dashboard action buttons
- **SpendingInsights**: Spending analysis charts
- **FinancialGoals**: Goal tracking components

## 📄 Pages

### Authentication

- **Login**: User authentication with multiple methods

### Main Application

- **Dashboard**: Overview of accounts and recent activity
- **Account Details**: Detailed account information
- **Transaction History**: Complete transaction records
- **Cards Management**: Card administration
- **Transfer Money**: Money transfer functionality
- **Bill Payment**: Bill payment interface
- **Budget Tracking**: Budget management
- **Profile Settings**: User preferences and settings

## 🔧 Utilities

### Helper Functions

- **cn.js**: Class name utility for conditional styling
- **formatters.js**: Data formatting utilities
- **validators.js**: Form validation functions
- **api.js**: API client configuration

### Constants

- **colors.js**: Color palette definitions
- **routes.js**: Route path constants
- **messages.js**: User-facing messages and labels

## 🧪 Testing

### Testing Setup

- **Testing Library**: React testing utilities
- **Jest**: JavaScript testing framework
- **User Event**: User interaction testing

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── setup.js
```

### Running Tests

```bash
npm test
```

## 🚀 Deployment

### Build Process

1. Run production build: `npm run build`
2. The `dist` folder contains the production-ready files
3. Deploy the `dist` folder to your hosting service

### Hosting Options

- **Vercel**: Recommended for React applications
- **Netlify**: Good alternative with form handling
- **AWS S3 + CloudFront**: For scalable deployments
- **GitHub Pages**: For simple static hosting

### Environment Variables

Set the following environment variables for production:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Code Standards

- Follow React best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Pull Request Process

1. Ensure all tests pass
2. Update the README if necessary
3. Add screenshots for UI changes
4. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Boniface Berekoutou** - _Initial work_ - [GitHub Profile](https://github.com/bonifacebere)
- **Development Team** - _Contributors_

## 🆘 Support

For support, email support@bankapp-af.com or join our Discord community.

### Documentation

- [API Documentation](https://api.bankapp-af.com/docs)
- [User Guide](https://docs.bankapp-af.com)
- [Troubleshooting](https://docs.bankapp-af.com/troubleshooting)

### Community

- [Discord Server](https://discord.gg/bankapp-af)
- [GitHub Discussions](https://github.com/your-repo/bankapp-af/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/bankapp-af)

---

**BankApp Af** - Secure, Modern Banking for Everyone 🚀
