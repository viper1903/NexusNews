import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import userService from '../api/userService';
import Spinner from '../components/Spinner';
import ConfirmModal from '../components/ConfirmModal'; // 1. Import the new modal
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. Add state for the modal

  const isLoggingOut = useRef(false);

  useEffect(() => {
    // ... (This useEffect for fetching profile data is unchanged)
    const fetchProfile = async () => {
      try {
        const response = await userService.getMyProfile();
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    // ... (This useEffect for the safe logout is unchanged)
    return () => {
      if (isLoggingOut.current) {
        logout();
      }
    };
  }, [logout]);

  // 3. This function will now only open the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // 4. This new function contains the actual logout logic
  const handleConfirmLogout = () => {
    isLoggingOut.current = true;
    navigate('/');
    setIsModalOpen(false); // Close the modal
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const memberSince = profileData ? new Date(profileData.memberSince).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  }) : '';

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* ... (The top part of the card is unchanged) ... */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{profileData?.username?.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="profile-username">{profileData?.username || user.username}</h2>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{profileData?.savedArticlesCount}</span>
            <span className="stat-label">Saved Articles</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{memberSince}</span>
            <span className="stat-label">Member Since</span>
          </div>
        </div>
        <div className="profile-actions">
          {/* 5. The button now calls handleLogoutClick */}
          <button onClick={handleLogoutClick} className="profile-logout-button">
            Logout
          </button>
        </div>
      </div>

      {/* 6. Render the modal component here */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
      >
        Are you sure you want to logout?
      </ConfirmModal>
    </div>
  );
};

export default ProfilePage;