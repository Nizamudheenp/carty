import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="text-center mt-3">
      <h1 className="mb-4">🚧 Page Under Construction</h1>
      <p className="mb-6">We’re currently working on this page. Please check back soon!</p>
      <Link
        to="/"
        className="p-4"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ComingSoon;
