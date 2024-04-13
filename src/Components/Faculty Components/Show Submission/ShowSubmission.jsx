import { get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import "./ShowSubmission.css";

const ShowSubmission = (props) => {
  const [submissions, setSubmissions] = useState("");
  const [evaluation, setEvaluation] = useState({
    marks: 0,
    remark: "",
  });
  const [studentRollNo, setStudentRollNo] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const database = getDatabase(app);

  const fetchData = async () => {
    const submissionRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions`
    );

    const snapshot = await get(submissionRef);
    const result = snapshot.val();

    if (Object.keys(result).length > 1) {
      setSubmissions(result);
    } else {
      setSubmissions(result[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.submissionInfo.assignmentId, props.submissionInfo.status]);

  const handleClickEvaluate = async (rollNo) => {
    setStudentRollNo(rollNo);
    setShowEvaluation(true);
  };

  const submitEvaluation = async (e) => {
    e.preventDefault();
    const submissionRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions/${studentRollNo}`
    );

    const updateData = { marks: evaluation.marks, remarks: evaluation.remark };
    update(submissionRef, updateData);
    setShowEvaluation(false);
    handleClickEvaluate();
  };

  return (
    <div className="show-submission">
      <p className="show-submission-assignment-id">
        {props.submissionInfo.assignmentId}
      </p>
      <p className="show-submission-status">
        {props.submissionInfo.status.toUpperCase()}
      </p>
      {submissions === "No Submission Yet" ? (
        <p className="no-submissions">No Submissions Yet</p>
      ) : (
        <>
          <div className="show-submission-table-container">
            {submissions &&
              Object.values(submissions).map((key, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <div key={index} className="show-submission-card">
                    <h4>Name: </h4>
                    <p className="Name">{key?.name}</p>
                    <h4>Roll No: </h4>
                    <p className="Roll No">{key?.rollNo}</p>
                    <h4>Date: </h4>
                    <p className="Submission Date">
                      {key?.dateTime?.date} {key?.dateTime?.time}
                    </p>
                    <h4>Note: </h4>
                    <p className="note">{key?.assignmentNote}</p>
                    <h4>Description: </h4>
                    <textarea cols={"30"} rows={"10"} value={key?.assignmentDescription} className="description">
                      {key?.assignmentDescription}
                    </textarea>
                    <h4>Remark: </h4>
                    <p className="Remarks">{key?.remarks}</p>
                    <h4>Mark: </h4>
                    <p className="Marks">{key?.marks}</p>
                    {props.submissionInfo.status === "inactive" ? (
                      <button disabled>Evaluate</button>
                    ) : (
                      <button
                        onClick={() => {
                          handleClickEvaluate(key?.rollNo);
                        }}
                        className="show-submission-evaluate-btn"
                      >
                        Evaluate
                      </button>
                    )}
                    {showEvaluation && (
                      <div className="show-submission-evaluation-container">
                        <form
                          action=""
                          className="show-submission-evaluation-form"
                        >
                          <label htmlFor="evaluation-form-marks">Marks</label>
                          <input
                            type={"number"}
                            id="evaluation-form-marks"
                            value={evaluation.marks}
                            onChange={(e) =>
                              setEvaluation({
                                ...evaluation,
                                marks: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="evaluation-form-remarks">
                            Remarks
                          </label>
                          <input
                            type={"text"}
                            id="evaluation-form-remarks"
                            value={evaluation.remark}
                            onChange={(e) =>
                              setEvaluation({
                                ...evaluation,
                                remark: e.target.value,
                              })
                            }
                          />
                          <div className="show-submission-evaluation-buttons">
                            <button
                              onClick={submitEvaluation}
                              className="show-submission-submit"
                            >
                              Submit
                            </button>
                            <button
                              onClick={() => setShowEvaluation(false)}
                              className="show-submission-cancel"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowSubmission;
