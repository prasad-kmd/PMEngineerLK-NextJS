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
import {
  EmailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  LinkedinIcon,
  GithubIcon,
} from "./pdf-icons";

// Register fonts before rendering
registerFonts();

// --- Types ---
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  grade: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface Referee {
  name: string;
  position: string;
  workingPlacement: string;
  email: string;
  phone: string;
}

export interface Interest {
  name: string;
  details?: string;
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
  technicalSkills: string[];
  personalSkills: string[];
  certifications: string[];
  projects: Project[];
  languages: string[];
  extraCurricular: Experience[];
  referees: Referee[];
  interests?: Interest[];
}

// --- Theme ---
const colors = {
  primary: "#1e293b", // slate-800
  accent: "#0891b2", // cyan-600
  text: "#334155", // slate-700
  textMuted: "#64748b", // slate-500
  textLight: "#94a3b8", // slate-400
  border: "#e2e8f0", // slate-200
  bgLight: "#f8fafc", // slate-50
  white: "#ffffff",
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  pagePadding: 35,
};

// --- Styles ---
const styles = StyleSheet.create({
  page: {
    padding: spacing.pagePadding,
    fontSize: 9,
    fontFamily: "Inter",
    color: colors.text,
    lineHeight: 1.5,
    backgroundColor: colors.white,
  },

  // ---- Header ----
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.primary,
    fontFamily: "Montserrat",
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 1.1,
  },
  roleText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.accent,
    fontFamily: "GoogleSans",
    marginTop: 6,
    letterSpacing: 0.5,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginLeft: spacing.md,
    objectFit: "cover",
  },

  // ---- Contact Row ----
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: spacing.lg,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  contactText: {
    fontSize: 8,
    color: colors.textMuted,
  },
  contactLink: {
    fontSize: 8,
    color: colors.textMuted,
    textDecoration: "none",
  },

  // ---- Layout ----
  mainContainer: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  leftColumn: {
    flex: 2.2,
  },
  rightColumn: {
    flex: 1,
  },

  // ---- Section ----
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.primary,
    fontFamily: "Montserrat",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
    marginBottom: spacing.sm,
  },

  // ---- Experience ----
  experienceItem: {
    marginBottom: spacing.lg,
    paddingBottom: 30,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  expRole: {
    fontSize: 10,
    fontFamily: "GoogleSans",
    fontWeight: 700,
    color: colors.primary,
  },
  expPeriod: {
    fontSize: 8,
    fontWeight: 500,
    color: colors.textMuted,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.accent,
    marginBottom: 4,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    fontSize: 8,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: colors.text,
  },

  // ---- Education ----
  educationItem: {
    marginBottom: spacing.sm,
    paddingBottom: 2,
  },
  eduSchool: {
    fontSize: 9,
    fontFamily: "GoogleSans",
    fontWeight: 700,
    color: colors.primary,
  },
  eduDegree: {
    fontSize: 8.5,
    color: colors.text,
  },
  eduPeriod: {
    fontSize: 8,
    color: colors.textMuted,
  },

  // ---- Skills ----
  skillGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillTag: {
    fontSize: 8,
    paddingHorizontal: 6,
    // paddingVertical: 3,
    paddingTop: 5,
    paddingBottom: -1,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    color: colors.text,
    textAlign: "center",
  },

  // ---- Projects ----
  projectItem: {
    marginBottom: spacing.sm,
  },
  projectName: {
    fontSize: 9,
    fontFamily: "GoogleSans",
    fontWeight: 700,
    color: colors.primary,
  },
  projectLink: {
    fontSize: 8,
    color: colors.accent,
    textDecoration: "none",
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 8.5,
    color: colors.textMuted,
  },

  // ---- Footer ----
  footer: {
    position: "absolute",
    bottom: spacing.md,
    left: spacing.pagePadding,
    right: spacing.pagePadding,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7,
    color: colors.textLight,
  },
});

// --- Helpers ---
const normalizeUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
};

const getSocialUrl = (platform: "linkedin" | "github", username: string) => {
  if (!username) return "";
  if (platform === "linkedin") return `https://linkedin.com/in/${username}`;
  if (platform === "github") return `https://github.com/${username}`;
  return "";
};

const renderDescription = (text: string) => {
  if (!text) return null;
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  if (lines.length > 1) {
    return lines.map((line, i) => (
      <View key={i} style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          {line.trim().replace(/^[•\-\*]\s*/, "")}
        </Text>
      </View>
    ));
  }
  return <Text style={styles.bulletText}>{text}</Text>;
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
      keywords={`${resume.name}, ${resume.role}, ${resume.experiences.map((exp) => exp.role).join(", ")}, ${resume.education.map((edu) => edu.degree).join(", ")}`}
      creator={`${resume.name} - Resume Architect (via prasadm.vercel.app)`}
      producer="PrasadM Blogfolio (prasadm.vercel.app using @react-pdf/renderer)"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.nameText}>{resume.name}</Text>
            <Text style={styles.roleText}>{resume.role}</Text>
          </View>
          {resume.image && (
            <Image src={resume.image} style={styles.headerImage} />
          )}
        </View>

        {/* Contact info */}
        <View style={styles.contactRow}>
          {resume.email && (
            <View style={styles.contactItem}>
              <View style={{ marginTop: 0.5 }}>
                <EmailIcon size={8} color={colors.accent} />
              </View>
              <Link src={`mailto:${resume.email}`} style={styles.contactLink}>
                {resume.email}
              </Link>
            </View>
          )}
          {resume.phone && (
            <View style={styles.contactItem}>
              <View style={{ marginTop: -3 }}>
                <PhoneIcon size={8} color={colors.accent} />
              </View>
              <Text style={styles.contactText}>{resume.phone}</Text>
            </View>
          )}
          {resume.location && (
            <View style={styles.contactItem}>
              <View style={{ marginTop: -3 }}>
                <MapPinIcon size={8} color={colors.accent} />
              </View>
              <Text style={styles.contactText}>{resume.location}</Text>
            </View>
          )}
          {resume.website && (
            <View style={styles.contactItem}>
              <View style={{ marginTop: -3 }}>
                <GlobeIcon size={8} color={colors.accent} />
              </View>
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
              <View style={{ marginTop: -3 }}>
                <LinkedinIcon size={8} color={colors.accent} />
              </View>
              <Link
                src={getSocialUrl("linkedin", resume.linkedin)}
                style={styles.contactLink}
              >
                {resume.linkedin}
              </Link>
            </View>
          )}
          {resume.github && (
            <View style={styles.contactItem}>
              <View style={{ marginTop: -3 }}>
                <GithubIcon size={8} color={colors.accent} />
              </View>
              <Link
                src={getSocialUrl("github", resume.github)}
                style={styles.contactLink}
              >
                {resume.github}
              </Link>
            </View>
          )}
        </View>

        {/* Main Content Layout */}
        <View style={styles.mainContainer}>
          {/* Main Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            {resume.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={{ fontSize: 8.5, color: colors.text }}>
                  {resume.summary}
                </Text>
              </View>
            )}

            {/* Education - MOVED HERE */}
            {resume.education &&
              resume.education.length > 0 &&
              (resume.education || []).some((e) => e.school || e.degree) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {(resume.education || [])
                    .filter((e) => e.school || e.degree)
                    .map((edu, i) => (
                      <View key={i} style={styles.educationItem} wrap={false}>
                        <Text style={styles.eduSchool}>{edu.school}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.eduDegree}>{edu.degree}</Text>
                          <Text style={styles.eduPeriod}>{edu.period}</Text>
                        </View>
                        {edu.grade && (
                          <Text
                            style={{
                              fontSize: 8,
                              color: colors.accent,
                              marginTop: 1,
                              fontWeight: 600,
                            }}
                          >
                            {edu.grade}
                          </Text>
                        )}
                        <View style={{ marginTop: 2 }}>
                          {renderDescription(edu.description)}
                        </View>
                      </View>
                    ))}
                </View>
              )}

            {/* Experience */}
            {resume.experiences &&
              resume.experiences.length > 0 &&
              (resume.experiences || []).some((e) => e.role || e.company) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {(resume.experiences || [])
                    .filter((e) => e.role || e.company)
                    .map((exp, i) => (
                      <View key={i} style={styles.experienceItem} wrap={false}>
                        <View style={styles.expHeader}>
                          <Text style={styles.expRole}>{exp.role}</Text>
                          <Text style={styles.expPeriod}>{exp.period}</Text>
                        </View>
                        <Text style={styles.expCompany}>{exp.company}</Text>
                        <View>{renderDescription(exp.description)}</View>
                      </View>
                    ))}
                </View>
              )}

            {/* Extra Curricular Activities - RENAMED */}
            {resume.extraCurricular &&
              resume.extraCurricular.length > 0 &&
              (resume.extraCurricular || []).some(
                (v) => v.role || v.company,
              ) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Extra Curriculum Activities
                  </Text>
                  {(resume.extraCurricular || [])
                    .filter((v) => v.role || v.company)
                    .map((vol, i) => (
                      <View key={i} style={styles.experienceItem} wrap={false}>
                        <View style={styles.expHeader}>
                          <Text style={styles.expRole}>{vol.role}</Text>
                          <Text style={styles.expPeriod}>{vol.period}</Text>
                        </View>
                        <Text style={styles.expCompany}>{vol.company}</Text>
                        <View>{renderDescription(vol.description)}</View>
                      </View>
                    ))}
                </View>
              )}

            {/* Projects */}
            {resume.projects &&
              resume.projects.length > 0 &&
              (resume.projects || []).some((p) => p.name) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  {(resume.projects || [])
                    .filter((p) => p.name)
                    .map((proj, i) => (
                      <View key={i} style={styles.projectItem} wrap={false}>
                        <Text style={styles.projectName}>{proj.name}</Text>
                        {proj.link && (
                          <Link
                            src={normalizeUrl(proj.link)}
                            style={styles.projectLink}
                          >
                            {proj.link}
                          </Link>
                        )}
                        <Text style={styles.projectDesc}>
                          {proj.description}
                        </Text>
                      </View>
                    ))}
                </View>
              )}
          </View>

          {/* Side Column */}
          <View style={styles.rightColumn}>
            {/* Technical Skills */}
            {resume.technicalSkills &&
              resume.technicalSkills.length > 0 &&
              (resume.technicalSkills || []).some((s) => s.trim()) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Technical Skills</Text>
                  <View style={styles.skillGroup}>
                    {(resume.technicalSkills || [])
                      .filter((s) => s.trim())
                      .map((skill, i) => (
                        <Text key={i} style={styles.skillTag}>
                          {skill}
                        </Text>
                      ))}
                  </View>
                </View>
              )}

            {/* Personal Skills */}
            {resume.personalSkills &&
              resume.personalSkills.length > 0 &&
              (resume.personalSkills || []).some((s) => s.trim()) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Personal Skills</Text>
                  <View style={styles.skillGroup}>
                    {(resume.personalSkills || [])
                      .filter((s) => s.trim())
                      .map((skill, i) => (
                        <Text key={i} style={styles.skillTag}>
                          {skill}
                        </Text>
                      ))}
                  </View>
                </View>
              )}

            {/* Interests */}
            {resume.interests &&
              resume.interests.length > 0 &&
              (resume.interests || []).some((interest) => interest.name.trim()) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Interests</Text>
                  <View style={{ gap: 4 }}>
                    {(resume.interests || [])
                      .filter((interest) => interest.name.trim())
                      .map((interest, i) => (
                        <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                          <Text
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: colors.primary,
                            }}
                          >
                            {interest.name}
                          </Text>
                          {interest.details && interest.details.trim() && (
                            <Text style={{ fontSize: 8, color: colors.textMuted }}>
                              {interest.details}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                </View>
              )}

            {/* Languages */}
            {resume.languages &&
              resume.languages.length > 0 &&
              (resume.languages || []).some((l) => l.trim()) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.skillGroup}>
                    {(resume.languages || [])
                      .filter((l) => l.trim())
                      .map((lang, i) => (
                        <Text key={i} style={styles.skillTag}>
                          {lang}
                        </Text>
                      ))}
                  </View>
                </View>
              )}

            {/* Certifications */}
            {resume.certifications &&
              resume.certifications.length > 0 &&
              (resume.certifications || []).some((c) => c.trim()) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  {(resume.certifications || [])
                    .filter((c) => c.trim())
                    .map((cert, i) => (
                      <View key={i} style={{ marginBottom: 4 }}>
                        <Text style={{ fontSize: 8.5 }}>{cert}</Text>
                      </View>
                    ))}
                </View>
              )}

            {/* Non Related Referees - MOVED HERE */}
            {resume.referees &&
              resume.referees.length > 0 &&
              (resume.referees || []).some((r) => r.name) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Non Related Referees</Text>
                  <View style={{ gap: 8 }}>
                    {(resume.referees || [])
                      .filter((r) => r.name)
                      .map((ref, i) => (
                        <View key={i} style={{ marginBottom: 4 }} wrap={false}>
                          <Text
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: colors.primary,
                            }}
                          >
                            {ref.name}
                          </Text>
                          <Text style={{ fontSize: 8, color: colors.text }}>
                            {ref.position}
                          </Text>
                          <Text
                            style={{ fontSize: 8, color: colors.textMuted }}
                          >
                            {ref.workingPlacement}
                          </Text>
                          {ref.email && (
                            <Text style={{ fontSize: 8, color: colors.accent }}>
                              {ref.email}
                            </Text>
                          )}
                          {ref.phone && (
                            <Text style={{ fontSize: 8, color: colors.accent }}>
                              {ref.phone}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                </View>
              )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Link src="https://prasadm.vercel.app/tools/resume-creator" style={styles.contactLink}>
            <Text style={styles.footerText}>Generated via Resume Architect</Text>
          </Link>
          <Text style={styles.footerText}>© {resume.name} {currentYear}</Text>
        </View>
      </Page>
    </Document>
  );
}
