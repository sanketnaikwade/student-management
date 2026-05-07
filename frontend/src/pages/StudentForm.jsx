import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, Mail, BookOpen, Calendar, 
  Loader2, Save, X, Edit2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/students';
export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({ name: '', age: '', grade: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setFormData({
        name: response.data.name,
        age: response.data.age,
        grade: response.data.grade,
        email: response.data.email
      });
    } catch (error) {
      toast.error('Failed to load student data');
      navigate('/');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, formData);
        toast.success(`Updated ${formData.name} successfully!`);
      } else {
        await axios.post(API_URL, formData);
        toast.success(`Added ${formData.name} successfully!`);
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving student records');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="glass-panel loader-container">
        <Loader2 className="spin" size={48} />
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="page-title">
        {isEditing ? <Edit2 size={22} color="var(--primary)" /> : <User size={22} color="var(--primary)" />}
        {isEditing ? 'Edit Student Details' : 'Add New Student'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><User size={16} /> Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label><Calendar size={16} /> Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 20"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label><BookOpen size={16} /> Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="e.g. Junior"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-group">
          <label><Mail size={16} /> Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="spin" size={18} /> Processing...</>
            ) : (
              <><Save size={18} /> {isEditing ? 'Update Student' : 'Save Student'}</>
            )}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')} disabled={isSubmitting}>
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
