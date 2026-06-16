const loginPanel = document.querySelector("[data-login-panel]");
const openLoginButtons = document.querySelectorAll("[data-open-login]");
const closeLoginButton = document.querySelector("[data-close-login]");
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");
const appHub = document.querySelector("#appHub");
const dashboard = document.querySelector("#dashboard");
const logoutButton = document.querySelector("#logoutButton");
const caseButtons = document.querySelectorAll(".case-button");
const navLinks = document.querySelectorAll(".nav-link");
const dashboardSideButtons = document.querySelectorAll(".dashboard-sidebar button");
const openHealthButton = document.querySelector("[data-open-health]");
const openMarketButton = document.querySelector("[data-open-market]");
const comingSoon = document.querySelector("[data-coming-soon]");
const closeComingButton = document.querySelector("[data-close-coming]");
const hubLogoutButton = document.querySelector("[data-hub-logout]");
const riskCalculator = document.querySelector("#riskCalculator");
const deptButtons = document.querySelectorAll("[data-dept]");
const haitiGoogleMap = document.querySelector("#haitiGoogleMap");
const openGoogleMap = document.querySelector("#openGoogleMap");
const dashboardSections = document.querySelectorAll(".dashboard-section");
const childSearch = document.querySelector("#childSearch");
const riskFilter = document.querySelector("#riskFilter");
const childrenTable = document.querySelector("#childrenTable");
const alertsList = document.querySelector("#alertsList");
const reportDepartment = document.querySelector("#reportDepartment");
const reportPeriod = document.querySelector("#reportPeriod");
const generateReport = document.querySelector("#generateReport");
const newChildButton = document.querySelector("#newChildButton");
const editChildButton = document.querySelector("#editChildButton");
const childFormCard = document.querySelector("#childFormCard");
const childForm = document.querySelector("#childForm");
const formChildDept = document.querySelector("#formChildDept");
const messageThread = document.querySelector("#messageThread");
const messageForm = document.querySelector("#messageForm");
const messageInput = document.querySelector("#messageInput");
let selectedChildId = null;

const departments = {
  "Artibonite": { count: 940, moderate: 188, high: 61, arrondissements: 5, cities: "Gonaives, Saint-Marc, Dessalines" },
  "Centre": { count: 620, moderate: 121, high: 43, arrondissements: 4, cities: "Hinche, Mirebalais, Lascahobas" },
  "Grand'Anse": { count: 410, moderate: 82, high: 31, arrondissements: 3, cities: "Jeremie, Anse-d'Hainault, Dame-Marie" },
  "Nippes": { count: 360, moderate: 64, high: 22, arrondissements: 3, cities: "Miragoane, Anse-a-Veau, Petite-Riviere" },
  "Nord": { count: 780, moderate: 139, high: 45, arrondissements: 7, cities: "Cap-Haitien, Limbe, Grande-Riviere-du-Nord" },
  "Nord-Est": { count: 330, moderate: 58, high: 19, arrondissements: 4, cities: "Fort-Liberte, Ouanaminthe, Trou-du-Nord" },
  "Nord-Ouest": { count: 390, moderate: 81, high: 28, arrondissements: 3, cities: "Port-de-Paix, Saint-Louis-du-Nord, Mole-Saint-Nicolas" },
  "Ouest": { count: 1240, moderate: 231, high: 78, arrondissements: 5, cities: "Port-au-Prince, Carrefour, Petion-Ville" },
  "Sud": { count: 520, moderate: 96, high: 37, arrondissements: 5, cities: "Les Cayes, Port-Salut, Aquin" },
  "Sud-Est": { count: 450, moderate: 83, high: 29, arrondissements: 3, cities: "Jacmel, Bainet, Belle-Anse" },
};

const childRecords = [
  { id: "HT-0001", name: "Amara Jean", sex: "Female", caregiver: "Mireille Jean", family: "Lives with mother and two siblings; caregiver sells food near the local market.", affiliationType: "Hospital program", affiliation: "St. Damien Pediatric Outreach", enrolled: "May 2026", notes: "Referred after low MUAC and fever during community screening.", dept: "Ouest", city: "Port-au-Prince", age: 22, muac: 10.9, temp: 38.1, heart: 132, spo2: 93, risk: "High", last: "Today 10:24", action: "Urgent referral recommended" },
  { id: "HT-0002", name: "Noah Pierre", sex: "Male", caregiver: "Jean Pierre", family: "Lives with father and grandmother; family attends weekly community food support.", affiliationType: "School", affiliation: "Ecole Communautaire du Nord", enrolled: "April 2026", notes: "Follow-up case after reduced appetite and borderline MUAC.", dept: "Nord", city: "Cap-Haitien", age: 34, muac: 12.3, temp: 37.5, heart: 119, spo2: 96, risk: "Moderate", last: "Today 09:45", action: "Nutrition follow-up within 7 days" },
  { id: "HT-0003", name: "Maya Louis", sex: "Female", caregiver: "Nadine Louis", family: "Two-parent household; child enrolled through preschool screening day.", affiliationType: "School", affiliation: "Les Cayes Early Learning Center", enrolled: "June 2026", notes: "Routine monitoring record with stable vital and nutrition indicators.", dept: "Sud", city: "Les Cayes", age: 28, muac: 14.8, temp: 36.8, heart: 103, spo2: 98, risk: "Normal", last: "Today 08:40", action: "Routine observation" },
  { id: "HT-0004", name: "Samuel Joseph", sex: "Male", caregiver: "Rose Joseph", family: "Mother-led household; transport to clinic is difficult during rainy season.", affiliationType: "Church", affiliation: "Gonaives Community Church Program", enrolled: "May 2026", notes: "Priority follow-up due to high-risk anthropometric signal.", dept: "Artibonite", city: "Gonaives", age: 18, muac: 11.2, temp: 37.9, heart: 128, spo2: 94, risk: "High", last: "Yesterday 16:15", action: "Priority health-worker review" },
  { id: "HT-0005", name: "Lea Baptiste", sex: "Female", caregiver: "Claudette Baptiste", family: "Lives with aunt during weekdays; family receives nutrition counseling.", affiliationType: "Community program", affiliation: "Hinche Maternal and Child Nutrition Group", enrolled: "March 2026", notes: "Repeated measurement recommended to confirm trend.", dept: "Centre", city: "Hinche", age: 41, muac: 12.7, temp: 37.2, heart: 113, spo2: 96, risk: "Moderate", last: "Yesterday 14:05", action: "Repeat MUAC and weight check" },
  { id: "HT-0006", name: "Ethan Charles", sex: "Male", caregiver: "Marc Charles", family: "Lives with parents; active child with regular school attendance.", affiliationType: "Clinic", affiliation: "Ouanaminthe Primary Care Clinic", enrolled: "June 2026", notes: "Normal observation record kept for program monitoring.", dept: "Nord-Est", city: "Ouanaminthe", age: 31, muac: 13.9, temp: 36.9, heart: 104, spo2: 98, risk: "Normal", last: "Yesterday 11:22", action: "Routine observation" },
  { id: "HT-0007", name: "Anaise Michel", sex: "Female", caregiver: "Solange Michel", family: "Caregiver reports irregular meals during school closure periods.", affiliationType: "NGO program", affiliation: "Miragoane Child Nutrition Outreach", enrolled: "April 2026", notes: "Moderate-risk case linked to counseling and weekly food support.", dept: "Nippes", city: "Miragoane", age: 25, muac: 12.1, temp: 37.6, heart: 122, spo2: 95, risk: "Moderate", last: "Jun 12 15:33", action: "Caregiver nutrition counseling" },
  { id: "HT-0008", name: "David Augustin", sex: "Male", caregiver: "Patrick Augustin", family: "Lives with extended family; travel distance delays health follow-up.", affiliationType: "Hospital program", affiliation: "Jeremie Pediatric Referral Network", enrolled: "May 2026", notes: "Urgent referral flag generated after low MUAC and low SpO2.", dept: "Grand'Anse", city: "Jeremie", age: 16, muac: 10.7, temp: 38.4, heart: 136, spo2: 92, risk: "High", last: "Jun 12 10:08", action: "Urgent referral recommended" },
  { id: "HT-0009", name: "Sofia Etienne", sex: "Female", caregiver: "Marise Etienne", family: "Family participates in monthly community health education.", affiliationType: "Church", affiliation: "Jacmel Parish Health Desk", enrolled: "June 2026", notes: "Stable case used for routine growth monitoring.", dept: "Sud-Est", city: "Jacmel", age: 38, muac: 14.1, temp: 36.7, heart: 101, spo2: 99, risk: "Normal", last: "Jun 11 13:10", action: "Routine observation" },
  { id: "HT-0010", name: "Daniel Moise", sex: "Male", caregiver: "Elise Moise", family: "Lives with mother and uncle; enrolled through mobile outreach visit.", affiliationType: "Mobile clinic", affiliation: "Port-de-Paix Outreach Team", enrolled: "April 2026", notes: "Moderate-risk follow-up requested for next outreach cycle.", dept: "Nord-Ouest", city: "Port-de-Paix", age: 29, muac: 12.4, temp: 37.4, heart: 118, spo2: 96, risk: "Moderate", last: "Jun 11 09:05", action: "Nutrition follow-up within 7 days" },
];

const messages = [
  { from: "Community nurse", time: "10:24", text: "High-risk case HT-0001 needs referral confirmation." },
  { from: "ManjAI Admin", time: "10:26", text: "Referral flagged. Please verify MUAC measurement and caregiver contact." },
  { from: "Nutrition coordinator", time: "10:31", text: "Ouest team can review the case this afternoon." },
];

const cases = {
  normal: {
    risk: "Normal Risk",
    text: "The simulated child record is within expected screening limits.",
    confidence: 91,
    age: "28 months",
    weight: "12.6 kg",
    height: "88.5 cm",
    muac: "14.8 cm",
    temp: "36.8 C",
    heart: "103 bpm",
    spo2: "98%",
    activity: "Good",
    alertTitle: "No urgent alert",
    alertText: "Continue routine observation and scheduled nutrition follow-up.",
    status: "normal",
    chart: [74, 79, 76, 82, 80, 84, 81, 86, 83, 88, 85, 90],
  },
  moderate: {
    risk: "Moderate Risk",
    text: "The model identifies early warning signs that require caregiver review.",
    confidence: 87,
    age: "34 months",
    weight: "10.8 kg",
    height: "86.2 cm",
    muac: "12.3 cm",
    temp: "37.5 C",
    heart: "119 bpm",
    spo2: "96%",
    activity: "Reduced",
    alertTitle: "Moderate nutrition-risk alert",
    alertText: "Recommend nutrition follow-up and repeated screening measurement.",
    status: "moderate",
    chart: [82, 86, 91, 88, 95, 92, 96, 101, 99, 103, 108, 105],
  },
  high: {
    risk: "High Risk",
    text: "The simulated record is flagged for urgent screening attention.",
    confidence: 93,
    age: "22 months",
    weight: "8.7 kg",
    height: "79.4 cm",
    muac: "10.9 cm",
    temp: "38.1 C",
    heart: "132 bpm",
    spo2: "93%",
    activity: "Low",
    alertTitle: "High-risk screening alert",
    alertText: "Immediate referral or professional assessment is recommended.",
    status: "high",
    chart: [96, 101, 106, 110, 108, 115, 119, 121, 126, 130, 128, 134],
  },
};

function openLogin() {
  loginError.textContent = "";
  loginPanel.classList.add("is-open");
  loginPanel.setAttribute("aria-hidden", "false");
}

function closeLogin() {
  loginPanel.classList.remove("is-open");
  loginPanel.setAttribute("aria-hidden", "true");
}

function openDashboard() {
  closeLogin();
  appHub.classList.remove("is-open");
  appHub.setAttribute("aria-hidden", "true");
  document.body.classList.add("dashboard-active");
  dashboard.classList.add("is-open");
  dashboard.setAttribute("aria-hidden", "false");
  renderCase("normal");
  showDashboardView("overview");
  window.location.hash = "dashboard";
}

function openHub() {
  closeLogin();
  document.body.classList.add("dashboard-active");
  dashboard.classList.remove("is-open");
  dashboard.setAttribute("aria-hidden", "true");
  appHub.classList.add("is-open");
  appHub.setAttribute("aria-hidden", "false");
  window.location.hash = "apps";
}

function closeDashboard() {
  document.body.classList.remove("dashboard-active");
  dashboard.classList.remove("is-open");
  dashboard.setAttribute("aria-hidden", "true");
  appHub.classList.remove("is-open");
  appHub.setAttribute("aria-hidden", "true");
  comingSoon.classList.remove("is-open");
  comingSoon.setAttribute("aria-hidden", "true");
  window.location.hash = "home";
}

function showComingSoon() {
  comingSoon.classList.add("is-open");
  comingSoon.setAttribute("aria-hidden", "false");
}

function hideComingSoon() {
  comingSoon.classList.remove("is-open");
  comingSoon.setAttribute("aria-hidden", "true");
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function showDashboardView(view) {
  dashboardSections.forEach((section) => {
    section.classList.toggle("active-section", section.dataset.section === view);
  });

  dashboardSideButtons.forEach((button) => {
    if (button.id !== "logoutButton") {
      button.classList.toggle("side-active", button.dataset.view === view);
    }
  });

  const titles = {
    overview: "Child Nutrition Risk Overview",
    children: "Children Registry",
    alerts: "Risk Alerts",
    messages: "Instant Messages",
    reports: "Reports",
  };
  document.querySelector(".dashboard-top h2").textContent = titles[view];

  if (view === "overview") {
    drawChart(cases.normal.chart, "normal");
  }
}

function riskClass(risk) {
  return risk.toLowerCase();
}

function initialsForName(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function renderChildren() {
  const query = childSearch.value.trim().toLowerCase();
  const filter = riskFilter.value;
  const rows = childRecords.filter((child) => {
    const matchesText = [child.id, child.name, child.dept, child.city].some((value) => value.toLowerCase().includes(query));
    const matchesRisk = filter === "all" || child.risk === filter;
    return matchesText && matchesRisk;
  });

  childrenTable.innerHTML = rows.map((child) => `
    <tr data-child="${child.id}">
      <td>${child.id}</td>
      <td>${child.name}</td>
      <td>${child.dept}</td>
      <td>${child.age} mo</td>
      <td><span class="risk-badge ${riskClass(child.risk)}">${child.risk}</span></td>
      <td>${child.last}</td>
    </tr>
  `).join("");

  childrenTable.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => selectChild(row.dataset.child));
  });

  if (rows.length > 0) {
    selectChild(rows[0].id);
  }
}

function selectChild(id) {
  const child = childRecords.find((record) => record.id === id);
  if (!child) return;
  selectedChildId = id;

  childrenTable.querySelectorAll("tr").forEach((row) => {
    row.classList.toggle("selected-row", row.dataset.child === id);
  });

  setText("selectedChildName", child.name);
  setText("selectedChildInitials", initialsForName(child.name));
  const riskBadge = document.getElementById("selectedChildProfileRisk");
  riskBadge.className = `risk-badge ${riskClass(child.risk)}`;
  riskBadge.textContent = `${child.risk} risk`;
  setText("selectedChildBio", `${child.name} is a ${child.age}-month-old child from ${child.city}. The profile is part of the ManjAI software-simulation registry for preliminary nutrition-risk screening.`);
  setText("selectedChildId", child.id);
  setText("selectedChildSex", child.sex || "Not specified");
  setText("selectedChildAge", `${child.age} months`);
  setText("selectedChildDept", child.dept);
  setText("selectedChildCity", child.city);
  setText("selectedChildCaregiver", child.caregiver || "Not specified");
  setText("selectedChildAffiliationType", child.affiliationType || "Program");
  setText("selectedChildAffiliation", child.affiliation || "Community screening program");
  setText("selectedChildEnrolled", child.enrolled || "June 2026");
  setText("selectedChildMuac", `${child.muac.toFixed(1)} cm`);
  setText("selectedChildTemp", `${child.temp.toFixed(1)} C`);
  setText("selectedChildSpo2", `${Math.round(child.spo2)}%`);
  setText("selectedChildFamily", child.family || "Family context not yet recorded.");
  setText("selectedChildNotes", child.notes || "No additional program note recorded.");
  setText("selectedChildAction", child.action);
}

function resetChildForm() {
  document.getElementById("childFormTitle").textContent = "Register child";
  document.getElementById("formChildId").value = `HT-${String(childRecords.length + 1).padStart(4, "0")}`;
  document.getElementById("formChildName").value = "";
  document.getElementById("formChildDept").value = "Ouest";
  document.getElementById("formChildCity").value = "";
  document.getElementById("formChildAge").value = 24;
  document.getElementById("formChildMuac").value = 13.1;
  document.getElementById("formChildTemp").value = 36.9;
  document.getElementById("formChildSpo2").value = 98;
}

function loadSelectedChildIntoForm() {
  const child = childRecords.find((record) => record.id === selectedChildId);
  if (!child) return;

  document.getElementById("childFormTitle").textContent = `Edit ${child.name}`;
  document.getElementById("formChildId").value = child.id;
  document.getElementById("formChildName").value = child.name;
  document.getElementById("formChildDept").value = child.dept;
  document.getElementById("formChildCity").value = child.city;
  document.getElementById("formChildAge").value = child.age;
  document.getElementById("formChildMuac").value = child.muac;
  document.getElementById("formChildTemp").value = child.temp;
  document.getElementById("formChildSpo2").value = child.spo2;
  childFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function inferRiskFromChild(child) {
  let score = 0;
  score += child.muac < 11.5 ? 42 : child.muac < 12.5 ? 25 : child.muac < 13.5 ? 10 : 0;
  score += child.temp >= 38 ? 10 : child.temp >= 37.5 ? 5 : 0;
  score += child.spo2 < 94 ? 14 : child.spo2 < 96 ? 8 : 0;
  if (score >= 48) return "High";
  if (score >= 20) return "Moderate";
  return "Normal";
}

function recommendationForRisk(risk) {
  if (risk === "High") return "Urgent referral recommended";
  if (risk === "Moderate") return "Nutrition follow-up within 7 days";
  return "Routine observation";
}

function saveChildFromForm(event) {
  event.preventDefault();
  const child = {
    id: document.getElementById("formChildId").value.trim(),
    name: document.getElementById("formChildName").value.trim() || "Unnamed child",
    dept: document.getElementById("formChildDept").value,
    city: document.getElementById("formChildCity").value.trim() || "Unspecified",
    age: Number(document.getElementById("formChildAge").value),
    muac: Number(document.getElementById("formChildMuac").value),
    temp: Number(document.getElementById("formChildTemp").value),
    heart: 110,
    spo2: Number(document.getElementById("formChildSpo2").value),
    last: "Just now",
    sex: "Not specified",
    caregiver: "Caregiver not recorded",
    family: "Family context will be completed during the next health-worker interview.",
    affiliationType: "Community program",
    affiliation: "ManjAI demonstration registry",
    enrolled: "June 2026",
    notes: "New record created from the dashboard registration form.",
  };
  child.risk = inferRiskFromChild(child);
  child.action = recommendationForRisk(child.risk);

  const existingIndex = childRecords.findIndex((record) => record.id === child.id);
  if (existingIndex >= 0) {
    childRecords[existingIndex] = { ...childRecords[existingIndex], ...child };
  } else {
    childRecords.unshift(child);
  }

  renderChildren();
  renderAlerts();
  renderReport();
  selectChild(child.id);
}

function renderAlerts() {
  const priority = { High: 1, Moderate: 2, Normal: 3 };
  const sorted = [...childRecords].sort((a, b) => priority[a.risk] - priority[b.risk]);
  const counts = {
    High: childRecords.filter((child) => child.risk === "High").length,
    Moderate: childRecords.filter((child) => child.risk === "Moderate").length,
    Normal: childRecords.filter((child) => child.risk === "Normal").length,
  };

  setText("highAlertCount", counts.High);
  setText("moderateAlertCount", counts.Moderate);
  setText("normalAlertCount", counts.Normal);

  alertsList.innerHTML = sorted.map((child) => `
    <button class="alert-row ${riskClass(child.risk)}" type="button" data-child="${child.id}">
      <span>${child.risk}</span>
      <strong>${child.name}</strong>
      <em>${child.dept} - ${child.city}</em>
      <small>${child.action}</small>
    </button>
  `).join("");

  alertsList.querySelectorAll(".alert-row").forEach((row) => {
    row.addEventListener("click", () => {
      showDashboardView("children");
      selectChild(row.dataset.child);
    });
  });
}

function departmentTotals(name) {
  if (name === "All Haiti") {
    return Object.values(departments).reduce(
      (sum, dept) => ({
        count: sum.count + dept.count,
        moderate: sum.moderate + dept.moderate,
        high: sum.high + dept.high,
        arrondissements: sum.arrondissements + dept.arrondissements,
      }),
      { count: 0, moderate: 0, high: 0, arrondissements: 0 }
    );
  }

  return departments[name] || { count: 0, moderate: 0, high: 0, arrondissements: 0 };
}

function renderReport() {
  const dept = reportDepartment.value;
  const period = reportPeriod.value;
  const totals = departmentTotals(dept);

  setText("reportTitle", `${dept} - ${period}`);
  setText("reportTotal", totals.count.toLocaleString("en-US"));
  setText("reportModerate", totals.moderate.toLocaleString("en-US"));
  setText("reportHigh", totals.high.toLocaleString("en-US"));
  setText("reportDepartments", dept === "All Haiti" ? 10 : 1);
  setText("reportArrondissements", totals.arrondissements);
  setText(
    "reportNarrative",
    `This simulated report summarizes ManjAI Health screening activity for ${dept} during ${period}, covering ${dept === "All Haiti" ? "10 departments" : "1 department"} and ${totals.arrondissements} arrondissements. Values are demonstration data for thesis presentation and do not represent clinical deployment results.`
  );
}

function renderMessages() {
  messageThread.innerHTML = messages.map((message, index) => `
    <div class="message-bubble ${index % 2 === 1 ? "mine" : ""}">
      <strong>${message.from}</strong>
      <p>${message.text}</p>
      <span>${message.time}</span>
    </div>
  `).join("");
  messageThread.scrollTop = messageThread.scrollHeight;
}

function sendMessage(event) {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  messages.push({ from: "ManjAI Admin", time: "Now", text });
  messageInput.value = "";
  renderMessages();
}

function populateDepartmentSelects() {
  formChildDept.innerHTML = Object.keys(departments).map((name) => `<option value="${name}">${name}</option>`).join("");
}

function calcRiskFromInputs() {
  const values = {
    age: Number(document.getElementById("calcAge").value),
    weight: Number(document.getElementById("calcWeight").value),
    height: Number(document.getElementById("calcHeight").value),
    muac: Number(document.getElementById("calcMuac").value),
    temp: Number(document.getElementById("calcTemp").value),
    heart: Number(document.getElementById("calcHeart").value),
    spo2: Number(document.getElementById("calcSpo2").value),
    activity: Number(document.getElementById("calcActivity").value),
  };

  const expectedWeight = 3.3 + 2.55 * Math.log1p(values.age) + 0.11 * values.age;
  const expectedHeight = 49.5 + 16.5 * Math.log1p(values.age) + 0.28 * values.age;
  const weightGap = (expectedWeight - values.weight) / Math.max(expectedWeight, 1);
  const heightGap = (expectedHeight - values.height) / Math.max(expectedHeight, 1);

  let score = 0;
  score += values.muac < 11.5 ? 42 : values.muac < 12.5 ? 25 : values.muac < 13.5 ? 10 : 0;
  score += weightGap > 0.26 ? 30 : weightGap > 0.16 ? 18 : weightGap > 0.08 ? 8 : 0;
  score += heightGap > 0.18 ? 12 : heightGap > 0.1 ? 7 : 0;
  score += values.temp >= 38 ? 10 : values.temp >= 37.5 ? 5 : 0;
  score += values.heart > 130 ? 8 : values.heart > 115 ? 4 : 0;
  score += values.spo2 < 94 ? 14 : values.spo2 < 96 ? 8 : 0;
  score += values.activity < 0.55 ? 12 : values.activity < 0.8 ? 6 : 0;

  if (score >= 62) {
    return { level: "high", confidence: Math.min(96, 82 + Math.round(score / 5)), score, values };
  }

  if (score >= 32) {
    return { level: "moderate", confidence: Math.min(92, 75 + Math.round(score / 6)), score, values };
  }

  return { level: "normal", confidence: Math.max(84, 96 - Math.round(score / 4)), score, values };
}

function classFromMethodScore(score) {
  if (score >= 62) return "High";
  if (score >= 32) return "Moderate";
  return "Normal";
}

function methodOutputs(result) {
  const methods = [
    { name: "Logistic Regression", offset: -6, note: "Linear baseline, useful for comparison." },
    { name: "Random Forest", offset: -2, note: "Tree-based method, useful for feature interpretation." },
    { name: "SVM (RBF)", offset: 3, note: "Strong boundary-based classifier." },
    { name: "MLP", offset: 5, note: "Recommended method in this thesis experiment." },
  ];

  return methods.map((method) => {
    const adjustedScore = Math.max(0, Math.min(100, result.score + method.offset));
    const probability = Math.max(4, Math.min(97, Math.round(12 + adjustedScore * 0.86)));
    const predicted = classFromMethodScore(adjustedScore);
    return { ...method, probability, predicted, level: predicted.toLowerCase() };
  });
}

function renderMethodResults(result) {
  const rows = methodOutputs(result);
  const chart = document.getElementById("methodChart");
  const body = document.getElementById("methodTableBody");

  chart.innerHTML = rows.map((row) => `
    <div class="method-bar ${row.level}">
      <span>${row.name}</span>
      <div class="method-track"><i class="method-fill" style="--w:${row.probability}%"></i></div>
      <strong>${row.probability}%</strong>
    </div>
  `).join("");

  body.innerHTML = rows.map((row) => `
    <tr>
      <td>${row.name}</td>
      <td><span class="risk-badge ${riskClass(row.predicted)}">${row.predicted}</span></td>
      <td>${row.probability}%</td>
      <td>${row.note}</td>
    </tr>
  `).join("");
}

function renderScreeningSummary(result) {
  const summary = document.getElementById("screeningSummary");
  const title = document.getElementById("screeningSummaryTitle");
  const text = document.getElementById("screeningSummaryText");
  const factorsList = document.getElementById("screeningSummaryFactors");
  const values = result.values;
  const expectedWeight = 3.3 + 2.55 * Math.log1p(values.age) + 0.11 * values.age;
  const expectedHeight = 49.5 + 16.5 * Math.log1p(values.age) + 0.28 * values.age;
  const weightGap = (expectedWeight - values.weight) / Math.max(expectedWeight, 1);
  const heightGap = (expectedHeight - values.height) / Math.max(expectedHeight, 1);
  const factors = [];

  if (values.muac < 11.5) factors.push(`MUAC is ${values.muac.toFixed(1)} cm, below the severe acute malnutrition screening threshold of 11.5 cm.`);
  else if (values.muac < 12.5) factors.push(`MUAC is ${values.muac.toFixed(1)} cm, inside the moderate-risk screening range below 12.5 cm.`);
  else factors.push(`MUAC is ${values.muac.toFixed(1)} cm, which is not flagged by the demo MUAC rule.`);

  if (weightGap > 0.16) factors.push(`Weight is about ${Math.round(weightGap * 100)}% below the expected demo reference for age.`);
  else if (weightGap > 0.08) factors.push(`Weight is slightly below the expected demo reference for age.`);

  if (heightGap > 0.1) factors.push(`Height/length is below the expected demo growth reference for age.`);
  if (values.temp >= 38) factors.push(`Temperature is ${values.temp.toFixed(1)} C, which is treated as fever in this screening simulation.`);
  else if (values.temp >= 37.5) factors.push(`Temperature is ${values.temp.toFixed(1)} C, slightly elevated in this screening simulation.`);

  if (values.heart > 130) factors.push(`Heart rate is ${Math.round(values.heart)} bpm, which is high for this demo screening context.`);
  else if (values.heart > 115) factors.push(`Heart rate is ${Math.round(values.heart)} bpm, slightly elevated in this demo context.`);

  if (values.spo2 < 94) factors.push(`SpO2 is ${Math.round(values.spo2)}%, which is low and increases the urgency signal.`);
  else if (values.spo2 < 96) factors.push(`SpO2 is ${Math.round(values.spo2)}%, which is marked for observation.`);

  if (values.activity < 0.55) factors.push("Activity level is low, adding a behavioral warning signal.");
  else if (values.activity < 0.8) factors.push("Activity level is reduced, adding a mild behavioral warning signal.");

  const copy = {
    normal: ["Normal screening pattern", "The entered values do not activate major warning rules in this software simulation. Routine observation is recommended."],
    moderate: ["Moderate risk explanation", "The entered values show warning signs that should be reviewed and rechecked by a health worker."],
    high: ["High risk explanation", "The entered values activate strong warning rules. The dashboard recommends urgent professional review or referral."],
  };

  summary.classList.remove("moderate", "high");
  if (result.level !== "normal") summary.classList.add(result.level);
  title.textContent = copy[result.level][0];
  text.textContent = `${copy[result.level][1]} Calculated screening score: ${Math.round(result.score)}.`;
  factorsList.innerHTML = factors.map((factor) => `<li>${factor}</li>`).join("");
}

function calculateAndShowResults(shouldFocus = false) {
  const result = calcRiskFromInputs();
  applyCalculatorResult(result);
  const resultState = document.getElementById("calculatorResultState");
  const resultPanel = document.querySelector(".calculator-results");
  resultState.textContent = `Calculated just now - ${result.level.toUpperCase()} risk`;
  resultPanel.classList.add("has-result");
  if (shouldFocus) {
    resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function updateSignal(id, state, label) {
  const signal = document.getElementById(id);
  signal.classList.remove("ok", "warn", "danger");
  signal.classList.add(state);
  signal.querySelector("em").textContent = label;
}

function setSignalSummary(level, details) {
  const summary = document.getElementById("signalSummary");
  const title = summary.querySelector("strong");
  const text = document.getElementById("signalSummaryText");
  const action = document.getElementById("signalAction");
  const copy = {
    normal: ["Stable screening pattern", "All tracked indicators are inside the demo reference limits.", "Routine observation"],
    moderate: ["Moderate warning pattern", "One or more indicators require repeated measurement and nutrition follow-up.", "Repeat screening and schedule nutrition follow-up"],
    high: ["High-risk signal pattern", "Critical screening signals are present and should be reviewed by a health worker.", "Urgent professional review or referral recommended"],
  };
  const [headline, fallback, recommended] = copy[level];
  summary.classList.remove("ok", "warn", "danger");
  summary.classList.add(level === "high" ? "danger" : level === "moderate" ? "warn" : "ok");
  title.textContent = headline;
  text.textContent = details || fallback;
  action.textContent = recommended;
}

function expectedWeightForAge(ageMonths) {
  if (ageMonths <= 12) return 3.3 + ageMonths * 0.55;
  if (ageMonths <= 24) return 9.9 + (ageMonths - 12) * 0.22;
  return 12.5 + (ageMonths - 24) * 0.16;
}

function heartState(ageMonths, heartRate) {
  const upperNormal = ageMonths < 12 ? 160 : ageMonths < 36 ? 140 : 130;
  if (heartRate > upperNormal + 18) return ["danger", "High"];
  if (heartRate > upperNormal) return ["warn", "Elevated"];
  return ["ok", "Normal"];
}

function applyCalculatorResult(result) {
  const labels = {
    normal: ["Normal Risk", "The calculated record is within expected preliminary screening limits.", "No urgent alert", "Continue routine observation and scheduled nutrition follow-up."],
    moderate: ["Moderate Risk", "The calculated record shows early warning signs that require review.", "Moderate nutrition-risk alert", "Recommend nutrition follow-up and repeated screening measurement."],
    high: ["High Risk", "The calculated record is flagged for urgent screening attention.", "High-risk screening alert", "Immediate referral or professional assessment is recommended."],
  };
  const [risk, text, alertTitle, alertText] = labels[result.level];

  setText("riskLabel", risk);
  setText("riskText", text);
  setText("confidenceText", `Model confidence: ${result.confidence}%`);
  setText("ageValue", `${result.values.age} months`);
  setText("weightValue", `${result.values.weight.toFixed(1)} kg`);
  setText("heightValue", `${result.values.height.toFixed(1)} cm`);
  setText("muacValue", `${result.values.muac.toFixed(1)} cm`);
  setText("tempValue", `${result.values.temp.toFixed(1)} C`);
  setText("heartValue", `${Math.round(result.values.heart)} bpm`);
  setText("spo2Value", `${Math.round(result.values.spo2)}%`);
  setText("activityValue", result.values.activity < 0.55 ? "Low" : result.values.activity < 0.8 ? "Reduced" : "Good");
  setText("alertTitle", alertTitle);
  setText("alertText", alertText);

  const riskPanel = document.querySelector(".risk-panel");
  riskPanel.classList.remove("moderate", "high");
  if (result.level !== "normal") riskPanel.classList.add(result.level);
  document.getElementById("confidenceFill").style.width = `${result.confidence}%`;

  const expectedWeight = expectedWeightForAge(result.values.age);
  const weightRatio = result.values.weight / expectedWeight;
  const weightSignal = weightRatio < 0.78 ? ["danger", "Low"] : weightRatio < 0.9 ? ["warn", "Watch"] : ["ok", "Normal"];
  const heartSignal = heartState(result.values.age, result.values.heart);
  const activeWarnings = [];
  if (result.values.muac < 12.5) activeWarnings.push("MUAC");
  if (weightRatio < 0.9) activeWarnings.push("weight-for-age");
  if (result.values.temp >= 37.5) activeWarnings.push("temperature");
  if (heartSignal[0] !== "ok") activeWarnings.push("heart rate");
  if (result.values.spo2 < 96) activeWarnings.push("SpO2");
  if (result.values.activity < 0.8) activeWarnings.push("activity");

  updateSignal("signalMuac", result.values.muac < 11.5 ? "danger" : result.values.muac < 12.5 ? "warn" : "ok", result.values.muac < 11.5 ? "Severe" : result.values.muac < 12.5 ? "Watch" : "Normal");
  updateSignal("signalWeight", weightSignal[0], weightSignal[1]);
  updateSignal("signalTemp", result.values.temp >= 38 ? "danger" : result.values.temp >= 37.5 ? "warn" : "ok", result.values.temp >= 38 ? "Fever" : result.values.temp >= 37.5 ? "Elevated" : "Normal");
  updateSignal("signalHeart", heartSignal[0], heartSignal[1]);
  updateSignal("signalSpo2", result.values.spo2 < 94 ? "danger" : result.values.spo2 < 96 ? "warn" : "ok", result.values.spo2 < 94 ? "Low" : result.values.spo2 < 96 ? "Watch" : "Normal");
  updateSignal("signalActivity", result.values.activity < 0.55 ? "danger" : result.values.activity < 0.8 ? "warn" : "ok", result.values.activity < 0.55 ? "Low" : result.values.activity < 0.8 ? "Reduced" : "Good");
  setSignalSummary(result.level, activeWarnings.length ? `Signals requiring attention: ${activeWarnings.join(", ")}.` : "");

  const chartBase = result.level === "high" ? [96, 101, 106, 110, 108, 115, 119, 121, 126, 130, 128, 134] : result.level === "moderate" ? [82, 86, 91, 88, 95, 92, 96, 101, 99, 103, 108, 105] : [74, 79, 76, 82, 80, 84, 81, 86, 83, 88, 85, 90];
  drawChart(chartBase, result.level);
  renderScreeningSummary(result);
  renderMethodResults(result);
}

function selectDepartment(name) {
  const data = departments[name];
  const query = encodeURIComponent(`${name} Haiti`);
  setText("deptName", name);
  setText("deptCount", data.count.toLocaleString("en-US"));
  setText("deptDepartments", "1 of 10");
  setText("deptArrondissements", `${data.arrondissements} of 42`);
  setText("deptModerate", data.moderate.toLocaleString("en-US"));
  setText("deptHigh", data.high.toLocaleString("en-US"));
  setText("deptCities", data.cities);
  haitiGoogleMap.src = `https://www.google.com/maps?q=${query}&output=embed`;
  haitiGoogleMap.title = `Google Map centered on ${name}, Haiti`;
  openGoogleMap.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  deptButtons.forEach((button) => button.classList.toggle("active", button.dataset.dept === name));
}

function renderCase(name) {
  const data = cases[name];
  const riskPanel = document.querySelector(".risk-panel");
  const fill = document.getElementById("confidenceFill");

  setText("riskLabel", data.risk);
  setText("riskText", data.text);
  setText("confidenceText", `Model confidence: ${data.confidence}%`);
  setText("ageValue", data.age);
  setText("weightValue", data.weight);
  setText("heightValue", data.height);
  setText("muacValue", data.muac);
  setText("tempValue", data.temp);
  setText("heartValue", data.heart);
  setText("spo2Value", data.spo2);
  setText("activityValue", data.activity);
  setText("alertTitle", data.alertTitle);
  setText("alertText", data.alertText);
  document.getElementById("calcAge").value = parseInt(data.age, 10);
  document.getElementById("calcWeight").value = parseFloat(data.weight);
  document.getElementById("calcHeight").value = parseFloat(data.height);
  document.getElementById("calcMuac").value = parseFloat(data.muac);
  document.getElementById("calcTemp").value = parseFloat(data.temp);
  document.getElementById("calcHeart").value = parseFloat(data.heart);
  document.getElementById("calcSpo2").value = parseFloat(data.spo2);
  document.getElementById("calcActivity").value = data.status === "high" ? 0.4 : data.status === "moderate" ? 0.7 : 1.1;

  fill.style.width = `${data.confidence}%`;
  riskPanel.classList.remove("moderate", "high");
  if (data.status !== "normal") {
    riskPanel.classList.add(data.status);
  }

  caseButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.case === name);
  });

  drawChart(data.chart, data.status);
  applyCalculatorResult(calcRiskFromInputs());
  const resultState = document.getElementById("calculatorResultState");
  const resultPanel = document.querySelector(".calculator-results");
  if (resultState && resultPanel) {
    resultState.textContent = `Loaded demo case - ${data.status.toUpperCase()} risk`;
    resultPanel.classList.add("has-result");
  }
}

function drawChart(values, status) {
  const canvas = document.getElementById("vitalsChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 34;
  const max = Math.max(...values) + 8;
  const min = Math.min(...values) - 8;
  const colors = {
    normal: "#19b9ad",
    moderate: "#e5a83a",
    high: "#e85d58",
  };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(9, 35, 74, 0.12)";
  ctx.lineWidth = 1;

  for (let i = 0; i < 5; i += 1) {
    const y = padding + (i * (height - padding * 2)) / 4;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  ctx.strokeStyle = colors[status];
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();

  values.forEach((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1);
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

openLoginButtons.forEach((button) => button.addEventListener("click", openLogin));
closeLoginButton.addEventListener("click", closeLogin);
logoutButton.addEventListener("click", closeDashboard);

loginPanel.addEventListener("click", (event) => {
  if (event.target === loginPanel) {
    closeLogin();
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  if (email !== "admin@manjai.local" || password !== "admin2026") {
    loginError.textContent = "Use the admin demo account shown above.";
    return;
  }

  openHub();
});

openHealthButton.addEventListener("click", openDashboard);
openMarketButton.addEventListener("click", showComingSoon);
closeComingButton.addEventListener("click", hideComingSoon);
hubLogoutButton.addEventListener("click", closeDashboard);

caseButtons.forEach((button) => {
  button.addEventListener("click", () => renderCase(button.dataset.case));
});

riskCalculator.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateAndShowResults(true);
});

riskCalculator.addEventListener("input", () => {
  calculateAndShowResults(false);
});

deptButtons.forEach((button) => {
  button.addEventListener("click", () => selectDepartment(button.dataset.dept));
});

selectDepartment("Ouest");
populateDepartmentSelects();
resetChildForm();
renderChildren();
renderAlerts();
renderReport();
renderMessages();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

dashboardSideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "logoutButton") {
      return;
    }

    showDashboardView(button.dataset.view);
  });
});

childSearch.addEventListener("input", renderChildren);
riskFilter.addEventListener("change", renderChildren);
generateReport.addEventListener("click", renderReport);
reportDepartment.addEventListener("change", renderReport);
reportPeriod.addEventListener("change", renderReport);
newChildButton.addEventListener("click", () => {
  resetChildForm();
  childFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
});
editChildButton.addEventListener("click", loadSelectedChildIntoForm);
childForm.addEventListener("submit", saveChildFromForm);
messageForm.addEventListener("submit", sendMessage);

const observedSections = ["home", "architecture", "validation", "prototype", "limitations"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { threshold: [0.35, 0.55, 0.75] }
);

observedSections.forEach((section) => observer.observe(section));

const params = new URLSearchParams(window.location.search);
if (params.get("demo") === "dashboard") {
  openDashboard();
  showDashboardView(params.get("view") || "overview");
}

if (params.get("demo") === "apps") {
  openHub();
}
