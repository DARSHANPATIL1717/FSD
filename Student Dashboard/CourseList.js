import React from 'react';

const courses = [
  { id: 1, name: "Full Stack Development", seats: 10 },
  { id: 2, name: "Artificial Intelligence", seats: 0 },
  { id: 3, name: "Cyber Security", seats: 5 }
];

function CourseList() {
  return (
    <div className="row">
      {courses.map(course => (
        <div className="col-md-4 mb-3" key={course.id}>
          <div className="card p-3 border">
            <h5>{course.name}</h5>

            {/* Conditional Rendering */}
            <p>
              Status:{" "}
              {course.seats > 0 ? (
                <span className="text-success">Available</span>
              ) : (
                <span className="text-danger">Full</span>
              )}
            </p>

            <p>Seats: {course.seats}</p>

            {/* Conditional Button */}
            <button
              className="btn btn-primary"
              disabled={course.seats === 0}
            >
              Register
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;