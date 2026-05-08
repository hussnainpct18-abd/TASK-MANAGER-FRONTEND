import React from "react";
import "./Skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="task-card skeleton-card" style={{maxWidth:`365px`}}>
      
      <div className="skeleton title"></div>

      <div className="skeleton line"></div>
      <div className="skeleton line short"></div>
      <div className="skeleton line"></div>

      <div className="skeleton-footer">
        <div className="skeleton badge"></div>
        <div className="skeleton badge"></div>
      </div>

    </div>
  );
};

export default SkeletonCard;