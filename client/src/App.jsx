import MyDocument from "./MyDocument";
import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DocumentData from "./DocumentData";



function App() {
  return (
    // <div>

    // </div>
    <Router>
      <Routes>
        <Route
          path="/download"
          element={
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          }
        />
        <Route path='/view' element={
          <PDFViewer>
            <MyDocument />
          </PDFViewer>
        } />
        <Route path='/' index element={<DocumentData />} />
      </Routes>
    </Router>
  );
}

export default App;
