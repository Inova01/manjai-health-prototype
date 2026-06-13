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
  "Artibonite": { count: 940, moderate: 188, high: 61, cities: "Gonaives, Saint-Marc, Dessalines" },
  "Centre": { count: 620, moderate: 121, high: 43, cities: "Hinche, Mirebalais, Lascahobas" },
  "Grand'Anse": { count: 410, moderate: 82, high: 31, cities: "Jeremie, Anse-d'Hainault, Dame-Marie" },
  "Nippes": { count: 360, moderate: 64, high: 22, cities: "Miragoane, Anse-a-Veau, Petite-Riviere" },
  "Nord": { count: 780, moderate: 139, high: 45, cities: "Cap-Haitien, Limbe, Grande-Riviere-du-Nord" },
  "Nord-Est": { count: 330, moderate: 58, high: 19, cities: "Fort-Liberte, Ouanaminthe, Trou-du-Nord" },
  "Nord-Ouest": { count: 390, moderate: 81, high: 28, cities: "Port-de-Paix, Saint-Louis-du-Nord, Mole-Saint-Nicolas" },
  "Ouest": { count: 1240, moderate: 231, high: 78, cities: "Port-au-Prince, Carrefour, Petion-Ville" },
  "Sud": { count: 520, moderate: 96, high: 37, cities: "Les Cayes, Port-Salut, Aquin" },
  "Sud-Est": { count: 450, moderate: 83, high: 29, cities: "Jacmel, Bainet, Belle-Anse" },
};

const childRecords = [
  { id: "HT-0001", name: "Amara Jean", dept: "Ouest", city: "Port-au-Prince", age: 22, muac: 10.9, temp: 38.1, heart: 132, spo2: 93, risk: "High", last: "Today 10:24", action: "Urgent referral recommended" },
  { id: "HT-0002", name: "Noah Pierre", dept: "Nord", city: "Cap-Haitien", age: 34, muac: 12.3, temp: 37.5, heart: 119, spo2: 96, risk: "Moderate", last: "Today 09:45", action: "Nutrition follow-up within 7 days" },
  { id: "HT-0003", name: "Maya Louis", dept: "Sud", city: "Les Cayes", age: 28, muac: 14.8, temp: 36.8, heart: 103, spo2: 98, risk: "Normal", last: "Today 08:40", action: "Routine observation" },
  { id: "HT-0004", name: "Samuel Joseph", dept: "Artibonite", city: "Gonaives", age: 18, muac: 11.2, temp: 37.9, heart: 128, spo2: 94, risk: "High", last: "Yesterday 16:15", action: "Priority health-worker review" },
  { id: "HT-0005", name: "Lea Baptiste", dept: "Centre", city: "Hinche", age: 41, muac: 12.7, temp: 37.2, heart: 113, spo2: 96, risk: "Moderate", last: "Yesterday 14:05", action: "Repeat MUAC and weight check" },
  { id: "HT-0006", name: "Ethan Charles", dept: "Nord-Est", city: "Ouanaminthe", age: 31, muac: 13.9, temp: 36.9, heart: 104, spo2: 98, risk: "Normal", last: "Yesterday 11:22", action: "Routine observation" },
  { id: "HT-0007", name: "Anaise Michel", dept: "Nippes", city: "Miragoane", age: 25, muac: 12.1, temp: 37.6, heart: 122, spo2: 95, risk: "Moderate", last: "Jun 12 15:33", action: "Caregiver nutrition counseling" },
  { id: "HT-0008", name: "David Augustin", dept: "Grand'Anse", city: "Jeremie", age: 16, muac: 10.7, temp: 38.4, heart: 136, spo2: 92, risk: "High", last: "Jun 12 10:08", action: "Urgent referral recommended" },
  { id: "HT-0009", name: "Sofia Etienne", dept: "Sud-Est", city: "Jacmel", age: 38, muac: 14.1, temp: 36.7, heart: 101, spo2: 99, risk: "Normal", last: "Jun 11 13:10", action: "Routine observation" },
  { id: "HT-0010", name: "Daniel Moise", dept: "Nord-Ouest", city: "Port-de-Paix", age: 29, muac: 12.4, temp: 37.4, heart: 118, spo2: 96, risk: "Moderate", last: "Jun 11 09:05", action: "Nutrition follow-up within 7 days" },
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
  setText("selectedChildId", child.id);
  setText("selectedChildDept", child.dept);
  setText("selectedChildCity", child.city);
  setText("selectedChildMuac", `${child.muac.toFixed(1)} cm`);
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
      }),
      { count: 0, moderate: 0, high: 0 }
    );
  }

  return departments[name] || { count: 0, moderate: 0, high: 0 };
}

function renderReport() {
  const dept = reportDepartment.value;
  const period = reportPeriod.value;
  const totals = departmentTotals(dept);

  setText("reportTitle", `${dept} - ${period}`);
  setText("reportTotal", totals.count.toLocaleString("en-US"));
  setText("reportModerate", totals.moderate.toLocaleString("en-US"));
  setText("reportHigh", totals.high.toLocaleString("en-US"));
  setText(
    "reportNarrative",
    `This simulated report summarizes ManjAI Health screening activity for ${dept} during ${period}. Values are demonstration data for thesis presentation and do not represent clinical deployment results.`
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

function updateSignal(id, state, label) {
  const signal = document.getElementById(id);
  signal.classList.remove("ok", "warn", "danger");
  signal.classList.add(state);
  signal.querySelector("em").textContent = label;
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

  updateSignal("signalMuac", result.values.muac < 11.5 ? "danger" : result.values.muac < 12.5 ? "warn" : "ok", result.values.muac < 11.5 ? "Severe" : result.values.muac < 12.5 ? "Watch" : "Normal");
  updateSignal("signalTemp", result.values.temp >= 38 ? "danger" : result.values.temp >= 37.5 ? "warn" : "ok", result.values.temp >= 38 ? "Fever" : result.values.temp >= 37.5 ? "Elevated" : "Normal");
  updateSignal("signalSpo2", result.values.spo2 < 94 ? "danger" : result.values.spo2 < 96 ? "warn" : "ok", result.values.spo2 < 94 ? "Low" : result.values.spo2 < 96 ? "Watch" : "Normal");
  updateSignal("signalActivity", result.values.activity < 0.55 ? "danger" : result.values.activity < 0.8 ? "warn" : "ok", result.values.activity < 0.55 ? "Low" : result.values.activity < 0.8 ? "Reduced" : "Good");

  const chartBase = result.level === "high" ? [96, 101, 106, 110, 108, 115, 119, 121, 126, 130, 128, 134] : result.level === "moderate" ? [82, 86, 91, 88, 95, 92, 96, 101, 99, 103, 108, 105] : [74, 79, 76, 82, 80, 84, 81, 86, 83, 88, 85, 90];
  drawChart(chartBase, result.level);
}

function selectDepartment(name) {
  const data = departments[name];
  setText("deptName", name);
  setText("deptCount", data.count.toLocaleString("en-US"));
  setText("deptModerate", data.moderate.toLocaleString("en-US"));
  setText("deptHigh", data.high.toLocaleString("en-US"));
  setText("deptCities", data.cities);
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
  applyCalculatorResult(calcRiskFromInputs());
});

riskCalculator.addEventListener("input", () => {
  applyCalculatorResult(calcRiskFromInputs());
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
