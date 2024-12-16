import React, { useState, useEffect } from 'react';
import { User, Check, Loader2 } from 'lucide-react';
import { useCurrentUser } from '../../hooks/useDatabase';
import { updateUserProfile } from '../../utils/database';

export function ProfileDetails() {
  const user = useCurrentUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        title: user.title,
        company: user.company,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSubmitting(true);
    
    try {
      await updateUserProfile(user.id, formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Details</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
        <div>
          <button 
            className="text-sm text-primary hover:text-primary/80 font-medium"
            onClick={() => document.getElementById('avatar-input')?.click()}
          >
            Change Avatar
          </button>
          <input 
            id="avatar-input"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            JPG, GIF or PNG. Max size 2MB
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-primary/50 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {showSuccess && (
            <span className="flex items-center text-green-600 text-sm">
              <Check className="w-4 h-4 mr-1" />
              Profile updated successfully
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
              transition-colors focus:ring-2 focus:ring-primary/50 disabled:opacity-50
              disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}