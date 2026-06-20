import {
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import {CoverPageRenderContext} from "@/components/pdf/core/types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 65,
    paddingBottom: 65,
    paddingLeft: 55,
    paddingRight: 55,
    fontFamily: "Times-Roman",
  },
  topContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 22,
  },
  universityName: {
    fontSize: 21,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.2,
  },
  departmentName: {
    fontSize: 15,
    fontFamily: "Times-Roman",
    textAlign: "center",
    lineHeight: 1.2,
    marginTop: 6,
  },
  courseContainer: {
    alignItems: "center",
    width: "100%",
  },
  courseCode: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.3,
  },
  middleContainer: {
    width: "100%",
    gap: 22,
  },
  assignmentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
  },
  assignmentLabel: {
    fontSize: 15.5,
    fontFamily: "Times-Bold",
  },
  assignmentLine: {
    flex: 1,
    borderBottomWidth: 0.75,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    marginLeft: 8,
    height: 16,
  },
  tableBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    width: "100%",
    height: 185,
  },
  leftColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000000",
    borderRightStyle: "solid",
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: "space-between",
  },
  rightColumn: {
    flex: 1,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dateBlock: {
    flexDirection: "column",
    width: "100%",
  },
  tableText: {
    fontSize: 14.5,
    fontFamily: "Times-Bold",
  },
  dateLine: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    width: "100%",
    height: 20,
    marginTop: 6,
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentLabel: {
    fontSize: 14.5,
    fontFamily: "Times-Bold",
  },
  studentValue: {
    fontSize: 14.5,
    fontFamily: "Times-Roman",
    marginLeft: 6,
  },
  inlineLine: {
    flex: 1,
    borderBottomWidth: 0.75,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    marginLeft: 6,
    height: 14,
  },
  spacerTop: {
    flex: 1.2,
  },
  spacerMiddle: {
    flex: 1,
  },
  spacerBottom: {
    flex: 1.5,
  },
});

export function renderCoverBanasree(ctx: CoverPageRenderContext) {
  const {template, user, universityLabel} = ctx;

  const levelText = user.level ? `Level-${user.level}` : "Level-      ";
  const termText = user.term ? `Term-${user.term}` : "Term-      ";
  const levelTermText = `${levelText} ${termText}`;

  const deptText = user.department
    ? (() => {
        let clean = user.department.trim();
        if (clean.toUpperCase().startsWith("DEPARTMENT OF ")) {
          clean = clean.slice(14).trim();
        }

        const upper = clean.toUpperCase();
        const DEPT_MAP: Record<string, string> = {
          CE: "Civil Engineering",
          CSE: "Computer Science and Engineering",
          EEE: "Electrical and Electronic Engineering",
          ME: "Mechanical Engineering",
          IPE: "Industrial and Production Engineering",
          BME: "Biomedical Engineering",
          CHE: "Chemical Engineering",
          WRE: "Water Resources Engineering",
          URP: "Urban and Regional Planning",
          ARCH: "Architecture",
        };

        const baseDept =
          DEPT_MAP[upper] ||
          clean
            .split(" ")
            .map((word) => {
              const wUpper = word.toUpperCase();
              if (
                DEPT_MAP[wUpper] ||
                [
                  "CE",
                  "CSE",
                  "EEE",
                  "ME",
                  "IPE",
                  "BME",
                  "CHE",
                  "WRE",
                  "URP",
                  "ARCH",
                ].includes(wUpper)
              ) {
                return wUpper;
              }
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");

        return `Department of ${baseDept}`;
      })()
    : null;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topContainer}>
        <PDFImage src="/buet-logo.jpg" style={styles.logo} />
        <Text style={styles.universityName}>{universityLabel}</Text>
        {deptText && <Text style={styles.departmentName}>{deptText}</Text>}
      </View>

      <View style={styles.spacerTop} />

      <View style={styles.courseContainer}>
        <Text style={styles.courseCode}>{template.courseNumber}</Text>
        <Text style={styles.courseTitle}>{template.courseTitle}</Text>
      </View>

      <View style={styles.spacerMiddle} />

      <View style={styles.middleContainer}>
        <View style={styles.assignmentRow}>
          <Text style={styles.assignmentLabel}>Assignment No:</Text>
          <View style={styles.assignmentLine} />
        </View>
        <View style={styles.assignmentRow}>
          <Text style={styles.assignmentLabel}>Name of the Assignment:</Text>
          <View style={styles.assignmentLine} />
        </View>
      </View>

      <View style={styles.spacerBottom} />

      <View style={styles.tableBox}>
        <View style={styles.leftColumn}>
          <View style={styles.dateBlock}>
            <Text style={styles.tableText}>Date of Performance:</Text>
            <View style={styles.dateLine} />
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.tableText}>Date of Submission:</Text>
            <View style={styles.dateLine} />
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Name:</Text>
            <Text style={styles.studentValue}>{user.name}</Text>
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Student No.:</Text>
            {user.studentId ? (
              <Text style={styles.studentValue}>{user.studentId}</Text>
            ) : (
              <View style={styles.inlineLine} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Level / Term:</Text>
            {user.level || user.term ? (
              <Text style={styles.studentValue}>{levelTermText}</Text>
            ) : (
              <View style={styles.inlineLine} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Section:</Text>
            {user.section ? (
              <Text style={styles.studentValue}>
                {user.section.toUpperCase()}
              </Text>
            ) : (
              <View style={styles.inlineLine} />
            )}
          </View>
        </View>
      </View>
    </Page>
  );
}
