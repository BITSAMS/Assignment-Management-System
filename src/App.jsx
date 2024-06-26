import "./App.css";
import ErrorBoundry from "./Pages/ErrorBoundry/ErrorBoundry";
import FacultyLogin from "./Pages/Faculty/Faculty Login/FacultyLogin";
import FacultyHome from "./Pages/Faculty/Faculty Home/FacultyHome";
import { Home } from "./Pages/Home/Home/Home";
import StudentHome from "./Pages/Student/Student Home/StudentHome";
import StudentLogin from "./Pages/Student/Student Login/StudentLogin";
import StudentSignUp from "./Pages/Student/StudentSignUp/StudentSignUp";
import TeacherSignUp from "./Pages/Faculty/Faculty SignUp/FacultySignUp";
import { Route, Routes, useLocation } from "react-router-dom";
import InvaildURL from "./Pages/ErrorBoundry/InvaildURL";
import CreateAssignment from "./Components/Faculty Components/Create Assignment/CreateAssignment";
import CheckAssignment from "./Components/Faculty Components/Check Assignment/CheckAssignment";
import { useSelector } from "react-redux";
import { StudentList } from "./Pages/Faculty/Student List/StudentList";
import Navbar from "./Components/Navbar/Navbar";
import Modal from 'react-modal';
import Admin from "./Pages/Admin/Admin";
import AddSubject from "./Pages/Admin/Add Subject/AddSubject";
import MapSubject from "./Pages/Admin/Map Subject/MapSubject";
import AddBranches from "./Pages/Admin/Add Branches/AddBranches";
import FacultyChoose from "./Pages/Faculty/Faculty Choose/FacultyChoose";
import StudentChoose from "./Pages/Student/Student Choose/StudentChoose";
import AdminLogin from "./Pages/Admin/Admin Login/AdminLogin";
import PromoteStudents from "./Pages/Admin/Promote Students/PromoteStudents";

function App() {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const location = useLocation();
  const showNavbar = location.pathname !== "/";
  Modal.setAppElement('#root');
  
  return (
    <ErrorBoundry>
      <div className="App">
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty signup" element={<TeacherSignUp />} />
          <Route path="/student signup" element={<StudentSignUp />} />
          <Route path="/admin login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<Admin />} />
          <Route path="/admin-panel/promote-student" element={<PromoteStudents />} />
          <Route path="/admin-panel/add-subject" element={<AddSubject />} />
          <Route path="/admin-panel/map-subject" element={<MapSubject />} />
          <Route path="/admin-panel/add-branches" element={<AddBranches />} />
          <Route path="/faculty login" element={<FacultyLogin />} />
          <Route path="/faculty choose" element={<FacultyChoose />} />
          <Route path="/student login" element={<StudentLogin />} />
          <Route path="/student choose/" element={<StudentChoose />} />
          <Route path="/student home/:subject" element={<StudentHome />} />
          <Route
            path={`/faculty/:semester/:branch/:subject`}
            element={<FacultyHome />}
          />
          <Route
            path={`/create assignment/:semester/:branch/:subject`}
            element={<CreateAssignment />}
          />
          <Route
            path={`/check assignment/:semester/:branch/:subject`}
            element={<CheckAssignment />}
          />
          <Route
            path={`/${facultyInfo.semester}/${facultyInfo.subjectName}/students`}
            element={<StudentList />}
          />
          <Route path="/*" element={<InvaildURL />} />
        </Routes>
      </div>
    </ErrorBoundry>
  );
}

export default App;
