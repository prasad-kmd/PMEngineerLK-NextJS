import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { registerFonts } from "@/components/invoice-gen/pdf-template/pdf-fonts";

// Register fonts before rendering
registerFonts();

// --- Types ---
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  period: string;
  grade: string;
}

interface Project {
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  image: string | null;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  projects: Project[];
}

// --- Theme ---
const colors = {
  primary: "#0f172a",
  accent: "#3b82f6",
  text: "#1e293b",
  textMuted: "#475569",
  textLight: "#94a3b8",
  border: "#e2e8f0",
  bgLight: "#f8fafc",
  bgCard: "#fafafa",
  white: "#ffffff",
  green: "#22c55e",
  greenMuted: "rgba(34, 197, 94, 0.7)",
  purple: "rgba(168, 85, 247, 0.7)",
  orange: "#f97316",
  orangeBg: "#fff7ed",
  orangeBorder: "#ffedd5",
  skyBlue: "#0ea5e9",
  skyBlueBg: "#f0f9ff",
  skyBlueDark: "#0369a1",
  accentBg: "#eff6ff",
};

const spacing = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pagePadding: 32,
};

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    paddingTop: spacing.pagePadding,
    paddingBottom: 60,
    paddingHorizontal: 0,
    fontSize: 9,
    fontFamily: "Montserrat",
    color: colors.text,
    lineHeight: 1.4,
    backgroundColor: colors.white,
  },

  // ---- Header (dark banner) ----
  headerBanner: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.pagePadding,
    paddingTop: 28,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
    objectFit: "cover",
  },
  profilePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.white,
    fontFamily: "Montserrat",
  },
  headerTextBlock: {
    marginLeft: 16,
    flex: 1,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.white,
    fontFamily: "Montserrat",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  roleText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.accent,
    fontFamily: "Inter",
    marginTop: 2,
  },

  // ---- Contact bar ----
  contactBar: {
    backgroundColor: colors.bgLight,
    paddingVertical: 8,
    paddingHorizontal: spacing.pagePadding,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
  },
  contactLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: colors.accent,
    fontFamily: "Inter",
    marginRight: 3,
    textTransform: "uppercase",
  },
  contactValue: {
    fontSize: 7.5,
    color: colors.textMuted,
    fontFamily: "Inter",
  },
  contactLink: {
    fontSize: 7.5,
    color: colors.textMuted,
    fontFamily: "Inter",
    textDecoration: "none",
  },

  // ---- Body ----
  body: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.lg,
  },

  // ---- Section ----
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Inter",
    marginBottom: spacing.sm,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionBlock: {
    marginBottom: spacing.lg,
  },

  // ---- Summary ----
  summaryText: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.5,
    fontFamily: "Inter",
  },

  // ---- Experience ----
  experienceItem: {
    marginBottom: spacing.md,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expRole: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.text,
    fontFamily: "Montserrat",
    flex: 1,
  },
  expPeriodBadge: {
    backgroundColor: colors.accentBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  expPeriodText: {
    fontSize: 7,
    fontWeight: 700,
    color: colors.accent,
    fontFamily: "Inter",
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.accent,
    fontFamily: "Inter",
    marginBottom: 3,
  },
  expDescription: {
    fontSize: 8.5,
    color: colors.textMuted,
    lineHeight: 1.5,
    fontFamily: "Inter",
  },
  expDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.accent,
    marginRight: 8,
    marginTop: 4,
  },
  expRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  expContent: {
    flex: 1,
  },

  // ---- Two-column layout ----
  twoColRow: {
    flexDirection: "row",
    gap: spacing.xl,
  },
  colMain: {
    flex: 2,
  },
  colSide: {
    flex: 1,
  },

  // ---- Education ----
  educationItem: {
    marginBottom: spacing.md,
  },
  eduHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  eduDegree: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.text,
    fontFamily: "Montserrat",
    flex: 1,
  },
  eduPeriod: {
    fontSize: 7,
    fontWeight: 700,
    color: colors.textLight,
    fontFamily: "Inter",
  },
  eduSchool: {
    fontSize: 9,
    fontWeight: 500,
    color: colors.textMuted,
    fontFamily: "Inter",
  },
  eduGrade: {
    fontSize: 8,
    fontWeight: 700,
    color: colors.green,
    fontFamily: "Inter",
    marginTop: 2,
  },

  // ---- Projects ----
  projectItem: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    borderRadius: 6,
    padding: 8,
    marginBottom: spacing.sm,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  projectName: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.text,
    fontFamily: "Montserrat",
    flex: 1,
  },
  projectLinkText: {
    fontSize: 7,
    color: colors.textLight,
    fontFamily: "Inter",
    textDecoration: "none",
  },
  projectDescription: {
    fontSize: 8,
    color: colors.textMuted,
    fontFamily: "Inter",
    lineHeight: 1.4,
  },

  // ---- Skills ----
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillBadge: {
    backgroundColor: colors.orangeBg,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  skillText: {
    fontSize: 7.5,
    fontWeight: 700,
    color: colors.orange,
    fontFamily: "Inter",
  },

  // ---- Certifications ----
  certItem: {
    backgroundColor: colors.skyBlueBg,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  certBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.skyBlue,
    marginTop: 3,
  },
  certText: {
    fontSize: 7.5,
    fontWeight: 700,
    color: colors.skyBlueDark,
    fontFamily: "Inter",
    flex: 1,
  },

  // ---- Footer ----
  fixedFooter: {
    position: "absolute",
    bottom: 20,
    left: spacing.pagePadding,
    right: spacing.pagePadding,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
  },
  footerLeft: {
    fontSize: 6.5,
    color: colors.textLight,
    fontFamily: "Inter",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footerRight: {
    fontSize: 6.5,
    color: colors.textLight,
    fontFamily: "Inter",
  },
  footerLink: {
    fontSize: 6.5,
    color: colors.textLight,
    textDecoration: "underline",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 6.5,
    color: colors.textLight,
    fontFamily: "Inter",
  },

  // ---- Gradient bar (top & bottom) ----
  gradientBar: {
    height: 3,
    flexDirection: "row",
  },
  gradientSegment1: { flex: 1, backgroundColor: "#3b82f6" },
  gradientSegment2: { flex: 1, backgroundColor: "#22c55e" },
  gradientSegment3: { flex: 1, backgroundColor: "#a855f7" },
  gradientSegment4: { flex: 1, backgroundColor: "#f97316" },
});

// --- Helper ---
const normalizeUrl = (url: string) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

// --- Component ---
interface ResumePDFProps {
  resume: ResumeData;
}

export function ResumePDF({ resume }: ResumePDFProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Document
      title={`${resume.name} - Resume`}
      author={resume.name}
      subject={`Professional Resume - ${resume.name}`}
      keywords={`resume, cv, ${resume.name}, ${resume.role}`}
      creator="Resume Architect (via prasadm.vercel.app)"
      producer="PrasadM Blogfolio"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* Gradient bar top */}
        <View style={styles.gradientBar} fixed>
          <View style={styles.gradientSegment1} />
          <View style={styles.gradientSegment2} />
          <View style={styles.gradientSegment3} />
          <View style={styles.gradientSegment4} />
        </View>

        {/* Header banner */}
        <View style={styles.headerBanner} wrap={false}>
          {resume.image ? (
            <Image src={resume.image} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitial}>
                {resume.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerTextBlock}>
            <Text style={styles.nameText}>{resume.name}</Text>
            <Text style={styles.roleText}>{resume.role}</Text>
          </View>
        </View>

        {/* Contact bar */}
        <View style={styles.contactBar} wrap={false}>
          {resume.email && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email</Text>
              <Link
                src={`mailto:${resume.email}`}
                style={styles.contactLink}
              >
                {resume.email}
              </Link>
            </View>
          )}
          {resume.phone && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{resume.phone}</Text>
            </View>
          )}
          {resume.location && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>{resume.location}</Text>
            </View>
          )}
          {resume.website && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Web</Text>
              <Link
                src={normalizeUrl(resume.website)}
                style={styles.contactLink}
              >
                {resume.website}
              </Link>
            </View>
          )}
          {resume.linkedin && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>LinkedIn</Text>
              <Link
                src={normalizeUrl(resume.linkedin)}
                style={styles.contactLink}
              >
                {resume.linkedin}
              </Link>
            </View>
          )}
          {resume.github && (
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>GitHub</Text>
              <Link
                src={normalizeUrl(resume.github)}
                style={styles.contactLink}
              >
                {resume.github}
              </Link>
            </View>
          )}
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Professional Summary */}
          {resume.summary && (
            <View style={styles.sectionBlock} wrap={false}>
              <Text style={[styles.sectionTitle, { color: colors.accent }]}>
                Professional Summary
              </Text>
              <Text style={styles.summaryText}>{resume.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {resume.experiences.length > 0 && (
            <View style={styles.sectionBlock}>
              <Text
                style={[styles.sectionTitle, { color: colors.accent }]}
                minPresenceAhead={40}
              >
                Work Experience
              </Text>
              {resume.experiences.map((exp, i) => (
                <View key={i} style={styles.experienceItem} wrap={false}>
                  <View style={styles.expRow}>
                    <View style={styles.expDot} />
                    <View style={styles.expContent}>
                      <View style={styles.expHeader}>
                        <Text style={styles.expRole}>{exp.role}</Text>
                        {exp.period && (
                          <View style={styles.expPeriodBadge}>
                            <Text style={styles.expPeriodText}>
                              {exp.period}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.expCompany}>{exp.company}</Text>
                      {exp.description && (
                        <Text style={styles.expDescription}>
                          {exp.description}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Two-column: Education + Projects | Skills + Certs */}
          <View style={styles.twoColRow}>
            {/* Left column */}
            <View style={styles.colMain}>
              {/* Education */}
              {resume.education.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { color: colors.greenMuted },
                    ]}
                    minPresenceAhead={40}
                  >
                    Education
                  </Text>
                  {resume.education.map((edu, i) => (
                    <View key={i} style={styles.educationItem} wrap={false}>
                      <View style={styles.eduHeader}>
                        <Text style={styles.eduDegree}>{edu.degree}</Text>
                        {edu.period && (
                          <Text style={styles.eduPeriod}>{edu.period}</Text>
                        )}
                      </View>
                      <Text style={styles.eduSchool}>{edu.school}</Text>
                      {edu.grade && (
                        <Text style={styles.eduGrade}>{edu.grade}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text
                    style={[styles.sectionTitle, { color: colors.purple }]}
                    minPresenceAhead={40}
                  >
                    Key Projects
                  </Text>
                  {resume.projects.map((p, i) => (
                    <View key={i} style={styles.projectItem} wrap={false}>
                      <View style={styles.projectHeader}>
                        <Text style={styles.projectName}>{p.name}</Text>
                        {p.link && (
                          <Link
                            src={normalizeUrl(p.link)}
                            style={styles.projectLinkText}
                          >
                            ↗
                          </Link>
                        )}
                      </View>
                      <Text style={styles.projectDescription}>
                        {p.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Right column */}
            <View style={styles.colSide}>
              {/* Skills */}
              {resume.skills.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { color: "rgba(249, 115, 22, 0.7)" },
                    ]}
                  >
                    Technical Skills
                  </Text>
                  <View style={styles.skillsWrap}>
                    {resume.skills.map((s, i) => (
                      <View key={i} style={styles.skillBadge}>
                        <Text style={styles.skillText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Certifications */}
              {resume.certifications.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text
                    style={[
                      styles.sectionTitle,
                      { color: "rgba(14, 165, 233, 0.7)" },
                    ]}
                  >
                    Certifications
                  </Text>
                  {resume.certifications.map((c, i) => (
                    <View key={i} style={styles.certItem} wrap={false}>
                      <View style={styles.certBullet} />
                      <Text style={styles.certText}>{c}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Fixed footer on every page */}
        <View style={styles.fixedFooter} fixed>
          <Text style={styles.footerLeft}>
            Resume Architect by PM-Engineer Tools
          </Text>
          <Text style={styles.footerRight}>© {currentYear}</Text>
        </View>

        {/* Page numbers */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
