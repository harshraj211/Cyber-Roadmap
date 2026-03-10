// ═══════════════════════════════════════════════════════════════
// CYBERNAV DATA — 8 Branches × 3 Levels
// ═══════════════════════════════════════════════════════════════

const BRANCH_META = {
  cloud: {
    id: "cloud", icon: "☁️", name: "Cloud Security",
    tagline: "Secure cloud infrastructure & earn AWS/Azure certs",
    color: "#60a5fa", bg: "rgba(96,165,250,.08)",
    desc: "Master cloud security architecture, IAM, network controls, threat detection, and compliance across AWS, Azure & GCP.",
    demand: 95, salary: "₹8–25 LPA", topRole: "Cloud Security Engineer",
    tags: ["AWS","Azure","GCP","IAM","DevSecOps"],
  },
  soc: {
    id: "soc", icon: "🛡️", name: "SOC Analyst / Blue Team",
    tagline: "Detect, investigate & respond to threats",
    color: "#34d399", bg: "rgba(52,211,153,.08)",
    desc: "Build expertise in threat detection, SIEM, log analysis, incident response, and blue team operations.",
    demand: 98, salary: "₹5–18 LPA", topRole: "SOC Analyst / Threat Hunter",
    tags: ["SIEM","Splunk","Incident Response","Threat Hunting"],
  },
  pentest: {
    id: "pentest", icon: "⚔️", name: "Penetration Testing",
    tagline: "Break systems ethically & report findings",
    color: "#f87171", bg: "rgba(248,113,113,.08)",
    desc: "Learn offensive security techniques, web/network/AD exploitation, report writing, and earn OSCP/CEH.",
    demand: 90, salary: "₹7–30 LPA", topRole: "Penetration Tester / Red Teamer",
    tags: ["OSCP","Kali","Burp Suite","Metasploit","CTF"],
  },
  grc: {
    id: "grc", icon: "📋", name: "GRC / Compliance",
    tagline: "Governance, risk management & regulatory compliance",
    color: "#fbbf24", bg: "rgba(251,191,36,.08)",
    desc: "Master risk frameworks, ISO 27001, NIST, GDPR, audit processes, and build security governance programs.",
    demand: 85, salary: "₹6–20 LPA", topRole: "GRC Analyst / CISO",
    tags: ["ISO27001","NIST","GDPR","Risk","Audit"],
  },
  dfir: {
    id: "dfir", icon: "🔬", name: "Digital Forensics & IR",
    tagline: "Investigate incidents & recover digital evidence",
    color: "#a78bfa", bg: "rgba(167,139,250,.08)",
    desc: "Develop skills in disk/memory forensics, network forensics, incident handling, and malware triage.",
    demand: 88, salary: "₹6–22 LPA", topRole: "Digital Forensics Analyst",
    tags: ["Autopsy","Volatility","DFIR","Chain of Custody"],
  },
  appsec: {
    id: "appsec", icon: "🔐", name: "AppSec / DevSecOps",
    tagline: "Build security into the software development lifecycle",
    color: "#f472b6", bg: "rgba(244,114,182,.08)",
    desc: "Learn OWASP, secure code review, SAST/DAST, CI/CD security, container security, and threat modeling.",
    demand: 92, salary: "₹8–28 LPA", topRole: "Application Security Engineer",
    tags: ["OWASP","SAST","DAST","DevSecOps","Container Sec"],
  },
  network: {
    id: "network", icon: "🌐", name: "Network Security",
    tagline: "Defend networks with firewalls, IDS/IPS & zero trust",
    color: "#fb923c", bg: "rgba(251,146,60,.08)",
    desc: "Master network protocols, firewall configuration, VPN, IDS/IPS, zero trust architecture, and CCNA security.",
    demand: 87, salary: "₹5–18 LPA", topRole: "Network Security Engineer",
    tags: ["CCNA","Firewall","Zero Trust","IDS/IPS","VPN"],
  },
  malware: {
    id: "malware", icon: "🦠", name: "Malware Analysis",
    tagline: "Reverse engineer malware & understand threat actors",
    color: "#4ade80", bg: "rgba(74,222,128,.08)",
    desc: "Static and dynamic malware analysis, reverse engineering, sandbox analysis, threat intel, and YARA rules.",
    demand: 82, salary: "₹7–25 LPA", topRole: "Malware Analyst / Threat Intel",
    tags: ["Ghidra","IDA Pro","RE","YARA","Sandboxing"],
  },
};

// ── PHASES PER BRANCH × LEVEL ──
// Each phase has: name, label, color, milestones[], topics[]
// topics = array of topic strings (no fixed day count — milestone-based)

const BRANCH_PLANS = {

  // ─────────────────────────────────────
  cloud: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"IT & Networking Foundations", color:"#60a5fa", icon:"🌱",
          milestones:["Understand OSI model","Set up a Linux VM","Learn basic CLI","Understand TCP/IP"],
          topics:["Computer networking basics","OSI model deep dive","TCP/IP & subnetting","Linux fundamentals","CLI crash course","File permissions & users","Bash scripting intro","Virtualisation basics","Cloud concepts (what is cloud?)","Public vs Private vs Hybrid cloud","AWS account creation & free tier","Navigating the AWS Console","Regions, AZs & Edge Locations","Core AWS services overview","Billing & cost management","Cloud shared responsibility model"],
        },
        { name:"Phase 2", label:"Cloud Core Services & IAM", color:"#34d399", icon:"⚙️",
          milestones:["Launch EC2 instances","Configure S3 with policies","Set up IAM roles & MFA","Build a basic VPC"],
          topics:["IAM: users, groups, policies","IAM roles & trust policies","MFA & least privilege","EC2 deep dive","AMIs, instance types, EBS","S3 buckets: creation & config","S3 bucket policies & ACLs","S3 encryption & versioning","VPC architecture","Subnets, route tables, gateways","Security groups vs NACLs","VPC peering & endpoints","RDS basics & security","Lambda & serverless intro","CloudFormation basics","AWS CLI setup & usage"],
        },
        { name:"Phase 3", label:"Cloud Security Fundamentals", color:"#fbbf24", icon:"🔒",
          milestones:["Enable CloudTrail & GuardDuty","Set up CloudWatch alerts","Pass a CCP practice exam","Build a security checklist"],
          topics:["Threat landscape in cloud","Cloud attack vectors","Data classification","CloudTrail setup & analysis","CloudWatch alarms & dashboards","AWS GuardDuty configuration","AWS Config & compliance","AWS Security Hub","SIEM basics for cloud","S3 misconfiguration risks","IAM privilege escalation paths","Key Management Service (KMS)","Secrets Manager","Certificate Manager","WAF & Shield intro","AWS CCP exam preparation"],
        },
        { name:"Phase 4", label:"AWS CCP Certification", color:"#f87171", icon:"🏆",
          milestones:["Score 80%+ on 3 mock exams","Book and pass AWS CCP","Review all failed questions","Share on LinkedIn"],
          topics:["CCP domain: Cloud Concepts","CCP domain: Security & Compliance","CCP domain: Technology","CCP domain: Billing","Mock exam 1 + review","Weak area deep dive","Mock exam 2 + review","Exam day strategy","Rest & light revision","🎯 AWS CCP EXAM","Post-exam reflection","Plan next cert (SAA/Security Specialty)"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"AWS Security Deep Dive", color:"#60a5fa", icon:"🔍",
          milestones:["Audit an AWS account","Set up centralized logging","Write IAM policy from scratch","Build secure VPC with bastions"],
          topics:["AWS security architecture review","Advanced IAM: permission boundaries","Service Control Policies (SCPs)","AWS Organizations & multi-account","Advanced VPC: Transit Gateway","PrivateLink & VPC endpoints","Network Firewall","CloudTrail Lake","Security Lake","Detective & Macie","Inspector v2","AWS Security Reference Architecture"],
        },
        { name:"Phase 2", label:"Offensive Cloud Techniques", color:"#f87171", icon:"⚔️",
          milestones:["Complete CloudGoat scenario","Enumerate AWS misconfigs","Map an attack path","Write a pentest finding"],
          topics:["Cloud threat modeling","Cloud attack kill chain","S3 enumeration & attacks","IAM escalation techniques","CloudGoat walkthroughs","Pacu framework","Prowler for cloud auditing","ScoutSuite scanning","Cloud metadata SSRF attacks","Lambda abuse scenarios","Cross-account attacks","Cloud forensics basics"],
        },
        { name:"Phase 3", label:"Multi-Cloud & DevSecOps", color:"#34d399", icon:"🚀",
          milestones:["Scan a CI/CD pipeline","Deploy Terraform with security checks","Set up SAST in GitHub Actions","Pass Security Specialty mock"],
          topics:["Azure security overview","GCP security overview","Infrastructure as Code security","Terraform security scanning","GitHub Actions security","SAST/DAST in CI/CD","Container security (Docker)","Kubernetes security basics","CSPM tools overview","Cloud-native SIEM","Compliance as Code","AWS Security Specialty exam prep","Mock exams x3","🏆 AWS Security Specialty"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Advanced Threat Detection & CSPM", color:"#60a5fa", icon:"🎯",
          milestones:["Build a detection-as-code pipeline","Tune SIEM for cloud","Identify unknown attack paths","Write custom GuardDuty findings"],
          topics:["Detection engineering for cloud","Custom GuardDuty threat intel feeds","EventBridge + Lambda automation","Security automation with CDK","Cloud SIEM architecture","Threat hunting in CloudTrail","Attack surface management","Cloud asset inventory automation","CSPM deep dive","Custom compliance frameworks","Cloud red team exercise","Purple teaming in cloud"],
        },
        { name:"Phase 2", label:"Architecture & Leadership", color:"#fbbf24", icon:"👑",
          milestones:["Design a zero-trust cloud arch","Present a security roadmap","Pass CCSP exam","Contribute to open source cloud security tool"],
          topics:["Zero trust architecture in cloud","NIST CSF for cloud","Cloud security program design","Risk quantification (FAIR model)","Board-level reporting","Cloud security vendor landscape","CCSP exam preparation","CCSP mock exams","🏆 CCSP CERTIFICATION","Security architecture patterns","Leading cloud security teams","Building a cloud security practice"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  soc: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Foundations", color:"#34d399", icon:"🌱",
          milestones:["Understand OSI & networking","Set up a Linux VM","Understand log formats","Map the cyber kill chain"],
          topics:["Networking fundamentals","TCP/IP, DNS, HTTP basics","OSI model","Linux for SOC analysts","Windows event logs intro","Log formats: syslog, JSON, CEF","What is a SIEM?","Cyber kill chain","MITRE ATT&CK framework intro","Threat actors & their motivations","Alert triage basics","Common attack types overview"],
        },
        { name:"Phase 2", label:"SOC Tools & Detection", color:"#60a5fa", icon:"🔧",
          milestones:["Write 3 SIEM detection rules","Investigate a sample alert","Understand IDS vs IPS","Set up Splunk/ELK lab"],
          topics:["Splunk fundamentals","Splunk search language (SPL)","ELK stack setup","Creating detection rules","Writing YARA rules intro","Snort/Suricata basics","IDS vs IPS","EDR fundamentals","Carbon Black / CrowdStrike intro","Phishing analysis techniques","Malware indicators (IOCs)","Threat intelligence platforms"],
        },
        { name:"Phase 3", label:"Incident Response", color:"#fbbf24", icon:"🚨",
          milestones:["Handle a simulated incident end-to-end","Write an IR report","Complete a Blue Team Labs scenario","Pass CompTIA Security+ mock"],
          topics:["NIST incident response lifecycle","Preparation & detection","Containment strategies","Eradication & recovery","Post-incident review","IR playbooks","Digital evidence handling","Memory analysis intro","Network forensics basics","Blue Team Labs Online","TryHackMe SOC paths","CompTIA Security+ prep","🏆 CompTIA Security+"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"Advanced Detection Engineering", color:"#34d399", icon:"🔍",
          milestones:["Build a detection-as-code repo","Hunt for APT TTPs","Write 10 Sigma rules","Tune a SIEM for low false positives"],
          topics:["Detection-as-code concepts","Sigma rule writing","MITRE ATT&CK for detection","Threat hunting methodology","Hypothesis-based hunting","Hunting with KQL (Azure Sentinel)","Hunting with SPL (Splunk)","Velociraptor forensics","UEBA fundamentals","Behavioral analytics","SOC automation with SOAR","Building detection playbooks"],
        },
        { name:"Phase 2", label:"Threat Intelligence", color:"#a78bfa", icon:"🕵️",
          milestones:["Profile a threat actor","Write a CTI report","Set up a MISP instance","Correlate IOCs across incidents"],
          topics:["Cyber threat intelligence lifecycle","Diamond model of intrusion","MISP platform setup","STIX/TAXII standards","CTI report writing","Open-source intel (OSINT)","Dark web monitoring","Threat actor profiling","Campaign analysis","Attribution challenges","CTI sharing communities","Intelligence-driven SOC"],
        },
        { name:"Phase 3", label:"CySA+ Certification", color:"#f87171", icon:"🏆",
          milestones:["Score 85% on 3 CySA+ mocks","Pass CompTIA CySA+","Build a SOC portfolio","Land a Tier 2 SOC role"],
          topics:["CySA+ domain review","Vulnerability management","Threat management","Security architecture","CySA+ mock exams x3","Exam strategy","🏆 CompTIA CySA+","SOC portfolio project","Career roadmap planning"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"SOC Architecture & Leadership", color:"#34d399", icon:"🎯",
          milestones:["Design a SOC architecture","Build a metrics dashboard","Mentor a junior analyst","Run a purple team exercise"],
          topics:["Designing tiered SOC models","MSSP vs internal SOC","SOC metrics & KPIs","Detection engineering at scale","Purple team methodology","Adversary simulation","Red team debrief process","SOC tooling evaluation","SIEM vendor comparison","XDR platforms","Building SOC runbooks","SOC automation strategy"],
        },
        { name:"Phase 2", label:"CISSP / Advanced Certs", color:"#60a5fa", icon:"👑",
          milestones:["Pass CISSP exam","Publish a threat research blog","Speak at a security meetup","Lead an IR engagement"],
          topics:["CISSP domain overview","Security & Risk Management","Asset Security","Security Architecture","Communication & Network","Identity & Access Management","Security Assessment & Testing","Security Operations","Software Development Security","CISSP mock exams x4","🏆 CISSP CERTIFICATION","Thought leadership in SOC"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  pentest: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Foundations & Linux", color:"#f87171", icon:"🌱",
          milestones:["Navigate Linux CLI comfortably","Understand TCP/IP","Set up a Kali VM","Complete 3 TryHackMe rooms"],
          topics:["Linux fundamentals","File system & permissions","Bash scripting basics","Networking: TCP/IP, UDP","DNS, HTTP, HTTPS","Wireshark basics","Kali Linux setup","VirtualBox/VMware lab","CTF mindset","TryHackMe intro path","Python scripting for hackers","Recon basics (passive)"],
        },
        { name:"Phase 2", label:"Web Application Hacking", color:"#fbbf24", icon:"🌐",
          milestones:["Complete PortSwigger Web Academy labs","Find your first XSS & SQLi","Use Burp Suite fluently","Write a basic pentest finding"],
          topics:["HTTP methods & cookies","Burp Suite setup & proxy","OWASP Top 10 overview","SQL Injection","Cross-Site Scripting (XSS)","CSRF & SSRF","Directory traversal","Authentication flaws","Business logic bugs","Broken access control","PortSwigger Academy labs","Writing pentest findings"],
        },
        { name:"Phase 3", label:"Network & System Hacking", color:"#a78bfa", icon:"🖥️",
          milestones:["Root a HackTheBox Easy box","Use Metasploit for exploitation","Enumerate a Windows machine","Complete eJPT"],
          topics:["Nmap scanning techniques","Service enumeration","Metasploit framework","Exploitation basics","Post-exploitation","Privilege escalation (Linux)","Privilege escalation (Windows)","Active Directory intro","Password attacks","Hydra & Hashcat","HackTheBox Easy machines","🏆 eJPT Certification"],
        },
        { name:"Phase 4", label:"CEH / Pentest+ Certification", color:"#f87171", icon:"🏆",
          milestones:["Pass 3 CEH mock exams","Pass CEH exam","Write a full pentest report","Build a portfolio"],
          topics:["CEH domain review","Footprinting & recon","Scanning & enumeration","System hacking","Malware threats","Social engineering","Session hijacking","CEH mock exams x3","🏆 CEH Exam","Building a pentest portfolio"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"Advanced Web & API Testing", color:"#f87171", icon:"🔍",
          milestones:["Find a chain of vulns in a lab","Test a GraphQL API","Bypass WAF on a test target","Write a full web pentest report"],
          topics:["Advanced OWASP testing","GraphQL security testing","REST API pentesting","OAuth/OIDC vulnerabilities","JWT attacks","SSRF to RCE chains","Second-order SQL injection","Advanced XSS payloads","NoSQL injection","XXE injection","Prototype pollution","CORS misconfigurations","Web cache poisoning","HTTP request smuggling","Advanced Burp Suite extensions","Full web pentest report writing"],
        },
        { name:"Phase 2", label:"Active Directory Attacks", color:"#fbbf24", icon:"🏰",
          milestones:["Compromise an AD lab","Perform Kerberoasting","Execute a pass-the-hash attack","Write a full AD pentest report"],
          topics:["Active Directory architecture","BloodHound & SharpHound","LDAP enumeration","Kerberoasting","AS-REP Roasting","Pass-the-Hash / Pass-the-Ticket","DCSync attack","Golden Ticket / Silver Ticket","NTLM relay attacks","AD Certificate Services attacks","Azure AD attacks","Lateral movement techniques","Domain persistence","AD pentest report writing"],
        },
        { name:"Phase 3", label:"OSCP Preparation", color:"#60a5fa", icon:"🏆",
          milestones:["Root 20+ HTB machines","Complete PEN-200 course","Score 70+ on OSCP exam","Pass OSCP"],
          topics:["OffSec PEN-200 overview","Buffer overflow basics","Windows BoF","Linux BoF","Report writing for OSCP","HTB Pro Labs","PWK lab machines","Try Harder methodology","Exam simulation x2","🏆 OSCP CERTIFICATION"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Red Team Operations", color:"#f87171", icon:"🔴",
          milestones:["Execute a full red team engagement","Build a C2 infrastructure","Bypass EDR/AV","Write an adversary simulation report"],
          topics:["Red team vs pentest differences","Adversary emulation planning","C2 frameworks: Cobalt Strike, Sliver","Command & Control infrastructure","EDR evasion techniques","AV bypass methods","AMSI bypass","LOLBins & living off the land","Physical security testing","Social engineering at scale","Red team report writing","Debrief & purple teaming"],
        },
        { name:"Phase 2", label:"CRTO / Advanced Red Team Certs", color:"#a78bfa", icon:"👑",
          milestones:["Pass CRTO exam","Lead a red team engagement","Publish offensive security research","Mentor mid-level pentesters"],
          topics:["Cobalt Strike advanced usage","CRTO exam preparation","Custom tooling development","Evasion at scale","Ransomware simulation","Full kill chain emulation","CRTO mock exams","🏆 CRTO CERTIFICATION","Red team program leadership","Building a red team practice"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  grc: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Security Fundamentals", color:"#fbbf24", icon:"🌱",
          milestones:["Explain CIA triad","Map assets to risks","Understand what a policy is","Describe 3 compliance frameworks"],
          topics:["What is cybersecurity?","CIA Triad","Risk management concepts","Threat vs vulnerability vs risk","Security policies & procedures","Data classification","Asset management basics","Business continuity concepts","Intro to compliance","NIST Cybersecurity Framework","ISO 27001 overview","GDPR basics"],
        },
        { name:"Phase 2", label:"Risk & Frameworks", color:"#60a5fa", icon:"📊",
          milestones:["Complete a basic risk assessment","Write a security policy","Map controls to NIST CSF","Create a simple audit checklist"],
          topics:["Risk assessment methodologies","Qualitative vs quantitative risk","Risk treatment options","Residual risk","Control frameworks overview","NIST 800-53","CIS Controls","SOC 2 overview","HIPAA basics","PCI-DSS basics","Control implementation","Audit process basics","Gap analysis","Vendor risk management intro","Third-party risk","Writing risk reports"],
        },
        { name:"Phase 3", label:"CompTIA Security+ & GRC Analyst", color:"#34d399", icon:"🏆",
          milestones:["Pass Security+ mock exams","Earn CompTIA Security+","Write a complete risk assessment","Apply for GRC Analyst role"],
          topics:["Security+ GRC domains","Risk management for Security+","Compliance & regulations","Security+ mock exams x3","🏆 CompTIA Security+","GRC analyst job requirements","Building a GRC portfolio","Interview prep for GRC roles"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"ISO 27001 & Audit", color:"#fbbf24", icon:"🔍",
          milestones:["Lead an ISO 27001 gap assessment","Write an ISMS scope document","Perform an internal audit","Produce an audit report"],
          topics:["ISO 27001:2022 deep dive","ISMS scope & boundaries","Statement of Applicability","Annex A controls","Risk treatment plan","Internal audit methodology","Audit evidence collection","Non-conformity management","Corrective action plans","Management review","Continual improvement","ISO 27001 Lead Auditor prep","Lead Auditor mock exam","🏆 ISO 27001 Lead Auditor"],
        },
        { name:"Phase 2", label:"Privacy & Advanced Compliance", color:"#a78bfa", icon:"🔏",
          milestones:["Conduct a GDPR DPIA","Build a vendor risk program","Write a GDPR incident notification","Map controls to multiple frameworks"],
          topics:["GDPR deep dive","DPIA methodology","Data subject rights","Privacy by design","CCPA overview","Cross-framework mapping","NIST Privacy Framework","SOC 2 Type II readiness","PCI-DSS implementation","Cloud compliance","AI governance & compliance","GRC tools: ServiceNow, Archer"],
        },
        { name:"Phase 3", label:"CISM / CRISC Certification", color:"#f87171", icon:"🏆",
          milestones:["Pass CISM exam","Build a risk register","Present risk to leadership","Land senior GRC role"],
          topics:["CISM domain review","Information security governance","Risk management","Information security program","Incident management","CISM mock exams x3","🏆 CISM Exam","CRISC overview","Risk & information technology","Career path to CISO"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Security Program Leadership", color:"#fbbf24", icon:"🎯",
          milestones:["Build a security metrics program","Present to the board","Design a 3-year security roadmap","Pass CISSP or CISO cert"],
          topics:["Building an ISMS from scratch","Security strategy alignment","Board reporting frameworks","Risk quantification (FAIR model)","Security budget planning","KPIs and metrics for security","Regulatory landscape analysis","M&A security due diligence","Security culture programs","Third-party & supply chain risk","Cyber insurance","CISSP or CISO certification"],
        },
        { name:"Phase 2", label:"CISO Track", color:"#60a5fa", icon:"👑",
          milestones:["Lead a full compliance program","Build a vendor risk program","Publish a GRC thought piece","Mentor GRC professionals"],
          topics:["CISO responsibilities","Security governance models","Legal & liability for CISOs","Incident response leadership","Crisis communications","Working with legal & HR","Security program maturity models","CMMC framework","Global regulatory changes","The future of GRC","Building a GRC team","CISO mock interview prep"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  dfir: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Digital Forensics Foundations", color:"#a78bfa", icon:"🌱",
          milestones:["Understand forensics methodology","Image a drive with FTK Imager","Analyze Windows artifacts","Complete a THM forensics room"],
          topics:["What is digital forensics?","Chain of custody","Types of digital evidence","Forensics methodology","FTK Imager walkthrough","Disk imaging concepts","File systems: NTFS, FAT32, EXT4","File carving basics","Windows Registry forensics","Windows event logs","Prefetch & artifacts","Browser forensics","Autopsy tool intro","TryHackMe forensics rooms","Evidence preservation","Report writing basics"],
        },
        { name:"Phase 2", label:"Incident Response Basics", color:"#34d399", icon:"🚨",
          milestones:["Handle a simulated IR engagement","Write an IR report","Analyze a PCAP file","Identify malware IOCs"],
          topics:["NIST IR lifecycle","SANS IR process","Detection & analysis phase","Containment strategies","Eradication & recovery","Lessons learned","Wireshark for IR","Network packet analysis","Memory forensics intro","Volatility framework basics","Malware triage basics","IOC extraction","YARA rules intro","IR report writing","Case management","Blue Team Labs Online"],
        },
        { name:"Phase 3", label:"CompTIA Security+ & CHFI", color:"#fbbf24", icon:"🏆",
          milestones:["Pass Security+","Attempt EC-Council CHFI","Complete a full forensics case","Build a DFIR portfolio"],
          topics:["Security+ IR domains","Security+ mock exams","🏆 CompTIA Security+","CHFI overview","CHFI lab environments","Evidence handling for CHFI","CHFI mock exam","🏆 CHFI Certification","Portfolio project: full forensics case","DFIR career roadmap"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"Advanced Memory & Disk Forensics", color:"#a78bfa", icon:"🔍",
          milestones:["Analyze a full memory dump","Recover deleted files","Extract malware from memory","Complete a CTF forensics challenge"],
          topics:["Volatility 3 advanced usage","Process injection detection","Rootkit analysis","Anti-forensics techniques","Advanced NTFS forensics","VSS & shadow copies","LNK file analysis","Jump lists & shellbags","Email forensics","Mobile forensics intro","iOS forensics","Android forensics","Cloud forensics intro","AWS CloudTrail forensics","Forensics CTF challenges"],
        },
        { name:"Phase 2", label:"Malware Triage & Threat Intel", color:"#f87171", icon:"🦠",
          milestones:["Triage 5 malware samples","Write a malware analysis report","Extract C2 indicators","Map malware to MITRE ATT&CK"],
          topics:["Malware types & families","Static analysis basics","PEStudio & strings","Dynamic analysis with Cuckoo","ANY.RUN sandbox","Behavioral analysis","Network indicators","Threat intelligence for DFIR","MITRE ATT&CK mapping","TTP-based hunting","DFIR automation","Scripting for forensics (Python)"],
        },
        { name:"Phase 3", label:"GCFE / GCFA Certification", color:"#34d399", icon:"🏆",
          milestones:["Pass GCFE exam","Lead an IR engagement","Publish a forensics case study","Land Senior DFIR role"],
          topics:["SANS FOR508 overview","GCFE exam domains","Windows forensics at scale","Enterprise IR","GCFE mock preparation","🏆 GCFE / GCFA Certification","DFIR leadership skills","Enterprise forensics tooling"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Enterprise DFIR & Threat Hunting", color:"#a78bfa", icon:"🎯",
          milestones:["Lead enterprise IR engagement","Build a threat hunting program","Design a forensics toolkit","Write advanced YARA rules"],
          topics:["Enterprise IR at scale","Threat hunting methodology","EDR-driven hunting","Timeline analysis at scale","Forensics automation","DFIR orchestration","Cloud-native forensics","Kubernetes forensics","Building a forensics lab","Detection engineering for DFIR","Purple team DFIR exercises","Attribution analysis"],
        },
        { name:"Phase 2", label:"GCFE/GCFA & Leadership", color:"#fbbf24", icon:"👑",
          milestones:["Pass GCFA exam","Publish threat research","Speak at a DFIR conference","Lead a DFIR team"],
          topics:["Advanced memory forensics","GCFA exam preparation","GCFA mock exams","🏆 GCFA CERTIFICATION","Threat research publication","DFIR program leadership","IR retainer programs","Forensics vendor evaluation","Building a DFIR practice","DFIR thought leadership"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  appsec: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Programming & Web Basics", color:"#f472b6", icon:"🌱",
          milestones:["Write a basic Python script","Understand HTTP request/response","Explain XSS & SQLi","Set up a dev environment"],
          topics:["Python fundamentals for AppSec","Web fundamentals: HTML, CSS, JS","HTTP deep dive","APIs: REST, SOAP, GraphQL","Developer tools in browser","Git & version control basics","Docker intro","SQL basics","How web apps work","Authentication mechanisms","Sessions & cookies","OWASP Top 10 overview"],
        },
        { name:"Phase 2", label:"Web Vulnerabilities & Testing", color:"#60a5fa", icon:"🐛",
          milestones:["Find XSS in DVWA","Exploit SQLi in a lab","Use Burp Suite for scanning","Complete PortSwigger basics"],
          topics:["Setting up DVWA / WebGoat","Burp Suite setup","XSS: reflected, stored, DOM","SQL injection manual testing","IDOR vulnerabilities","Authentication bypass","Broken access control","CSRF attacks","File upload vulnerabilities","Command injection","SSRF basics","PortSwigger Academy fundamentals","Writing security bug reports","Responsible disclosure","OWASP Testing Guide","Secure coding principles"],
        },
        { name:"Phase 3", label:"Security+ & AppSec Analyst", color:"#fbbf24", icon:"🏆",
          milestones:["Pass CompTIA Security+","Review source code for vulns","Write a secure code review report","Apply for AppSec Analyst role"],
          topics:["Security+ AppSec domains","Secure development lifecycle","Security+ mock exams x3","🏆 CompTIA Security+","Secure code review basics","OWASP Code Review Guide","Bug bounty introduction","HackerOne / Bugcrowd platforms","First bug bounty submission","AppSec career roadmap"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"SAST, DAST & Secure SDLC", color:"#f472b6", icon:"🔧",
          milestones:["Integrate SAST into a pipeline","Run DAST against a test app","Conduct a threat model","Write secure SDLC documentation"],
          topics:["Secure SDLC frameworks","Threat modeling (STRIDE)","Attack trees","SAST tools: Semgrep, Checkmarx","DAST tools: OWASP ZAP, Burp Pro","SCA: dependency scanning","Secrets in code","GitHub Advanced Security","Snyk integration","Container scanning","IaC security scanning","Integrating AppSec in CI/CD","Developer security training","Bug bar definition","Triage process for AppSec","AppSec program metrics"],
        },
        { name:"Phase 2", label:"Advanced Exploitation & Bug Bounty", color:"#34d399", icon:"🎯",
          milestones:["Report a valid bug bounty finding","Find a P2 vulnerability","Exploit a logic flaw","Write a chain of vulnerabilities"],
          topics:["Advanced OWASP techniques","Business logic testing","OAuth 2.0 attacks","SAML vulnerabilities","JWT attacks","WebSockets security","GraphQL advanced testing","API rate limiting & auth","Server-side template injection","Deserialization attacks","Race conditions","Mass assignment","HTTP parameter pollution","Subdomain takeover","Bug bounty methodology","Recon techniques for AppSec"],
        },
        { name:"Phase 3", label:"GWEB / eWPTX Certification", color:"#a78bfa", icon:"🏆",
          milestones:["Pass eWPTX exam","Build an AppSec program","Land Application Security Engineer role","Mentor junior AppSec engineers"],
          topics:["eWPTX exam prep","Web pentest methodology","eWPTX mock labs","🏆 eWPTX Certification","GWEB certification overview","AppSec program building","Security champion programs","Metrics & reporting","AppSec tooling landscape","Career to senior AppSec"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"DevSecOps at Scale", color:"#f472b6", icon:"🚀",
          milestones:["Build a DevSecOps pipeline","Design a product security program","Build a security champion network","Automate vulnerability triage"],
          topics:["DevSecOps maturity models","Building security into SDLC at scale","Platform engineering for security","Policy as Code","Open Policy Agent","Kubernetes admission controllers","Supply chain security","SLSA framework","SBOM generation","Zero trust for microservices","Runtime security","eBPF for security","Security observability","DevSecOps metrics & KPIs","Building security culture","Executive reporting for AppSec"],
        },
        { name:"Phase 2", label:"CSSLP / Advanced AppSec", color:"#fbbf24", icon:"👑",
          milestones:["Pass CSSLP exam","Publish security research","Lead a product security team","Influence secure design across org"],
          topics:["CSSLP domain overview","Secure software concepts","Secure software requirements","Secure software design","Secure software implementation","Secure software testing","Secure software lifecycle","Supply chain & acquisition","CSSLP mock exams x3","🏆 CSSLP CERTIFICATION","AppSec thought leadership","Building a product security org"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  network: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Networking Fundamentals", color:"#fb923c", icon:"🌱",
          milestones:["Subnet a /24 network","Configure a basic switch/router","Capture traffic with Wireshark","Explain OSI model to someone"],
          topics:["OSI model deep dive","TCP/IP model","IP addressing & subnetting","VLSM and CIDR","IPv6 basics","DNS, DHCP, HTTP, FTP","TCP vs UDP","ARP protocol","Routing concepts","Static routing","Dynamic routing (OSPF, EIGRP)","Switching: VLANs, STP","Cisco IOS basics","GNS3 / Packet Tracer lab","Wireshark fundamentals","Network troubleshooting"],
        },
        { name:"Phase 2", label:"Security Fundamentals", color:"#34d399", icon:"🔒",
          milestones:["Configure a firewall ruleset","Understand IDS/IPS alerts","Set up a basic VPN","Understand common attacks"],
          topics:["Network security concepts","Firewall types & architecture","ACLs and packet filtering","Stateful vs stateless inspection","Cisco ASA / Palo Alto basics","IDS vs IPS concepts","Snort rules writing","VPN technologies: IPSec, SSL/TLS","Site-to-site VPN config","Remote access VPN","Network segmentation","DMZ architecture","Network attacks: DoS, MITM, ARP spoofing","Wireless security (WPA2/3)","NAC concepts","Security monitoring basics"],
        },
        { name:"Phase 3", label:"CompTIA Network+ & Security+", color:"#fbbf24", icon:"🏆",
          milestones:["Pass Network+ exam","Pass Security+ exam","Build a home network lab","Document a network architecture"],
          topics:["Network+ exam prep","Network+ mock exams x3","🏆 CompTIA Network+","Security+ network domains","Security+ mock exams x3","🏆 CompTIA Security+","Home lab documentation","Network security portfolio"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"Advanced Network Security", color:"#fb923c", icon:"🔍",
          milestones:["Configure Palo Alto NGFW","Set up a full IDS/IPS stack","Implement 802.1X NAC","Conduct a network security audit"],
          topics:["Next-gen firewall deep dive","Palo Alto & Fortinet deep dive","App-ID & User-ID","Intrusion detection systems","Snort & Suricata advanced","Full packet capture (PCAP)","NetFlow analysis","802.1X / NAC implementation","RADIUS & TACACS+","Network access control","VPN at scale","SD-WAN security","Network security audit methodology","CIS Benchmarks for networking","Hardening Cisco devices","Network security documentation"],
        },
        { name:"Phase 2", label:"Zero Trust & SASE", color:"#60a5fa", icon:"🏗️",
          milestones:["Design a zero trust architecture","Evaluate a SASE solution","Implement micro-segmentation","Write a network security strategy"],
          topics:["Zero trust principles","Zero trust network access (ZTNA)","BeyondCorp model","Microsegmentation techniques","SASE framework","SD-WAN & SASE integration","Cloud networking security","AWS VPC security deep dive","Azure network security","DNS security (DNSSEC, DoH)","BGP security","DDoS mitigation techniques","Network detection & response (NDR)","Encrypted traffic analysis","Network security program design","Executive reporting"],
        },
        { name:"Phase 3", label:"CCNP Security Certification", color:"#f87171", icon:"🏆",
          milestones:["Pass SCOR exam","Pass one CCNP Security concentration","Build a network security lab","Land Network Security Engineer role"],
          topics:["CCNP Security overview","SCOR exam prep: core security","Cisco Firepower deep dive","Cisco ISE & NAC","SCOR mock exams x3","🏆 CCNP SCOR","Concentration exam prep","🏆 CCNP Security Concentration","Career: Network Security Engineer"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Network Security Architecture", color:"#fb923c", icon:"🎯",
          milestones:["Design enterprise network security","Evaluate NDR platform","Build detection use cases","Respond to a network-based incident"],
          topics:["Enterprise network security architecture","Network security framework design","NDR platforms: ExtraHop, Vectra","Encrypted traffic analysis at scale","Network threat hunting","BGP hijacking attacks & defense","5G network security","OT/ICS network security","Network forensics at scale","Building network security playbooks","Network security automation","Purple team: network scenarios"],
        },
        { name:"Phase 2", label:"CCIE Security / Architecture", color:"#fbbf24", icon:"👑",
          milestones:["Pass CCIE Security written","Complete CCIE lab or SABSA","Lead a network security transformation","Publish a network security research piece"],
          topics:["CCIE Security written prep","CCIE lab overview","SABSA architecture framework","Network security program leadership","Vendor landscape evaluation","Network security strategy","CCIE / SABSA exam preparation","🏆 CCIE Security or SABSA","Thought leadership in network security","Building a network security team"],
        },
      ]
    },
  },

  // ─────────────────────────────────────
  malware: {
    beginner: {
      phases: [
        { name:"Phase 1", label:"Programming & Reversing Foundations", color:"#4ade80", icon:"🌱",
          milestones:["Write a basic Python script","Understand x86 assembly basics","Set up an isolated analysis VM","Identify PE file structure"],
          topics:["Python for malware analysts","x86 assembly fundamentals","CPU registers & instructions","Stack and heap concepts","C language basics","How programs compile & link","PE file format","ELF file format","Setting up FlareVM","Setting up REMnux","Malware analysis safety","Virtualization for analysis","Static analysis intro","Strings & entropy analysis","File hashing","YARA rules basics"],
        },
        { name:"Phase 2", label:"Basic Malware Analysis", color:"#60a5fa", icon:"🔬",
          milestones:["Analyze 5 malware samples statically","Run malware in a sandbox","Extract IOCs from a sample","Write a basic malware report"],
          topics:["PEStudio deep dive","CFF Explorer","Resource Hacker","DIE (Detect-It-Easy)","VirusTotal analysis","ANY.RUN sandbox walkthrough","Cuckoo sandbox setup","Dynamic analysis methodology","Process Monitor & Explorer","Regshot for registry changes","Wireshark for malware traffic","Network indicators extraction","API call analysis","Malware families overview","Malware report writing","IOC extraction & sharing"],
        },
        { name:"Phase 3", label:"Security+ & Malware Analyst Path", color:"#fbbf24", icon:"🏆",
          milestones:["Pass Security+","Analyze a ransomware sample","Analyze a RAT sample","Build an analysis portfolio"],
          topics:["Security+ malware domains","Security+ mock exams x3","🏆 CompTIA Security+","Ransomware analysis walkthrough","Remote Access Trojan (RAT) analysis","Banker trojan analysis","Rootkit identification","Bootkit analysis intro","Building analysis portfolio","Malware analyst career roadmap"],
        },
      ]
    },
    intermediate: {
      phases: [
        { name:"Phase 1", label:"Reverse Engineering with Ghidra/IDA", color:"#4ade80", icon:"🔧",
          milestones:["Reverse a crackme challenge","Identify anti-analysis techniques","Unpack a packed malware sample","Write a reverse engineering report"],
          topics:["Ghidra fundamentals","IDA Free basics","Disassembly vs decompilation","Function identification","Rename functions & variables","Cross-references","Anti-disassembly tricks","Anti-debugging techniques","Anti-VM detection","Packing & obfuscation","Manual unpacking","UPX unpacking","Custom packer analysis","x64dbg dynamic analysis","Breakpoints & stepping","Reversing a crackme"],
        },
        { name:"Phase 2", label:"Advanced Malware Families", color:"#f87171", icon:"🦠",
          milestones:["Fully analyze a ransomware sample","Reverse engineer a C2 protocol","Map sample to MITRE ATT&CK","Write a professional threat report"],
          topics:["Advanced persistent threat (APT) malware","Fileless malware analysis","PowerShell malware","WMI-based malware","Rootkit deep dive","Bootkit analysis","Ransomware encryption analysis","Key extraction techniques","C2 protocol reverse engineering","Network malware communication","Exfiltration techniques","MITRE ATT&CK mapping","Threat actor attribution","Professional threat intelligence reports","YARA rule writing advanced","Malware detection signatures"],
        },
        { name:"Phase 3", label:"GREM Certification", color:"#a78bfa", icon:"🏆",
          milestones:["Pass GREM exam","Publish a malware analysis blog","Contribute to open-source RE tools","Land Malware Analyst role"],
          topics:["SANS FOR610 overview","GREM exam domains","Reverse engineering at scale","GREM mock preparation","🏆 GREM Certification","Malware analysis blog post","Open-source tool contribution","Career: Malware Analyst / RE engineer"],
        },
      ]
    },
    experienced: {
      phases: [
        { name:"Phase 1", label:"Threat Intelligence & Hunting", color:"#4ade80", icon:"🎯",
          milestones:["Attribute a malware sample to an actor","Build a YARA detection rule set","Hunt for malware across fleet","Publish threat research"],
          topics:["Advanced threat actor profiling","APT campaign analysis","Diamond model for malware","Malware-based threat hunting","EDR telemetry analysis","Hunting with Velociraptor","Memory hunting for malware","Building YARA rule sets","Malware similarity analysis","Code reuse across families","Threat intelligence reporting","Publishing original research"],
        },
        { name:"Phase 2", label:"Vulnerability Research & Advanced RE", color:"#fbbf24", icon:"👑",
          milestones:["Find a 0-day in a sample","Write a CVE analysis","Build a binary analysis pipeline","Lead a malware research team"],
          topics:["Vulnerability research methodology","Fuzzing techniques","AFL & LibFuzzer","Exploit development basics","Heap exploitation","Format string vulnerabilities","Binary analysis automation","angr symbolic execution","Binary Ninja scripting","IDA Python scripting","Building analysis pipelines","Malware research team leadership","Academic & industry publication","Speaking at conferences","🏆 GREM Advanced / Research credentials"],
        },
      ]
    },
  },
};

// ── CERTS PER BRANCH ──
const BRANCH_CERTS = {
  cloud: [
    {name:"AWS Cloud Practitioner",cost:"$100",diff:"⭐⭐",time:"1-2 mo",job:3,cloud:4,verdict:"DO FIRST",vtype:"do",reason:"Best entry cert for cloud. Validates fundamentals. Launch pad for everything else.",url:"https://aws.amazon.com/certification/certified-cloud-practitioner/"},
    {name:"AWS Security Specialty",cost:"$300",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:5,cloud:5,verdict:"DO IT",vtype:"do",reason:"Highest signal AWS security cert. Required for many senior cloud security roles.",url:"https://aws.amazon.com/certification/certified-security-specialty/"},
    {name:"CCSP",cost:"$599",diff:"⭐⭐⭐⭐",time:"4-6 mo",job:4,cloud:5,verdict:"DO IT",vtype:"do",reason:"Vendor-neutral cloud security cert from (ISC)². Great for architects and senior roles.",url:"https://www.isc2.org/certifications/ccsp"},
    {name:"Google Professional Cloud Security",cost:"$200",diff:"⭐⭐⭐",time:"2-3 mo",job:3,cloud:4,verdict:"OPTIONAL",vtype:"late",reason:"Great if you work with GCP specifically. Less marketable than AWS/Azure equivalents.",url:"https://cloud.google.com/learn/certification/cloud-security-engineer"},
    {name:"Azure Security Engineer AZ-500",cost:"$165",diff:"⭐⭐⭐",time:"2-3 mo",job:4,cloud:4,verdict:"DO IT",vtype:"do",reason:"Essential for Azure security roles. Pairs extremely well with AWS Security Specialty.",url:"https://learn.microsoft.com/en-us/certifications/azure-security-engineer/"},
  ],
  soc: [
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"Industry baseline. DoD 8570 approved. Opens doors to first SOC job.",url:"https://www.comptia.org/certifications/security"},
    {name:"CompTIA CySA+",cost:"$392",diff:"⭐⭐⭐",time:"2-3 mo",job:5,cloud:4,verdict:"DO IT",vtype:"do",reason:"Best intermediate SOC cert. Focused specifically on threat detection & analysis.",url:"https://www.comptia.org/certifications/cybersecurity-analyst"},
    {name:"Splunk Core Certified User",cost:"$130",diff:"⭐⭐",time:"1 mo",job:4,cloud:3,verdict:"HIGH VALUE",vtype:"do",reason:"Splunk is everywhere in SOC. Cheap cert with high return on investment.",url:"https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html"},
    {name:"GCIA (GIAC Intrusion Analyst)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:5,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"Gold standard for network intrusion analysts. SANS quality. High cost but recognized.",url:"https://www.giac.org/certifications/certified-intrusion-analyst-gcia/"},
    {name:"CISSP",cost:"$749",diff:"⭐⭐⭐⭐⭐",time:"6-12 mo",job:5,cloud:4,verdict:"LATER",vtype:"late",reason:"Best for SOC leads and security managers. Requires 5 years experience to get full cert.",url:"https://www.isc2.org/certifications/cissp"},
  ],
  pentest: [
    {name:"eJPT (eLearnSecurity Junior Pentest)",cost:"$200",diff:"⭐⭐",time:"1-2 mo",job:3,cloud:2,verdict:"DO FIRST",vtype:"do",reason:"Best entry-level pentest cert. Practical exam, affordable, great for beginners.",url:"https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-cert"},
    {name:"CEH (Certified Ethical Hacker)",cost:"$950",diff:"⭐⭐⭐",time:"2-3 mo",job:4,cloud:3,verdict:"DO IT",vtype:"do",reason:"Recognized by HR teams. Multiple choice but opens doors in enterprise/govt sectors.",url:"https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"},
    {name:"OSCP",cost:"$1499",diff:"⭐⭐⭐⭐⭐",time:"3-6 mo",job:5,cloud:5,verdict:"GOLD STANDARD",vtype:"do",reason:"Most respected hands-on pentest cert. 24-hour practical exam. Required by top firms.",url:"https://www.offsec.com/courses/pen-200/"},
    {name:"CRTO (Certified Red Team Operator)",cost:"£399",diff:"⭐⭐⭐⭐",time:"2-3 mo",job:5,cloud:4,verdict:"RED TEAM",vtype:"do",reason:"Best red team cert for Cobalt Strike & C2. Practical exam, great community.",url:"https://training.zeropointsecurity.co.uk/courses/red-team-ops"},
    {name:"GPEN (GIAC Penetration Tester)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:4,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"SANS-backed pentest cert. High cost but well recognized in enterprise environments.",url:"https://www.giac.org/certifications/penetration-tester-gpen/"},
  ],
  grc: [
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"GRC analyst baseline. Required by many entry GRC job postings. Good foundation.",url:"https://www.comptia.org/certifications/security"},
    {name:"ISO 27001 Lead Auditor",cost:"$1200",diff:"⭐⭐⭐",time:"2-3 mo",job:5,cloud:4,verdict:"DO IT",vtype:"do",reason:"Most recognized GRC cert in India/EMEA. Opens doors to compliance and audit roles.",url:"https://pecb.com/en/education-and-training-for-iso-iec-27001"},
    {name:"CISM",cost:"$575",diff:"⭐⭐⭐⭐",time:"4-6 mo",job:5,cloud:4,verdict:"DO IT",vtype:"do",reason:"ISACA cert for security managers. Highest value GRC cert for experienced professionals.",url:"https://www.isaca.org/credentialing/cism"},
    {name:"CRISC",cost:"$575",diff:"⭐⭐⭐⭐",time:"3-5 mo",job:5,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"IT risk focused certification from ISACA. Ideal for risk management roles.",url:"https://www.isaca.org/credentialing/crisc"},
    {name:"CISSP",cost:"$749",diff:"⭐⭐⭐⭐⭐",time:"6-12 mo",job:5,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"Ultimate GRC leadership cert. Aim for this after 5+ years in security.",url:"https://www.isc2.org/certifications/cissp"},
  ],
  dfir: [
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"Baseline cert that validates core IR concepts. Required for many DFIR job postings.",url:"https://www.comptia.org/certifications/security"},
    {name:"CHFI (Computer Hacking Forensic Investigator)",cost:"$950",diff:"⭐⭐⭐",time:"2-3 mo",job:4,cloud:3,verdict:"DO IT",vtype:"do",reason:"EC-Council forensics cert. Widely recognized and covers most DFIR fundamentals.",url:"https://www.eccouncil.org/train-certify/computer-hacking-forensic-investigator-chfi/"},
    {name:"GCFE (GIAC Certified Forensic Examiner)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:5,cloud:4,verdict:"HIGH VALUE",vtype:"do",reason:"Best intermediate forensics cert. SANS quality, recognized by law enforcement and enterprise.",url:"https://www.giac.org/certifications/certified-forensic-examiner-gcfe/"},
    {name:"GCFA (GIAC Certified Forensic Analyst)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:5,cloud:5,verdict:"ADVANCED",vtype:"late",reason:"Advanced forensics cert covering APT investigation, memory and timeline analysis.",url:"https://www.giac.org/certifications/certified-forensic-analyst-gcfa/"},
    {name:"GREM (GIAC Reverse Engineering Malware)",cost:"$949",diff:"⭐⭐⭐⭐⭐",time:"4-6 mo",job:4,cloud:4,verdict:"SPECIALIZED",vtype:"late",reason:"Best malware RE cert for DFIR professionals. Highly specialized, very recognized.",url:"https://www.giac.org/certifications/reverse-engineering-malware-grem/"},
  ],
  appsec: [
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"Baseline cert needed for most AppSec job applications, especially in enterprise.",url:"https://www.comptia.org/certifications/security"},
    {name:"eWPTX (Web Application Pentester eXtreme)",cost:"$400",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:5,cloud:4,verdict:"DO IT",vtype:"do",reason:"Best practical web pentesting cert. Highly regarded in AppSec community.",url:"https://ine.com/learning/certifications/internal/elearnsecurity-web-application-penetration-tester-extreme"},
    {name:"GWEB (GIAC Web App Penetration Tester)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:4,cloud:4,verdict:"HIGH VALUE",vtype:"do",reason:"SANS-backed web pentesting cert. Recognized in enterprise AppSec and consulting.",url:"https://www.giac.org/certifications/certified-web-application-defender-gweb/"},
    {name:"CSSLP (Certified Secure Software Lifecycle Professional)",cost:"$599",diff:"⭐⭐⭐⭐",time:"4-6 mo",job:5,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"Best cert for AppSec architects and security engineers in software development.",url:"https://www.isc2.org/certifications/csslp"},
    {name:"OSCP",cost:"$1499",diff:"⭐⭐⭐⭐⭐",time:"3-6 mo",job:5,cloud:5,verdict:"GOLD",vtype:"late",reason:"Opens doors to bug bounty, pentesting, and advanced AppSec. Worth it if you can afford it.",url:"https://www.offsec.com/courses/pen-200/"},
  ],
  network: [
    {name:"CompTIA Network+",cost:"$338",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"Vendor-neutral networking cert. Foundation for all network security roles.",url:"https://www.comptia.org/certifications/network"},
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO EARLY",vtype:"do",reason:"Security foundation cert. Pairs perfectly with Network+ for network security roles.",url:"https://www.comptia.org/certifications/security"},
    {name:"CCNA (Cisco Certified Network Associate)",cost:"$330",diff:"⭐⭐⭐",time:"2-4 mo",job:5,cloud:4,verdict:"HIGH VALUE",vtype:"do",reason:"Most recognized networking cert globally. Opens doors in enterprise network security.",url:"https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html"},
    {name:"CCNP Security",cost:"$400",diff:"⭐⭐⭐⭐",time:"4-6 mo",job:5,cloud:4,verdict:"ADVANCED",vtype:"late",reason:"Advanced Cisco security cert. Recognized in enterprise networks and telecoms.",url:"https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security.html"},
    {name:"Palo Alto PCNSA",cost:"$160",diff:"⭐⭐⭐",time:"2-3 mo",job:4,cloud:3,verdict:"DO IT",vtype:"do",reason:"Most in-demand NGFW cert. Palo Alto is market leader in enterprise firewalls.",url:"https://www.paloaltonetworks.com/services/education/certification"},
  ],
  malware: [
    {name:"CompTIA Security+",cost:"$392",diff:"⭐⭐",time:"1-2 mo",job:4,cloud:3,verdict:"DO FIRST",vtype:"do",reason:"Baseline cert. Opens doors to malware analyst and threat intel positions.",url:"https://www.comptia.org/certifications/security"},
    {name:"GREM (GIAC Reverse Engineering Malware)",cost:"$949",diff:"⭐⭐⭐⭐⭐",time:"4-6 mo",job:5,cloud:5,verdict:"GOLD STANDARD",vtype:"do",reason:"The gold standard malware analysis cert. SANS FOR610 backed. Highly respected.",url:"https://www.giac.org/certifications/reverse-engineering-malware-grem/"},
    {name:"GCIH (GIAC Incident Handler)",cost:"$949",diff:"⭐⭐⭐⭐",time:"3-4 mo",job:4,cloud:4,verdict:"DO IT",vtype:"do",reason:"Pairs perfectly with malware analysis. Covers full incident response lifecycle.",url:"https://www.giac.org/certifications/certified-incident-handler-gcih/"},
    {name:"CERTS (EC-Council CTIA)",cost:"$499",diff:"⭐⭐⭐",time:"2-3 mo",job:3,cloud:3,verdict:"OPTIONAL",vtype:"late",reason:"Threat intelligence cert. Useful if moving toward CTI roles from malware analysis.",url:"https://www.eccouncil.org/train-certify/certified-threat-intelligence-analyst-ctia/"},
    {name:"SANS FOR610",cost:"$7695",diff:"⭐⭐⭐⭐⭐",time:"5 days + study",job:5,cloud:5,verdict:"ELITE",vtype:"late",reason:"Best malware analysis training in the world. Expensive but pays off in senior roles.",url:"https://www.sans.org/cyber-security-courses/reverse-engineering-malware-malware-analysis-tools-techniques/"},
  ],
};

// ── FREE RESOURCES PER BRANCH ──
const BRANCH_RESOURCES = {
  cloud: [
    {cat:"Learning Platforms",items:[
      {name:"AWS Skill Builder (Free)",url:"https://skillbuilder.aws",what:"Official AWS learning",cost:"free",stars:5,tip:"Start with Cloud Practitioner Essentials course"},
      {name:"Cloud Security Alliance Resources",url:"https://cloudsecurityalliance.org/education/",what:"Cloud security frameworks",cost:"free",stars:4,tip:"CCSP prep + cloud security guidance"},
      {name:"A Cloud Guru Free Tier",url:"https://acloudguru.com",what:"Cloud courses",cost:"free+paid",stars:4,tip:"Free intro courses are excellent quality"},
      {name:"freeCodeCamp Cloud Security",url:"https://www.youtube.com/@freecodecamp",what:"Video tutorials",cost:"free",stars:4,tip:"Full length cloud security courses on YouTube"},
    ]},
    {cat:"Hands-on Labs",items:[
      {name:"CloudGoat (Rhino Security Labs)",url:"https://github.com/RhinoSecurityLabs/cloudgoat",what:"Vulnerable AWS lab",cost:"free",stars:5,tip:"Best free cloud attack/defense practice environment"},
      {name:"Pacu Framework",url:"https://github.com/RhinoSecurityLabs/pacu",what:"AWS exploitation framework",cost:"free",stars:4,tip:"Learn AWS attacks from a defender perspective"},
      {name:"Prowler",url:"https://github.com/prowler-cloud/prowler",what:"AWS/Azure/GCP security scanner",cost:"free",stars:5,tip:"Run this against your free tier account to find misconfigs"},
      {name:"TryHackMe Cloud Modules",url:"https://tryhackme.com",what:"Guided cloud security labs",cost:"free+paid",stars:4,tip:"Free rooms available, excellent for beginners"},
    ]},
    {cat:"Study & Reference",items:[
      {name:"AWS Security Docs",url:"https://docs.aws.amazon.com/security/",what:"Official security reference",cost:"free",stars:5,tip:"Bookmark this — critical for exam and real work"},
      {name:"Hacking the Cloud",url:"https://hackingthe.cloud",what:"Cloud attack techniques",cost:"free",stars:5,tip:"Best free cloud offensive security reference"},
      {name:"AWS Well-Architected Security Pillar",url:"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html",what:"Security architecture",cost:"free",stars:5,tip:"Required reading for AWS Security Specialty"},
    ]},
  ],
  soc: [
    {cat:"Learning Platforms",items:[
      {name:"TryHackMe SOC Level 1",url:"https://tryhackme.com/path/outline/soclevel1",what:"Complete SOC learning path",cost:"free+paid",stars:5,tip:"Best structured SOC path for beginners. Free rooms available."},
      {name:"Blue Team Labs Online",url:"https://blueteamlabs.online",what:"SOC investigation labs",cost:"free+paid",stars:5,tip:"Free labs for log analysis, forensics, and threat hunting"},
      {name:"Cyber Defenders",url:"https://cyberdefenders.org",what:"Blue team CTF challenges",cost:"free",stars:5,tip:"Real-world pcap and log analysis challenges. Completely free."},
      {name:"LetsDefend",url:"https://letsdefend.io",what:"SOC simulation platform",cost:"free+paid",stars:4,tip:"Simulates actual SOC analyst workflow. Excellent practice."},
    ]},
    {cat:"SIEM & Tools",items:[
      {name:"Splunk Free Training",url:"https://education.splunk.com/free",what:"Splunk fundamentals",cost:"free",stars:5,tip:"Splunk Fundamentals 1 is free and recognized in the industry"},
      {name:"Elastic SIEM (Free)",url:"https://www.elastic.co/security",what:"ELK stack for SOC",cost:"free",stars:4,tip:"Set up your own SIEM with Elastic for free. Great for practice."},
      {name:"MITRE ATT&CK Navigator",url:"https://mitre-attack.github.io/attack-navigator/",what:"Threat mapping tool",cost:"free",stars:5,tip:"Use this to map detections to threat actor TTPs"},
    ]},
    {cat:"Reference & Practice",items:[
      {name:"Sigma Rules",url:"https://github.com/SigmaHQ/sigma",what:"Detection rule repository",cost:"free",stars:5,tip:"Study these to understand what good detection rules look like"},
      {name:"Detection Engineering Weekly",url:"https://detectionengineering.net",what:"Detection engineering news",cost:"free",stars:4,tip:"Stay current on SOC detection techniques and tools"},
      {name:"The Hive Project",url:"https://thehive-project.org",what:"Incident response platform",cost:"free",stars:4,tip:"Set up locally for a free IR case management system"},
    ]},
  ],
  pentest: [
    {cat:"Learning Platforms",items:[
      {name:"TryHackMe",url:"https://tryhackme.com",what:"Guided hacking labs",cost:"free+paid",stars:5,tip:"Best for absolute beginners. Free rooms are excellent quality."},
      {name:"HackTheBox",url:"https://hackthebox.com",what:"CTF-style pentesting",cost:"free+paid",stars:5,tip:"Work your way from Easy machines to Medium. Best skill builder."},
      {name:"PortSwigger Web Academy",url:"https://portswigger.net/web-security",what:"Web app security labs",cost:"free",stars:5,tip:"100% free. Best web security learning resource in existence."},
      {name:"VulnHub",url:"https://vulnhub.com",what:"Downloadable CTF VMs",cost:"free",stars:4,tip:"Download VMs and practice in your own local lab offline."},
    ]},
    {cat:"Tools & References",items:[
      {name:"Kali Linux",url:"https://kali.org",what:"Pentesting distro",cost:"free",stars:5,tip:"Use the official VM image for VirtualBox. Update tools first thing."},
      {name:"Burp Suite Community",url:"https://portswigger.net/burp/communitydownload",what:"Web app testing proxy",cost:"free",stars:5,tip:"Free community edition is enough for learning and most jobs."},
      {name:"HackTricks",url:"https://book.hacktricks.xyz",what:"Pentest technique bible",cost:"free",stars:5,tip:"Reference this constantly during CTFs and real engagements."},
      {name:"GTFOBins",url:"https://gtfobins.github.io",what:"Linux PrivEsc reference",cost:"free",stars:5,tip:"Bookmarked by every pentester. Lookup any binary for exploitation."},
    ]},
    {cat:"Practice & Community",items:[
      {name:"IppSec YouTube",url:"https://www.youtube.com/@ippsec",what:"HackTheBox walkthroughs",cost:"free",stars:5,tip:"Watch these after attempting machines yourself. Learn methodology."},
      {name:"PentesterLab",url:"https://pentesterlab.com",what:"Progressive web app labs",cost:"free+paid",stars:4,tip:"Free exercises for learning SQLi, XSS, and more fundamentals."},
      {name:"0xdf Blog",url:"https://0xdf.gitlab.io",what:"HTB writeups",cost:"free",stars:5,tip:"Best written walkthroughs with deep technical explanations."},
    ]},
  ],
  grc: [
    {cat:"Frameworks & Standards",items:[
      {name:"NIST Cybersecurity Framework (free PDF)",url:"https://www.nist.gov/cyberframework",what:"US security framework",cost:"free",stars:5,tip:"Download the free PDF. This is referenced in almost every GRC job."},
      {name:"ISO 27001:2022 Overview",url:"https://www.iso.org/isoiec-27001-information-security.html",what:"ISO security standard",cost:"free",stars:5,tip:"The overview is free. Read every Annex A control description."},
      {name:"GDPR Full Text",url:"https://gdpr-info.eu",what:"EU privacy regulation",cost:"free",stars:5,tip:"Annotated version at gdpr-info.eu is much easier to read than the original."},
      {name:"CIS Controls",url:"https://www.cisecurity.org/controls",what:"Security control baseline",cost:"free",stars:5,tip:"Free to download. Industry-recognized implementation guidance."},
    ]},
    {cat:"Learning",items:[
      {name:"NIST 800-53 Explorer",url:"https://csrc.nist.gov/projects/cprt/catalog",what:"Control catalog",cost:"free",stars:4,tip:"Interactive control browser. Use this to understand security controls."},
      {name:"Coursera GRC Courses (audit)",url:"https://www.coursera.org",what:"GRC courses",cost:"free+paid",stars:4,tip:"Audit for free. Search 'cybersecurity compliance' on Coursera."},
      {name:"ISACA Free Resources",url:"https://www.isaca.org/resources",what:"GRC guides & whitepapers",cost:"free",stars:4,tip:"Free whitepapers and guidance papers on risk management."},
    ]},
    {cat:"Tools",items:[
      {name:"OpenGRC / Eramba (Community)",url:"https://www.eramba.org",what:"GRC platform",cost:"free",stars:4,tip:"Free community edition. Practice building risk registers and control libraries."},
      {name:"CISA Risk Management Resources",url:"https://www.cisa.gov/resources-tools/resources/risk-management",what:"US govt risk guidance",cost:"free",stars:4,tip:"Excellent free risk management guides used by government and enterprise."},
    ]},
  ],
  dfir: [
    {cat:"Learning Platforms",items:[
      {name:"Blue Team Labs Online",url:"https://blueteamlabs.online",what:"Forensics investigation labs",cost:"free+paid",stars:5,tip:"Best free DFIR practice platform. Real-world scenarios."},
      {name:"CyberDefenders",url:"https://cyberdefenders.org",what:"DFIR challenges",cost:"free",stars:5,tip:"Free PCAP and memory forensics challenges from industry experts."},
      {name:"TryHackMe DFIR Rooms",url:"https://tryhackme.com",what:"Guided forensics labs",cost:"free+paid",stars:4,tip:"Complete the Forensics and Incident Response learning paths."},
    ]},
    {cat:"Tools (All Free)",items:[
      {name:"Autopsy (Disk Forensics)",url:"https://www.autopsy.com",what:"Free forensics platform",cost:"free",stars:5,tip:"Best free disk forensics tool. Used by law enforcement worldwide."},
      {name:"Volatility 3 (Memory Forensics)",url:"https://github.com/volatilityfoundation/volatility3",what:"Memory analysis",cost:"free",stars:5,tip:"The standard memory forensics tool. Master this completely."},
      {name:"FTK Imager (Disk Imaging)",url:"https://www.exterro.com/ftk-imager",what:"Forensic imaging",cost:"free",stars:5,tip:"Free, and the standard imaging tool in the field."},
      {name:"Wireshark",url:"https://wireshark.org",what:"Network packet analysis",cost:"free",stars:5,tip:"Essential for network forensics. Practice with real PCAPs from malware-traffic-analysis.net"},
    ]},
    {cat:"Practice & Reference",items:[
      {name:"MemLabs (Memory Forensics CTF)",url:"https://github.com/stuxnet999/MemLabs",what:"Memory analysis challenges",cost:"free",stars:5,tip:"6 progressive memory forensics challenges. Perfect for Volatility practice."},
      {name:"Malware Traffic Analysis",url:"https://malware-traffic-analysis.net",what:"Real malware PCAPs",cost:"free",stars:5,tip:"Download real malware traffic and practice network forensics."},
      {name:"DFIR.training",url:"https://dfir.training",what:"DFIR resources index",cost:"free",stars:4,tip:"Comprehensive list of DFIR tools, guides, and learning resources."},
    ]},
  ],
  appsec: [
    {cat:"Learning & Practice",items:[
      {name:"PortSwigger Web Academy",url:"https://portswigger.net/web-security",what:"Web security labs",cost:"free",stars:5,tip:"The best free AppSec training resource. Do every single lab."},
      {name:"OWASP Testing Guide (v4.2)",url:"https://owasp.org/www-project-web-security-testing-guide/",what:"AppSec test methodology",cost:"free",stars:5,tip:"Free 500-page guide. The industry standard for web app security testing."},
      {name:"DVWA (Damn Vulnerable Web App)",url:"https://github.com/digininja/DVWA",what:"Vulnerable app for practice",cost:"free",stars:4,tip:"Set up locally with Docker in 2 minutes. Practice all OWASP Top 10."},
      {name:"WebGoat (OWASP)",url:"https://github.com/WebGoat/WebGoat",what:"Interactive learning app",cost:"free",stars:4,tip:"Has built-in lessons and challenges. Great for beginners."},
    ]},
    {cat:"Tools (Free Tier)",items:[
      {name:"Burp Suite Community",url:"https://portswigger.net/burp/communitydownload",what:"Web proxy & scanner",cost:"free",stars:5,tip:"Industry standard. Learn this before any other tool."},
      {name:"Semgrep (SAST)",url:"https://semgrep.dev",what:"Code vulnerability scanner",cost:"free",stars:5,tip:"Free community version is very powerful. Integrates with GitHub Actions."},
      {name:"OWASP ZAP",url:"https://zaproxy.org",what:"Free DAST scanner",cost:"free",stars:4,tip:"Best free DAST scanner. Use for automated scanning in CI/CD pipelines."},
      {name:"Snyk Free Tier",url:"https://snyk.io",what:"Dependency & code scanning",cost:"free",stars:4,tip:"Free for open source. Scan your own projects for vulnerabilities."},
    ]},
    {cat:"Bug Bounty",items:[
      {name:"HackerOne Hacktivity",url:"https://hackerone.com/hacktivity",what:"Public bug reports",cost:"free",stars:5,tip:"Read disclosed reports to understand what bugs are worth and how they're written."},
      {name:"Bugcrowd University",url:"https://www.bugcrowd.com/hackers/bugcrowd-university/",what:"Bug bounty training",cost:"free",stars:4,tip:"Free training modules specifically designed for bug bounty hunters."},
      {name:"Intigriti Bug Bytes",url:"https://blog.intigriti.com/category/bug-bytes/",what:"Weekly AppSec news",cost:"free",stars:4,tip:"Weekly newsletter with new techniques and disclosed vulnerabilities."},
    ]},
  ],
  network: [
    {cat:"Learning Platforms",items:[
      {name:"Cisco NetAcad (Free Courses)",url:"https://netacad.com",what:"Cisco networking courses",cost:"free",stars:5,tip:"CCNA intro courses are completely free. Official Cisco content."},
      {name:"Professor Messer Network+",url:"https://professormesser.com",what:"Network+ video course",cost:"free",stars:5,tip:"Free complete Network+ and Security+ video courses. Best free prep."},
      {name:"CBT Nuggets Free Trial",url:"https://cbtnuggets.com",what:"Network training videos",cost:"free+paid",stars:4,tip:"7-day free trial. Binge the CCNA and Network+ content."},
    ]},
    {cat:"Lab & Practice",items:[
      {name:"Cisco Packet Tracer (Free)",url:"https://www.netacad.com/courses/packet-tracer",what:"Network simulation",cost:"free",stars:5,tip:"Free with NetAcad registration. Best tool for CCNA lab practice."},
      {name:"GNS3 (Free)",url:"https://gns3.com",what:"Network emulation",cost:"free",stars:4,tip:"More advanced than Packet Tracer. Use with real Cisco IOS images."},
      {name:"EvE-NG Community (Free)",url:"https://www.eve-ng.net",what:"Network emulation lab",cost:"free",stars:4,tip:"Free community edition. More flexible than GNS3 for many scenarios."},
    ]},
    {cat:"Security Tools",items:[
      {name:"Snort (Free IDS)",url:"https://snort.org",what:"Intrusion detection",cost:"free",stars:5,tip:"The original open-source IDS. Learn to write rules. Widely deployed."},
      {name:"pfSense (Free Firewall)",url:"https://pfsense.org",what:"Open-source firewall",cost:"free",stars:5,tip:"Deploy in a VM as your lab firewall. Enterprise-grade for free."},
      {name:"Security Onion",url:"https://securityonionsolutions.com",what:"Network security monitoring",cost:"free",stars:5,tip:"All-in-one NSM platform. Deploy in VM for a full network lab."},
    ]},
  ],
  malware: [
    {cat:"Learning Platforms",items:[
      {name:"Malware Analysis for Hedgehogs (YouTube)",url:"https://www.youtube.com/@0verfl0w_",what:"Malware analysis tutorials",cost:"free",stars:5,tip:"Best free YouTube channel for learning malware analysis. Excellent quality."},
      {name:"ANY.RUN Interactive Sandbox",url:"https://any.run",what:"Online malware sandbox",cost:"free+paid",stars:5,tip:"Free account allows public sample analysis. Study others' analyses too."},
      {name:"MalwareBazaar",url:"https://bazaar.abuse.ch",what:"Malware sample database",cost:"free",stars:5,tip:"Download real malware samples safely. Essential for practice."},
      {name:"VirusTotal (Free)",url:"https://virustotal.com",what:"Multi-AV scanning",cost:"free",stars:5,tip:"Upload samples and study behavioral reports. Learn to read these."},
    ]},
    {cat:"Tools (All Free)",items:[
      {name:"Ghidra (NSA)",url:"https://ghidra-sre.org",what:"Reverse engineering framework",cost:"free",stars:5,tip:"Free alternative to IDA Pro from the NSA. Extremely powerful."},
      {name:"x64dbg",url:"https://x64dbg.com",what:"Windows debugger",cost:"free",stars:5,tip:"Best free Windows debugger for dynamic malware analysis."},
      {name:"FlareVM",url:"https://github.com/mandiant/flare-vm",what:"Windows analysis distro",cost:"free",stars:5,tip:"Mandiant's free Windows malware analysis environment. Install this first."},
      {name:"REMnux",url:"https://remnux.org",what:"Linux analysis distro",cost:"free",stars:5,tip:"Specialized Linux distro for malware analysis. Pairs with FlareVM."},
    ]},
    {cat:"Practice & Reference",items:[
      {name:"Malware-Traffic-Analysis.net",url:"https://malware-traffic-analysis.net",what:"Real malware PCAPs",cost:"free",stars:5,tip:"Download and analyze real malware C2 traffic. Blog posts explain each case."},
      {name:"The DFIR Report",url:"https://thedfirreport.com",what:"Threat actor case studies",cost:"free",stars:5,tip:"Real-world intrusion analysis. Study these to understand how malware operates in the wild."},
      {name:"Objective-See Tools (macOS)",url:"https://objective-see.org/tools.html",what:"macOS security tools",cost:"free",stars:4,tip:"If studying macOS malware, Patrick Wardle's tools are the gold standard."},
    ]},
  ],
};

// ── CAREER ROLES PER BRANCH ──
const BRANCH_CAREERS = {
  cloud: [
    {icon:"☁️",title:"Cloud Security Engineer",sal:"₹10–22 LPA",skills:"AWS/Azure, IAM, CSPM, IaC Security",helps:"Core role. Most in-demand position.",link:"https://www.linkedin.com/jobs/cloud-security-engineer-jobs/"},
    {icon:"🏗️",title:"Cloud Security Architect",sal:"₹18–35 LPA",skills:"Architecture, Zero Trust, Multi-cloud",helps:"Senior path. Design security at scale.",link:"https://www.linkedin.com/jobs/cloud-architect-jobs/"},
    {icon:"🔍",title:"Cloud Pentester",sal:"₹12–28 LPA",skills:"CloudGoat, Pacu, AWS attacks",helps:"Offensive role in cloud security.",link:"https://www.linkedin.com/jobs/cloud-penetration-tester-jobs/"},
    {icon:"📋",title:"Cloud Compliance Analyst",sal:"₹8–18 LPA",skills:"ISO27001, SOC2, GDPR, Cloud Compliance",helps:"GRC path within cloud security.",link:"https://www.linkedin.com/jobs/cloud-compliance-jobs/"},
    {icon:"👑",title:"CISO (Cloud-focused)",sal:"₹30–80 LPA",skills:"Strategy, Risk, Leadership, Cloud",helps:"Ultimate career destination.",link:"https://www.linkedin.com/jobs/ciso-jobs/"},
  ],
  soc: [
    {icon:"🛡️",title:"SOC Analyst (Tier 1/2)",sal:"₹5–12 LPA",skills:"SIEM, Log Analysis, Alert Triage",helps:"Entry point. Most job openings.",link:"https://www.linkedin.com/jobs/soc-analyst-jobs/"},
    {icon:"🕵️",title:"Threat Hunter",sal:"₹12–22 LPA",skills:"MITRE ATT&CK, Hypothesis Hunting",helps:"Senior path. Proactive security.",link:"https://www.linkedin.com/jobs/threat-hunter-jobs/"},
    {icon:"📊",title:"Detection Engineer",sal:"₹10–20 LPA",skills:"Sigma, KQL, Detection-as-Code",helps:"Build the rules others rely on.",link:"https://www.linkedin.com/jobs/detection-engineer-jobs/"},
    {icon:"🔭",title:"Threat Intel Analyst",sal:"₹8–18 LPA",skills:"CTI, MISP, Diamond Model",helps:"Connect malware to threat actors.",link:"https://www.linkedin.com/jobs/threat-intelligence-analyst-jobs/"},
    {icon:"🚨",title:"Incident Response Lead",sal:"₹15–30 LPA",skills:"IR Playbooks, Forensics, Leadership",helps:"Lead IR engagements end-to-end.",link:"https://www.linkedin.com/jobs/incident-response-jobs/"},
  ],
  pentest: [
    {icon:"⚔️",title:"Junior Penetration Tester",sal:"₹6–14 LPA",skills:"Nmap, Metasploit, Burp, Report Writing",helps:"Entry point. Labs + CTF = jobs.",link:"https://www.linkedin.com/jobs/penetration-tester-jobs/"},
    {icon:"🌐",title:"Web Application Pentester",sal:"₹8–20 LPA",skills:"Burp Suite, OWASP, Bug Bounty",helps:"Specialized & in high demand.",link:"https://www.linkedin.com/jobs/web-application-pentesting-jobs/"},
    {icon:"🏰",title:"Red Team Operator",sal:"₹15–35 LPA",skills:"Cobalt Strike, AD attacks, C2",helps:"Advanced offensive security role.",link:"https://www.linkedin.com/jobs/red-team-jobs/"},
    {icon:"🐛",title:"Bug Bounty Hunter",sal:"Variable",skills:"Web/mobile hacking, Report writing",helps:"Independent. No employer needed.",link:"https://hackerone.com/opportunities"},
    {icon:"📝",title:"Security Researcher",sal:"₹12–30 LPA",skills:"0-day research, CVE writing",helps:"Find and disclose new vulnerabilities.",link:"https://www.linkedin.com/jobs/security-researcher-jobs/"},
  ],
  grc: [
    {icon:"📋",title:"GRC Analyst",sal:"₹5–12 LPA",skills:"Risk Assessment, Policy Writing, Audit",helps:"Most entry GRC position.",link:"https://www.linkedin.com/jobs/grc-analyst-jobs/"},
    {icon:"🔏",title:"Privacy Analyst / DPO",sal:"₹8–18 LPA",skills:"GDPR, DPIA, Privacy by Design",helps:"Growing role with data privacy laws.",link:"https://www.linkedin.com/jobs/privacy-analyst-jobs/"},
    {icon:"🔍",title:"IT Auditor",sal:"₹6–16 LPA",skills:"ISO27001, SOX, COBIT, Audit Reports",helps:"Common path from GRC into audit firms.",link:"https://www.linkedin.com/jobs/it-auditor-jobs/"},
    {icon:"📊",title:"Risk Manager",sal:"₹10–22 LPA",skills:"FAIR, Risk Quantification, Leadership",helps:"Senior analytical GRC role.",link:"https://www.linkedin.com/jobs/risk-manager-jobs/"},
    {icon:"👑",title:"CISO",sal:"₹30–80 LPA",skills:"Strategy, Governance, Leadership",helps:"Top of the GRC career ladder.",link:"https://www.linkedin.com/jobs/ciso-jobs/"},
  ],
  dfir: [
    {icon:"🔬",title:"Junior DFIR Analyst",sal:"₹5–12 LPA",skills:"Autopsy, Volatility, Wireshark",helps:"Entry point for forensics path.",link:"https://www.linkedin.com/jobs/forensics-analyst-jobs/"},
    {icon:"🚨",title:"Incident Responder",sal:"₹8–18 LPA",skills:"IR Playbooks, Containment, Forensics",helps:"High demand in every large org.",link:"https://www.linkedin.com/jobs/incident-response-jobs/"},
    {icon:"🦠",title:"Malware Analyst",sal:"₹10–22 LPA",skills:"Ghidra, Volatility, YARA, RE",helps:"Specialized. Unique career path.",link:"https://www.linkedin.com/jobs/malware-analyst-jobs/"},
    {icon:"🔭",title:"Threat Intelligence Analyst",sal:"₹8–20 LPA",skills:"CTI, MISP, Attribution, Reporting",helps:"From forensics to threat intel pipeline.",link:"https://www.linkedin.com/jobs/threat-intelligence-jobs/"},
    {icon:"⚖️",title:"Forensics Consultant",sal:"₹15–35 LPA",skills:"Chain of Custody, Expert Witness, RE",helps:"Consulting or law enforcement roles.",link:"https://www.linkedin.com/jobs/computer-forensics-jobs/"},
  ],
  appsec: [
    {icon:"🐛",title:"AppSec Analyst",sal:"₹6–14 LPA",skills:"OWASP, Burp, Code Review",helps:"Entry point into AppSec.",link:"https://www.linkedin.com/jobs/application-security-analyst-jobs/"},
    {icon:"🔐",title:"Application Security Engineer",sal:"₹10–22 LPA",skills:"SAST/DAST, Threat Modeling, DevSecOps",helps:"Most common mid-level AppSec title.",link:"https://www.linkedin.com/jobs/application-security-engineer-jobs/"},
    {icon:"🌐",title:"Bug Bounty Hunter",sal:"Variable",skills:"Web hacking, Report writing, Patience",helps:"Independent path. No boss needed.",link:"https://hackerone.com"},
    {icon:"🚀",title:"DevSecOps Engineer",sal:"₹12–25 LPA",skills:"CI/CD, IaC Security, Container Sec",helps:"Growing demand as DevOps matures.",link:"https://www.linkedin.com/jobs/devsecops-engineer-jobs/"},
    {icon:"🏗️",title:"Product Security Lead",sal:"₹20–40 LPA",skills:"Program Management, SDLC, Leadership",helps:"Architect security for entire products.",link:"https://www.linkedin.com/jobs/product-security-jobs/"},
  ],
  network: [
    {icon:"🌐",title:"Network Security Analyst",sal:"₹5–12 LPA",skills:"Firewall, IDS/IPS, Log Analysis",helps:"Entry point. Massive job market.",link:"https://www.linkedin.com/jobs/network-security-analyst-jobs/"},
    {icon:"🏗️",title:"Network Security Engineer",sal:"₹8–18 LPA",skills:"CCNP, Palo Alto, Cisco ASA",helps:"Design and implement security controls.",link:"https://www.linkedin.com/jobs/network-security-engineer-jobs/"},
    {icon:"🔥",title:"Firewall Engineer",sal:"₹8–16 LPA",skills:"Palo Alto, Fortinet, Check Point",helps:"Specialized role, always in demand.",link:"https://www.linkedin.com/jobs/firewall-engineer-jobs/"},
    {icon:"🛡️",title:"SOC Network Analyst",sal:"₹7–15 LPA",skills:"PCAP, NetFlow, IDS Tuning",helps:"Network specialization within SOC.",link:"https://www.linkedin.com/jobs/soc-analyst-jobs/"},
    {icon:"🏛️",title:"Network Security Architect",sal:"₹18–35 LPA",skills:"Zero Trust, SASE, Enterprise Design",helps:"Senior design and strategy role.",link:"https://www.linkedin.com/jobs/network-architect-jobs/"},
  ],
  malware: [
    {icon:"🦠",title:"Malware Analyst",sal:"₹7–18 LPA",skills:"Ghidra, Cuckoo, YARA, x64dbg",helps:"Core role. Niche but well paid.",link:"https://www.linkedin.com/jobs/malware-analyst-jobs/"},
    {icon:"⚙️",title:"Reverse Engineer",sal:"₹10–25 LPA",skills:"IDA Pro, Ghidra, x86/x64 Assembly",helps:"Advanced path. Very specialized.",link:"https://www.linkedin.com/jobs/reverse-engineer-jobs/"},
    {icon:"🔭",title:"Threat Intelligence Analyst",sal:"₹8–20 LPA",skills:"CTI, Attribution, MITRE ATT&CK",helps:"Connect malware samples to actors.",link:"https://www.linkedin.com/jobs/threat-intelligence-analyst-jobs/"},
    {icon:"🚨",title:"Incident Responder (Malware Focused)",sal:"₹10–22 LPA",skills:"Memory Forensics, DFIR, RE",helps:"Respond to and analyze intrusions.",link:"https://www.linkedin.com/jobs/incident-response-jobs/"},
    {icon:"🔬",title:"Vulnerability Researcher",sal:"₹15–35 LPA",skills:"Fuzzing, 0-day research, CVE writing",helps:"Find new vulnerabilities in software.",link:"https://www.linkedin.com/jobs/vulnerability-researcher-jobs/"},
  ],
};

// ── XP & RANKS ──
const XP_RANKS = [
  {name:"Script Kiddie",     icon:"💻", min:0,    color:"#666"},
  {name:"Recon Agent",       icon:"🔭", min:200,  color:"#60a5fa"},
  {name:"Security Analyst",  icon:"🔍", min:500,  color:"#34d399"},
  {name:"Threat Hunter",     icon:"🕵️", min:1000, color:"#fbbf24"},
  {name:"Red/Blue Operator", icon:"⚔️", min:2000, color:"#f87171"},
  {name:"Security Engineer", icon:"⚙️", min:3500, color:"#a78bfa"},
  {name:"Cyber Architect",   icon:"🏗️", min:5000, color:"#f472b6"},
  {name:"Elite Operator",    icon:"👑", min:7500, color:"#fbbf24"},
];

function getRank(xp) { let r=XP_RANKS[0]; for(const x of XP_RANKS){if(xp>=x.min)r=x;} return r; }
function getNextRank(xp) { for(let i=0;i<XP_RANKS.length-1;i++){if(xp<XP_RANKS[i+1].min)return XP_RANKS[i+1];} return null; }

// ── QUOTES ──
const MOTIVATIONAL_QUOTES = [
  "Every expert was once a beginner who didn't give up.",
  "In cybersecurity, the ones who break in know how it was built. Be the builder.",
  "Security is not a product. It is a process — and so is your career.",
  "The best time to start was yesterday. The second best time is now.",
  "CTFs teach you to think like an attacker. Defenses teach you to think like an architect.",
  "Your lab is your gym. How much are you lifting?",
  "Certificates are proof you studied. Skills are proof you practiced.",
  "Every day you don't study, someone else does.",
  "Hack the box, not the exam.",
  "Blue team wins wars. Red team reveals the weaknesses. Be both.",
];