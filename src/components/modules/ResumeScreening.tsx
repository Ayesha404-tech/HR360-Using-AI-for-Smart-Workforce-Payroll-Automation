import React, { useState } from 'react';
import { Upload, FileText, Brain, CheckCircle, XCircle, Star, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { Candidate } from '../../types';

const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1-555-0123',
    position: 'Frontend Developer',
    status: 'screening',
    appliedAt: '2024-01-10',
    aiScore: 85,
    resumeUrl: '/resume-alice.pdf',
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@email.com',
    phone: '+1-555-0124',
    position: 'Backend Developer',
    status: 'interview',
    appliedAt: '2024-01-12',
    aiScore: 78,
    resumeUrl: '/resume-bob.pdf',
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@email.com',
    phone: '+1-555-0125',
    position: 'Full Stack Developer',
    status: 'rejected',
    appliedAt: '2024-01-08',
    aiScore: 45,
    resumeUrl: '/resume-carol.pdf',
  },
];

interface AIAnalysis {
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

const mockAIAnalysis: { [key: string]: AIAnalysis } = {
  '1': {
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML', 'Git'],
    experience: '3 years in frontend development with focus on React applications',
    education: 'Bachelor of Computer Science from State University',
    strengths: ['Strong React skills', 'Good TypeScript knowledge', 'UI/UX awareness'],
    weaknesses: ['Limited backend experience', 'No mobile development experience'],
    recommendation: 'Highly recommended for frontend positions. Strong technical skills and good cultural fit.',
  },
  '2': {
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
    experience: '4 years in backend development with cloud infrastructure experience',
    education: 'Master of Computer Science from Tech University',
    strengths: ['Excellent backend skills', 'Cloud architecture knowledge', 'Database expertise'],
    weaknesses: ['Limited frontend experience', 'No mobile development'],
    recommendation: 'Good candidate for backend roles. Strong technical foundation and scalable system experience.',
  },
  '3': {
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    experience: '1 year junior developer experience',
    education: 'Coding Bootcamp Certificate',
    strengths: ['Eager to learn', 'Basic web development skills'],
    weaknesses: ['Limited experience', 'Outdated technology stack', 'No framework experience'],
    recommendation: 'Not suitable for senior positions. May consider for junior roles with mentorship.',
  },
};

export const ResumeScreening: React.FC = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [uploadData, setUploadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
  });

  const handleViewAnalysis = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsAnalysisModalOpen(true);
  };

  const handleStatusChange = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus }
        : candidate
    ));
  };

  const handleUploadResume = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI processing
    const aiScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      ...uploadData,
      status: 'screening',
      appliedAt: new Date().toISOString().split('T')[0],
      aiScore,
      resumeUrl: '/uploaded-resume.pdf',
    };
    
    setCandidates([newCandidate, ...candidates]);
    setIsUploadModalOpen(false);
    setUploadData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'offered': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredCandidates = candidates.filter(candidate => 
    selectedStatus === '' || candidate.status === selectedStatus
  );

  const stats = {
    total: candidates.length,
    screening: candidates.filter(c => c.status === 'screening').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    hired: candidates.filter(c => c.status === 'hired').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">AI Resume Screening</h2>
        {(user?.role === 'hr' || user?.role === 'admin') && (
          <Button onClick={handleUploadResume}>
            <Upload size={20} className="mr-2" />
            Upload Resume
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Screening</p>
              <p className="text-2xl font-bold text-gray-900">{stats.screening}</p>
            </div>
            <Brain className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Interview Stage</p>
              <p className="text-2xl font-bold text-gray-900">{stats.interview}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Hired</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hired}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Candidate Applications</CardTitle>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="offered">Offered</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-2">Candidate</th>
                  <th className="text-left py-4 px-2">Position</th>
                  <th className="text-left py-4 px-2">AI Score</th>
                  <th className="text-left py-4 px-2">Status</th>
                  <th className="text-left py-4 px-2">Applied Date</th>
                  <th className="text-left py-4 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{candidate.firstName} {candidate.lastName}</p>
                          <p className="text-sm text-gray-500">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">{candidate.position}</td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreBadge(candidate.aiScore || 0)}`}>
                          {candidate.aiScore}%
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= Math.floor((candidate.aiScore || 0) / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <select
                        value={candidate.status}
                        onChange={(e) => handleStatusChange(candidate.id, e.target.value as Candidate['status'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-none ${getStatusColor(candidate.status)}`}
                      >
                        <option value="screening">Screening</option>
                        <option value="interview">Interview</option>
                        <option value="offered">Offered</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-2">{candidate.appliedAt}</td>
                    <td className="py-4 px-2">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewAnalysis(candidate)}
                        >
                          <Brain size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(candidate.resumeUrl, '_blank')}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Modal */}
      <Modal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        title={`AI Analysis - ${selectedCandidate?.firstName} ${selectedCandidate?.lastName}`}
        size="xl"
      >
        {selectedCandidate && mockAIAnalysis[selectedCandidate.id] && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  AI Score: {selectedCandidate.aiScore}%
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${selectedCandidate.aiScore! >= 80 ? 'bg-green-500' : selectedCandidate.aiScore! >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${selectedCandidate.aiScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Position Applied</h4>
                <p className="text-gray-700">{selectedCandidate.position}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills Identified</h4>
              <div className="flex flex-wrap gap-2">
                {mockAIAnalysis[selectedCandidate.id].skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
                <ul className="space-y-1">
                  {mockAIAnalysis[selectedCandidate.id].strengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-red-600">Areas for Improvement</h4>
                <ul className="space-y-1">
                  {mockAIAnalysis[selectedCandidate.id].weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <XCircle size={16} className="text-red-600" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Experience</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {mockAIAnalysis[selectedCandidate.id].experience}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Education</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {mockAIAnalysis[selectedCandidate.id].education}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">AI Recommendation</h4>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                {mockAIAnalysis[selectedCandidate.id].recommendation}
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsAnalysisModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleStatusChange(selectedCandidate.id, 'interview')}>
                Move to Interview
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Resume Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload New Resume"
        size="lg"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={uploadData.firstName}
              onChange={(e) => setUploadData({ ...uploadData, firstName: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={uploadData.lastName}
              onChange={(e) => setUploadData({ ...uploadData, lastName: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={uploadData.email}
            onChange={(e) => setUploadData({ ...uploadData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={uploadData.phone}
            onChange={(e) => setUploadData({ ...uploadData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Position Applied For"
            value={uploadData.position}
            onChange={(e) => setUploadData({ ...uploadData, position: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drop resume file here or click to browse</p>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
            <Button type="button" variant="outline">Choose File</Button>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Brain size={16} className="mr-2" />
              Process with AI
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};