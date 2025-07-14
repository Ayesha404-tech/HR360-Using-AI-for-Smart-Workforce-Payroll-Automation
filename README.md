# HR360 - Complete HR Management System

A modern, AI-powered HR management system built with React, TypeScript, Tailwind CSS, and Convex backend.

## 🚀 Features

### Core Modules
- **Authentication & Authorization** - JWT-based secure login with role-based access
- **Dashboard** - Role-specific dashboards with KPIs and analytics
- **User Management** - Complete CRUD operations with role assignment
- **Attendance Tracking** - Real-time clock-in/out with status monitoring
- **Leave Management** - Apply, approve, reject leave requests
- **Payroll System** - Salary calculation, payslips, and tax management
- **Performance Management** - KPI tracking, reviews, and goal setting
- **Interview Scheduling** - Complete interview lifecycle management
- **AI Resume Screening** - Automated candidate evaluation and scoring
- **Exit Management** - Resignation handling and clearance tracking
- **Reports & Analytics** - Comprehensive reporting with charts
- **AI Chatbot** - Intelligent HR assistant for employee queries
- **Notification System** - Real-time alerts and updates

### AI Features
- **Resume Analysis** - Automatic skill extraction and candidate scoring
- **Chatbot Support** - Natural language processing for HR queries
- **Performance Insights** - AI-driven performance recommendations
- **Predictive Analytics** - Workforce trends and insights

### External Integrations
- **Email Notifications** - SendGrid integration for automated emails
- **Cloud Storage** - Cloudinary for file uploads and management
- **Real-time Updates** - Live notifications and data synchronization

## 🛠 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, TypeScript, Tailwind CSS |
| Backend | Convex (Serverless) |
| Database | Convex DB |
| AI/ML | OpenAI API, Custom NLP |
| Email | SendGrid |
| Storage | Cloudinary |
| Charts | Recharts |
| Icons | Lucide React |
| Hosting | Vercel + Convex |

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account
- SendGrid account (for emails)
- OpenAI API key (for AI features)
- Cloudinary account (for file storage)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd hr360
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
VITE_CONVEX_URL=your_convex_deployment_url
JWT_SECRET=your_jwt_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Convex Setup
```bash
npx convex dev
```

### 4. Start Development Server
```bash
npm run dev
```

## 👥 User Roles & Access

### Admin
- Full system access
- User management and role assignment
- System configuration
- All reports and analytics

### HR Manager
- Employee management
- Leave approvals
- Payroll processing
- Interview scheduling
- Performance reviews

### Employee
- Personal dashboard
- Attendance tracking
- Leave applications
- Payroll viewing
- Performance monitoring

### Candidate
- Application tracking
- Interview scheduling
- Profile management
- Communication with HR

## 🔐 Demo Credentials

```
Admin: admin@hr360.com / password
HR: hr@hr360.com / password
Employee: employee@hr360.com / password
Candidate: candidate@hr360.com / password
```

## 📊 Key Features Breakdown

### Dashboard Analytics
- Real-time KPI monitoring
- Interactive charts and graphs
- Role-based data visualization
- Performance metrics tracking

### AI-Powered Features
- **Resume Screening**: Automatic parsing and scoring
- **Chatbot**: Natural language HR assistance
- **Predictive Analytics**: Workforce insights
- **Performance Analysis**: AI-driven recommendations

### Notification System
- Real-time alerts
- Email notifications
- In-app messaging
- Status updates

### Reporting System
- Attendance reports
- Leave analytics
- Payroll summaries
- Performance insights
- Department statistics

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/verify` - Token verification

### User Management
- `GET /users` - Get all users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Attendance
- `GET /attendance/:userId` - Get user attendance
- `POST /attendance/clockin` - Clock in
- `POST /attendance/clockout` - Clock out

### Leave Management
- `GET /leaves/:userId` - Get user leaves
- `POST /leaves` - Create leave request
- `PUT /leaves/:id/status` - Update leave status

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Convex)
```bash
npx convex deploy
```

## 📱 Mobile Responsiveness

The system is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Secure API endpoints
- Data encryption
- Input validation
- XSS protection

## 📈 Performance Optimization

- Lazy loading components
- Optimized bundle size
- Efficient state management
- Cached API responses
- Image optimization
- Code splitting

## 🧪 Testing

```bash
npm run test
npm run test:coverage
```

## 📚 Documentation

- API documentation available at `/docs`
- Component documentation in `/src/components`
- Database schema in `/convex/schema.ts`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@hr360.com
- Documentation: [docs.hr360.com]
- Issues: GitHub Issues

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Integration with more third-party services
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] Workflow automation

---

**HR360** - Transforming HR Management with AI 🚀