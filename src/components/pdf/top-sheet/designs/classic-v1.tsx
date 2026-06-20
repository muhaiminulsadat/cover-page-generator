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
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: "Times-Roman",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSection: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  universityName: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  departmentName: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 0,
    textAlign: "center",
  },
  courseDetailsContainer: {
    alignItems: "center",
    width: "100%",
  },
  courseLine: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "center",
  },
  sectionHeaderContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    textDecoration: "underline",
  },
  halfContainer: {
    width: "100%",
    alignItems: "center",
  },
  teachersContainer: {
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  teacherBlock: {
    alignItems: "center",
  },
  teacherDetails: {
    alignItems: "center",
  },
  teacherName: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textAlign: "center",
  },
  teacherDesignation: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    textAlign: "center",
  },
  studentContainer: {
    alignItems: "center",
    width: "100%",
  },
  studentLine: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    fontFamily: "Times-Bold",
  },
  value: {
    fontSize: 15,
    fontFamily: "Times-Roman",
    marginLeft: 4,
  },
});

export function renderClassicV1TopSheet(ctx: TopSheetRenderContext) {
  const {template, user, universityLabel} = ctx;
  const studentId = user.studentId || "-";
  const section = user.section?.toUpperCase() || "-";
  const level = user.level || "-";
  const term = user.term || "-";

  const departmentLabel = getDepartmentLabel(user.department);
  const departmentLine =
    departmentLabel && departmentLabel !== "-"
      ? departmentLabel
      : "Civil Engineering";

  const formattedDept = departmentLine.toLowerCase().startsWith("department of")
    ? departmentLine
    : `Department of ${departmentLine}`;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <PDFImage src="/buet-logo.jpg" style={styles.logo} />
        </View>

        <Text style={styles.universityName}>{universityLabel}</Text>
        <Text style={styles.departmentName}>{formattedDept}</Text>
      </View>

      <View style={styles.courseDetailsContainer}>
        <View style={styles.courseLine}>
          <Text style={styles.label}>Course Number: </Text>
          <Text style={styles.value}>{template.courseNumber}</Text>
        </View>
        <View style={styles.courseLine}>
          <Text style={styles.label}>Course Title: </Text>
          <Text style={styles.value}>{template.courseTitle}</Text>
        </View>
        <View style={styles.courseLine}>
          <Text style={styles.label}>Term: </Text>
          <Text style={styles.value}>{template.sessionTerm}</Text>
        </View>
      </View>

      <View style={styles.halfContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>
            {template.teacher2Name ? "Course Teachers:" : "Course Teacher:"}
          </Text>
        </View>

        <View style={styles.teachersContainer}>
          <View style={styles.teacherBlock}>
            <View style={styles.teacherDetails}>
              <Text style={styles.teacherName}>{template.teacher1Name}</Text>
              <Text style={styles.teacherDesignation}>
                {template.teacher1Designation}
              </Text>
            </View>
          </View>

          {template.teacher2Name && (
            <View style={styles.teacherBlock}>
              <View style={styles.teacherDetails}>
                <Text style={styles.teacherName}>{template.teacher2Name}</Text>
                <Text style={styles.teacherDesignation}>
                  {template.teacher2Designation}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.halfContainer}>
        <View style={styles.studentContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Submitted by:</Text>
          </View>

          <View style={styles.studentLine}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>

          <View style={styles.studentLine}>
            <Text style={styles.label}>Student ID: </Text>
            <Text style={styles.value}>{studentId}</Text>
          </View>

          <View style={styles.studentLine}>
            <Text style={styles.label}>Section: </Text>
            <Text style={styles.value}>{section}</Text>
          </View>

          {template.dividedIntoGroups && (
            <View style={styles.studentLine}>
              <Text style={styles.label}>Group No: </Text>
              <Text style={styles.value}></Text>
            </View>
          )}

          <View style={styles.studentLine}>
            <Text style={styles.label}>
              Level-{level}, Term-{term}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
}
