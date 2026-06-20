import {
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import {TopSheetRenderContext} from "@/components/pdf/core/types";
import {
  getDepartmentLabel,
  normalizeDepartmentCode,
} from "@/lib/constants/departments";

const DEPT_ACRONYM: Record<string, string> = {
  ce: "CE",
  cse: "CSE",
  eee: "EEE",
  me: "ME",
  ipe: "IPE",
  arch: "Arch",
  urp: "URP",
  wre: "WRE",
  che: "ChE",
  bme: "BME",
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: "Times-Roman",
  },
  topContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 105,
    height: 105,
    marginBottom: 18,
  },
  universityName: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.25,
    width: "100%",
  },
  courseContainer: {
    alignItems: "center",
    width: "100%",
  },
  courseNumber: {
    fontSize: 19,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 23,
    fontFamily: "Times-Bold",
    textAlign: "center",
    lineHeight: 1.3,
  },
  submittedBySection: {
    width: "100%",
    alignItems: "center",
  },
  blockTitleContainer: {
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  blockTitleText: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    letterSpacing: 0.75,
  },
  studentBox: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  studentLine: {
    fontSize: 15,
    fontFamily: "Times-Roman",
    textAlign: "center",
    lineHeight: 1.3,
  },
  submittedToSection: {
    width: "100%",
  },
  teachersRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  teacherCol: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  teacherName: {
    fontSize: 15,
    fontFamily: "Times-Bold",
    lineHeight: 1.25,
  },
  teacherDesignation: {
    fontSize: 13.5,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
  },
  teacherDept: {
    fontSize: 13.5,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
  },
  singleTeacherRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  singleTeacherCol: {
    width: 260,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  singleTeacherName: {
    fontSize: 15,
    fontFamily: "Times-Bold",
    lineHeight: 1.25,
    textAlign: "center",
  },
  singleTeacherDesignation: {
    fontSize: 13.5,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
    textAlign: "center",
  },
  singleTeacherDept: {
    fontSize: 13.5,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
    textAlign: "center",
  },
  spacerTop: {
    flex: 1.4,
  },
  spacerMiddle: {
    flex: 1.0,
  },
  spacerBottom: {
    flex: 1.5,
  },
});

export function renderBuetSubmittedV1TopSheet(ctx: TopSheetRenderContext) {
  const {template, user, universityLabel} = ctx;

  const departmentLabel = getDepartmentLabel(user.department);
  const departmentLine =
    departmentLabel && departmentLabel !== "-" ? departmentLabel : "";

  const normalizedDept = user.department
    ? normalizeDepartmentCode(user.department)
    : "ce";
  const deptAcronym =
    DEPT_ACRONYM[normalizedDept as keyof typeof DEPT_ACRONYM] || "CE";
  const teacherDeptLine = `Department of ${deptAcronym}, BUET`;

  const levelText = user.level ? `Level - ${user.level}` : "";
  const termText = user.term ? `Term - ${user.term}` : "";
  const levelTermValue =
    user.level && user.term
      ? `${levelText} / ${termText}`
      : levelText || termText || "";

  const hasDeptInfo1 = template.teacher1Designation
    ? template.teacher1Designation.toLowerCase().includes("department") ||
      template.teacher1Designation.toLowerCase().includes("dept") ||
      template.teacher1Designation.toLowerCase().includes("ce") ||
      template.teacher1Designation.toLowerCase().includes("civil")
    : false;

  const showTeacherDept1 = Boolean(template.teacher1Name) && !hasDeptInfo1;

  const hasDeptInfo2 = template.teacher2Designation
    ? template.teacher2Designation.toLowerCase().includes("department") ||
      template.teacher2Designation.toLowerCase().includes("dept") ||
      template.teacher2Designation.toLowerCase().includes("ce") ||
      template.teacher2Designation.toLowerCase().includes("civil")
    : false;

  const showTeacherDept2 = Boolean(template.teacher2Name) && !hasDeptInfo2;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.topContainer}>
        <PDFImage src="/buet-logo.jpg" style={styles.logo} />
        <Text style={styles.universityName}>{universityLabel}</Text>
      </View>

      <View style={styles.spacerTop} />

      <View style={styles.courseContainer}>
        <Text style={styles.courseNumber}>{template.courseNumber}</Text>
        <Text style={styles.courseTitle}>{template.courseTitle}</Text>
      </View>

      <View style={styles.spacerMiddle} />

      <View style={styles.submittedBySection}>
        <View style={styles.blockTitleContainer}>
          <Text style={styles.blockTitleText}>SUBMITTED BY:</Text>
        </View>
        <View style={styles.studentBox}>
          <Text style={styles.studentLine}>Name: {user.name || ""}</Text>
          <Text style={styles.studentLine}>
            Student ID: {user.studentId || ""}
          </Text>
          <Text style={styles.studentLine}>
            Section: {user.section?.toUpperCase() || ""}
          </Text>
          {template.dividedIntoGroups && (
            <Text style={styles.studentLine}>Group No: </Text>
          )}
          <Text style={styles.studentLine}>{levelTermValue}</Text>
          <Text style={styles.studentLine}>{departmentLine}</Text>
        </View>
      </View>

      <View style={styles.spacerBottom} />

      <View style={styles.submittedToSection}>
        <View style={styles.blockTitleContainer}>
          <Text style={styles.blockTitleText}>SUBMITTED TO:</Text>
        </View>
        {template.teacher2Name ? (
          <View style={styles.teachersRow}>
            <View style={styles.teacherCol}>
              <Text style={styles.teacherName}>{template.teacher1Name}</Text>
              <Text style={styles.teacherDesignation}>
                {template.teacher1Designation}
              </Text>
              {showTeacherDept1 && (
                <Text style={styles.teacherDept}>{teacherDeptLine}</Text>
              )}
            </View>
            <View style={styles.teacherCol}>
              <Text style={styles.teacherName}>{template.teacher2Name}</Text>
              <Text style={styles.teacherDesignation}>
                {template.teacher2Designation}
              </Text>
              {showTeacherDept2 && (
                <Text style={styles.teacherDept}>{teacherDeptLine}</Text>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.singleTeacherRow}>
            <View style={styles.singleTeacherCol}>
              <Text style={styles.singleTeacherName}>
                {template.teacher1Name}
              </Text>
              <Text style={styles.singleTeacherDesignation}>
                {template.teacher1Designation}
              </Text>
              {showTeacherDept1 && (
                <Text style={styles.singleTeacherDept}>{teacherDeptLine}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </Page>
  );
}
