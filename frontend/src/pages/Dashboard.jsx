import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, Mail, BookOpen, Calendar, 
  Loader2, Edit2, Trash2, Users, Plus
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/students';
export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students. Is the server running?');
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success(`${name} was deleted.`);
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student.');
    }
  };

  return (
    <main className="glass-panel">
      <div className="page-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={22} className="text-primary" /> 
          Enrolled Students ({students.length})
        </div>
        <button 
          onClick={() => navigate('/add')} 
          className="btn btn-primary" 
          style={{ width: 'auto', padding: '0.5rem 1rem' }}
        >
          <Plus size={18} /> Add Student
        </button>
      </div>
      
      <div className="records-container">
        {isFetching ? (
          <div className="loader-container">
            <Loader2 className="spin" size={40} />
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h2>No students found</h2>
            <p>Your database is empty. Add a new student to get started!</p>
            <button 
              onClick={() => navigate('/add')} 
              className="btn btn-primary" 
              style={{ width: 'auto', marginTop: '1rem' }}
            >
              <Plus size={18} /> Add First Student
            </button>
          </div>
        ) : (
          students.map((student) => (
            <div key={student._id} className="record-card">
              <div className="record-info">
                <h3><User size={18} color="var(--primary)" /> {student.name}</h3>
                <div className="record-meta">
                  <span><BookOpen size={16} /> {student.grade}</span>
                  <span><Calendar size={16} /> {student.age} yrs</span>
                  <span><Mail size={16} /> {student.email}</span>
                </div>
              </div>
              <div className="record-actions">
                <button className="btn-action btn-edit" onClick={() => navigate(`/edit/${student._id}`)} title="Edit">
                  <Edit2 size={16} /> Edit
                </button>
                <button className="btn-action btn-danger" onClick={() => handleDelete(student._id, student.name)} title="Delete">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
