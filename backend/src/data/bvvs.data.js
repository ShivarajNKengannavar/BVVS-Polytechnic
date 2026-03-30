// ─────────────────────────────────────────────
//  BVVS Polytechnic — Central Data Store
// ─────────────────────────────────────────────

const data = {

  // ── HOME ──────────────────────────────────
  stats: [
    { value: 84,    suffix: '+', label: 'Faculty Members' },
    { value: 9,     suffix: '',  label: 'Diploma Programmes' },
    { value: 3957,  suffix: '',  label: 'Active Students' },
    { value: 65,    suffix: '+', label: 'Years Legacy' },
    { value: 2000,  suffix: '+', label: 'Alumni Network' }
  ],

  notices: [
    { text: 'Nov-2025 Exam Results (C-21 & C-25) — Available Now',  url: 'https://resultstest.digitalmis.com/' },
    { text: 'Nov-2025 Exam Results (C-15 & C-19) — Check Now',      url: 'https://results.bvvspolytech.com/' },
    { text: 'NITTTR Registration Link — Download PDF',               url: 'https://bvvspolytech.com/downloads/NITTTR.pdf' },
    { text: 'Registration Open: What Next After SSLC?',              url: 'https://forms.gle/Gs4VUccHWghX437s7' },
    { text: 'ISTE Student Convention — Brochure Available',          url: 'https://bvvspolytech.com/downloads/ISTE_Student_Convention_Brochure.pdf' },
    { text: 'Nov-2025 Exam Postponement Circular — Download Now',    url: 'https://bvvspolytech.com/downloads/exampostpone.pdf' }
  ],

  // ── ABOUT ─────────────────────────────────
  about: {
    history: `Basaveshwar Veerashaiva Vidyavardhak Sangha (BVVS) Bagalkot was established by His Holiness Shri Gurubasav Maha Swamiji of Bilur on 18-10-1906. B.V.V.S. Polytechnic Bagalkot was started in the year 1958 under Grant-in-aid Code with Diploma programs in Civil, Electrical & Mechanical Engineering. The Sangha runs a network of over 126 institutions from crèche level to Post Graduate & Doctorate level, with 26 Hostels for Boys and Girls across Bagalkot, Belgaum and Bengaluru districts.`,
    vision: 'To be an exemplary polytechnic to serve the society by inculcating technical and non-technical expertise for better career choices with human values.',
    mission: 'B.V.V.S. Polytechnic (Autonomous) is a premier technical institution situated at Bagalkot providing quality based formal and non-formal education in technical, non-technical and professional fields to meet the need of the society.',
    overview: [
      { icon: '🏛', title: 'About BVVS Polytechnic',   description: 'Established in 1958, BVVS Polytechnic runs 9 diploma programmes, a Community College by MHRD-AICTE, and CDTP. Serving 1500+ students with 84 faculty members.' },
      { icon: '👤', title: 'Roles of Principal',       description: 'Learn about the administrative structure, principal\'s responsibilities and the institution\'s governing council composition.',  docUrl: '/assets/docs/Roll-of-Principals.pdf' },
      { icon: '📄', title: 'BVVS Regulations',         description: 'The official regulations governing B.V.V.S. Polytechnic — admission, conduct, examinations and academic policies.', docUrl: '/assets/docs/BVVS-Regulations.pdf' },
      { icon: '📋', title: 'Mandatory Disclosure',     description: 'AICTE-mandated transparency disclosure covering infrastructure, faculty, programmes and financial information.', docUrl: '/assets/docs/Mandatory-Disclosures.pdf' }
    ],
    entrepreneurship: [
      { icon: '🚀', title: 'IIC — Innovation & Incubation',  description: 'Institution Innovation Council fostering a culture of innovation, entrepreneurship and start-up mindset.',            docUrl: 'https://bvvspolytech.com/pdf/1.%20IIC.pdf' },
      { icon: '🧑‍💼', title: 'PD & Career Resource Cell',  description: 'Personality development, career readiness and industry connect for students across all departments.',               docUrl: 'https://bvvspolytech.com/pdf/2.%20PD%20and%20CR%20cell.pdf' },
      { icon: '🌱', title: 'Startup Cell',                  description: 'Dedicated startup support ecosystem providing mentorship, resources and funding guidance.',                           docUrl: 'https://bvvspolytech.com/pdf/3.%20Startup%20cell.pdf' },
      { icon: '🏭', title: 'MSME Cell',                     description: 'Connects students and faculty with Micro, Small & Medium Enterprise opportunities and schemes.',                     docUrl: 'https://bvvspolytech.com/pdf/4.%20MSME%20Cell.pdf' },
      { icon: '🏢', title: 'CSDE',                          description: 'Centre for Skill Development and Entrepreneurship — bridging skills and enterprise.',                                docUrl: 'https://bvvspolytech.com/pdf/5.%20CSDE.pdf' },
      { icon: '⚖',  title: 'IPR Cell',                     description: 'Intellectual Property Rights guidance for innovations, patents, trademarks and copyright.',                          docUrl: 'https://bvvspolytech.com/pdf/6.%20IPR%20cell.pdf' },
      { icon: '📜', title: 'Legal Cell',                    description: 'Legal advisory cell supporting students and faculty on legal matters related to startups and innovation.',           docUrl: 'https://bvvspolytech.com/pdf/7.%20Legal%20Cell.pdf' },
      { icon: '🎓', title: 'Students Club',                 description: 'Student entrepreneurship club — networking, events, competitions and peer-learning for aspiring entrepreneurs.',   docUrl: 'https://bvvspolytech.com/pdf/9.%20Students%20Culb.pdf' },
      { icon: '📱', title: 'Social Media Cell',             description: 'Manages institutional social media presence and digital communication for the polytechnic.',                        docUrl: 'https://bvvspolytech.com/pdf/10.%20SOCIAL%20MEDIA%20CELL.pdf' },
      { icon: '📋', title: 'NISP — Innovation Policy',      description: 'National Innovation and Startup Policy (NISP) implementation framework at BVVS Polytechnic.',                    docUrl: 'https://bvvspolytech.com/pdf/11.%20Innovation%20and%20Startup%20Policy%20(NISP).pdf' }
    ]
  },

  // ── ACADEMICS ─────────────────────────────
  departments: [
    {
      id: 'civil',
      name: 'Civil Engineering',
      shortName: 'Civil',
      icon: '🏗',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Structures, construction, surveying, urban planning and infrastructure design.',
      fullDescription: `Civil Engineering is one of the oldest and broadest engineering disciplines. The programme covers structural engineering, construction technology, surveying, environmental engineering, transportation engineering, and urban infrastructure design. Students gain hands-on experience in the fully equipped Civil Engineering lab and drawing hall.`,
      subjects: ['Engineering Mathematics', 'Structural Analysis', 'Construction Technology', 'Surveying', 'Environmental Engineering', 'Highway Engineering'],
      faculty: { url: '/assets/docs/Civil-Faculty.xls', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/CE-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/CE-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'electrical',
      name: 'Electrical & Electronics Engineering',
      shortName: 'EEE',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Power systems, circuit design, drives and modern electrical applications.',
      fullDescription: `The Electrical & Electronics Engineering programme provides a strong foundation in power systems, electrical machines, control systems, electronics and communication. Students learn through practical sessions in the well-equipped Electrical Machines Lab, Electronics Lab and Power Electronics Lab.`,
      subjects: ['Circuit Theory', 'Electrical Machines', 'Power Systems', 'Control Systems', 'Electronics', 'Microprocessors'],
      faculty: { url: '/assets/docs/EEE-Faculty.xlsx', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/EE-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/EE-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'mechanical',
      name: 'Mechanical Engineering',
      shortName: 'Mech',
      icon: '⚙',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Manufacturing, thermodynamics, machine design and production engineering.',
      fullDescription: `Mechanical Engineering covers the design, manufacturing and maintenance of mechanical systems. The department has the unique distinction of being the only polytechnic in Karnataka with a Production Cum Training Centre. Students get hands-on training in CNC machining, welding, casting and manufacturing processes.`,
      subjects: ['Engineering Drawing', 'Thermodynamics', 'Machine Design', 'Manufacturing Technology', 'Fluid Mechanics', 'CAD/CAM'],
      faculty: { url: '/assets/docs/Mech-Faculty.xls', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/ME-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/ME-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'automobile',
      name: 'Automobile Engineering',
      shortName: 'Auto',
      icon: '🚗',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Vehicle systems, engine mechanics, EV technologies and automotive design.',
      fullDescription: `Automobile Engineering focuses on the design, development and maintenance of vehicles. The programme covers engine technology, transmission systems, automotive electronics, vehicle dynamics and the emerging field of Electric Vehicles (EV). The department has a modern automobile workshop with the latest engine and vehicle systems.`,
      subjects: ['Engine Technology', 'Transmission Systems', 'Vehicle Dynamics', 'Automotive Electronics', 'EV Technology', 'Auto Workshop Practice'],
      faculty: { url: '/assets/docs/Auto-Faculty.xlsx', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/AU-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/AU-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'electronics',
      name: 'Electronics & Communication Engineering',
      shortName: 'ECE',
      icon: '📡',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Digital systems, communication networks, IoT and embedded systems.',
      fullDescription: `Electronics & Communication Engineering covers analog and digital electronics, communication systems, embedded systems, IoT and signal processing. The department has well-equipped labs for Electronic Circuits, Digital Electronics, Microprocessors, and Communication Systems.`,
      subjects: ['Analog Electronics', 'Digital Electronics', 'Communication Systems', 'Embedded Systems', 'IoT', 'Signal Processing'],
      faculty: { url: '/assets/docs/ECE-Faculty.xlsx', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/EC-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/EC-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      shortName: 'CSE',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Programming, databases, networking and software development.',
      fullDescription: `Computer Science & Engineering provides comprehensive training in programming, data structures, databases, networking, web development, and software engineering. Students work on live projects and have access to well-equipped computer labs with the latest software and high-speed internet.`,
      subjects: ['C Programming', 'Data Structures', 'DBMS', 'Networking', 'Web Development', 'Operating Systems'],
      faculty: { url: '/assets/docs/CSE-Faculty.xls', label: 'Faculty Details' },
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/CS-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/CS-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'instrumentation',
      name: 'Electronics Instrumentation & Control',
      shortName: 'EIC',
      icon: '🎛',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Control systems, sensors, PLCs and industrial instrumentation.',
      fullDescription: `Electronics Instrumentation & Control Engineering covers measurement systems, sensors, transducers, industrial instrumentation, PLC programming and process control. Graduates are well-placed in the automation and process industries.`,
      subjects: ['Measurement Systems', 'Transducers', 'Process Control', 'PLC Programming', 'Industrial Instrumentation', 'SCADA'],
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/EIC-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/EIC-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'ise',
      name: 'Information Science Engineering',
      shortName: 'ISE',
      icon: '💡',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Data management, web technologies and networking.',
      fullDescription: `Information Science Engineering focuses on information systems, database management, software development, networking and cybersecurity. The programme prepares students for roles in IT companies, banking and public sector organisations.`,
      subjects: ['Information Systems', 'RDBMS', 'Software Engineering', 'Networking', 'Cybersecurity', 'Python Programming'],
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/IS-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/IS-C21-Syllabus.rar' }
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial Practice',
      shortName: 'CP',
      icon: '📊',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      duration: '3 Years',
      description: 'Business administration, accounting and secretarial practice.',
      fullDescription: `Commercial Practice is a non-technical diploma programme covering business administration, financial accounting, secretarial practice, office management and commerce. Graduates find employment in banks, offices, government departments and private companies.`,
      subjects: ['Financial Accounting', 'Business Administration', 'Secretarial Practice', 'Office Management', 'Tally', 'Business Communication'],
      syllabus: [
        { label: 'C-19 Syllabus', url: '/assets/docs/CP-C19-Syllabus.rar' },
        { label: 'C-21 Syllabus', url: '/assets/docs/CP-C21-Syllabus.rar' }
      ]
    }
  ],

  skillProgrammes: [
    { icon: '🚗', title: 'Automobile Sector',    description: 'Vehicle maintenance, engine repair, EV fundamentals and automotive service skills.', tags: ['Engine Mechanics', 'EV Basics', 'Auto Service'],    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80' },
    { icon: '🏭', title: 'Manufacturing Sector', description: 'Machining, welding, fabrication and industrial production skills.',                  tags: ['Machining', 'Welding', 'Fabrication'],              image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80' },
    { icon: '🛎', title: 'Service Sector',        description: 'Customer service, retail, hospitality and BPO skills for the services industry.',  tags: ['Retail', 'Hospitality', 'BPO Skills'],              image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80' },
    { icon: '📊', title: 'Commercial Practice',  description: 'Accounting, business administration and office management skills.',                  tags: ['Accounting', 'Office Mgmt', 'Commerce'],            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' }
  ],

  // ── EXAMINATIONS ──────────────────────────
  examinations: {
    results: [
      { batch: 'C-21 / C-25', label: 'C-21 / C-25 Results',       url: 'https://resultstest.digitalmis.com/', icon: '📊' },
      { batch: 'C-15 / C-19', label: 'C-15 / C-19 Results',       url: 'https://results.bvvspolytech.com/',   icon: '📊' },
      { batch: 'Community',   label: 'Community College Results',  url: 'https://bvvspolytech.com/CommunityResult.aspx', icon: '📊' }
    ],
    circulars: [
      { icon: '📢', title: 'Exam Circular May 2025',     description: 'Official examination circular for May 2025 semester examinations — schedule, venue and guidelines.',                     docUrl: '/assets/docs/exam-circular-may25.pdf',    label: 'Download Circular' },
      { icon: '⏸', title: 'Postponement Notice',         description: 'Nov-2025 Exam Postponement Circular — revised dates and updated examination schedule.',                                docUrl: '/assets/docs/exam-postpone.pdf',           label: 'Download Notice' },
      { icon: '📝', title: 'Exam Form Notice Nov 2025',  description: 'Examination form submission notice for November 2025 examinations — fees and deadlines.',                               docUrl: '/assets/docs/exam-form-notice-nov25.jpg', label: 'View Notice' }
    ],
    rules: [
      { icon: '🏛', title: 'Examination Cell',             description: 'The Examination Cell handles all certificate requests, duplicates, corrections, revaluation and fee structure.',  docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Visit Exam Cell' },
      { icon: '📄', title: 'Certificate',                  description: 'Apply for original diploma certificate after successful completion of all semesters.',                             docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Apply' },
      { icon: '📄', title: 'Duplicate Certificate',        description: 'Apply for a duplicate diploma certificate in case of loss or damage of original.',                                docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Apply' },
      { icon: '📄', title: 'Duplicate Marks Card',         description: 'Apply for duplicate semester marks card in case of loss or damage.',                                              docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Apply' },
      { icon: '✏️', title: 'Correction of Marks Card',    description: 'Apply for correction of name, date of birth or other details on marks card.',                                     docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Apply' },
      { icon: '💰', title: 'Exam Fee Structure',           description: 'Details of examination fees for regular, backlog and lateral entry students.',                                    docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'View Fees' },
      { icon: '🔄', title: 'Revaluation',                  description: 'Apply for revaluation of answer scripts if not satisfied with results.',                                          docUrl: 'https://bvvspolytech.com/exam.aspx',                                                               label: 'Apply' },
      { icon: '📋', title: 'Exam Regulations',             description: 'Official examination rules and regulations governing all Diploma programmes.',                                    docUrl: 'https://bvvspolytech.com/pdf/EXAM%20RULES11-12.pdf',                                              label: 'View Regulations' },
      { icon: '📋', title: 'C-19 Exam Rules',              description: 'Detailed rules specific to the C-19 curriculum batch examinations.',                                              docUrl: 'https://bvvspolytech.com/pdf/112169.pdf',                                                          label: 'View Rules' },
      { icon: '📋', title: 'C-21 Exam Rules (Revised)',    description: 'Updated rules and guidelines for C-21 curriculum examinations.',                                                  docUrl: 'https://bvvspolytech.com/pdf/exam%20rules%20and%20guidelines-C-21-REVISED.docx',                 label: 'Download' },
      { icon: 'ℹ',  title: 'General Instructions',         description: 'General examination instructions applicable to all students.',                                                    docUrl: 'https://bvvspolytech.com/pdf/Exam%20General%20Instructions.pdf',                                  label: 'Download' },
      { icon: '🎓', title: 'Student Instructions',         description: 'Specific guidelines for students during examination — conduct and procedures.',                                   docUrl: 'https://bvvspolytech.com/pdf/Exam%20Students%20Instructions.pdf',                                label: 'Download' },
      { icon: '🧘', title: 'Yoga Practical Notification',  description: 'Examination notification for Yoga practical examinations — mandatory for all Diploma students.',                  docUrl: 'https://bvvspolytech.com/pdf/Exam%20Notification%20Addition.pdf',                               label: 'Download' }
    ]
  },

  // ── STUDENT LIFE ──────────────────────────
  studentLife: {
    resources: [
      { icon: '💼', title: 'Placement Cell',         description: 'Campus placement drives, industry connections, pre-placement training and career guidance.',                        docUrl: null,                                                                                      label: 'Visit Placement Cell' },
      { icon: '📚', title: 'Library',                description: 'Thousands of reference books, NDL (National Digital Library), Delnet, PDF Drive access.',                          docUrl: null,                                                                                      label: 'Explore Library' },
      { icon: '🏋', title: 'Facilities',             description: 'Well-equipped labs, sports courts, hostel accommodation, canteen and modern campus infrastructure.',                docUrl: null,                                                                                      label: 'Explore Facilities' },
      { icon: '🎓', title: 'Government Scholarships', description: 'Government scholarship programmes for SC/ST, OBC, minority and economically weaker students.',                    docUrl: 'https://bvvspolytech.com/pdf/scholarship.pdf',                                           label: 'View Scholarships' },
      { icon: '🎓', title: 'Scholarship Disbursement 2015–18', description: 'Government scholarship disbursement details for the period 2015–18.',                                   docUrl: 'https://bvvspolytech.com/pdf/Government%20Scholrship%202015-18-converted.pdf',           label: 'View Document' },
      { icon: '💡', title: 'AICTE Pragati & Saksham', description: 'AICTE Pragati scholarship for girl students and Saksham for differently-abled students.',                         docUrl: 'https://bvvspolytech.com/pdf/Notice%20AICTE%20PRAGATI%20%26%20SAKSHAM%20Scholarships%2020-21.pdf', label: 'View Notice' },
      { icon: '🖼', title: 'Campus Gallery',         description: 'Photos from campus events, technical fests, NSS activities, sports meets and student celebrations.',               docUrl: 'https://bvvspolytech.com/gallerynew.aspx',                                               label: 'View Gallery' },
      { icon: '📅', title: 'Calendar of Events',     description: 'Official academic and extracurricular events calendar for 2025–26.',                                               docUrl: 'https://bvvspolytech.com/pdf/calander%20of%20events%202025-2026.pdf',                    label: 'Download Calendar' },
      { icon: '📁', title: 'RTI 2023–24',            description: 'Right to Information Act disclosure document for the year 2023–24.',                                               docUrl: 'https://bvvspolytech.com/pdf/RTI%202023-24.pdf',                                         label: 'View RTI' }
    ],
    committees: [
      { icon: '🤝', title: 'Alumni Executive Committee',      description: 'The Alumni EC maintains the network of BVVS graduates, organises meets and supports current students.',                         docUrl: 'https://bvvspolytech.com/aluminiec.aspx',                                                   label: 'View Alumni EC' },
      { icon: '🎓', title: 'Academic Committee',              description: 'Oversees curriculum quality, academic standards and faculty development across all departments.',                              docUrl: 'https://bvvspolytech.com/academic.aspx',                                                    label: 'View Committee' },
      { icon: '📋', title: 'SPG — Strategic Planning Group',  description: 'Responsible for institutional development planning and goal-setting.',                                                        docUrl: 'https://bvvspolytech.com/downloads/21032023/Strategic%20Planning%20Group.docx',             label: 'View Members' },
      { icon: '⚖',  title: 'ICC — Internal Complaints',       description: 'Internal Complaints Committee addressing workplace harassment and student grievances.',                                        docUrl: 'https://bvvspolytech.com/downloads/21032023/Sexual%20Harassment%20Committee.docx',          label: 'View Members' },
      { icon: '🏷',  title: 'SC/ST Committee',                description: 'Committee for welfare and addressing issues of Scheduled Caste and Scheduled Tribe students and staff.',                      docUrl: 'https://bvvspolytech.com/downloads/21032023/SC%20ST%20Committee.docx',                     label: 'View Details' },
      { icon: '🛡',  title: 'Anti-Ragging Committee',         description: 'Dedicated committee ensuring a ragging-free campus environment for all students.',                                            docUrl: 'https://bvvspolytech.com/downloads/21032023/Antiraging%20Committee.pdf',                   label: 'View Details' },
      { icon: '🏆',  title: 'Award Committee',                description: 'Recognises and awards outstanding students and faculty contributions.',                                                        docUrl: 'https://bvvspolytech.com/downloads/21032023/Award%20Committee.docx',                       label: 'View Details' },
      { icon: '📣',  title: 'Grievance Cell (Ombudsman)',     description: 'Students can report grievances through the official Ombudsman committee for timely resolution.',                              docUrl: 'https://bvvspolytech.com/downloads/21032023/OMBUDSMAN%20Committee.docx',                   label: 'View Committee' },
      { icon: '🔗',  title: 'Alumni Registration',            description: 'Are you a BVVS alumnus? Register to stay connected and mentor current students.',                                             docUrl: 'https://bvvspolytech.com/alumnireg.htm',                                                    label: 'Register Now' }
    ]
  },

  // ── ADMINISTRATION ────────────────────────
  administration: {
    accreditation: [
      { icon: '🏆', period: 'From 2023 To 2026',              title: 'NBA Accreditation 2023–2026',        description: 'Current NBA accreditation certificate valid from 2023 to 2026 covering all eligible Diploma programmes.',      docUrl: 'https://bvvspolytech.com/pdf/Accreditation23-26_240129_105843.pdf', label: 'View Certificate' },
      { icon: '🏆', period: 'From 30-6-2021 To 30-6-2023',   title: 'NBA Accreditation 2021–2023',        description: 'NBA accreditation certificate for the period 30th June 2021 to 30th June 2023.',                               docUrl: 'https://bvvspolytech.com/pdf/36188.pdf',                             label: 'View Certificate' },
      { icon: '📄', period: 'From 28/06/2007 To 28/06/2010', title: 'NBA Letter — E&C (2007–2010)',        description: 'NBA accreditation letter for Electronics & Communication Engineering from 28th June 2007 to 28th June 2010.',   docUrl: 'https://bvvspolytech.com/pdf/NBA%20E_C%20letter.doc',               label: 'Download' },
      { icon: '📄', period: 'From 16/03/2007 To 16/03/2010', title: 'NBA Letters — 4 Courses (2007–2010)', description: 'NBA accreditation letters for four courses from 16th March 2007 to 16th March 2010.',                         docUrl: 'https://bvvspolytech.com/pdf/NBA%20Letter-4%20Courses.doc',         label: 'Download' }
    ],
    eoaLetters: [
      { year: '2024–25', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%20Report%202024-25.PDF' },
      { year: '2022–23', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA-Report_2022-23.PDF' },
      { year: '2021–22', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2021-22.PDF' },
      { year: '2020–21', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2020-21.PDF' },
      { year: '2019–20', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA_Report_2019-20.pdf' },
      { year: '2018–19', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2018-19.PDF' },
      { year: '2017–18', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2017-18.pdf' },
      { year: '2016–17', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2016-17.PDF' },
      { year: '2015–16', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2015-16.pdf' },
      { year: '2014–15', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2014-15.PDF' },
      { year: '2013–14', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2013-14.PDF' },
      { year: '2012–13', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2012-13.pdf' },
      { year: '2011–12', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2011-12.pdf' },
      { year: '2010–11', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2010-11.pdf' },
      { year: '2009–10', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2009-10.pdf' },
      { year: '2008–09', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2008-09.pdf' },
      { year: '2007–08', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2007-08.pdf' },
      { year: '2004–07', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2004-07.pdf' },
      { year: '2003–04 DTE', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2003-04%20DTE%20LETTER.pdf' },
      { year: '1993–2003', docUrl: 'https://bvvspolytech.com/pdf/AICTE/EOA%2093-03%20(1).pdf' }
    ],
    finance: [
      { icon: '📊', title: 'Audit Report 2021–22',         description: 'Annual audit report for the financial year 2021–22.',     docUrl: 'https://bvvspolytech.com/pdf/audit/Audit%20Report%20for%2021-22.pdf',                          label: 'Download' },
      { icon: '📊', title: 'Audit Report 2020–21',         description: 'Annual audit report for the financial year 2020–21.',     docUrl: 'https://bvvspolytech.com/pdf/audit/2020-21%20audit%20report.pdf',                               label: 'Download' },
      { icon: '📊', title: 'Audit Report 2017–18',         description: 'Annual audit report for the financial year 2017–18.',     docUrl: 'https://bvvspolytech.com/pdf/audit/2017-18%20audit%20report.pdf',                               label: 'Download' },
      { icon: '📊', title: 'Audit Report 2016–17',         description: 'Annual audit report for the financial year 2016–17.',     docUrl: 'https://bvvspolytech.com/pdf/audit/2016-17%20audit%20report.pdf',                               label: 'Download' },
      { icon: '📊', title: 'Audit Report 2015–16',         description: 'Annual audit report for the financial year 2015–16.',     docUrl: 'https://bvvspolytech.com/pdf/audit/2015-16%20audit%20report.pdf',                               label: 'Download' },
      { icon: '💰', title: 'Budget 2019–20',               description: 'Annual budget document for 2019–20.',                     docUrl: 'https://bvvspolytech.com/pdf/budget/budget%2019-20.pdf',                                         label: 'Download' },
      { icon: '💰', title: 'Budget 2018–19',               description: 'Annual budget document for 2018–19.',                     docUrl: 'https://bvvspolytech.com/pdf/budget/budget%2018-19.pdf',                                         label: 'Download' },
      { icon: '💰', title: 'Budget 2017–18',               description: 'Annual budget document for 2017–18.',                     docUrl: 'https://bvvspolytech.com/pdf/budget/budget%2017-18.pdf',                                         label: 'Download' },
      { icon: '💰', title: 'Budget 2016–17',               description: 'Annual budget document for 2016–17.',                     docUrl: 'https://bvvspolytech.com/pdf/budget/budget%2016-17.pdf',                                         label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2021–22',     description: 'Consolidated salary statement for 2021–22.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202021-22.pdf',      label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2020–21',     description: 'Consolidated salary statement for 2020–21.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202020-21.pdf',      label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2019–20',     description: 'Consolidated salary statement for 2019–20.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/Consolidated%20Salary%20Statement%202019-20.pdf',      label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2018–19',     description: 'Consolidated salary statement for 2018–19.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/2018-19%20Consolidated%20Salary%20Statement.pdf',     label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2017–18',     description: 'Consolidated salary statement for 2017–18.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/2017-18%20Consolidated%20Salary%20Statement.pdf',     label: 'Download' },
      { icon: '💸', title: 'Salary Statement 2016–17',     description: 'Consolidated salary statement for 2016–17.',              docUrl: 'https://bvvspolytech.com/pdf/consolidated/2016-17%20consolidated%20salary%20Statement.pdf',     label: 'Download' },
      { icon: '📁', title: 'RTI 2023–24',                  description: 'Right to Information Act disclosure for 2023–24.',         docUrl: 'https://bvvspolytech.com/pdf/RTI%202023-24.pdf',                                                 label: 'View RTI' },
      { icon: '👥', title: 'Governing Council 2023–27',    description: 'Local Governing Council members for the term 2023–2027.', docUrl: 'https://bvvspolytech.com/downloads/21032023/GC%20Member%202023-2027.pdf',                        label: 'View Members' }
    ],
    downloads: [
      { icon: '📄', title: '2018 Revised State Scale',      docUrl: 'https://bvvspolytech.com/downloads/2018%20Revised%20State%20Scale.pdf' },
      { icon: '📄', title: 'AICTE Pay Scale for Poly 2011', docUrl: 'https://bvvspolytech.com/downloads/AICTE%20PAY%20SCALE%20FOR%20POLY%202011.pdf' },
      { icon: '📄', title: 'AICTE 7th Pay Scale 2018',      docUrl: 'https://bvvspolytech.com/downloads/21032023/AICTE%207th%20Pay%20Scale%202018.pdf' },
      { icon: '📄', title: 'C&R Rules 2007',                docUrl: 'https://bvvspolytech.com/downloads/C%26R%20Rules%202007.pdf' }
    ]
  },

  // ── ACHIEVEMENTS ──────────────────────────
  achievements: [
    { text: 'Only Polytechnic in Karnataka with Academic Autonomous Status since 1999.' },
    { text: 'Only Polytechnic in Karnataka with Community College by MHRD-AICTE since 2013.' },
    { text: 'Recipient of Indira Gandhi NSS National Award by the President of India in 2015–16.' },
    { text: 'State Level "Best NSS Unit" Award by the Governor of Karnataka in 2014.' },
    { text: 'Only Polytechnic to include YOGA as a mandatory course in Diploma programmes.' },
    { text: 'World Bank Assistance (WBA) Scheme beneficiary since 1992.' },
    { text: 'Implemented Canada India Institutional Co-operation Project (CIICP) since 1996.' },
    { text: 'State Level Sports Meet organised in 1998–99; Silver Jubilee Sports Meet in 1987–88.' },
    { text: 'Organised National Level Tech-Utsav 2012 — Papers Presentation & Project Exhibition.' },
    { text: 'Participated in Smart India Hackathon 2017 and National Level Chhatra Vishwakarma Awards 2017.' },
    { text: 'Two faculty certified by Chartered Management Institute (CMI Level 5), UK under AICTE-UKIERI.' },
    { text: 'Four faculty — State Level "Best Polytechnic Teacher" Awardees by ISTE, New Delhi.' },
    { text: 'Faculty members as Authors of Textbooks & Reference Books for Karnataka DTE curriculum.' },
    { text: 'Faculty as State Level resource persons for EDUSAT & DTE Studio online classes, DTE Bengaluru.' },
    { text: 'Faculty member as Section Managing Committee Member for Karnataka State ISTE Section.' },
    { text: 'Only Polytechnic with Production Cum Training Centre in Mechanical Engineering Department.' }
  ],

  achievementHighlights: [
    { icon: '🏆', text: 'Best Polytechnic Award — DTE Bengaluru 2000' },
    { icon: '🇮🇳', text: 'NSS National Award by President of India 2015–16' },
    { icon: '🤝', text: 'Canada-India Institutional Co-operation Project (CIICP)' },
    { icon: '⚙️', text: 'Smart India Hackathon 2017 Participant' },
    { icon: '🎖️', text: 'CMI Level 5 UK Certified Faculty (AICTE-UKIERI)' },
    { icon: '📡', text: 'EDUSAT & DTE Studio State Resource Faculty' },
    { icon: '📚', text: 'Faculty — Authors of DTE Textbooks & Reference Books' },
    { icon: '🌍', text: 'World Bank Assistance Scheme Beneficiary since 1992' },
    { icon: '🧘', text: 'Only Polytechnic with Yoga as Mandatory Diploma Course' },
    { icon: '🏭', text: 'Production Cum Training Centre — Mechanical Dept.' }
  ],

  // ── ADMISSION ────────────────────────────
  admission: {
    intro: `The admission process starts with the notification by the Directorate of Technical Education, Bangalore published in leading newspapers around the time of SSLC results (last week of April or first week of May). The announcement is also made on the DTE website and polytechnic websites.`,
    applicationInfo: `Applications are available at all Government and Aided Polytechnic offices across Karnataka. Applications may be purchased from any polytechnic and sent to any Nodal Center. Xerox copies are not accepted.`,
    duration: '6 Semesters (Three Years) · Medium of Instruction: English',
    eligibility: [
      { title: 'Direct Entry (I Semester)', points: ['Pass in Karnataka SSLC or equivalent examination.'] },
      {
        title: 'Lateral Entry (III Semester)',
        points: [
          'Passed 10+2 with Physics and Chemistry as compulsory subjects along with Mathematics/Biology.',
          '10+2 Science (with Mathematics) or 10+2 Science with Technical Vocational Subject.',
          '10th + 2 years ITI with appropriate trade — eligible for second year Diploma in appropriate programme.'
        ]
      }
    ],
    procedure: [
      'Admission to diploma courses is based on merit in each category of reservation.',
      '50% of seats are reserved for various groups of society. Remaining 50% are allotted on SSLC marks for technical courses.',
      'Selection for aided courses: through online interactive counselling centres as per Government of Karnataka guidelines.',
      'Selection for unaided courses: by management as per Government of Karnataka rules. Detailed instructions issued with application forms.'
    ],
    skillDevelopment: {
      title: 'Admission to Skill Development Programme',
      points: [
        'Applications for admission available at the Polytechnic office.',
        'Eligibility: Pass in Karnataka SSLC or Equivalent Examination.',
        'Admission will be on First Come First Basis.'
      ]
    }
  },

  // ── PLACEMENT ────────────────────────────
  placement: {
    description: `The Placement & Training Cell aims to provide adequate technical exposure and industrial training to students, enabling them to secure employment in reputed industries, organisations and government sectors. It takes suggestions from industry members regarding curriculum design/modification.`,
    activities: [
      'Organises Industry-Institute meet and technical project exhibitions every year',
      'Signs MOUs with industrial organisations',
      'Coordinates campus recruitment drives from top companies',
      'Provides pre-placement training and career guidance'
    ],
    companies: [
      { name: 'JSW Steel', sector: 'Steel & Manufacturing' },
      { name: 'TVS Motor', sector: 'Automobile' },
      { name: 'L&T', sector: 'Engineering & Construction' },
      { name: 'John Deere', sector: 'Agriculture & Heavy Equipment' },
      { name: 'Regenpowertech', sector: 'Power & Energy' },
      { name: 'BEL', sector: 'Defence Electronics' },
      { name: 'Scania Motors', sector: 'Heavy Vehicles' },
      { name: 'Cipla', sector: 'Pharmaceuticals' },
      { name: 'Tata Marcopolo', sector: 'Buses & Commercial Vehicles' },
      { name: 'TAML (Tata Advanced Material Lab)', sector: 'Advanced Materials' }
    ],
    placementDataUrl: 'https://bvvspolytech.com/pdf/staffs/BVVS%20Placement%20data.docx'
  },

  // ── COMMUNITY COLLEGE ────────────────────
  community: {
    description: `Community College was sanctioned by MHRD-AICTE, Govt. of India, New Delhi from 2013-14 to provide opportunities for skill-integrated, flexible, relevant, affordable and lifelong learning for underprivileged youth to acquire employable skills for their livelihood.`,
    cdtp: {
      title: 'Community Development Through Polytechnic (CDTP)',
      description: 'CDTP was sanctioned in 2009 to provide vocational training for rural communities and socially weaker sections.',
      schemeUrl: 'https://bvvspolytech.com/pdf/bvvs%20cdtp.pdf',
      communityPolytechnicsUrl: 'https://bvvspolytech.com/community%20polytechnics.aspx'
    },
    cctek: { title: 'CCTek', docUrl: 'https://bvvspolytech.com/pdf/NEW%2024TH%20SP%20DOCUMENT%202019-20(2).pdf' },
    ciicp: { title: 'CIICP — Canada India Institutional Co-operation Project', docUrl: 'https://bvvspolytech.com/pdf/Bvvsrefundpolicy.pdf' },
    calendarUrl: 'https://bvvspolytech.com/pdf/calander%20of%20events%202025-2026.pdf',
    admissionDetailsUrl: 'https://bvvspolytech.com/pdf/CC%20Adm%20Detials%20(1).pdf',
    externalLinks: [
      { label: 'DTE Karnataka',               url: 'http://dte.kar.nic.in' },
      { label: 'AICTE India',                  url: 'https://www.aicte-india.org/' },
      { label: 'MHRD',                         url: 'https://mhrd.gov.in/' },
      { label: 'DTE Studio Channel Bengaluru', url: 'https://www.youtube.com/c/DTEStudioChannelBengaluru' },
      { label: 'Swayam Gov',                   url: 'https://swayam.gov.in/' },
      { label: 'National Digital Library',     url: 'https://ndl.iitkgp.ac.in/' },
      { label: 'PDF Drive',                    url: 'https://www.pdfdrive.com/' },
      { label: 'Delnet',                       url: 'http://www.delnet.in/' }
    ]
  }
};

module.exports = data;
