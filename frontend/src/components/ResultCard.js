import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ResultCard.css'; 

const ResultCard=(props) =>{
  const { businessData, regenerateHeadline } = props;
  const toRegenerate = () => {
    regenerateHeadline();
  };
  return (
    <div className="result-card">
            <div className="result-row">
              <i className="fas fa-star"></i>
              <span><strong>Rating:</strong> {businessData.rating}</span>
            </div>
            <div className="result-row">
              <i className="fas fa-comments"></i>
              <span><strong>Reviews:</strong> {businessData.reviews}</span>
            </div>
            <p className="headline">"{businessData.headline}"</p>
            <button onClick={toRegenerate}>Regenerate SEO Headline</button>
          </div>
  );
}

export default ResultCard;
