# 🎨 Custom Gift Creator

A modern, responsive web application for creating personalized gifts with a 5-step customization flow. Built with Next.js 14, TypeScript, styled-components, Zustand, and Zod.

## ✨ Features

- **5-Step Customization Flow**: Character → Background → Style → Personalize → Review
- **Live Product Preview**: Real-time updates as you customize
- **Responsive Design**: Mobile-first, fully responsive layout
- **Form Validation**: React Hook Form + Zod for robust validation
- **State Management**: Zustand for global state management
- **Modern UI**: Beautiful animations and consistent theming
- **Google Sheets Integration**: Order management and tracking
- **SEO Optimized**: Next.js metadata API and structured data

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: styled-components
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Integration**: Google Sheets API
- **Deployment**: Vercel + Firebase Hosting

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── orders/        # Order submission endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/             # React components
│   ├── StepNavigation.tsx # Step progress indicator
│   ├── ProductPreview.tsx # Live product preview
│   ├── OptionSelector.tsx # Customization options
│   ├── OrderForm.tsx      # Order form with validation
│   ├── SuccessModal.tsx   # Success confirmation modal
│   └── ThemeProvider.tsx  # Styled-components theme
├── data/                   # Static data and utilities
│   ├── products.ts        # Product catalog
│   └── discountCodes.ts   # Discount logic
├── lib/                    # Utilities and validations
│   └── validations.ts     # Zod schemas
├── store/                  # State management
│   └── customizationStore.ts # Zustand store
├── styles/                 # Global styles and theme
│   ├── globals.ts         # Global CSS
│   └── theme.ts           # Design tokens
└── types/                  # TypeScript interfaces
    └── index.ts           # Type definitions
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Platform account (for Google Sheets API)

### 1. Clone the Repository

```bash
git clone https://github.com/Hungdeptrai-gif/myappp.git
cd myappp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Sheets API Configuration
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON credentials
6. Share your Google Sheet with the service account email
7. Copy the spreadsheet ID from the URL

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Customization Flow

1. **Choose Character**: Select from available characters
2. **Select Background**: Pick a background scene
3. **Style Your Character**: Add clothes, accessories, hairstyles, hats, and pets
4. **Personalize**: Add custom text or messages
5. **Review & Order**: Complete the order form and submit

### Features

- **Multi-select Items**: Add multiple clothes and accessories
- **Real-time Pricing**: Dynamic price calculation with discounts
- **Form Validation**: Comprehensive form validation with error messages
- **Responsive Design**: Works perfectly on all devices
- **Live Preview**: See changes instantly as you customize

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Firebase Hosting

```bash
# Build the application
npm run export

# Deploy to Firebase
firebase deploy --only hosting
```

## 🔧 Customization

### Adding New Products

Edit `src/data/products.ts` to add new:
- Characters
- Backgrounds
- Clothes
- Hairstyles
- Hats
- Accessories
- Pets

### Modifying the Theme

Update `src/styles/theme.ts` to change:
- Colors
- Typography
- Spacing
- Breakpoints
- Animations

### Styling Components

All components use styled-components. Modify the styled components in each component file to customize the appearance.

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes
- Progressive enhancement

## 🔒 Security

- Form validation on both client and server
- Environment variable protection
- API route protection
- Input sanitization

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Performance

- Next.js 14 optimizations
- Image optimization
- Code splitting
- Lazy loading
- Optimized bundle size

## 🌐 Internationalization

Ready for multiple languages with:
- Structured data for SEO
- Accessible design
- RTL support ready
- Localization framework ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Email**: support@theluvingifts.com
- **Phone**: +84 123 456 789
- **Hours**: Mon-Fri 9AM-6PM (GMT+7)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Styled-components for the styling solution
- Zustand for lightweight state management
- React Hook Form for form handling
- Zod for schema validation

---

**Made with ❤️ by The Loving Gifts Team**
