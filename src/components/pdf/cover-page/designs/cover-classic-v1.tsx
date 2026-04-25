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
    paddingTop: 52,
    paddingBottom: 56,
    paddingLeft: 56,
    paddingRight: 56,
    fontFamily: "Times-Roman",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 92,
    height: 92,
    marginBottom: 8,
  },
  universityName: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontFamily: "Times-Bold",
    textAlign: "center",
    letterSpacing: 1,
    marginTop: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Times-Roman",
    textAlign: "center",
    marginBottom: 16,
  },
  courseBlock: {
    borderWidth: 1,
    borderColor: "#D4D4D8",
    borderStyle: "solid",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingRight: 18,
    gap: 8,
  },
  courseLine: {
    flexDirection: "row",
    justifyContent: "center",
  },
  lineLabel: {
    fontSize: 14,
    fontFamily: "Times-Bold",
  },
  lineValue: {
    fontSize: 14,
    fontFamily: "Times-Roman",
    marginLeft: 4,
  },
  split: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 34,
    gap: 24,
  },
  splitBlock: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  blockTitle: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  bodyLine: {
    fontSize: 13,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 18,
  },
  footerLine: {
    width: "60%",
    borderTopWidth: 1,
    borderTopColor: "#171717",
    borderTopStyle: "solid",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export function renderCoverClassicV1(ctx: CoverPageRenderContext) {
  const {template, user, universityLabel} = ctx;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <PDFImage src="/buet-logo.jpg" style={styles.logo} />
        <Text style={styles.universityName}>{universityLabel}</Text>
        <Text style={styles.title}>LAB REPORT</Text>
        <Text style={styles.subtitle}>Cover Page</Text>
      </View>

      <View>
        <View style={styles.courseBlock}>
          <View style={styles.courseLine}>
            <Text style={styles.lineLabel}>Course Number:</Text>
            <Text style={styles.lineValue}>{template.courseNumber}</Text>
          </View>
          <View style={styles.courseLine}>
            <Text style={styles.lineLabel}>Course Title:</Text>
            <Text style={styles.lineValue}>{template.courseTitle}</Text>
          </View>
          <View style={styles.courseLine}>
            <Text style={styles.lineLabel}>Session/Term:</Text>
            <Text style={styles.lineValue}>{template.sessionTerm}</Text>
          </View>
        </View>

        <View style={styles.split}>
          <View style={styles.splitBlock}>
            <Text style={styles.blockTitle}>Submitted By</Text>
            <Text style={styles.bodyLine}>{user.name}</Text>
            <Text style={styles.bodyLine}>
              Student ID: {user.studentId || "-"}
            </Text>
            <Text style={styles.bodyLine}>Section: {user.section || "-"}</Text>
            <Text style={styles.bodyLine}>
              Level {user.level || "-"} / Term {user.term || "-"}
            </Text>
          </View>

          <View style={styles.splitBlock}>
            <Text style={styles.blockTitle}>Submitted To</Text>
            <Text style={styles.bodyLine}>{template.teacher1Name}</Text>
            <Text style={styles.bodyLine}>{template.teacher1Designation}</Text>
            {template.teacher2Name ? (
              <>
                <Text style={styles.bodyLine}>{template.teacher2Name}</Text>
                <Text style={styles.bodyLine}>
                  {template.teacher2Designation || ""}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>Department of Civil Engineering</Text>
      </View>
    </Page>
  );
}
