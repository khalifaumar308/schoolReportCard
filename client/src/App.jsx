import MyDocument from "./MyDocument";
import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DocumentData from "./DocumentData";
import Template2 from "./Template2";



function App() {
  return (
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
      <Route path="/t2" element={
        <PDFViewer>
          <Template2 />
        </PDFViewer>
      } />
      </Routes>
  );
}

export default App;
