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
    paddingTop: 25,
    paddingBottom: 35,
    paddingLeft: 44,
    paddingRight: 44,
    fontFamily: "Times-Roman",
  },
  pageContent: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  topGroup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 0,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 18,
  },
  universityName: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  courseSection: {
    alignItems: "center",
    marginBottom: 0,
  },
  courseNumber: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    marginBottom: 6,
    textAlign: "center",
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
  },
  submittedBySection: {
    alignItems: "center",
    marginBottom: 0,
  },
  blockTitle: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 18,
  },
  studentLines: {
    width: "100%",
    alignItems: "center",
    gap: 7,
  },
  studentLine: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  studentText: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  submittedToSection: {
    width: "100%",
    marginTop: 10,
  },
  teachersRow: {
    marginTop: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 56,
  },
  teacherCol: {
    flex: 1,
    gap: 5,
  },
  teacherText: {
    fontSize: 14,
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
      <View style={styles.pageContent}>
        <View style={styles.topGroup}>
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
                <Text style={styles.studentText}>
                  Student ID: {user.studentId}
                </Text>
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
        </View>

        <View style={styles.submittedToSection}>
          <Text style={styles.blockTitle}>SUBMITTED TO:</Text>
          <View style={styles.teachersRow}>
            <View style={styles.teacherCol}>
              <Text style={styles.teacherText}>{template.teacher1Name}</Text>
              <Text style={styles.teacherText}>
                {template.teacher1Designation}
              </Text>
              <Text style={styles.teacherText}>Department of CE, BUET</Text>
            </View>
            {template.teacher2Name ? (
              <View style={styles.teacherCol}>
                <Text style={styles.teacherText}>{template.teacher2Name}</Text>
                <Text style={styles.teacherText}>
                  {template.teacher2Designation}
                </Text>
                <Text style={styles.teacherText}>Department of CE, BUET</Text>
              </View>
            ) : (
              <View style={styles.teacherCol} />
            )}
          </View>
        </View>
      </View>
    </Page>
  );
}
