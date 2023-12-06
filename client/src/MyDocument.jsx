import { PDFViewer, renderToFile } from "@react-pdf/renderer";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";
import { datas, tData } from "./data";
import logo from "./assets/logo.jpg";

const morfData = (data) => {
  const cp = data.map(dt => {
    const topic = Object.keys(dt)[0]
    const subtopics = dt[topic].map(stp => {
      const stpc = Object.keys(stp)[0]
      let [ques, statuss, notes] = [[], [], []]
      stp[stpc].map(({ question, status, note }) => {
        ques.push(question)
        statuss.push(status)
        notes.push(note);
      })
      return {name:stpc, questions:ques, status:statuss, notes:notes}
    })
    return {topic, subtopics}
  })
  return cp
}

// Create Document Component
const MyDocument = () => {
  // Create styles
  const styles = StyleSheet.create({
    page: { padding: 10, fontFamily: "Courier", fontStyle: "none" },
    section: { textAlign: "center", margin: 30 },
  });

  const data = morfData(tData.topics);
  const assessment = tData.assesment;
  const details = tData.details
  
  const content = data.map((dt, id) => {
    const { topic, subtopics } = dt;
    const sbtopics = subtopics.map(({ name, questions, status, notes }, id) => {
      const qts = questions.map((qt, id) => {
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              fontSize: "7px",
              paddingBottom: "2px",
              textAlign: "justify",
              padding: "2px",
            }}
          >
            <View
              style={{
                width: "286px",
                lineHeight: "1.2px",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                marginLeft: "-2px",
                padding: "4px",
                marginTop: "-4px",
                paddingRight: "2px",
                marginRight: "2px",
  
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Text>{qt}</Text>
            </View>
            <Text
              style={{
                width: "25px",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                marginLeft: "-3px",
                padding: "2px",
                marginTop: "-4px",
                textAlign: "center",
                paddingTop: "4px",
              }}
            >
              {status[id]}
            </Text>
            <Text
              style={{
                padding: "2px",
                borderBottom: "1px solid black",
                width: "200px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {notes[id]}
            </Text>
          </View>
        );
      });
      return (
        <View
          key={id}
          style={{
            flexDirection: "row",
            border: "1px solid black",
          }}
        >
          <View
            style={{
              fontSize: "9px",
              width: "100px",
              padding: "4px",
              borderRight: "1px solid black",
              fontFamily: "Times-Bold",
            }}
          >
            <Text>{name}</Text>
          </View>
          <View>{qts}</View>
        </View>
      );
    });
    return (
      <View key={id}>
        <View style={{ backgroundColor: "#adb9ca", fontSize: "11px" }}>
          <Text>{topic}</Text>
        </View>
        {id === 0 ? (
          <View style={{ flexDirection: "row", padding: "3px" }}>
            <View style={{ width: "100px" }}></View>
            <View style={{ width: "270px" }}></View>
            <Text style={{ fontSize: "9px",marginLeft:'-12px' }}>
              Status
            </Text>
            <Text style={{fontSize:'10px', marginLeft:'30px'}}>Notes</Text>
          </View>
        ) : (
          <></>
        )}
        <View>{sbtopics}</View>
      </View>
    );
  });
  
  const ass = assessment.map(({ assesment, rating }, id) => {
    return (<h1 key={id}>{ assesment}</h1>
      // <View
      //   key={assesment}
      //   style={{ flexDirection: "row", width: "300px", height: "20px" }}
      // >
      //   <Text>Musaaa</Text>
      //   {/* <Text
      //     style={{
      //       borderBottom: "2px solid black",
      //       padding: "4px",
      //       marginTop: "-1px",
      //       width: "305px",
      //       fontSize: "10px",
      //       borderLeft: "2px solid black",
      //       borderRight: "2px solid black",
      //     }}
      //   >
      //     {assesment}
      //   </Text> */}
      //   <Text
      //     // style={{
      //     //   borderBottom: "2px solid black",
      //     //   width: "100px",
      //     //   padding: "6px",
      //     //   fontSize: "10px",
      //     //   borderRight: "2px solid black",
      //     //   marginLeft: "-4px",
      //     // }}
      //   >
      //     ererfdjkmrejif
      //     {rating}
      //   </Text>
      // </View>
    );
  });
  return (
    <Document title="Motfield Montessoei">
      <Page size="A4" style={styles.page}>
        <View style={{ position: "relative" }}>
          <Image
            src={logo}
            style={{
              position: "absolute",
              width: "70px",
              left: "12px",
              top: "8px",
            }}
          ></Image>
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
            <Text>End of the year Assessment: {details.class} Class</Text>
          </View>
          <View
            style={{
              width: "100%",
              borderBottom: "1px solid black",
              marginTop: "4px",
              flexDirection: "row",
              fontSize: "10px",
              marginBottom: "3px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "2px",
            }}
          >
            <Text>
              <Text style={{ fontWeight: "black" }}>Name:</Text>
              {details.name}
            </Text>
            <Text>
              Teacher: <Text>{details.teacher}</Text>
            </Text>
            <Text>Date: 29/07/20</Text>
            <Text>Attendance: 12</Text>
            <Text>(Absent: {details.absent})</Text>
          </View>
        </View>
        <View style={{ borderBottom: "2px solid red" }}>{content}</View>
        <View style={{ marginTop: "15px" }}>
          <View
            style={{
              flexDirection: "row",
              border: "2px solid black",
              paddingLeft: "3px",
              fontSize: "12px",
              width: "300px",
            }}
          >
            <Text style={{ width: "200px", borderRight: "2px solid black" }}>
              EFFECTIVE ASSESMENT
            </Text>
            <Text style={{ paddingLeft: "2px" }}>RATING</Text>
          </View>
        </View>
        <View>

          {
            assessment.map(({ ass, rating }) => {
              console.log(typeof(rating))
              return(
                <View key={ass} style={{display:'grid', gridTemplateColumns:'2fr 1fr'}}>
                  <View>
                    <Text>{ ass }</Text>
                    <Text>{ass}{ass}</Text>
                  </View>
              </View>
            )})
            }
        </View>
      </Page>
    </Document>
  );
} 

export default MyDocument