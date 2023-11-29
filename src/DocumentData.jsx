import { useState } from "react"

const DocumentData = () => {
  const stdData = JSON.parse(sessionStorage.getItem('stdData'))
  const stds = JSON.parse(sessionStorage.getItem('students'))
  const tpcs = JSON.parse(sessionStorage.getItem('topics'))
  const taech = sessionStorage.getItem('teacher')
  const studentData = stdData ? stdData : {0:{ name: '', class: '', topics: [] }}
  const students = stds ? stds : { 0: { name: '', class: '' } }
  const topics = tpcs ? tpcs : []
  const subT = JSON.parse(sessionStorage.getItem('subtopics'))
  const subtpcs = subT ? subT : {}
  const tch = taech? taech: ''
  
  
  // const [reports, setReports] = useState([])
  const [data, setData] = useState(studentData)
  const [student, setStudent] = useState(students)
  const [teacher, setTeacher] = useState(tch)
  const [stTopics, setStTopics] = useState(topics)
  const [subTopics, setSubTopics] = useState(subtpcs)
  const [ques, setQues] = useState([])

  const [qsc, setQsc] = useState([])


  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState("");
  const [detail, setDetail] = useState("");
  const [view, setView] = useState(false)
  const [tpc, setTpc] = useState('')
  const [subTpc, setSubTpc] = useState('')


  const saveDetails = () => {
    sessionStorage.setItem('stdData', JSON.stringify(data))
    sessionStorage.setItem('teacher', teacher)
    sessionStorage.setItem('topics', JSON.stringify(stTopics))
    sessionStorage.setItem('subtopics', JSON.stringify(subTopics))
  }

  const saveTeacher = (name) => {
    saveDetails()
    setTeacher(name)
  }
  const saveStudent = (name, classs) => {
    saveDetails()
    name ? setStudentName(name) : setStudentClass(classs)
  }
  const saveDetail = (e) => {
    e.preventDefault()
    saveDetails()
    const detail = {
      name: e.target.name.value,
      teacher: e.target.teacher.value,
      class:e.target.class.value
    }
    setDetail(detail)
    sessionStorage.setItem('detail', JSON.stringify(detail))
    setView(!view)
  }
  const saveQuestion = (e) => {
    e.preventDefault()
    saveDetails()

    setQues([
      ...ques,
      {
        question: e.target.question.value,
        status: e.target.status.value,
        note: e.target.note.value,
      },
    ]);

  }

  const saveSubTopic = () => {
    const stopic = sessionStorage.getItem('csubtpc');
    subtpcs;
    const sbt = { ...subtpcs, [stopic]: ques };
    sessionStorage.setItem('subtopics', JSON.stringify(sbt))
    // saveDetails()
  }

  const saveTopic = () => {
    const cstopic = sessionStorage.getItem("csubtpc");
    setStTopics([...stTopics, { [cstopic]: subTopics }])
    saveDetails()
  }
  return (
    <div>
      <div className="text-sm w-44">
        <form
          onSubmit={saveDetail}
          style={{ display: view ? "none" : "flex" }}
          className="flex-col bg-slate-600"
        >
          <h2 className="text-sm">Teacher/Student Details</h2>
          <label>Teacher Name</label>
          <input
            name="teacher"
            value={detail.teacher}
            placeholder="Teacher name"
          />
          <label>Student Name</label>
          <input name="name" value={detail.name} placeholder="student name" />
          <label>Class</label>
          <input
            name="class"
            value={detail.class}
            placeholder="student class"
          />
          <button>save</button>
        </form>
      </div>
      <div style={{ display: view ? "flex" : "none" }}>
        <div>
          <div>
            <div className="flex flex-col">
              <input
                placeholder="Topic Name"
                value={tpc}
                onChange={(e) => {
                  saveDetails();
                  setTpc(e.target.value);
                  sessionStorage.setItem("ctopic", tpc);
                }}
              />
              <input
                placeholder="sub topic"
                value={subTpc}
                onChange={(e) => {
                  saveDetails();
                  setSubTpc(e.target.value);
                  sessionStorage.setItem("csubtpc", subTpc);
                }}
              />
              <form onSubmit={saveQuestion}>
                <label>Question</label>
                <input name="question" placeholder="question" />
                <label>status</label>
                <input name="status" placeholder="status" />
                <label>Note</label>
                <input name="note" placeholder="Note" />
                <button>Save</button>
              </form>
            </div>
          </div>
          <div>
            <button onClick={saveSubTopic}>Add Sub-topic</button>
            <button onClick={saveTopic}>Add topic</button>
          </div>
          {/* <label>Topic:</label>
          <input placeholder="topic"  /> */}
        </div>
      </div>
    </div>
  );
}

export default DocumentData