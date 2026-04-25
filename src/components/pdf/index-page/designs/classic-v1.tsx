import {Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {IndexPageRenderContext} from "@/components/pdf/core/types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 20,
    textAlign: "center",
    textDecoration: "underline",
  },
  experimentBox: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  experimentLabel: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    marginBottom: 6,
  },
  experimentValue: {
    fontSize: 11,
    minHeight: 16,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeader: {
    margin: "auto",
    flexDirection: "row",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    backgroundColor: "#f0f0f0",
    fontFamily: "Times-Bold",
  },
  slCol: {
    width: "10%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
    textAlign: "center",
  },
  topicCol: {
    width: "45%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
  },
  descCol: {
    width: "30%",
    borderRightStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
  },
  pageCol: {
    width: "15%",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
    textAlign: "center",
  },
  cellText: {
    fontSize: 11,
  },
  headerText: {
    fontSize: 11,
    fontFamily: "Times-Bold",
  },
  emptyMessage: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

export function renderClassicV1IndexPage(ctx: IndexPageRenderContext) {
  const {template} = ctx;
  const indexRows = Array.isArray(template.indexRows) ? template.indexRows : [];
  const experimentName = template.experimentName?.trim() || " ";

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Index</Text>

      <View style={styles.experimentBox}>
        <Text style={styles.experimentLabel}>Experiment Name</Text>
        <Text style={styles.experimentValue}>{experimentName}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.slCol, styles.headerText]}>SL.</Text>
          <Text style={[styles.topicCol, styles.headerText]}>Topic</Text>
          <Text style={[styles.descCol, styles.headerText]}>Description</Text>
          <Text style={[styles.pageCol, styles.headerText]}>Page</Text>
        </View>

        {indexRows.map((row, index) => (
          <View key={row.id} style={styles.tableRow}>
            <Text style={[styles.slCol, styles.cellText]}>{index + 1}</Text>
            <Text style={[styles.topicCol, styles.cellText]}>
              {row.topic || "-"}
            </Text>
            <Text style={[styles.descCol, styles.cellText]}>
              {row.description || "-"}
            </Text>
            <Text style={[styles.pageCol, styles.cellText]}>-</Text>
          </View>
        ))}

        {indexRows.length === 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.slCol, styles.cellText]}> </Text>
            <Text style={[styles.topicCol, styles.cellText]}> </Text>
            <Text style={[styles.descCol, styles.cellText]}> </Text>
            <Text style={[styles.pageCol, styles.cellText]}> </Text>
          </View>
        )}
      </View>

      {indexRows.length === 0 && (
        <Text style={styles.emptyMessage}>
          Fill the experiment name and index entries by hand after printing.
        </Text>
      )}
    </Page>
  );
}
