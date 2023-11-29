import MyDocument from "./MyDocument";
import { PDFViewer, renderToFile } from "@react-pdf/renderer";
import DocumentData from "./DocumentData";



function App() {
  return (
    // <div>
    //   <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
    //     {({ blob, url, loading, error }) =>
    //       loading ? "Loading document..." : "Download now!"
    //     }
    //   </PDFDownloadLink>
    // </div>
    <div>
      <DocumentData />
    </div>
    // <PDFViewer>
    //   <MyDocument />
    // </PDFViewer>
  );
}

export default App;
