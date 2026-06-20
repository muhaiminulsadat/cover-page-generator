import {Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {IndexPageRenderContext} from "@/components/pdf/core/types";

export function renderClassicV1IndexPage(ctx: IndexPageRenderContext) {
  const {template, user} = ctx;
  const studentId = user.studentId?.trim() || "-";
  const section = user.section?.trim() || "-";

  const experimentNames = template.experimentNames || [];
  const totalRows = Math.max(12, experimentNames.length);
  const rows = Array.from({length: totalRows}, (_, index) => ({
    no: index + 1,
    name: experimentNames[index] || " ",
  }));

  // Scale variables between totalRows = 12 and totalRows = 20
  const scaleFactor = Math.max(0, Math.min(1, (totalRows - 12) / 8));

  // Dynamic bottom padding to reduce blank space at page bottom as row count increases (goes down to 18pt)
  const paddingBottom = 48 - (48 - 18) * scaleFactor;

  // Dynamic table row space to fill more vertical space (goes up to 632pt)
  const totalRowSpace = 576 + (632 - 576) * scaleFactor;
  const rowHeight = totalRowSpace / totalRows;

  // Scale cell font size from 11.5pt (for 12 rows) down to 9.0pt (for 20 rows)
  const fontSize = 11.5 - (11.5 - 9.0) * scaleFactor;

  // Unified stylesheet created dynamically so properties evaluate cleanly
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      paddingTop: 48,
      paddingBottom: paddingBottom,
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
      minHeight: 48,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomStyle: "solid",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      minHeight: rowHeight,
      alignItems: "stretch",
    },
    lastTableRow: {
      flexDirection: "row",
      borderBottomWidth: 0,
      minHeight: rowHeight,
      alignItems: "stretch",
    },
    expNoCol: {
      width: "8%",
      borderRightStyle: "solid",
      borderRightWidth: 1,
      borderRightColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 4,
      paddingRight: 4,
    },
    experimentCol: {
      width: "45%",
      borderRightStyle: "solid",
      borderRightWidth: 1,
      borderRightColor: "#000",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 7,
      paddingRight: 7,
    },
    dateCol: {
      width: "17%",
      borderRightStyle: "solid",
      borderRightWidth: 1,
      borderRightColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    remarksCol: {
      width: "16%",
      borderRightStyle: "solid",
      borderRightWidth: 1,
      borderRightColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    facultyCol: {
      width: "16%",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 5,
      paddingRight: 5,
    },
    cellText: {
      fontSize: fontSize,
      textAlign: "center",
    },
    headerText: {
      fontSize: 13,
      fontFamily: "Times-Bold",
      textAlign: "center",
      lineHeight: 1.15,
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerWrap}>
        <Text style={styles.courseNumber}>{template.courseNumber}</Text>
        <Text style={styles.courseTitle}>{template.courseTitle}</Text>
        {template.dividedIntoGroups ? (
          <>
            <Text style={styles.studentId}>Student ID: {studentId}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Section: {section.toUpperCase()}</Text>
              <Text style={styles.infoText}>Group: </Text>
            </View>
          </>
        ) : (
          <Text style={styles.studentId}>
            Student ID: {studentId}    |    Section: {section.toUpperCase()}
          </Text>
        )}
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

        {rows.map((row, index) => (
          <View
            key={row.no}
            style={index === rows.length - 1 ? styles.lastTableRow : styles.tableRow}
          >
            <View style={styles.expNoCol}>
              <Text style={styles.cellText}>{row.no}</Text>
            </View>
            <View style={styles.experimentCol}>
              <Text style={styles.cellText}>{row.name}</Text>
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
