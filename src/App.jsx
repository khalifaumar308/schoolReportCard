import "./App.css";

import { PDFViewer, renderToFile } from "@react-pdf/renderer";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { data } from "./data";

// Create styles
const styles = StyleSheet.create({
  page: { padding:'4px' },
  section: { textAlign: "center", margin: 30 },
});

const content = data.map((dt, id) => {
  const { topic, subtopics } = dt
  const sbtopics = subtopics.map(({name, questions, status, notes }, id) => {
    return (
      <View key={id} style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "75px",
            fontSize: "7pt",
            border: "2px solid black",
            borderTop: "none",
            textAlign: 'center',
          }}
        >
          <Text>{name}</Text>
        </View>
        <View style={{ fontSize: "9px" }}>
          {questions.map((qt, id) => (
            <Text
              style={{
                borderBottom: "2px solid black",
                textAlign: "center",
                padding: "2px",
                height: "20px",
              }}
              key={id}
            >
              {qt}
            </Text>
          ))}
        </View>
        <View style={{ fontSize: "10px" }}>
          {status.map((qt, id) => (
            <Text
              style={{
                border: "2px",
                textAlign: "center",
                padding: "2px",
                borderTop: 'none',
                borderRight:'none',
                height: "20px",
              }}
              key={id}
            >
              {qt}
            </Text>
          ))}
        </View>
        <View style={{ fontSize: "9px" }}>
          {notes.map((qt, id) => (
            <Text
              key={id}
              style={{
                border: "2px",
                height: "20px",
                borderTop: "none",
                padding: "2px",
                textAlign: "center",
                width:'196px'
              }}
            >
              {qt}
            </Text>
          ))}
        </View>
      </View>
    );
  })
  return (
    <View key={id}>
      <View
        style={{
          fontSize: "12.5px",
          marginTop: "2px",
          border: "2px",
        }}
      >
        <Text>{topic}</Text>
      </View>
      <View>{sbtopics}</View>
    </View>
  );
})

// Create Document Component
const MyDocument = () => (
  <Document title="Motfield Montessoei">
    <Page size="A4" style={styles.page}>
      <View>
        <View
          style={{
            alignSelf: "center",
            border: "1px",
            marginTop: "16px",
            padding: "4px",
            width: "60%",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Text>
            <Text style={{ color: "#800434" }}>Northfield</Text> Montessori
            Academy
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            marginTop: "8px",
            textAlign: "center",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          <Text>End of the tear Assessment: Montessori III Class</Text>
        </View>
        <View
          style={{
            width: "100%",
            borderBottom: "2px solid black",
            marginTop: "4px",
          }}
        ></View>
      </View>
      {content}
    </Page>
  </Document>
);
const handleDownload = async () => {
  return await renderToFile(<MyDocument />, `my-doc.pdf`);
};

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
