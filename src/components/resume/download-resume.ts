export function downloadResume() {
  const resumeContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tyler Larson - Resume</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #1a1a1a; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
    h2 { color: #3b82f6; margin-top: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
    h3 { color: #1a1a1a; margin-bottom: 5px; }
    .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; }
    .job { margin-bottom: 25px; }
    .job-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .company { color: #3b82f6; font-weight: bold; }
    .date { color: #666; font-style: italic; }
    ul { margin: 10px 0; padding-left: 25px; }
    .skills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
    .skill { background: #e5e7eb; padding: 5px 12px; border-radius: 5px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Tyler Larson</h1>
  <div class="contact-info">
    <span>📧 tyler.larson@email.com</span>
    <span>📱 (555) 123-4567</span>
    <span>📍 San Francisco, CA</span>
    <span>🔗 linkedin.com/in/tylerlarson</span>
    <span>💻 github.com/tylerlarson</span>
  </div>

  <h2>Professional Summary</h2>
  <p>Experienced Full Stack Developer with 7+ years of expertise in building scalable web applications. Passionate about creating elegant solutions and mentoring team members. Proven track record of delivering high-quality software that drives business value.</p>

  <h2>Work Experience</h2>
  
  <div class="job">
    <div class="job-header">
      <div>
        <h3>Senior Full Stack Developer</h3>
        <p class="company">Tech Innovations Inc. - San Francisco, CA</p>
      </div>
      <p class="date">2022 - Present</p>
    </div>
    <ul>
      <li>Leading development of enterprise-scale applications using modern web technologies</li>
      <li>Increased application performance by 40% through optimization</li>
      <li>Led migration to microservices architecture</li>
      <li>Implemented CI/CD pipeline reducing deployment time by 60%</li>
    </ul>
    <div class="skills">
      <span class="skill">React</span>
      <span class="skill">Node.js</span>
      <span class="skill">TypeScript</span>
      <span class="skill">Python</span>
      <span class="skill">REST API</span>
      <span class="skill">Docker</span>
      <span class="skill">PostgreSQL</span>
      <span class="skill">Bash</span>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div>
        <h3>Full Stack Developer</h3>
        <p class="company">Digital Solutions Co. - Austin, TX</p>
      </div>
      <p class="date">2020 - 2022</p>
    </div>
    <ul>
      <li>Developed and maintained multiple client-facing web applications</li>
      <li>Built responsive web applications serving 100K+ users</li>
      <li>Reduced bug count by 35% through comprehensive testing</li>
      <li>Integrated third-party APIs for enhanced functionality</li>
    </ul>
    <div class="skills">
      <span class="skill">React</span>
      <span class="skill">PHP</span>
      <span class="skill">Laravel</span>
      <span class="skill">JavaScript</span>
      <span class="skill">HTML</span>
      <span class="skill">CSS</span>
      <span class="skill">Tailwind CSS</span>
      <span class="skill">REST API</span>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div>
        <h3>Frontend Developer</h3>
        <p class="company">StartUp Ventures - Remote</p>
      </div>
      <p class="date">2018 - 2020</p>
    </div>
    <ul>
      <li>Created engaging user interfaces and interactive experiences</li>
      <li>Developed reusable component library used across 5+ projects</li>
      <li>Improved page load time by 50% through code splitting</li>
      <li>Implemented accessibility standards achieving WCAG 2.1 AA compliance</li>
    </ul>
    <div class="skills">
      <span class="skill">JavaScript</span>
      <span class="skill">React</span>
      <span class="skill">HTML</span>
      <span class="skill">CSS</span>
      <span class="skill">Tailwind CSS</span>
      <span class="skill">Webpack</span>
      <span class="skill">Git</span>
    </div>
  </div>

  <h2>Education</h2>
  <div class="job">
    <div class="job-header">
      <div>
        <h3>Bachelor of Science in Computer Science</h3>
        <p class="company">University of Technology - Boston, MA</p>
      </div>
      <p class="date">2014 - 2018</p>
    </div>
    <p><strong>Honors:</strong> Magna Cum Laude</p>
  </div>

  <h2>Technical Skills</h2>
  <div class="skills">
    <span class="skill">JavaScript/TypeScript</span>
    <span class="skill">React</span>
    <span class="skill">Next.js</span>
    <span class="skill">Node.js</span>
    <span class="skill">Express</span>
    <span class="skill">PHP</span>
    <span class="skill">Laravel</span>
    <span class="skill">Python</span>
    <span class="skill">REST API</span>
    <span class="skill">HTML</span>
    <span class="skill">CSS</span>
    <span class="skill">Tailwind CSS</span>
    <span class="skill">PostgreSQL</span>
    <span class="skill">MongoDB</span>
    <span class="skill">AWS</span>
    <span class="skill">Docker</span>
    <span class="skill">Bash</span>
    <span class="skill">Git</span>
    <span class="skill">CI/CD</span>
  </div>

  <h2>Certifications</h2>
  <ul>
    <li>AWS Certified Solutions Architect</li>
    <li>Google Cloud Professional Developer</li>
    <li>MongoDB Certified Developer</li>
  </ul>
</body>
</html>
  `;

  const blob = new Blob([resumeContent], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tyler_Larson_Resume.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

