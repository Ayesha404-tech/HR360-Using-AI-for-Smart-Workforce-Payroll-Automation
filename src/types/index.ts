export type UserRole = 'admin' | 'hr' | 'employee' | 'candidate';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  joinDate?: string;
  salary?: number;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  appliedAt: string;
}

export interface PayrollRecord {
  id: string;
  userId: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

export interface PerformanceReview {
  id: string;
  userId: string;
  reviewerId: string;
  period: string;
  score: number;
  feedback: string;
  goals: string[];
  achievements: string[];
  createdAt: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  interviewerId: string;
  position: string;
  scheduledAt: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
  rating?: number;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  resumeUrl?: string;
  status: 'applied' | 'screening' | 'interview' | 'offered' | 'hired' | 'rejected';
  appliedAt: string;
  aiScore?: number;
}