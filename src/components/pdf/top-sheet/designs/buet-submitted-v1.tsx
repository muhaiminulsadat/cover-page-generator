import {
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import {TopSheetRenderContext} from "@/components/pdf/core/types";
import {getDepartmentLabel} from "@/lib/constants/departments";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 44,
    paddingBottom: 48,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: "Times-Roman",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 118,
    height: 118,
    marginBottom: 18,
  },
  universityName: {
    fontSize: 15,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  courseSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  courseNumber: {
    fontSize: 24,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textAlign: "center",
  },
  courseTitle: {
    fontSize: 19,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  submittedBySection: {
    alignItems: "center",
    marginBottom: 76,
  },
  blockTitle: {
    fontSize: 21,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 14,
  },
  studentLines: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  studentLine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  studentText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  submittedToSection: {
    marginTop: "auto",
  },
  teachersRow: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 28,
  },
  teacherCol: {
    flex: 1,
    gap: 4,
  },
  teacherText: {
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
});

export function renderBuetSubmittedV1TopSheet(ctx: TopSheetRenderContext) {
  const {template, user, universityLabel} = ctx;

  const departmentLabel = getDepartmentLabel(user.department);
  const departmentLine =
    departmentLabel && departmentLabel !== "-"
      ? `Department of ${departmentLabel}`
      : "Department of Civil Engineering";

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerSection}>
        <PDFImage src="/buet-logo.jpg" style={styles.logo} />
        <Text style={styles.universityName}>{universityLabel}</Text>
      </View>

      <View style={styles.courseSection}>
        <Text style={styles.courseNumber}>{template.courseNumber}</Text>
        <Text style={styles.courseTitle}>{template.courseTitle}</Text>
      </View>

      <View style={styles.submittedBySection}>
        <Text style={styles.blockTitle}>SUBMITTED BY:</Text>
        <View style={styles.studentLines}>
          <View style={styles.studentLine}>
            <Text style={styles.studentText}>Name: {user.name}</Text>
          </View>
          <View style={styles.studentLine}>
            <Text style={styles.studentText}>Student ID: {user.studentId}</Text>
          </View>
          <View style={styles.studentLine}>
            <Text style={styles.studentText}>Section: {user.section}</Text>
          </View>
          <View style={styles.studentLine}>
            <Text style={styles.studentText}>
              Level - {user.level} / Term - {user.term}
            </Text>
          </View>
          <View style={styles.studentLine}>
            <Text style={styles.studentText}>{departmentLine}</Text>
          </View>
        </View>
      </View>

      <View style={styles.submittedToSection}>
        <Text style={styles.blockTitle}>SUBMITTED TO:</Text>
        <View style={styles.teachersRow}>
          <View style={styles.teacherCol}>
            <Text style={styles.teacherText}>{template.teacher1Name}</Text>
            <Text style={styles.teacherText}>
              {template.teacher1Designation}
            </Text>
          </View>
          {template.teacher2Name ? (
            <View style={styles.teacherCol}>
              <Text style={styles.teacherText}>{template.teacher2Name}</Text>
              <Text style={styles.teacherText}>
                {template.teacher2Designation}
              </Text>
            </View>
          ) : (
            <View style={styles.teacherCol} />
          )}
        </View>
      </View>
    </Page>
  );
}
