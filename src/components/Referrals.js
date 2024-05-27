import React from 'react';

const Referrals = ({ userId }) => {
  if (!userId) {
    return <p>Loading your referral link...</p>;
  }

  const referralLink = `https://YOUR_WEBAPP_URL?ref=${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      alert('Referral link copied to clipboard!');
    }, () => {
      alert('Failed to copy referral link');
    });
  };

  return (
    <div>
      <h2>Referrals</h2>
      <p>Your referral link:</p>
      <input type="text" value={referralLink} readOnly />
      <button onClick={handleCopy}>Copy Link</button>
    </div>
  );
};

export default Referrals;
