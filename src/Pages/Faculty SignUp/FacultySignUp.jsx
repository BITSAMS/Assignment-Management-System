import React, { useState } from "react";
import Validator from "validator";
import "./FacultySignUp.css"; // Import CSS file for styles
import { set, ref, getDatabase } from "firebase/database";
import { app } from "../../Firebase/firebase";

const TeacherSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState("");
  const [stream, setStream] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [errors, setErrors] = useState({});
  const database = getDatabase(app);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (
      newPassword === "" ||
      (Validator.isNumeric(newPassword) && newPassword.length <= 5)
    ) {
      setPassword(newPassword);
    }
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!Validator.isLength(name, { min: 3, max: 25 })) {
      newErrors.name = "Name must be between 3 and 25 characters";
    }

    if (!Validator.isEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!Validator.isNumeric(password) || password.length !== 5) {
      newErrors.password = "Password must be a 5-digit number";
    }

    if (!semester) {
      newErrors.semester = "Please select a semester";
    }

    if (!subjectName) {
      newErrors.subjectName = "Subject Name is required";
    }

    if (!stream) {
      newErrors.stream = "Stream is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
      if (confirmSubmit) {
        console.log("Form submitted");
        console.table(name, email, password, semester, subjectName, stream); // You can use this ID as needed
        set(ref(database, `${semester}/${stream}/${subjectName}/facultyInfo`), {
          name,
          email,
          password,
          semester,
          subjectName,
        });
        // Reset form data and errors after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setSemester("");
        setSubjectName("");
        setStream("");
        setErrors({});
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="teachersignup-container">
      <form onSubmit={handleSubmit} className="teachersignup-form">
        <div className="faculty-sections">
          <div className="faculty-personal-details">
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-name">Name:</label>
              <input
                type="text"
                id="teachersignup-name"
                value={name}
                onChange={handleNameChange}
                placeholder="ex: John Doe"
              />
              {errors.name && (
                <div className="teachersignup-error">{errors.name}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-email">Email:</label>
              <input
                type="email"
                id="teachersignup-email"
                value={email}
                onChange={handleEmailChange}
                placeholder="ex: ex@gmail.com"
              />
              {errors.email && (
                <div className="teachersignup-error">{errors.email}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-password">Password:</label>
              <input
                type="password"
                id="teachersignup-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="*****"
              />
              {errors.password && (
                <div className="teachersignup-error">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="faculty-subject-details">
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-Stream">Stream:</label>
              <input
                type="text"
                id="teachersignup-Branch"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                placeholder="ex: CS"
              />
              {errors.stream && (
                <div className="teachersignup-error">{errors.stream}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-SubjectName">Subject:</label>
              <input
                type="text"
                id="teachersignup-SubjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="ex: DBMS"
              />
              {errors.subjectName && (
                <div className="teachersignup-error">{errors.subjectName}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-semester">Semester:</label>
              <select
                id="teachersignup-semester"
                value={semester}
                onChange={handleSemesterChange}
              >
                <option value="">Select Semester</option>
                <option value="1st Sem">1st Semester</option>
                <option value="2nd Sem">2nd Semester</option>
                <option value="3rd Sem">3rd Semester</option>
                <option value="4th Sem">4th Semester</option>
                <option value="5th Sem">5th Semester</option>
                <option value="6th Sem">6th Semester</option>
                <option value="7th Sem">7th Semester</option>
                <option value="8th Sem">8th Semester</option>
              </select>
              {errors.semester && (
                <div className="teachersignup-error">{errors.semester}</div>
              )}
            </div>
          </div>
        </div>

        <div className="teachersignup-group">
          <button type="submit" className="teachersignup-signup-btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherSignUp;
