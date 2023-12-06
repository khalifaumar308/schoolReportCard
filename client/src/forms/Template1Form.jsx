import { useState, useRef } from "react"
import { useSaveStudentMutation } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import SignatureCanvas from "react-signature-canvas";


const Template1Form = () => {
  const savedTopic = sessionStorage.getItem('topic')
  const savedSubTopic = sessionStorage.getItem("subtopic");
  const subTopicss = JSON.parse(sessionStorage.getItem('subtopics'))
  const topics = JSON.parse(sessionStorage.getItem("topics"));
  const [view, setView] = useState(false)
  const [detail, setDetail] = useState({ name: '', class: '', teacher: '', email:'' })
  const [topic, setTopic] = useState(savedTopic?savedTopic:'')
  const [subTopic, setSubTopic] = useState(savedSubTopic ? savedSubTopic : "");
  const [questions, setQuestions] = useState([])
  const [subTopics, setSubTopics] = useState(subTopicss?subTopicss: [])
  const [Topics, setTopics] = useState(topics ? topics : []);
  const [assesment, setAssessment] = useState([])

  const [saveStudentMutation, { isLoading }] = useSaveStudentMutation();
  const dispatch = useDispatch();
  const [openModel, setOpenModal] = useState(false);
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    setOpenModal(false);
  };

  const saveDetail = (e) => {
    e.preventDefault()
    const dt = {
      name: e.target.name.value,
      class: e.target.class.value,
      teacher: e.target.teacher.value,
      email: e.target.email.value,
      absent: e.target.absent.value,
    };
    setDetail(dt);

    sessionStorage.setItem('details', JSON.stringify(dt))
    console.log(detail)
    setView(!view)
  }

  const saveQuestion = (e) => {
    e.preventDefault()
    const quest = {
      question: e.target.question.value,
      status: e.target.status.value,
      note: e.target.note.value
    }
    setQuestions([...questions, quest])
    e.target.question.value = '';
    e.target.status.value = '';
    e.target.note.value = '';
  }

  const saveSubTopic = () => {
    const savedSTopics = JSON.parse(sessionStorage.getItem("subtopics"));
    const toUse = savedSTopics? savedSTopics: []
    // console.log(savedSTopic)
    const subtopics = [...toUse, { [subTopic]: questions }];
    sessionStorage.setItem('subtopics',JSON.stringify(subtopics));
    setSubTopics(subTopics)
    sessionStorage.removeItem('subtopic')
    setSubTopic('')
  };

  const saveTopic = () => {
    const savedTopic = JSON.parse(sessionStorage.getItem("topics"));
    const toUse = savedTopic ? savedTopic : []
    const topics = [
      ...toUse,
      { [topic]: JSON.parse(sessionStorage.getItem("subtopics")) },
    ];
    sessionStorage.setItem('topics', JSON.stringify(topics));
    setTopics(topics)
    sessionStorage.removeItem('topic')
    sessionStorage.removeItem("subtopic");
    setTopic('')
  };

  const saveAssesment = (e) => {
    e.preventDefault()
    const ass = {
      assesment: e.target.assesment.value,
      rating: e.target.rating.value
    }
    setAssessment([...assesment, ass])
    e.target.assesment.value = "";
    e.target.rating.value = "";
  }

  const saveStudent = async () => {
    const topics = JSON.parse(sessionStorage.getItem('subjects'))
    let stds = JSON.parse(sessionStorage.getItem('students'))
    stds = stds ? stds : []
    const student = {
      details: JSON.parse(sessionStorage.getItem("details")),
      topics: JSON.parse(sessionStorage.getItem("topics")),
      assesment:assesment,
    };
    try {
      await saveStudentMutation(student)
      const stdss = [...stds, student]
      sessionStorage.setItem('students', JSON.stringify(stdss))
      sessionStorage.removeItem("topic");
      sessionStorage.removeItem("topics");
      sessionStorage.removeItem("subtopic");
      sessionStorage.removeItem("subtopics");
    } catch (error) {
      console.log(error)
    }
  }

  const content = isLoading ? (
    <h1>Saving Student...</h1>
  ) : (
    <div className="p-6 flex flex-col">
      <h1>NORTHFIELD MONTESSORI RESULT PORTAL</h1>
      <div className=" border shadow-sm items-center flex flex-col">
        <form
          onSubmit={saveDetail}
          // style={{ display: view ? "none" : "flex" }}
          className="flex-col align-middle items-center p-4 flex"
        >
          <h2 className="text-2xl mb-2 text-orange-500">
            Teacher/Student Details
          </h2>
          <label htmlFor="teacher">Teacher Name</label>
          <input
            id="teacher"
            name="teacher"
            placeholder="Teacher name"
            className="bg-slate-400 text-orange-500 p-2 mb-2"
          />
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            name="name"
            placeholder="student name"
            className="bg-slate-400 text-orange-500 p-2 mb-2"
          />
          <label htmlFor="class">Class</label>
          <input
            id="class"
            name="class"
            placeholder="student class"
            className="bg-slate-400 text-orange-500 p-2 mb-2"
          />
          <label htmlFor="absent">Days Absent</label>
          <input
            id="absent"
            name="absent"
            placeholder="Days Absent"
            type="number"
            className="bg-slate-400 text-orange-500 p-2 mb-2"
          />
          <label htmlFor="email">Parent Email</label>
          <input
            id="email"
            name="email"
            placeholder="Parent email"
            type="email"
            className="bg-slate-400 text-orange-500 p-2 mb-2"
          />
          <button className="bg-orange-500 w-24 rounded-xl hover:bg-orange-300">
            save
          </button>
        </form>
      </div>
      <div>
        <div className=" flex border-2 mt-4">
          <SignatureCanvas
            penColor="blue"
            canvasProps={{ minHeight: 200, maxWidth:500, }}
            ref={sigCanvas}
          />
        </div>
        <button onClick={() => sigCanvas.current.clear()}>Clear</button>
        <button className="create" onClick={create}>
          Save
        </button>

        {/* <SignatureCanvas
          penColor="blue"
          canvasProps={{ width: 500, height: 200 }}
        /> */}
      </div>
      <div className="mt-6 border-2 p-3">
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-2 text-orange-500">Topic Details</h1>
            <div className="flex-col align-middle items-center p-4 flex">
              <label>Topic Name</label>
              <input
                placeholder="Topic Name"
                value={topic}
                onChange={(e) => {
                  const ctopic = e.target.value;
                  sessionStorage.setItem("topic", ctopic);
                  setTopic(ctopic);
                }}
                className="bg-slate-400 text-orange-500 p-2 mb-2"
              />
              <label>Sub-topic Name</label>
              <input
                placeholder="sub topic"
                value={subTopic}
                onChange={(e) => {
                  const cSubTopic = e.target.value;
                  sessionStorage.setItem("subtopic", cSubTopic);
                  setSubTopic(cSubTopic);
                }}
                className="bg-slate-400 text-orange-500 p-2 mb-2"
              />
              <form onSubmit={saveQuestion} className="flex flex-col">
                <label>Question</label>
                <input
                  name="question"
                  placeholder="question"
                  className="bg-slate-400 p-1"
                />
                <label>status</label>
                <input
                  name="status"
                  placeholder="status"
                  className="bg-slate-400 p-1"
                />
                <label>Note</label>
                <input
                  name="note"
                  placeholder="Note"
                  className="bg-slate-400 p-1 w-56"
                />
                <button className="bg-orange-500 mt-2 rounded-xl hover:bg-orange-300 w-[100%]">
                  Save Question
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center align-middle ">
            <button
              className="mr-6 bg-orange-500 rounded-xl p-2"
              onClick={saveSubTopic}
            >
              Save Sub-topic
            </button>
            <button
              className="mr-6 bg-orange-500 rounded-xl p-2 w-28"
              onClick={saveTopic}
            >
              Save topic
            </button>
          </div>
          {/* <label>Topic:</label>
          <input placeholder="topic"  /> */}
        </div>
      </div>
      <div className="border-2 mt-4 p-2 flex flex-col align-middle items-center">
        <h2 className="text-2xl mb-2 text-orange-500">Effective Assessment</h2>
        <form onSubmit={saveAssesment} className="flex flex-col">
          <label htmlFor="assesment">
            Assessment
            <input
              placeholder="Assesment"
              name="assesment"
              id="assesment"
              className="bg-slate-400 p-1 w-56 ml-4"
            />
          </label>
          <label htmlFor="rating" className="mt-2">
            Rating
            <input
              className="bg-slate-400 p-1 w-56 ml-4"
              placeholder="rating"
              name="rating"
              id="rating"
            />
          </label>
          <button className=" bg-orange-500 rounded-xl p-2 mt-3">
            Save Assesment
          </button>
        </form>
      </div>
      <button
        className="bg-green-500 rounded-xl p-2 mt-6"
        onClick={saveStudent}
      >
        Save Student
      </button>
    </div>
  );

  return content
    
}

export default Template1Form