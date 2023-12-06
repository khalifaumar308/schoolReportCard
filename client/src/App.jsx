import { PDFViewer, renderToFile, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Template1Form } from "./forms";
import { Template1, Template2 } from "./formTemplates";



function App() {
  return (
      <Routes>
        <Route
          path="/download"
          element={
            <PDFDownloadLink document={<Template1 />} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          }
        />
        <Route path='/view' element={
          <PDFViewer>
            <Template1 />
          </PDFViewer>
        } />
      <Route path='/' index element={<Template1Form />} />
      <Route path="/t2" element={
        <PDFViewer>
          <Template2 />
        </PDFViewer>
      } />
      </Routes>
  );
}

export default App;
