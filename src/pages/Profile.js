import React, { useState, useEffect } from 'react';
import UserProfileService from '../services/UserProfileService';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    interests: '',
    learningGoals: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await UserProfileService.getProfile();
      setProfile(profileData);
      setEditData({
        name: profileData.name,
        email: profileData.email
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditData({
      name: profile.name,
      email: profile.email
    });
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...profile, ...editData };
      const result = await UserProfileService.updateProfile(updatedProfile);
      if (result.success) {
        setProfile(updatedProfile);
        setEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleAddChild = async () => {
    try {
      const result = await UserProfileService.addChild(newChild);
      if (result.success) {
        const updatedProfile = {
          ...profile,
          children: [
            ...profile.children,
            { ...newChild, id: result.childId }
          ]
        };
        setProfile(updatedProfile);
        setNewChild({
          name: '',
          age: '',
          interests: '',
          learningGoals: ''
        });
        setShowAddChild(false);
        alert('Child added successfully!');
      }
    } catch (error) {
      console.error('Error adding child:', error);
      alert('Failed to add child. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleChildInputChange = (e) => {
    const { name, value } = e.target;
    setNewChild({
      ...newChild,
      [name]: value
    });
  };

  if (loading) {
    return <div className="profile">Loading profile...</div>;
  }

  return (
    <div className="profile">
      <h1 className="page-title">Parent Profile</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <h2>Parent Information</h2>
          {!editing ? (
            <button className="edit-button" onClick={handleEdit}>Edit</button>
          ) : (
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
            </div>
          )}
        </div>
        
        <div className="profile-info">
          {editing ? (
            <>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </>
          )}
        </div>
      </div>
      
      <div className="children-section">
        <div className="section-header">
          <h2>Children</h2>
          <button 
            className="add-child-button" 
            onClick={() => setShowAddChild(!showAddChild)}
          >
            {showAddChild ? 'Cancel' : 'Add Child'}
          </button>
        </div>
        
        {showAddChild && (
          <div className="add-child-form">
            <h3>Add New Child</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newChild.name}
                onChange={handleChildInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <select
                name="age"
                value={newChild.age}
                onChange={handleChildInputChange}
              >
                <option value="">Select age</option>
                <option value="3-5">3-5 years</option>
                <option value="6-8">6-8 years</option>
                <option value="9-12">9-12 years</option>
              </select>
            </div>
            <div className="form-group">
              <label>Interests:</label>
              <input
                type="text"
                name="interests"
                value={newChild.interests}
                onChange={handleChildInputChange}
                placeholder="e.g., animals, space, pirates"
              />
            </div>
            <div className="form-group">
              <label>Learning Goals:</label>
              <input
                type="text"
                name="learningGoals"
                value={newChild.learningGoals}
                onChange={handleChildInputChange}
                placeholder="e.g., vocabulary, problem-solving"
              />
            </div>
            <button className="save-button" onClick={handleAddChild}>Add Child</button>
          </div>
        )}
        
        <div className="children-grid">
          {profile.children.map(child => (
            <div key={child.id} className="child-card">
              <h3>{child.name}</h3>
              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>Interests:</strong> {child.interests.join(', ')}</p>
              <p><strong>Learning Goals:</strong> {child.learningGoals.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;