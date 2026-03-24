import React from 'react';
import CourseList from './components/CourseList';

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Student Dashboard | Courses | Contact
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center">Available Courses</h2>
        <CourseList />
      </div>
    </div>
  );
}

export default App;