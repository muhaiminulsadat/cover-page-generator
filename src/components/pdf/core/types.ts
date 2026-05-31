export interface TopSheetTemplateData {
  id?: string;
  designId?: string | null;
  coverDesignId?: string | null;
  courseNumber: string;
  courseTitle: string;
  sessionTerm: string;
  teacher1Name: string;
  teacher1Designation: string;
  teacher2Name?: string | null;
  teacher2Designation?: string | null;
  includeTopPage?: boolean;
  includeCoverPage?: boolean;
  includeIndexPage?: boolean;
  experimentNames?: string[];
}

export interface TopSheetUserData {
  name: string;
  studentId?: string | null;
  section?: string | null;
  groupNo?: string | null;
  level?: string | null;
  term?: string | null;
  department?: string | null;
  university?: string | null;
}

export interface TopSheetRenderContext {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
  universityLabel: string;
}

export interface CoverPageRenderContext {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
  universityLabel: string;
}

export interface IndexPageRenderContext {
  template: TopSheetTemplateData;
  user: TopSheetUserData;
  universityLabel: string;
}
