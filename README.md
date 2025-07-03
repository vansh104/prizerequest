# Skill-Based Contest Platform

A production-ready skill-based contest platform where users can participate in contests by paying entry fees and answering quiz questions correctly to qualify for prize draws.

## Features

### Core Functionality
- **Skill-Based Contests**: Users must answer quiz questions correctly to qualify
- **Payment Integration**: Secure PayPal payment processing
- **Real-time Updates**: Live contest tracking and participant counts
- **Admin Dashboard**: Complete contest and user management
- **Mobile Responsive**: Optimized for all devices

### Contest Types
- Property/Real Estate (₹75 lakh)
- Vehicles (₹1.5 lakh - ₹8 lakh)
- Electronics (iPhone, MacBook - ₹1.2 lakh)
- Gold (₹50,000)
- Furniture (₹70,000)

### User Features
- User registration and authentication
- Contest browsing and filtering
- Secure payment processing
- Quiz participation
- Results tracking
- Email notifications

### Admin Features
- Contest management (CRUD operations)
- Quiz question management
- User management
- Payment tracking
- Data export functionality
- Analytics dashboard

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- React Hook Form for form handling
- PayPal React SDK for payments

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- PayPal SDK for payment processing
- Nodemailer for email notifications
- Express Validator for input validation
- Helmet for security headers
- Rate limiting for API protection

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- PayPal Developer Account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/skill-contest
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
FRONTEND_URL=http://localhost:5173
PORT=5000
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Contests
- `GET /api/contests` - Get all contests
- `GET /api/contests/:id` - Get contest by ID
- `POST /api/contests` - Create contest (Admin)
- `PUT /api/contests/:id` - Update contest (Admin)
- `DELETE /api/contests/:id` - Delete contest (Admin)

### Quiz
- `GET /api/quiz/contest/:contestId` - Get quiz for contest
- `POST /api/quiz` - Create quiz (Admin)
- `POST /api/quiz/submit/:contestId` - Submit quiz answer

### Entries
- `POST /api/entries` - Create entry
- `GET /api/entries/user` - Get user entries
- `GET /api/entries/contest/:contestId` - Get contest entries (Admin)

### Payments
- `POST /api/payments/create-order` - Create PayPal order
- `POST /api/payments/capture` - Capture PayPal payment
- `GET /api/payments/user` - Get user payments

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/entries` - Get all entries
- `GET /api/admin/export/:contestId` - Export contest data

## Database Schema

### User Model
- name, email, password (hashed)
- role (user/admin)
- verification status
- timestamps

### Contest Model
- title, description, prize value
- entry fee, max entries, current entries
- category, start/end dates
- active status, image URL
- creator reference

### Quiz Model
- contest reference
- question, options array
- correct answer index
- explanation, difficulty level
- active status

### Entry Model
- user and contest references
- payment details
- quiz attempt status and results
- qualification status
- timestamps

### Payment Model
- user and contest references
- amount, currency, PayPal IDs
- transaction status and details
- refund information

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet
- Environment variable protection

## Legal Compliance

This platform is designed to comply with Indian laws regarding skill-based contests:

1. **Skill-Based Questions**: All contests require answering quiz questions correctly
2. **No Pure Luck**: Success depends on knowledge/skill, not chance
3. **Transparent Process**: Clear rules and fair competition
4. **Entry Fees**: Clearly disclosed pricing structure
5. **Age Restrictions**: 18+ participation only

## Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables in your hosting platform

### Backend (Railway/Render/DigitalOcean)
1. Create a production database (MongoDB Atlas recommended)
2. Set up environment variables in your hosting platform
3. Deploy the backend code
4. Configure PayPal for production mode

### Environment Variables for Production
- Update `PAYPAL_MODE` to `live`
- Use production PayPal credentials
- Set secure JWT secret
- Configure production database URL
- Set up email service for notifications

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@prizewin.com or create an issue in the GitHub repository.

## Disclaimer

This platform is designed for educational purposes and must comply with local laws and regulations. Users are responsible for ensuring legal compliance in their jurisdiction.