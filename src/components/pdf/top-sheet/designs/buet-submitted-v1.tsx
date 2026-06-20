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
    paddingTop: 65,
    paddingBottom: 65,
    paddingLeft: 60,
    paddingRight: 60,
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
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 21,
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
    fontSize: 14,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    letterSpacing: 0.75,
  },
  studentBox: {
    width: 330,
    alignSelf: "center",
    gap: 8,
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  studentLabel: {
    width: 110,
    fontSize: 14,
    fontFamily: "Times-Bold",
  },
  studentValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Times-Roman",
    lineHeight: 1.25,
  },
  studentValuePlaceholder: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    height: 14,
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
    fontSize: 14,
    fontFamily: "Times-Bold",
    lineHeight: 1.25,
  },
  teacherDesignation: {
    fontSize: 13,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
  },
  teacherDept: {
    fontSize: 13,
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
    fontSize: 14,
    fontFamily: "Times-Bold",
    lineHeight: 1.25,
    textAlign: "center",
  },
  singleTeacherDesignation: {
    fontSize: 13,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
    textAlign: "center",
  },
  singleTeacherDept: {
    fontSize: 13,
    fontFamily: "Times-Roman",
    lineHeight: 1.3,
    textAlign: "center",
  },
  spacerTop: {
    flex: 1.2,
  },
  spacerMiddle: {
    flex: 1,
  },
  spacerBottom: {
    flex: 1.4,
  },
});

export function renderBuetSubmittedV1TopSheet(ctx: TopSheetRenderContext) {
  const {template, user, universityLabel} = ctx;

  const departmentLabel = getDepartmentLabel(user.department);
  const departmentLine =
    departmentLabel && departmentLabel !== "-"
      ? departmentLabel
      : "";

  const normalizedDept = user.department
    ? normalizeDepartmentCode(user.department)
    : "ce";
  const deptAcronym =
    DEPT_ACRONYM[normalizedDept as keyof typeof DEPT_ACRONYM] || "CE";
  const teacherDeptLine = `Department of ${deptAcronym}, BUET`;

  const levelText = user.level ? `Level-${user.level}` : "";
  const termText = user.term ? `Term-${user.term}` : "";
  const levelTermValue =
    user.level && user.term
      ? `${levelText}, ${termText}`
      : levelText || termText || "";

  const hasDeptInfo1 = template.teacher1Designation
    ? (template.teacher1Designation.toLowerCase().includes("department") ||
       template.teacher1Designation.toLowerCase().includes("dept") ||
       template.teacher1Designation.toLowerCase().includes("ce") ||
       template.teacher1Designation.toLowerCase().includes("civil"))
    : false;

  const showTeacherDept1 = Boolean(template.teacher1Name) && !hasDeptInfo1;

  const hasDeptInfo2 = template.teacher2Designation
    ? (template.teacher2Designation.toLowerCase().includes("department") ||
       template.teacher2Designation.toLowerCase().includes("dept") ||
       template.teacher2Designation.toLowerCase().includes("ce") ||
       template.teacher2Designation.toLowerCase().includes("civil"))
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
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Name:</Text>
            {user.name ? (
              <Text style={styles.studentValue}>{user.name}</Text>
            ) : (
              <View style={styles.studentValuePlaceholder} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Student ID:</Text>
            {user.studentId ? (
              <Text style={styles.studentValue}>{user.studentId}</Text>
            ) : (
              <View style={styles.studentValuePlaceholder} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Level / Term:</Text>
            {levelTermValue ? (
              <Text style={styles.studentValue}>{levelTermValue}</Text>
            ) : (
              <View style={styles.studentValuePlaceholder} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Section:</Text>
            {user.section ? (
              <Text style={styles.studentValue}>{user.section.toUpperCase()}</Text>
            ) : (
              <View style={styles.studentValuePlaceholder} />
            )}
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Department:</Text>
            {departmentLine ? (
              <Text style={styles.studentValue}>{departmentLine}</Text>
            ) : (
              <View style={styles.studentValuePlaceholder} />
            )}
          </View>
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
