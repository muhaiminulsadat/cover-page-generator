import {Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {IndexPageRenderContext} from "@/components/pdf/core/types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: "Times-Roman",
  },
  headerWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  courseNumber: {
    fontSize: 17,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textAlign: "center",
  },
  courseTitle: {
    fontSize: 19,
    fontFamily: "Times-Bold",
    marginBottom: 8,
    textAlign: "center",
    textDecoration: "underline",
  },
  studentId: {
    fontSize: 15,
    marginBottom: 6,
    textAlign: "center",
  },
  infoRow: {
    width: "72%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 15,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#000",
    minHeight: 46,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 38,
    alignItems: "stretch",
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  expNoCol: {
    width: "8.5%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 4,
  },
  experimentCol: {
    width: "41.5%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 7,
    paddingRight: 7,
  },
  dateCol: {
    width: "17.5%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  remarksCol: {
    width: "14.5%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  facultyCol: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  cellText: {
    fontSize: 11.5,
    textAlign: "center",
  },
  headerText: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.15,
  },
});

export function renderClassicV1IndexPage(ctx: IndexPageRenderContext) {
  const {template, user} = ctx;
  const studentId = user.studentId?.trim() || "-";
  const section = user.section?.trim() || "-";
  const groupNo = user.groupNo?.trim() || "-";
  const rows = Array.from({length: 10}, (_, index) => index + 1);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerWrap}>
        <Text style={styles.courseNumber}>{template.courseNumber}</Text>
        <Text style={styles.courseTitle}>{template.courseTitle}</Text>
        <Text style={styles.studentId}>Student ID: {studentId}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Section: {section.toUpperCase()}</Text>
          <Text style={styles.infoText}>Group: {groupNo}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={styles.expNoCol}>
            <Text style={styles.headerText}>{"Exp.\nNo"}</Text>
          </View>
          <View style={styles.experimentCol}>
            <Text style={styles.headerText}>Name of the Experiment</Text>
          </View>
          <View style={styles.dateCol}>
            <Text style={styles.headerText}>{"Date of\nSubmission"}</Text>
          </View>
          <View style={styles.remarksCol}>
            <Text style={styles.headerText}>Remarks</Text>
          </View>
          <View style={styles.facultyCol}>
            <Text style={styles.headerText}>{"Initial of\nthe Faculty"}</Text>
          </View>
        </View>

        {rows.map((rowNo, index) => (
          <View
            key={rowNo}
            style={
              index === rows.length - 1
                ? [styles.tableRow, styles.lastTableRow]
                : styles.tableRow
            }
          >
            <View style={styles.expNoCol}>
              <Text style={styles.cellText}>{rowNo}</Text>
            </View>
            <View style={styles.experimentCol}>
              <Text style={styles.cellText}> </Text>
            </View>
            <View style={styles.dateCol}>
              <Text style={styles.cellText}> </Text>
            </View>
            <View style={styles.remarksCol}>
              <Text style={styles.cellText}> </Text>
            </View>
            <View style={styles.facultyCol}>
              <Text style={styles.cellText}> </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  );
}
