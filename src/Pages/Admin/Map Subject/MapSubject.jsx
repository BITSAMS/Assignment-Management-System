import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";

const MapSubject = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [branch, setBranch] = useState("Branch");
  const [facultyOptions, setFaculyOptions] = useState([]);
  const [selectedBranchFaculty, setSelectedBranchFaculty] = useState({});
  const database = getDatabase(app);

  useEffect(() => {
    const fetchData = async () => {
      const semesterSnapshot = await get(child(ref(database), "/"));
      if (semesterSnapshot.exists()) {
        const semesters = [];
        semesterSnapshot.forEach((semester) => {
          if (semester.key !== "loginCredentials") {
            semesters.push(semester.key);
          }
        });
        setSemesterOptions(semesters);
      }
    };
    fetchData();
  }, [database]);

  useEffect(() => {
    const fetchData = async () => {
      const semesterSnapshot = await get(child(ref(database), `/${semester}/`));
      if (semesterSnapshot.exists()) {
        const branches = [];
        semesterSnapshot.forEach((branch) => {
          branches.push(branch.key);
        });
        setBranchOptions(branches);
      }
    };
    fetchData();
  }, [semester]);

  useEffect(() => {
    const fetchData = async () => {
      const subjectSnapshot = await get(
        child(ref(database), `/${semester}/${branch}`)
      );
      if (subjectSnapshot.exists()) {
        const subjects = [];
        subjectSnapshot.forEach((sub) => {
          subjects.push(sub.key);
        });
        setSubjectOptions(subjects);
      }
    };
    fetchData();
  }, [semester, branch]);

  useEffect(() => {
    const fetchData = async () => {
      const facultySnapshot = await get(
        child(ref(database), `/loginCredentials/facultyInfo`)
      );
      if (facultySnapshot.exists()) {
        const faculties = [];
        facultySnapshot.forEach((faculty) => {
          faculties.push(faculty.val());
        });
        setFaculyOptions(faculties);
      }
    };
    fetchData();
  }, [semester]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleFacultyChange = (e, branch) => {
    const { value } = e.target;
    setSelectedBranchFaculty((prevState) => ({
      ...prevState,
      [branch]: value,
    }));
  };

  const handleAddFaculty = (sub) => {
    let selectedFacultyString = selectedBranchFaculty[sub];
    const selectedFaculty = JSON.parse(selectedFacultyString);
    if(!selectedFaculty){
        console.error("Selected faculty is undefined")
        return
    }
    set(ref(database, `${semester}/${branch}/${sub}/facultyInfo`), 
        selectedFaculty
      );
  };

  return (
    <div>
      <select name="" id="" value={semester} onChange={handleSemesterChange}>
        <option value={"Semester"}>Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <select name="" id="" value={branch} onChange={handleBranchChange}>
        <option value={"Branch"}>Branch</option>
        {branchOptions.map((bra) => (
          <option key={bra} value={bra}>
            {bra}
          </option>
        ))}
      </select>

      {subjectOptions.map((sub, key) => (
        <div key={key}>
          <p>{sub}</p>
          <select
            name=""
            id=""
            value={selectedBranchFaculty[sub] || "Faculty"}
            onChange={(e) => handleFacultyChange(e, sub)}
          >
            <option value={"Faculty"}>Faculty</option>
            {facultyOptions.map((fac) => (
              <option key={fac.name} value={JSON.stringify(fac)}>
                {fac.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddFaculty(sub, selectedBranchFaculty)}>
            Add Faculty
          </button>
        </div>
      ))}
    </div>
  );
};

export default MapSubject;
