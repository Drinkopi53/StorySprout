import React, { useState } from 'react';
import SharingService from '../services/SharingService';
import './ShareModal.css';

function ShareModal({ storyId, storyTitle, onClose }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [shareMethod, setShareMethod] = useState('link');
  const [isSharing, setIsSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const handleShare = async () => {
    setIsSharing(true);
    setShareMessage('');
    
    try {
      if (shareMethod === 'email') {
        const result = await SharingService.shareViaEmail(storyId, storyTitle, recipientEmail);
        setShareMessage(result.message);
      } else if (shareMethod === 'link') {
        const link = SharingService.generateShareableLink(storyId);
        SharingService.copyToClipboard(link);
        setShareMessage('Link copied to clipboard!');
      } else {
        const result = await SharingService.shareViaSocialMedia(storyId, storyTitle, shareMethod);
        setShareMessage(result.message);
      }
    } catch (error) {
      setShareMessage('Failed to share story. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share Story</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p>Share "{storyTitle}" with family and friends</p>
          
          <div className="share-options">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="shareMethod"
                  value="link"
                  checked={shareMethod === 'link'}
                  onChange={(e) => setShareMethod(e.target.value)}
                />
                Copy Link
              </label>
              
              <label>
                <input
                  type="radio"
                  name="shareMethod"
                  value="email"
                  checked={shareMethod === 'email'}
                  onChange={(e) => setShareMethod(e.target.value)}
                />
                Email
              </label>
              
              <label>
                <input
                  type="radio"
                  name="shareMethod"
                  value="facebook"
                  checked={shareMethod === 'facebook'}
                  onChange={(e) => setShareMethod(e.target.value)}
                />
                Facebook
              </label>
              
              <label>
                <input
                  type="radio"
                  name="shareMethod"
                  value="twitter"
                  checked={shareMethod === 'twitter'}
                  onChange={(e) => setShareMethod(e.target.value)}
                />
                Twitter
              </label>
            </div>
            
            {shareMethod === 'email' && (
              <div className="email-input">
                <label htmlFor="recipientEmail">Recipient's Email:</label>
                <input
                  type="email"
                  id="recipientEmail"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            )}
          </div>
          
          {shareMessage && (
            <div className={`message ${shareMessage.includes('Failed') ? 'error' : 'success'}`}>
              {shareMessage}
            </div>
          )}
          
          <div className="modal-actions">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button 
              className="share-button" 
              onClick={handleShare}
              disabled={isSharing || (shareMethod === 'email' && !recipientEmail)}
            >
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;