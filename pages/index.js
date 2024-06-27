import { useEffect, useState } from 'react';
import axios from 'axios';
import { profileSchema } from '../utils/validators';

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      try {
        profileSchema.parse(formData);
        setError(null);
        axios.put('/api/user', formData).then((response) => {});
      } catch (error) {
        setError(error.errors[0].message); // 设置错误信息
        setIsEditing(isEditing);
      }
    }
  };

  useEffect(() => {
    axios.get('/api/user').then((response) => {
      setFormData(response.data);
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-5">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={toggleEdit} className="btn btn-primary">
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  );
}
