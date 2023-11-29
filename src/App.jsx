import "./App.css";
import MyDocument from "./MyDocument";
import { PDFViewer, renderToFile } from "@react-pdf/renderer";




function App() {
  return (
    // <div>
    //   <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
    //     {({ blob, url, loading, error }) =>
    //       loading ? "Loading document..." : "Download now!"
    //     }
    //   </PDFDownloadLink>
    // </div>
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );
}

export default App;
