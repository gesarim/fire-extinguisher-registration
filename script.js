const form = document.querySelector("#registrationForm");
const authHeader = document.querySelector("#authHeader");
const authStepper = document.querySelector("#authStepper");
const steps = Array.from(document.querySelectorAll("[data-step]"));
const dots = Array.from(document.querySelectorAll("[data-step-dot]"));
const successState = document.querySelector("#successState");
const dashboardScreen = document.querySelector("#dashboardScreen");
const summaryScreen = document.querySelector("#summaryScreen");
const menuScreen = document.querySelector("#menuScreen");
const accountScreen = document.querySelector("#accountScreen");
const objectsScreen = document.querySelector("#objectsScreen");
const objectSummaryScreen = document.querySelector("#objectSummaryScreen");
const extinguisherDetailScreen = document.querySelector("#extinguisherDetailScreen");
const extinguisherDetailTitle = document.querySelector("#extinguisherDetailTitle");
const extinguisherDetailContent = document.querySelector("[data-extinguisher-detail-content]");
const extinguisherDetailBackButton = document.querySelector("#extinguisherDetailBackButton");
const extinguisherDetailMenuButton = document.querySelector("#extinguisherDetailMenuButton");
const downloadExtinguisherHistoryExcelButton = document.querySelector("#downloadExtinguisherHistoryExcelButton");
const downloadExtinguisherHistoryPdfButton = document.querySelector("#downloadExtinguisherHistoryPdfButton");
const objectEditPanel = document.querySelector("#objectEditPanel");
const checkDetailScreen = document.querySelector("#checkDetailScreen");
const checkDetailTitle = document.querySelector("#checkDetailTitle");
const checkDetailList = document.querySelector("#checkDetailList");
const downloadReportExcelButton = document.querySelector("#downloadReportExcelButton");
const downloadReportPdfButton = document.querySelector("#downloadReportPdfButton");
const addExtinguisherScreen = document.querySelector("#addExtinguisherScreen");
const addIssueScreen = document.querySelector("#addIssueScreen");
const contractorObjectSelectScreen = document.querySelector("#contractorObjectSelectScreen");
const contractorEmployeeSelectScreen = document.querySelector("#contractorEmployeeSelectScreen");
const contractorInspectionScreen = document.querySelector("#contractorInspectionScreen");
const contractorInspectionTitle = document.querySelector("#contractorInspectionTitle");
const objectFlow = document.querySelector("#objectFlow");
const objectSteps = Array.from(document.querySelectorAll("[data-object-step]"));
const objectStepLabel = document.querySelector("#objectStepLabel");
const restartButton = document.querySelector("#restartButton");
const loginEntryButton = document.querySelector("#loginEntryButton");
const menuButton = document.querySelector("#menuButton");
const accountMenuButton = document.querySelector("#accountMenuButton");
const objectMenuButton = document.querySelector("#objectMenuButton");
const objectsMenuButton = document.querySelector("#objectsMenuButton");
const summaryMenuButton = document.querySelector("#summaryMenuButton");
const checkMenuButton = document.querySelector("#checkMenuButton");
const summaryOverviewMenuButton = document.querySelector("#summaryOverviewMenuButton");
const extinguisherMenuButton = document.querySelector("#extinguisherMenuButton");
const issueMenuButton = document.querySelector("#issueMenuButton");
const contractorObjectSelectMenuButton = document.querySelector("#contractorObjectSelectMenuButton");
const contractorEmployeeSelectMenuButton = document.querySelector("#contractorEmployeeSelectMenuButton");
const contractorInspectionMenuButton = document.querySelector("#contractorInspectionMenuButton");
const summaryBackButton = document.querySelector("#summaryBackButton");
const summaryOverviewBackButton = document.querySelector("#summaryOverviewBackButton");
const accountBackButton = document.querySelector("#accountBackButton");
const objectsBackButton = document.querySelector("#objectsBackButton");
const checkBackButton = document.querySelector("#checkBackButton");
const extinguisherBackButton = document.querySelector("#extinguisherBackButton");
const issueBackButton = document.querySelector("#issueBackButton");
const contractorObjectSelectBackButton = document.querySelector("#contractorObjectSelectBackButton");
const contractorEmployeeSelectBackButton = document.querySelector("#contractorEmployeeSelectBackButton");
const contractorInspectionBackButton = document.querySelector("#contractorInspectionBackButton");
const menuBackButton = document.querySelector("#menuBackButton");
const closeMenuButton = document.querySelector("#closeMenuButton");
const logoutButton = document.querySelector("#logoutButton");
const addObjectButton = document.querySelector("#addObjectButton");
const startInspectionButton = document.querySelector("#startInspectionButton");
const dashboardObjectsHeadingButton = document.querySelector("#dashboardObjectsHeadingButton");
const dashboardChecksHeadingButton = document.querySelector("#dashboardChecksHeadingButton");
const addObjectFromObjectsButton = document.querySelector("#addObjectFromObjectsButton");
const saveObjectButton = document.querySelector("#saveObjectButton");
const requestInspectionButton = document.querySelector("#requestInspectionButton");
const addExtinguisherButton = document.querySelector("#addExtinguisherButton");
const saveExtinguisherButton = document.querySelector("#saveExtinguisherButton");
const addIssueButton = document.querySelector("#addIssueButton");
const saveIssueButton = document.querySelector("#saveIssueButton");
const editObjectButton = document.querySelector("#editObjectButton");
const downloadObjectExcelButton = document.querySelector("#downloadObjectExcelButton");
const downloadObjectPdfButton = document.querySelector("#downloadObjectPdfButton");
const addContractorExtinguisherButton = document.querySelector("#addContractorExtinguisherButton");
const finishContractorInspectionButton = document.querySelector("#finishContractorInspectionButton");
const continueInspectionEmployeeButton = document.querySelector("#continueInspectionEmployeeButton");
const snackbar = document.querySelector("#snackbar");
const inspectionModal = document.querySelector("#inspectionModal");
const inspectionModalTitle = document.querySelector("#inspectionModalTitle");
const inspectionModalText = document.querySelector("#inspectionModalText");
const inspectionModalClose = document.querySelector("#inspectionModalClose");
const decommissionModal = document.querySelector("#decommissionModal");
const decommissionCancelButton = document.querySelector("#decommissionCancelButton");
const decommissionConfirmButton = document.querySelector("#decommissionConfirmButton");
const deleteObjectModal = document.querySelector("#deleteObjectModal");
const deleteObjectModalText = document.querySelector("#deleteObjectModalText");
const deleteObjectCancelButton = document.querySelector("#deleteObjectCancelButton");
const deleteObjectConfirmButton = document.querySelector("#deleteObjectConfirmButton");
let photoUpload = document.querySelector("#photoUpload");
let uploadPhotoButton = document.querySelector("#uploadPhotoButton");
const addExtinguisherFormFields = document.querySelector("#addExtinguisherFormFields");
const newExtinguisherNumber = document.querySelector("#newExtinguisherNumber");
const issuePhotoUpload = document.querySelector("#issuePhotoUpload");
const uploadIssuePhotoButton = document.querySelector("#uploadIssuePhotoButton");
const roomsList = document.querySelector("#roomsList");
const inspectionList = document.querySelector("#inspectionList");
const accountDocuments = document.querySelector(".account-documents");
const employeeList = document.querySelector("#employeeList");
const employeeSection = employeeList.closest(".account-section");
const employeeForm = document.querySelector("#employeeForm");
const employeeName = document.querySelector("#employeeName");
const employeeEmail = document.querySelector("#employeeEmail");
const showEmployeeFormButton = document.querySelector("#showEmployeeFormButton");
const saveEmployeeButton = document.querySelector("#saveEmployeeButton");
const cancelEmployeeButton = document.querySelector("#cancelEmployeeButton");
const pageTitle = document.querySelector("#page-title");
const subtitle = document.querySelector(".subtitle");
const stepOneTitle = document.querySelector("#step-1-title");
const stepTwoTitle = document.querySelector("#step-2-title");
const stepTwoHelper = document.querySelector("#stepTwoHelper");
const emailStepButton = document.querySelector("#emailStepButton");
const successTitle = document.querySelector("#successTitle");
const successText = document.querySelector("#successText");
const codeInputs = Array.from(document.querySelectorAll(".code-input"));
const codeGrid = document.querySelector(".code-grid");
const codeError = document.querySelector("#codeError");
const resendCodeButton = document.querySelector("#resendCodeButton");
const accountTypeInputs = Array.from(document.querySelectorAll("input[name='accountType']"));
const roleCards = Array.from(document.querySelectorAll(".role-card"));
const demoEnterButton = document.querySelector("[data-demo-enter]");
const organizationOnlyFields = Array.from(document.querySelectorAll(".organization-only"));
const registrationOnlyFields = Array.from(document.querySelectorAll(".registration-only"));
const organizationDashboard = document.querySelector("[data-organization-dashboard]");
const contractorDashboard = document.querySelector("[data-contractor-dashboard]");
const organizationDashboardAction = document.querySelector("[data-organization-dashboard-action]");
const contractorDashboardAction = document.querySelector("[data-contractor-dashboard-action]");
const organizationLogo = document.querySelector("[data-organization-logo]");
const dashboardTitleLabel = document.querySelector("[data-dashboard-title-label]");
const organizationObjects = document.querySelector("[data-organization-objects]");
const contractorObjects = document.querySelector("[data-contractor-objects]");
const contractorObjectSelectList = contractorObjectSelectScreen.querySelector(".contractor-objects-list");
const organizationObjectsAction = document.querySelector("[data-organization-objects-action]");
const accountLinkTitle = document.querySelector("[data-account-link-title]");
const accountLinkButton = document.querySelector("[data-account-link-button]");
const menuSummaryButton = document.querySelector("[data-menu-summary]");
const menuObjectsButton = document.querySelector("[data-menu-objects]");
const accountDocumentsSection = document.querySelector("[data-account-documents-section]");
const clientList = document.querySelector("#clientList");
const clientForm = document.querySelector("#clientForm");
const clientName = document.querySelector("#clientName");
const contractorPlanList = document.querySelector("#contractorPlanList");
const addContractorPlanButton = document.querySelector("#addContractorPlanButton");
const saveClientButton = document.querySelector("#saveClientButton");
const cancelClientButton = document.querySelector("#cancelClientButton");
const companyInput = document.querySelector("#company");
const companyLabel = document.querySelector("label[for='company']");
const inspectionEmployeeSelect = document.querySelector("#inspectionEmployeeSelect");
const inspectionTypeSelect = document.querySelector("#inspectionTypeSelect");

const API_BASE = "./api";
const useMockFlow = false;
const useDemoAccess = true;
const SHARED_DEMO_VISITOR_ID = "shared-test-object-contractor-20260618";
const INSPECTION_WORK_TYPES = [
  "Технический осмотр снаружи",
  "Технический осмотр внутри",
  "Проверка качества ОТВ",
  "Контроль веса ОТВ (взвешивание для ОУ)",
  "Перезарядка",
  "Проверка работоспособности",
  "Гидравлическое/пневматическое испытание",
];
let currentStep = 1;
let currentObjectStep = 1;
let roomCount = 0;
let authMode = "registration";
let menuReturnView = "dashboard";
let snackbarTimer;
let summaryReturnTab = "structure";
let checkDetailReturnView = "objectSummary";
let addExtinguisherReturnTarget = "summary";
let inspectionEmployeeNextTarget = "objectSelect";
let employeeCount = 0;
let clientCount = 0;
let accountDocumentReplaceCount = 0;
let pendingDecommissionButton = null;
let contractorExtinguisherCount = 0;
let isStartingDemo = false;
const appState = {
  currentUser: null,
  currentObjectId: null,
  dashboard: { objects: [], checks: [], upcoming: [] },
  summary: { metrics: {}, issues: [] },
  account: { organization: null, members: [], documents: [] },
  objects: [],
  currentObject: null,
  currentInspection: null,
  currentExtinguisher: null,
  contractor: {
    dashboard: { metrics: {}, objects: [], upcoming: [] },
    account: { contractor: null, clients: [] },
    objects: [],
    currentObjectId: null,
    currentObject: null,
    inspectionDrafts: {},
  },
};
let objectEditRoomCounter = 0;

function getTotalSteps() {
  return authMode === "login" ? 2 : 3;
}

function getVisibleStep(step) {
  return authMode === "login" ? step - 1 : step;
}

function showStep(step) {
  currentStep = step;
  authHeader.classList.remove("is-hidden");
  authStepper.classList.remove("is-hidden");
  form.classList.remove("is-hidden");
  successState.classList.remove("is-active");
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  const visibleStep = getVisibleStep(step);

  steps.forEach((section) => {
    section.classList.toggle("is-active", Number(section.dataset.step) === step);
  });

  dots.forEach((dot) => {
    dot.classList.toggle("is-active", Number(dot.dataset.stepDot) <= visibleStep);
  });
}

function getAccountType() {
  return accountTypeInputs.find((input) => input.checked)?.value || "organization";
}

function getDemoVisitorId() {
  const storageKey = "fireDemoVisitorId";

  try {
    window.localStorage.setItem(storageKey, SHARED_DEMO_VISITOR_ID);
  } catch (error) {
    // Демо-сценарий остается общим и без localStorage.
  }

  return SHARED_DEMO_VISITOR_ID;
}

async function startDemoAccess(role = getAccountType()) {
  if (!useDemoAccess || isStartingDemo) {
    return;
  }

  isStartingDemo = true;
  setAccountType(role);

  if (demoEnterButton) {
    demoEnterButton.disabled = true;
    demoEnterButton.textContent = "Открываем кабинет...";
  }

  try {
    const data = await apiRequest("/auth/demo-login.php", {
      method: "POST",
      body: JSON.stringify({
        role,
        visitorId: getDemoVisitorId(),
      }),
    });

    appState.currentUser = data.user || null;

    if (appState.currentUser?.role) {
      setAccountType(appState.currentUser.role);
    }

    showDashboard();
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    isStartingDemo = false;

    if (demoEnterButton) {
      demoEnterButton.disabled = false;
      demoEnterButton.textContent = "Открыть выбранный кабинет";
    }
  }
}

function syncDashboardMode() {
  const isContractor = getAccountType() === "contractor";

  dashboardScreen.classList.toggle("is-contractor", isContractor);
  organizationDashboard.classList.toggle("is-hidden", isContractor);
  organizationDashboardAction.classList.toggle("is-hidden", isContractor);
  organizationLogo.classList.remove("is-hidden");
  contractorDashboard.classList.toggle("is-hidden", !isContractor);
  contractorDashboardAction.classList.toggle("is-hidden", !isContractor);
  dashboardTitleLabel.classList.remove("is-hidden");
  menuSummaryButton.classList.toggle("is-hidden", isContractor);
  menuObjectsButton.classList.toggle("is-hidden", isContractor);
}

function syncObjectsMode() {
  const isContractor = getAccountType() === "contractor";

  organizationObjects.classList.toggle("is-hidden", isContractor);
  organizationObjectsAction.classList.toggle("is-hidden", isContractor);
  contractorObjects.classList.toggle("is-hidden", !isContractor);
}

function syncAccountMode() {
  const isContractor = getAccountType() === "contractor";

  accountLinkTitle.textContent = isContractor ? "Клиенты" : "Подрядчик - подвязка подрядчика";
  accountLinkButton.textContent = isContractor ? "Добавить клиента" : "Пригласить подрядчика";
  accountDocumentsSection.classList.toggle("is-hidden", isContractor);
  clientList.classList.toggle("is-hidden", !isContractor);
  employeeSection.classList.toggle("is-hidden", isContractor);
  clientForm.classList.add("is-hidden");
  accountLinkButton.classList.toggle("is-hidden", isContractor);
}

function syncFormMode() {
  const isLogin = authMode === "login";
  const isOrganization = getAccountType() === "organization";
  const totalSteps = getTotalSteps();

  pageTitle.textContent = useDemoAccess ? "Демо-доступ" : isLogin ? "Вход" : "Регистрация";
  subtitle.textContent = useDemoAccess
    ? "Выберите кабинет, чтобы сразу перейти к работе."
    : isLogin
    ? "Введите email, мы отправим на него письмо с кодом проверки."
    : "Создайте профиль для работы с проверками и обслуживанием.";
  stepOneTitle.textContent = useDemoAccess ? "Выберите кабинет" : isLogin ? "Войти в аккаунт" : "Выберите роль";
  stepTwoTitle.textContent = isLogin ? "Email для входа" : isOrganization ? "Данные компании" : "Данные подрядчика";
  stepTwoHelper.textContent = isLogin
    ? "На этот адрес придет одноразовый код."
    : isOrganization
      ? "Заполните данные организации и представителя."
      : "Укажите название подрядной организации, email и ФИО.";
  emailStepButton.textContent = isLogin ? "Отправить код" : "Получить код";
  authStepper.classList.toggle("is-hidden", useDemoAccess);

  organizationOnlyFields.forEach((element) => {
    element.classList.toggle("is-hidden", isLogin);
    element.querySelectorAll("input, select").forEach((input) => {
      input.required = !useDemoAccess && !useMockFlow && !isLogin;
    });
  });

  if (companyLabel && companyInput) {
    companyLabel.textContent = isOrganization ? "Название компании" : "Название подрядной организации";
    companyInput.placeholder = isOrganization ? "ООО «Пожарный контроль»" : "ООО «Подрядчик»";
    companyInput.autocomplete = isOrganization ? "organization" : "organization";
  }

  registrationOnlyFields.forEach((element) => {
    element.classList.toggle("is-hidden", isLogin);
    element.querySelectorAll("input, select").forEach((input) => {
      input.required = !useDemoAccess && !useMockFlow && !isLogin;
    });
  });

  document.querySelector("#email").required = !useDemoAccess && !useMockFlow;

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-hidden", index >= totalSteps);
  });

  const stepCounts = Array.from(document.querySelectorAll(".step-count"));
  stepCounts[0].textContent = useDemoAccess ? "Демо" : `Шаг 1 из ${totalSteps}`;
  stepCounts[1].textContent = `Шаг ${isLogin ? 1 : 2} из ${totalSteps}`;
  stepCounts[2].textContent = `Шаг ${totalSteps} из ${totalSteps}`;
}

function validateStepTwo() {
  const visibleInputs = steps[1].querySelectorAll("input[required]");
  return Array.from(visibleInputs).every((input) => input.reportValidity());
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Ошибка сервера");
  }

  return data;
}

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp";
const DOCUMENT_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx";

function getFileUrl(fileId, download = false) {
  return `${API_BASE}/files.php?id=${encodeURIComponent(fileId)}${download ? "&download=1" : ""}`;
}

function validateLocalFile(file, kind) {
  if (!file) {
    throw new Error("Выберите файл");
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error("Размер файла должен быть не больше 10 МБ");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const allowed = kind === "photo"
    ? ["jpg", "jpeg", "png", "webp"]
    : ["pdf", "doc", "docx", "xls", "xlsx"];

  if (!allowed.includes(extension)) {
    throw new Error(kind === "photo"
      ? "Допустимы изображения JPG, PNG и WEBP"
      : "Допустимы документы PDF, DOC, DOCX, XLS и XLSX");
  }

  return file;
}

async function uploadRealFile(file, { kind = "document", objectId = 0, displayName = "" } = {}) {
  validateLocalFile(file, kind);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("kind", kind);

  if (objectId) {
    formData.append("objectId", String(objectId));
  }

  if (displayName) {
    formData.append("displayName", displayName);
  }

  const response = await fetch(`${API_BASE}/files.php`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Не удалось загрузить файл");
  }

  return data;
}

function getRegistrationPayload() {
  return {
    role: getAccountType(),
    purpose: authMode === "login" ? "login" : "registration",
    email: document.querySelector("#email").value.trim(),
    company: document.querySelector("#company").value.trim(),
    fullName: document.querySelector("#fullName").value.trim(),
  };
}

async function requestAuthCode() {
  await apiRequest("/auth/request-code.php", {
    method: "POST",
    body: JSON.stringify(getRegistrationPayload()),
  });
}

async function verifyAuthCode() {
  const payload = getRegistrationPayload();
  await apiRequest("/auth/verify-code.php", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      code: getCode(),
    }),
  });
  const data = await apiRequest("/auth/me.php");
  appState.currentUser = data.user || null;

  if (appState.currentUser?.role) {
    setAccountType(appState.currentUser.role);
  }
}

function setAccountType(role) {
  accountTypeInputs.forEach((input) => {
    input.checked = input.value === role;
  });
  syncFormMode();
}

async function restoreSession() {
  try {
    const data = await apiRequest("/auth/me.php");
    appState.currentUser = data.user || null;

    if (appState.currentUser?.role) {
      setAccountType(appState.currentUser.role);
    }

    if (useDemoAccess) {
      await startDemoAccess(appState.currentUser?.role || getAccountType());
      return;
    }

    showDashboard();
  } catch (error) {
    syncFormMode();
  }
}

function getCode() {
  return codeInputs.map((input) => input.value).join("");
}

function setCodeError(isVisible) {
  codeError.classList.toggle("is-visible", isVisible);
  codeGrid.classList.toggle("has-error", isVisible);
}

function toNumber(value) {
  return Number(value || 0);
}

function formatDate(value) {
  if (!value) {
    return "Дата не назначена";
  }

  const date = new Date(String(value).replace(" ", "T"));

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("ru-RU");
}

function formatDateTime(value) {
  if (!value) {
    return "Дата не назначена";
  }

  const date = new Date(String(value).replace(" ", "T"));

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInspectionType(inspection) {
  const explicitType = String(inspection?.inspection_type || inspection?.inspectionType || "").trim();
  const title = String(inspection?.title || "").trim();
  const itemType = String(inspection?.items?.[0]?.inspection_type || inspection?.items?.[0]?.inspectionType || "").trim();
  const source = [explicitType, title, itemType].join(" ");

  if (/ежегод/ui.test(source)) {
    return "Ежегодная";
  }

  return "Ежеквартальная";
}

function getInspectionTitle(inspection) {
  return `${getInspectionType(inspection)} проверка`;
}

function isInspectionInProgress(inspection) {
  return inspection?.status === "in_progress";
}

function getInspectionStatusText(inspection) {
  return isInspectionInProgress(inspection) ? "В работе" : "Завершена";
}

function getInspectionDisplayDate(inspection) {
  return formatDate(inspection?.completed_at || inspection?.planned_at || inspection?.created_at);
}

function getInspectionWorkTypes(item) {
  const source = item?.work_types ?? item?.workTypes ?? [];

  if (Array.isArray(source)) {
    return source.filter(Boolean);
  }

  if (typeof source === "string" && source.trim()) {
    try {
      const parsed = JSON.parse(source);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch (error) {
      return source.split(/\s*;\s*/).filter(Boolean);
    }
  }

  return [];
}

function formatInspectionWorkTypes(item) {
  const workTypes = getInspectionWorkTypes(item);
  return workTypes.length ? workTypes.join("; ") : "Работы не указаны";
}

function createEmptyState(title, text) {
  const element = document.createElement("div");
  element.className = "empty-state";
  element.innerHTML = `
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(text)}</p>
  `;
  return element;
}

function renderMetricCard(label, value, isSelected = false, modifier = "", showChevron = true) {
  const classes = ["metric-card"];

  if (isSelected) {
    classes.push("is-selected");
  }

  if (modifier) {
    classes.push(modifier);
  }

  return `
    <article class="${classes.join(" ")}">
      <div class="metric-label-row">
        <p>${escapeHtml(label)}</p>
        ${showChevron ? '<span aria-hidden="true">›</span>' : ""}
      </div>
      <strong>${toNumber(value)}</strong>
    </article>
  `;
}

function getObjectStatus(object) {
  const broken = toNumber(object.broken_total);
  const needsCheck = toNumber(object.needs_check_total);
  const total = toNumber(object.extinguishers_total);
  const problemType = getObjectProblemType(object);

  if (problemType) {
    return problemType;
  }

  if (!total) {
    return "огнетушителей пока нет";
  }

  if (broken > 0) {
    return `${total} огнетушителей · ${broken} неисправн.`;
  }

  if (needsCheck > 0) {
    return `${total} огнетушителей · ${needsCheck} требуют проверки`;
  }

  return `${total} огнетушителей · все в норме`;
}

function getObjectProblemType(object) {
  const title = String(object?.latest_issue_title || "").trim();

  if (!title) {
    return "";
  }

  return title.replace(/^Огнетушитель\s+№\s*[^:]+:\s*/ui, "");
}

function hasObjectProblem(object) {
  return Boolean(getObjectProblemType(object));
}

function resetObjectForm() {
  objectSteps[0].querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  objectSteps[0].querySelectorAll(".document-grid").forEach((grid) => {
    grid.innerHTML = "";
  });
  roomsList.innerHTML = "";
  roomCount = 0;
}

function renderDashboard() {
  const objectList = organizationDashboard.querySelector(".dashboard-object-list");
  const checkList = organizationDashboard.querySelector(".dashboard-check-list");
  const upcomingSection = organizationDashboard.querySelector("[aria-labelledby='upcomingCheckTitle']");
  const objects = appState.dashboard.objects || [];
  const checks = appState.dashboard.checks || [];
  const upcoming = Array.isArray(appState.dashboard.upcoming)
    ? appState.dashboard.upcoming
    : appState.dashboard.upcoming
      ? [appState.dashboard.upcoming]
      : [];

  objectList.innerHTML = "";

  if (!objects.length) {
    objectList.append(createEmptyState("Объектов пока нет", "Добавьте первый объект, чтобы вести учет огнетушителей."));
  } else {
    objects.forEach((object) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `dashboard-object-row${hasObjectProblem(object) ? " is-problem" : ""}`;
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(object.name)}</strong>
          <small>${escapeHtml(getObjectStatus(object))}</small>
        </span>
        <span aria-hidden="true">›</span>
      `;
      row.addEventListener("click", () => {
        openObjectSummary(object.id);
      });
      objectList.append(row);
    });
  }

  checkList.innerHTML = "";

  if (!checks.length) {
    checkList.append(createEmptyState("Проверок пока нет", "Когда подрядчик завершит проверку, она появится здесь."));
  } else {
    checks.forEach((check) => {
      const row = document.createElement("button");
      row.type = "button";
      const inProgress = isInspectionInProgress(check);
      row.className = `dashboard-check-row${inProgress ? " is-in-progress" : ""}`;
      row.disabled = inProgress;
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(getInspectionTitle(check))}</strong>
          <small>${escapeHtml(check.object_name || "Объект")} · ${escapeHtml(getInspectionDisplayDate(check))}</small>
        </span>
        <span class="check-status${inProgress ? " is-progress" : " is-ok"}">${escapeHtml(getInspectionStatusText(check))}</span>
      `;
      if (!inProgress) {
        row.addEventListener("click", () => openCheckDetail(check, "dashboard"));
      }
      checkList.append(row);
    });
  }

  upcomingSection.querySelectorAll(".upcoming-check-card, .empty-state").forEach((element) => element.remove());

  if (!upcoming.length) {
    upcomingSection.append(createEmptyState("Проверка не запланирована", "Запросите проверку в карточке объекта."));
  } else {
    upcoming.forEach((check) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "upcoming-check-card is-upcoming";
      card.innerHTML = `
        <span>
          <strong>${escapeHtml(formatDate(check.preferred_date))}</strong>
          <small>${escapeHtml(check.contractor_name || "Подрядчик не назначен")}</small>
          <small>${escapeHtml(check.object_name)}</small>
        </span>
        <span aria-hidden="true">›</span>
      `;
      card.addEventListener("click", () => openObjectSummary(check.object_id));
      upcomingSection.append(card);
    });
  }
}

async function loadDashboard() {
  try {
    appState.dashboard = await apiRequest("/organization/dashboard.php");
    renderDashboard();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function getContractorObjectStatus(object) {
  const pending = toNumber(object.pending_requests);
  const replacements = toNumber(object.replacement_total);
  const needsCheck = toNumber(object.needs_check_total);
  const problemType = getObjectProblemType(object);

  if (problemType) {
    return problemType;
  }

  if (pending > 0) {
    return "Требуется проверка";
  }

  if (replacements > 0) {
    return "Есть замены";
  }

  if (needsCheck > 0) {
    return "Требуют проверки";
  }

  return "Проверка не запрошена";
}

function renderContractorDashboard() {
  const checks = appState.contractor.dashboard.checks || [];
  const upcoming = appState.contractor.dashboard.upcoming || [];
  const objects = appState.contractor.dashboard.objects || [];
  const objectList = contractorDashboard.querySelector(".contractor-dashboard-object-list");
  const upcomingList = contractorDashboard.querySelector(".contractor-upcoming-check-list");
  const completedCheckList = contractorDashboard.querySelector(".contractor-completed-check-list");

  renderContractorObjectList(objectList, objects, "Начать проверку");

  upcomingList.innerHTML = "";

  if (!upcoming.length) {
    upcomingList.append(createEmptyState("Проверок пока нет", "Назначенные организацией даты появятся здесь."));
  } else {
    upcoming.forEach((check) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "upcoming-check-card is-upcoming";
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(formatDate(check.preferred_date))}</strong>
          <small>${escapeHtml(check.object_name || "Объект")} · ${escapeHtml(check.organization_name || "Организация")}</small>
        </span>
        <span aria-hidden="true">›</span>
      `;
      row.addEventListener("click", () => openContractorObjectSummary(check.object_id));
      upcomingList.append(row);
    });
  }

  completedCheckList.innerHTML = "";

  if (!checks.length) {
    completedCheckList.append(createEmptyState("Проверок пока нет", "Завершенные проверки и отчеты появятся здесь."));
  } else {
    checks.forEach((check) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "dashboard-check-row";
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(getInspectionTitle(check))}</strong>
          <small>${escapeHtml(check.object_name || "Объект")} · ${escapeHtml(formatDate(check.completed_at))}</small>
        </span>
        <span class="check-status is-ok">Отчет</span>
      `;
      row.addEventListener("click", () => {
        openCheckDetail(check, "contractorDashboard");
      });
      completedCheckList.append(row);
    });
  }
}

async function loadContractorDashboard() {
  try {
    appState.contractor.dashboard = await apiRequest("/contractor/dashboard.php");
    renderContractorDashboard();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderSummary() {
  const metrics = appState.summary.metrics || {};
  const metricGrid = summaryScreen.querySelector(".metric-grid");
  const objectsSection = summaryScreen.querySelector("[data-summary-objects-section]");
  const issuesSection = summaryScreen.querySelector("[data-summary-issues-section]");
  const objects = appState.summary.objects || [];
  const issues = appState.summary.issues || [];
  const hasObjectsWithoutExtinguishers = objects.some((object) => toNumber(object.extinguishers_total) === 0);

  metricGrid.innerHTML = [
    renderMetricCard("Объекты", metrics.objects, false, "", false),
    renderMetricCard("Помещения", metrics.rooms, false, "", false),
    renderMetricCard("Огнетушители", metrics.total, false, hasObjectsWithoutExtinguishers ? "is-alert" : "", false),
    renderMetricCard("Проблемы", metrics.open_issues, true, "", false),
  ].join("");

  objectsSection.innerHTML = `
    <div class="small-title-row">
      <h3>Объекты</h3>
      <span aria-hidden="true">›</span>
    </div>
  `;

  if (!objects.length) {
    objectsSection.append(createEmptyState("Объектов пока нет", "Добавьте первый объект, и он сразу появится в сводке."));
  } else {
    objects.forEach((object) => {
      const hasNoExtinguishers = toNumber(object.extinguishers_total) === 0;
      const problemType = getObjectProblemType(object);
      const row = document.createElement("button");
      row.type = "button";
      row.className = `summary-object-row${hasNoExtinguishers ? " is-warning" : ""}${problemType ? " is-problem" : ""}`;
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(object.name)}</strong>
          <small>${escapeHtml(object.address || "Адрес не указан")}</small>
          <small>${toNumber(object.rooms_total)} помещений · ${toNumber(object.extinguishers_total)} огнетушителей · ${toNumber(object.open_issues_total)} проблем</small>
          ${problemType ? `<small class="summary-object-problem">${escapeHtml(problemType)}</small>` : ""}
          ${hasNoExtinguishers ? '<small class="summary-object-warning">Нужно ввести огнетушители в эксплуатацию</small>' : ""}
        </span>
        <span aria-hidden="true">›</span>
      `;
      row.addEventListener("click", () => {
        openObjectSummary(object.id);
      });
      objectsSection.append(row);
    });
  }

  issuesSection.innerHTML = `
    <div class="small-title-row">
      <h3>Проблемы по объектам</h3>
      <span aria-hidden="true">›</span>
    </div>
  `;

  if (!issues.length) {
    issuesSection.append(createEmptyState("Проблем пока нет", "Здесь появятся открытые неисправности по объектам."));
    return;
  }

  const list = document.createElement("ul");
  issues.forEach((issue) => {
    const item = document.createElement("li");
    item.textContent = `${issue.object_name}: ${issue.title}`;
    list.append(item);
  });
  issuesSection.append(list);
}

async function loadSummary() {
  try {
    appState.summary = await apiRequest("/organization/summary.php");
    renderSummary();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderEmployeeCard(employee) {
  const card = createEmployeeCard(employee.full_name, employee.email);
  card.querySelector("[data-remove-employee]").addEventListener("click", async () => {
    try {
      await apiRequest(`/organization/employees.php?id=${encodeURIComponent(employee.id)}`, { method: "DELETE" });
      await loadAccount();
      showSnackbar("Сотрудник удален");
    } catch (error) {
      showSnackbar(error.message);
    }
  });
  return card;
}

function renderDocumentItem(documentData) {
  const item = document.createElement("div");
  item.className = "document-item";
  item.innerHTML = `
    <span class="document-icon">FILE</span>
    <a class="document-name document-download" href="${getFileUrl(documentData.id, true)}">${escapeHtml(documentData.name)}</a>
    <button type="button" class="document-action is-danger" data-account-remove-document>Удалить</button>
  `;
  item.querySelector("[data-account-remove-document]").addEventListener("click", async () => {
    try {
      await apiRequest(`/files.php?id=${encodeURIComponent(documentData.id)}`, { method: "DELETE" });
      await loadAccount();
      showSnackbar("Документ удален");
    } catch (error) {
      showSnackbar(error.message);
    }
  });
  return item;
}

function renderAccount() {
  const organization = appState.account.organization || {};
  const infoCard = accountScreen.querySelector(".account-info-card");
  infoCard.innerHTML = `
    <p>${escapeHtml(organization.name || "Организация")}</p>
    <span>${escapeHtml(organization.email || "")}</span>
  `;

  employeeList.innerHTML = "";
  const members = appState.account.members || [];
  if (!members.length) {
    employeeList.append(createEmptyState("Сотрудников пока нет", "Добавьте сотрудников, которые будут работать с объектами."));
  } else {
    members.forEach((employee) => {
      employeeList.append(renderEmployeeCard(employee));
    });
  }

  accountDocuments.innerHTML = "";
  const documents = appState.account.documents || [];
  if (!documents.length) {
    accountDocuments.append(createEmptyState("Документы не загружены", "Добавьте договор, ТЗ или план размещения средств ПБ."));
  } else {
    documents.forEach((documentData) => {
      accountDocuments.append(renderDocumentItem(documentData));
    });
  }

  if (!contractorPlanList.children.length) {
    addContractorPlanRow();
  } else {
    refreshContractorPlanOptions();
  }
}

async function loadAccount() {
  try {
    appState.account = await apiRequest("/organization/account.php");
    renderAccount();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderContractorAccount() {
  const contractor = appState.contractor.account.contractor || {};
  const clients = appState.contractor.account.clients || [];
  const infoCard = accountScreen.querySelector(".account-info-card");

  infoCard.innerHTML = `
    <p>${escapeHtml(contractor.name || "Подрядчик")}</p>
    <span>${escapeHtml(contractor.email || "")}</span>
  `;

  clientList.innerHTML = "";

  if (!clients.length) {
    clientList.append(createEmptyState("Клиентов пока нет", "Когда организация пригласит вас как подрядчика, она появится здесь."));
    return;
  }

  clients.forEach((client) => {
    const card = document.createElement("div");
    card.className = "client-card";
    card.innerHTML = `
      <span class="employee-info">
        <strong>${escapeHtml(client.name)}</strong>
        <span>${client.status === "active" ? "Активная привязка" : "Привязка приостановлена"}</span>
      </span>
    `;
    clientList.append(card);
  });
}

async function loadContractorAccount() {
  try {
    appState.contractor.account = await apiRequest("/contractor/account.php");
    renderContractorAccount();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderObjectCard(object) {
  const card = document.createElement("article");
  const issues = object.issues || [];
  const checks = object.checks || [];
  const issueCount = Math.max(
    issues.length,
    toNumber(object.broken_total) + toNumber(object.needs_check_total)
  );
  card.className = `object-card${issueCount > 0 ? " is-problem" : ""}`;
  const problemLabel = issueCount === 1 ? "Обнаружена 1 проблема" : `Обнаружено проблем: ${issueCount}`;
  card.innerHTML = `
    <h2>${escapeHtml(object.name)}</h2>
    <div class="metric-grid">
      ${renderMetricCard("Огнетушители", object.extinguishers_total)}
      ${renderMetricCard("В норме", object.ok_total)}
      ${renderMetricCard("Требуют проверки", object.needs_check_total)}
      ${renderMetricCard("Неисправные", object.broken_total, true)}
    </div>
    ${issueCount > 0 ? `
      <button type="button" class="object-problem-alert" aria-label="${escapeHtml(problemLabel)}. Открыть проблемы объекта">
        <span class="object-problem-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 3h8v4l-2 2v2h3a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a2 2 0 0 1 2-2h3V9L8 7V3Z"></path>
            <path d="M9 15h6"></path>
            <path d="M9 18h6"></path>
          </svg>
        </span>
        <span>
          <strong>${escapeHtml(problemLabel)}</strong>
          <small>Требуется внимание</small>
        </span>
        <span class="object-problem-arrow" aria-hidden="true">›</span>
      </button>
    ` : ""}
    <button type="button" class="summary-button">
      <span>Смотреть общую сводку</span>
      <span aria-hidden="true">›</span>
    </button>
  `;

  const issuesSection = document.createElement("section");
  issuesSection.className = "object-detail-section";
  issuesSection.innerHTML = `
    <div class="small-title-row">
      <h3>Проблемы на объекте</h3>
      <span aria-hidden="true">›</span>
    </div>
  `;
  if (!issues.length) {
    issuesSection.append(createEmptyState("Проблем нет", "Открытые неисправности появятся здесь."));
  } else {
    const list = document.createElement("ul");
    issues.forEach((issue) => {
      const item = document.createElement("li");
      item.textContent = issue.title;
      list.append(item);
    });
    issuesSection.append(list);
  }
  card.append(issuesSection);

  const checksSection = document.createElement("section");
  checksSection.className = "object-detail-section";
  checksSection.innerHTML = `
    <div class="small-title-row">
      <h3>Последние проверки</h3>
      <span aria-hidden="true">›</span>
    </div>
  `;
  if (!checks.length) {
    checksSection.append(createEmptyState("Проверок пока нет", "После первой проверки здесь появится история."));
  } else {
    const list = document.createElement("ul");
    checks.forEach((check) => {
      const item = document.createElement("li");
      item.textContent = `${getInspectionTitle(check)} · ${getInspectionStatusText(check)} · ${getInspectionDisplayDate(check)}`;
      list.append(item);
    });
    checksSection.append(list);
  }
  card.append(checksSection);

  card.querySelector(".summary-button").addEventListener("click", () => {
    openObjectSummary(object.id);
  });
  card.querySelector(".object-problem-alert")?.addEventListener("click", () => {
    openObjectSummary(object.id, "issues");
  });

  return card;
}

function renderObjects() {
  organizationObjects.innerHTML = "";
  const objects = appState.objects || [];

  if (!objects.length) {
    organizationObjects.append(createEmptyState("Объектов пока нет", "Добавьте первый объект, чтобы заполнить структуру и огнетушители."));
    return;
  }

  objects.forEach((object) => {
    organizationObjects.append(renderObjectCard(object));
  });
}

async function loadObjects() {
  try {
    const data = await apiRequest("/organization/objects.php");
    appState.objects = data.objects || [];
    renderObjects();
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderContractorObjectCard(object, actionLabel = "Начать проверку") {
  const card = document.createElement("article");
  const status = getContractorObjectStatus(object);
  card.className = `contractor-object-card${hasObjectProblem(object) ? " is-problem" : ""}`;
  card.innerHTML = `
    <div class="contractor-object-head">
      <div>
        <h2>${escapeHtml(object.name || "Объект")}</h2>
        <small>${escapeHtml(object.organization_name || "Организация")} · ${escapeHtml(object.address || "Адрес не указан")}</small>
      </div>
      <span>${escapeHtml(status)}</span>
    </div>
    <div class="contractor-object-stats">
      <div>
        <p>Огнетушители</p>
        <strong>${toNumber(object.extinguishers_total)}</strong>
      </div>
      <div>
        <p>Требуют проверки</p>
        <strong>${toNumber(object.needs_check_total)}</strong>
      </div>
      <div>
        <p>Замена</p>
        <strong>${toNumber(object.replacement_total)}</strong>
      </div>
    </div>
    <div class="contractor-object-actions">
      <button type="button" class="secondary-button" data-open-contractor-object>Открыть объект</button>
      <button type="button" class="primary-button contractor-start-button" data-start-contractor-object>${escapeHtml(actionLabel)}</button>
    </div>
  `;

  card.querySelector("[data-open-contractor-object]").addEventListener("click", () => {
    openContractorObjectSummary(object.id);
  });
  card.querySelector("[data-start-contractor-object]").addEventListener("click", () => {
    openContractorObject(object.id);
  });

  return card;
}

function renderContractorObjectList(container, objects, actionLabel = "Начать проверку") {
  container.innerHTML = "";

  if (!objects.length) {
    container.append(createEmptyState("Объектов пока нет", "Объекты появятся после приглашения от организации и добавления объектов в ее кабинете."));
    return;
  }

  objects.forEach((object) => {
    container.append(renderContractorObjectCard(object, actionLabel));
  });
}

function renderContractorObjects() {
  renderContractorObjectList(contractorObjects, appState.contractor.objects || [], "Начать проверку");
}

async function loadContractorObjects() {
  try {
    const data = await apiRequest("/contractor/objects.php");
    appState.contractor.objects = data.objects || [];
    renderContractorObjects();
  } catch (error) {
    showSnackbar(error.message);
  }
}

async function loadContractorObjectSelect() {
  try {
    const data = await apiRequest("/contractor/objects.php");
    appState.contractor.objects = data.objects || [];
    renderContractorObjectList(contractorObjectSelectList, appState.contractor.objects, "Выбрать");
  } catch (error) {
    showSnackbar(error.message);
  }
}

async function openContractorObject(objectId) {
  try {
    const data = await apiRequest(`/contractor/object.php?id=${encodeURIComponent(objectId)}`);
    appState.contractor.currentObjectId = objectId;
    appState.contractor.currentObject = data;
    if (data.draft?.items?.length) {
      appState.contractor.inspectionDrafts[objectId] = {
        items: data.draft.items,
        inspectionType: data.draft.inspectionType || "Ежеквартальная",
      };
    }
    applyContractorInspectionDraft(objectId);
    renderContractorEmployeeSelect();
    if (data.draft?.employeeName) {
      const hasSavedEmployee = Array.from(inspectionEmployeeSelect.options).some((option) => option.value === data.draft.employeeName);
      if (!hasSavedEmployee) {
        inspectionEmployeeSelect.append(new Option(data.draft.employeeName, data.draft.employeeName));
      }
      inspectionEmployeeSelect.value = data.draft.employeeName;
    }
    inspectionTypeSelect.value = data.draft?.inspectionType || "Ежеквартальная";
    renderContractorInspectionList();
    showContractorEmployeeSelect("inspection");
  } catch (error) {
    showSnackbar(error.message);
  }
}

async function openContractorObjectSummary(objectId) {
  try {
    const data = await apiRequest(`/contractor/object.php?id=${encodeURIComponent(objectId)}`);
    appState.currentObjectId = objectId;
    appState.currentObject = data;
    appState.contractor.currentObjectId = objectId;
    appState.contractor.currentObject = data;
    renderObjectSummary();
    setObjectEditMode(false);
    showObjectSummary();
    setSummaryTab("structure");
  } catch (error) {
    showSnackbar(error.message);
  }
}

function renderObjectSummary() {
  const data = appState.currentObject;
  if (!data) {
    return;
  }

  objectSummaryScreen.querySelector("#objectSummaryTitle").textContent = data.object.name;

  const metrics = data.metrics || {};
  const structurePanel = objectSummaryScreen.querySelector("[data-summary-panel='structure']");
  const issuesPanel = objectSummaryScreen.querySelector("[data-summary-panel='issues']");
  const checksPanel = objectSummaryScreen.querySelector("[data-summary-panel='checks']");
  const rooms = data.rooms || [];
  const extinguishers = data.extinguishers || [];
  const issues = data.issues || [];
  const inspections = data.inspections || [];
  const isContractor = getAccountType() === "contractor";

  addExtinguisherButton.classList.toggle("is-hidden", isContractor);
  addIssueButton.classList.toggle("is-hidden", isContractor);
  editObjectButton.classList.toggle("is-hidden", isContractor);
  downloadObjectExcelButton.classList.toggle("is-hidden", !isContractor);
  downloadObjectPdfButton.classList.toggle("is-hidden", !isContractor);

  structurePanel.innerHTML = `
    <div class="structure-stats">
      <div><span>Помещения</span><strong>${rooms.length}</strong></div>
      <div><span>Огнетушители</span><strong>${toNumber(metrics.total)}</strong></div>
      <div><span>В норме</span><strong>${toNumber(metrics.ok)}</strong></div>
      <div><span>Проблемы</span><strong>${issues.length}</strong></div>
    </div>
  `;

  if (!extinguishers.length) {
    structurePanel.append(createEmptyState("Огнетушителей пока нет", "Добавьте огнетушитель, чтобы он появился в структуре объекта."));
  } else {
    const zone = document.createElement("section");
    zone.className = "fire-zone";
    zone.innerHTML = `
      <div class="fire-zone-head">
        <h3>Таблица огнетушителей</h3>
      </div>
      <div class="extinguisher-table"></div>
    `;
    const table = zone.querySelector(".extinguisher-table");
    extinguishers.forEach((extinguisher) => {
      const line = document.createElement("button");
      line.type = "button";
      line.className = "extinguisher-line";
      line.dataset.extinguisherId = extinguisher.id || "";
      line.setAttribute("aria-label", `Открыть огнетушитель № ${getExtinguisherNumber(extinguisher) || "без номера"}`);
      const statusText = getExtinguisherStatusText(extinguisher);
      const statusClass = ["broken", "decommissioned"].includes(extinguisher.status) ? " is-dark" : "";
      line.innerHTML = `
        <div class="extinguisher-card-main">
          <span class="extinguisher-card-number">№ ${escapeHtml(getExtinguisherNumber(extinguisher) || "Не указан")}</span>
          <strong class="extinguisher-card-name">${escapeHtml(getExtinguisherTypeMark(extinguisher) || "Наименование не указано")}</strong>
          <span class="extinguisher-card-place">
            <span>${escapeHtml(formatExtinguisherPlace(extinguisher) || "Помещение не указано")}</span>
            ${getExtinguisherExactPlace(extinguisher) ? `<span class="extinguisher-card-exact-place">${escapeHtml(getExtinguisherExactPlace(extinguisher))}</span>` : ""}
          </span>
        </div>
        <strong class="extinguisher-status${statusClass}">${escapeHtml(statusText)}</strong>
        <span class="extinguisher-card-arrow" aria-hidden="true">›</span>
      `;
      line.addEventListener("click", () => openExtinguisherDetail(extinguisher.id));
      table.append(line);
    });
    structurePanel.append(zone);
  }

  issuesPanel.innerHTML = "";
  if (!issues.length) {
    issuesPanel.append(createEmptyState("Проблем пока нет", "Зафиксированные неисправности появятся здесь."));
  } else {
    const list = document.createElement("ul");
    list.className = "summary-list";
    issues.forEach((issue) => {
      const item = document.createElement("li");
      item.className = `object-issue-item${issue.status === "resolved" ? " is-resolved" : " is-open"}`;
      item.innerHTML = `
        <strong>${escapeHtml(issue.title)}</strong>
        ${issue.comment ? `<small>${escapeHtml(issue.comment)}</small>` : ""}
        ${issue.photo_file_id ? `<a class="uploaded-photo-link" href="${getFileUrl(issue.photo_file_id)}" target="_blank" rel="noopener"><img src="${getFileUrl(issue.photo_file_id)}" alt="Фото неисправности" /></a>` : ""}
      `;
      list.append(item);
    });
    issuesPanel.append(list);
  }

  checksPanel.innerHTML = "";
  if (!inspections.length) {
    checksPanel.append(createEmptyState("Проверок пока нет", "История проверок появится после завершения первой проверки."));
  } else {
    inspections.forEach((inspection) => {
      const button = document.createElement("button");
      button.type = "button";
      const inProgress = isInspectionInProgress(inspection);
      button.className = `check-row${inProgress ? " is-in-progress" : ""}`;
      button.disabled = inProgress;
      button.innerHTML = `
        <span>${escapeHtml(getInspectionTitle(inspection))} · ${escapeHtml(getInspectionDisplayDate(inspection))}</span>
        <span class="check-status${inProgress ? " is-progress" : " is-ok"}">${escapeHtml(getInspectionStatusText(inspection))}</span>
      `;
      if (!inProgress) {
        button.addEventListener("click", () => openCheckDetail(inspection, "objectSummary"));
      }
      checksPanel.append(button);
    });
  }
}

function getObjectEditRoomKey(room) {
  return [
    room.building_name || "",
    room.floor_name || "",
    room.name || "",
  ].join("||");
}

function getObjectEditRoomGroups(rooms) {
  const groups = [];
  const groupByKey = new Map();

  rooms.forEach((room) => {
    const key = getObjectEditRoomKey(room);

    if (!groupByKey.has(key)) {
      const group = {
        name: room.name || "",
        floorName: room.floor_name || "",
        buildingName: room.building_name || "",
        locations: [],
      };
      groupByKey.set(key, group);
      groups.push(group);
    }

    groupByKey.get(key).locations.push({
      id: room.id || "",
      fireZone: room.fire_zone || "",
      extinguishersCount: toNumber(room.extinguishers_count),
    });
  });

  return groups.length
    ? groups
    : [{ name: "", floorName: "", buildingName: "", locations: [{ id: "", fireZone: "", extinguishersCount: 0 }] }];
}

function createObjectEditLocationRow(location = {}) {
  const row = document.createElement("div");
  const roomId = location.id || "";
  const clientKey = roomId ? `room:${roomId}` : `new:${++objectEditRoomCounter}`;
  row.className = "object-edit-location-row";
  row.dataset.roomClientKey = clientKey;
  row.dataset.roomId = roomId;
  row.innerHTML = `
    <input type="text" placeholder="Место расположения" aria-label="Место расположения" data-edit-location />
    <button type="button" class="location-remove-button" data-edit-remove-location aria-label="Удалить место расположения">&times;</button>
  `;
  row.querySelector("[data-edit-location]").value = location.fireZone || "";
  return row;
}

function createObjectEditRoomCard(group = {}) {
  const card = document.createElement("section");
  card.className = "object-edit-card";
  card.innerHTML = `
    <div class="object-edit-card-head">
      <h3>Помещение</h3>
      <button type="button" class="document-action is-danger" data-edit-remove-room>Удалить</button>
    </div>
    <div class="object-edit-grid">
      <input type="text" placeholder="Название помещения" aria-label="Название помещения" data-edit-room-name />
      <input type="text" placeholder="Количество этажей" aria-label="Количество этажей" inputmode="numeric" data-edit-room-floor />
    </div>
    <div class="object-edit-locations" data-edit-location-list></div>
    <button type="button" class="secondary-button compact-button" data-edit-add-location>Добавить место</button>
  `;

  card.querySelector("[data-edit-room-name]").value = group.name || "";
  card.querySelector("[data-edit-room-floor]").value = group.floorName || "";

  const locations = group.locations?.length ? group.locations : [{ fireZone: "" }];
  locations.forEach((location) => {
    card.querySelector("[data-edit-location-list]").append(createObjectEditLocationRow(location));
  });

  return card;
}

function getObjectEditPlaceOptions(formElement) {
  return Array.from(formElement.querySelectorAll(".object-edit-location-row")).map((row) => {
    const card = row.closest(".object-edit-card");
    const roomName = card.querySelector("[data-edit-room-name]")?.value.trim() || "";
    const floorName = card.querySelector("[data-edit-room-floor]")?.value.trim() || "";
    const location = row.querySelector("[data-edit-location]")?.value.trim() || "";
    const labelParts = [roomName, floorName, location].filter(Boolean);

    return {
      key: row.dataset.roomClientKey,
      label: labelParts.length ? labelParts.join(" · ") : "Место без названия",
    };
  });
}

function refreshObjectEditPlaceSelects(formElement) {
  const options = getObjectEditPlaceOptions(formElement);

  formElement.querySelectorAll("[data-edit-ext-room]").forEach((select) => {
    const selectedValue = select.dataset.selectedRoomKey || select.value || "";
    select.innerHTML = "";

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Место не выбрано";
    select.append(emptyOption);

    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.key;
      option.textContent = optionData.label;
      select.append(option);
    });

    if (selectedValue && options.some((optionData) => optionData.key === selectedValue)) {
      select.value = selectedValue;
    } else {
      select.value = "";
      select.dataset.selectedRoomKey = "";
    }
  });
}

function refreshObjectEditControls(formElement) {
  const selectedRoomKeys = new Set(
    Array.from(formElement.querySelectorAll("[data-edit-ext-room]"))
      .map((select) => select.value)
      .filter(Boolean)
  );

  formElement.querySelectorAll(".object-edit-card").forEach((card) => {
    const rows = Array.from(card.querySelectorAll(".object-edit-location-row"));
    const hasSelectedLocation = rows.some((row) => selectedRoomKeys.has(row.dataset.roomClientKey));
    const removeRoomButton = card.querySelector("[data-edit-remove-room]");

    if (!removeRoomButton) {
      return;
    }

    removeRoomButton.disabled = hasSelectedLocation;

    rows.forEach((row) => {
      const removeButton = row.querySelector("[data-edit-remove-location]");
      removeButton.disabled = rows.length === 1 || selectedRoomKeys.has(row.dataset.roomClientKey);
    });
  });
}

function renderObjectEditExtinguishers(formElement, extinguishers) {
  const list = formElement.querySelector("[data-edit-extinguisher-list]");
  list.innerHTML = "";

  if (!extinguishers.length) {
    list.append(createEmptyState("Огнетушителей пока нет", "После добавления огнетушители можно будет изменить здесь."));
    return;
  }

  extinguishers.forEach((extinguisher) => {
    const card = document.createElement("section");
    card.className = "object-edit-card";
    card.dataset.extinguisherId = extinguisher.id || "";
    card.innerHTML = `
      <div class="object-edit-card-head">
        <h3>Огнетушитель</h3>
        <span>${escapeHtml(extinguisher.status || "ok")}</span>
      </div>
      <div class="object-edit-grid">
        <input type="text" placeholder="Присвоенный номер" aria-label="Присвоенный номер огнетушителя" data-edit-ext-number />
      </div>
      <select aria-label="Место размещения огнетушителя" data-edit-ext-room></select>
    `;
    card.querySelector("[data-edit-ext-number]").value = extinguisher.number || "";
    card.querySelector("[data-edit-ext-room]").dataset.selectedRoomKey = extinguisher.room_id ? `room:${extinguisher.room_id}` : "";
    list.append(card);
  });
}

function renderObjectEditForm() {
  const data = appState.currentObject;

  if (!data) {
    return;
  }

  objectEditRoomCounter = 0;
  const groups = getObjectEditRoomGroups(data.rooms || []);
  objectEditPanel.innerHTML = `
    <div class="object-edit-form" data-object-edit-form>
      <section class="object-edit-section">
        <h2>Параметры объекта</h2>
        <div class="object-edit-grid">
          <input type="text" placeholder="Название объекта" aria-label="Название объекта" data-edit-object-name />
          <input type="text" placeholder="Адрес" aria-label="Адрес" data-edit-object-address />
        </div>
      </section>
      <section class="object-edit-section">
        <div class="object-edit-section-head">
          <h2>Структура объекта</h2>
          <button type="button" class="secondary-button compact-button" data-edit-add-room>Добавить помещение</button>
        </div>
        <div class="object-edit-list" data-edit-room-list></div>
      </section>
      <section class="object-edit-section">
        <h2>Огнетушители</h2>
        <div class="object-edit-list" data-edit-extinguisher-list></div>
      </section>
      <div class="object-edit-actions">
        <button type="button" class="secondary-button" data-cancel-object-edit>Отменить</button>
        <button type="button" class="primary-button" data-save-object-edit>Сохранить</button>
      </div>
      <section class="object-delete-zone">
        <div>
          <strong>Удаление объекта</strong>
          <span>Будут удалены огнетушители, проверки, неисправности и история объекта.</span>
        </div>
        <button type="button" class="danger-button" data-delete-object>Удалить объект</button>
      </section>
    </div>
  `;

  const formElement = objectEditPanel.querySelector("[data-object-edit-form]");
  formElement.querySelector("[data-edit-object-name]").value = data.object.name || "";
  formElement.querySelector("[data-edit-object-address]").value = data.object.address || "";

  const roomList = formElement.querySelector("[data-edit-room-list]");
  groups.forEach((group) => {
    roomList.append(createObjectEditRoomCard(group));
  });

  renderObjectEditExtinguishers(formElement, data.extinguishers || []);
  refreshObjectEditPlaceSelects(formElement);
  refreshObjectEditControls(formElement);
}

function setObjectEditMode(isEditing) {
  objectSummaryScreen.classList.toggle("is-editing", isEditing);
  objectEditPanel.classList.toggle("is-hidden", !isEditing);

  if (isEditing) {
    renderObjectEditForm();
  }
}

function collectObjectEditFormData() {
  const formElement = objectEditPanel.querySelector("[data-object-edit-form]");
  const rooms = [];

  formElement.querySelectorAll(".object-edit-card").forEach((card) => {
    if (!card.querySelector("[data-edit-room-name]")) {
      return;
    }

    const roomName = card.querySelector("[data-edit-room-name]")?.value.trim() || "";
    const floorName = card.querySelector("[data-edit-room-floor]")?.value.trim() || "";

    if (!roomName) {
      return;
    }

    card.querySelectorAll(".object-edit-location-row").forEach((row) => {
      rooms.push({
        id: row.dataset.roomId || "",
        clientKey: row.dataset.roomClientKey,
        name: roomName,
        floorName,
        fireZone: row.querySelector("[data-edit-location]")?.value.trim() || "",
        buildingName: "",
      });
    });
  });

  const extinguishers = Array.from(formElement.querySelectorAll("[data-extinguisher-id]")).map((card) => ({
    id: card.dataset.extinguisherId,
    number: card.querySelector("[data-edit-ext-number]")?.value.trim() || "",
    roomClientKey: card.querySelector("[data-edit-ext-room]")?.value || "",
  }));

  return {
    name: formElement.querySelector("[data-edit-object-name]")?.value.trim() || "",
    address: formElement.querySelector("[data-edit-object-address]")?.value.trim() || "",
    rooms,
    extinguishers,
  };
}

async function openObjectSummary(objectId, initialTab = "structure") {
  try {
    appState.currentObjectId = objectId;
    appState.currentObject = await apiRequest(`/organization/object.php?id=${encodeURIComponent(objectId)}`);
    renderObjectSummary();
    setObjectEditMode(false);
    showObjectSummary();
    setSummaryTab(initialTab);
  } catch (error) {
    showSnackbar(error.message);
  }
}

function openCheckDetail(inspection, returnView = "objectSummary") {
  if (isInspectionInProgress(inspection)) {
    showSnackbar("Проверка еще в работе");
    return;
  }

  checkDetailReturnView = returnView;
  appState.currentInspection = inspection;
  checkDetailTitle.textContent = getInspectionTitle(inspection);
  checkDetailList.innerHTML = "";
  const items = inspection.items || [];

  if (!items.length) {
    checkDetailList.append(createEmptyState("Детали проверки пока не заполнены", "После отчета подрядчика здесь появятся замечания и результаты."));
  } else {
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "check-detail-row";
      row.innerHTML = `
        <span>
          <strong>${escapeHtml(formatExtinguisherTitle(item))}</strong>
          <small>${escapeHtml(item.place || "Помещение не указано")}</small>
          ${getInspectionItemExactPlace(item) ? `<small>${escapeHtml(getInspectionItemExactPlace(item))}</small>` : ""}
          <small>${escapeHtml(item.check_type || "Проверка")} · ${escapeHtml(item.result || "Результат не указан")}</small>
          <small>Работы: ${escapeHtml(formatInspectionWorkTypes(item))}</small>
          ${item.comment ? `<small>Комментарий: ${escapeHtml(item.comment)}</small>` : ""}
          ${item.photo_file_id || item.photoFileId ? `<a class="uploaded-photo-link" href="${getFileUrl(item.photo_file_id || item.photoFileId)}" target="_blank" rel="noopener"><img src="${getFileUrl(item.photo_file_id || item.photoFileId)}" alt="Фото огнетушителя при проверке" /></a>` : ""}
        </span>
      `;
      checkDetailList.append(row);
    });
  }

  const hasReportRows = Boolean(items.length);
  downloadReportExcelButton.classList.toggle("is-hidden", !hasReportRows);
  downloadReportPdfButton.classList.toggle("is-hidden", !hasReportRows);
  showCheckDetail();
}

function openDashboardChecksOverview() {
  checkDetailReturnView = "dashboard";
  appState.currentInspection = null;
  checkDetailTitle.textContent = "Проверки";
  checkDetailList.innerHTML = "";
  downloadReportExcelButton.classList.add("is-hidden");
  downloadReportPdfButton.classList.add("is-hidden");

  const checks = appState.dashboard.checks || [];
  if (!checks.length) {
    checkDetailList.append(createEmptyState("Проверок пока нет", "Когда подрядчик завершит проверку, она появится здесь."));
  } else {
    checks.forEach((check) => {
      const row = document.createElement("button");
      const inProgress = isInspectionInProgress(check);
      row.type = "button";
      row.className = `check-row${inProgress ? " is-in-progress" : ""}`;
      row.disabled = inProgress;
      row.innerHTML = `
        <span>${escapeHtml(getInspectionTitle(check))} · ${escapeHtml(check.object_name || "Объект")} · ${escapeHtml(getInspectionDisplayDate(check))}</span>
        <span class="check-status${inProgress ? " is-progress" : " is-ok"}">${escapeHtml(getInspectionStatusText(check))}</span>
      `;
      if (!inProgress) {
        row.addEventListener("click", () => openCheckDetail(check, "dashboard"));
      }
      checkDetailList.append(row);
    });
  }

  showCheckDetail();
}

function collectObjectFormData() {
  const firstStepInputs = Array.from(objectSteps[0].querySelectorAll("input"));
  const rooms = Array.from(roomsList.querySelectorAll(".room-block")).flatMap((roomBlock) => {
    const roomName = roomBlock.querySelector("[data-room-name]")?.value.trim() || "";
    const floorName = roomBlock.querySelector("[data-room-floor]")?.value.trim() || "";
    const locations = Array.from(roomBlock.querySelectorAll(".location-row"))
      .map((row) => ({
        name: row.querySelector("[data-location-input]")?.value.trim() || "",
        extinguisherCount: toNumber(row.querySelector("[data-location-count]")?.value),
      }))
      .filter((location) => location.name || location.extinguisherCount > 0);
    const locationMap = new Map();

    locations.forEach((location) => {
      const key = location.name || "Без места";
      const current = locationMap.get(key) || 0;
      locationMap.set(key, current + location.extinguisherCount);
    });

    if (!locationMap.size) {
      return [
        {
          name: roomName,
          floorName,
          fireZone: "",
          buildingName: "",
          extinguisherCount: 0,
        },
      ];
    }

    return Array.from(locationMap.entries()).map(([location, extinguisherCount]) => ({
      name: roomName,
      floorName,
      fireZone: location === "Без места" ? "" : location,
      buildingName: "",
      extinguisherCount,
    }));
  });

  return {
    name: firstStepInputs[0]?.value.trim() || "",
    address: firstStepInputs[1]?.value.trim() || "",
    rooms,
  };
}

function setSelectOptions(select, placeholder, items, getLabel) {
  if (!select) {
    return;
  }

  select.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  placeholderOption.selected = true;
  select.append(placeholderOption);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id || item.value || "";
    option.textContent = getLabel(item);
    select.append(option);
  });
}

function uniqueFormValues(items, key) {
  const values = [];

  items.forEach((item) => {
    const value = item[key];

    if (value && !values.includes(value)) {
      values.push(value);
    }
  });

  return values.map((value) => ({ id: value, value }));
}

function getAddExtinguisherPlaceOptions() {
  const currentObject = addExtinguisherReturnTarget === "contractorInspection"
    ? (appState.contractor.currentObject || {})
    : (appState.currentObject || {});
  const rooms = currentObject.rooms || [];
  const options = [];

  rooms.forEach((room) => {
    getExpandedRoomFloors(room).forEach((floorName) => {
      const parts = [room.name, floorName, room.fire_zone].filter(Boolean);
      options.push({
        roomId: room.id || "",
        roomName: room.name || "",
        floorName,
        fireZone: room.fire_zone || "",
        buildingName: room.building_name || "",
        label: parts.length ? parts.join(", ") : "Место установки",
      });
    });
  });

  return options;
}

function populateAddExtinguisherPlaceInput() {
  const placeInput = addExtinguisherFormFields.querySelector("[data-add-ext-place]");
  const placeList = addExtinguisherFormFields.querySelector("[data-add-ext-place-list]");

  if (!placeInput || !placeList) {
    return;
  }

  const currentValue = placeInput.value;
  const options = getAddExtinguisherPlaceOptions();
  placeList.innerHTML = "";

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.label;
    option.dataset.roomId = optionData.roomId;
    option.dataset.roomName = optionData.roomName;
    option.dataset.floorName = optionData.floorName;
    option.dataset.fireZone = optionData.fireZone;
    option.dataset.buildingName = optionData.buildingName;
    placeList.append(option);
  });

  if (currentValue) {
    placeInput.value = currentValue;
  }
}

function renderAddExtinguisherDetailsForm() {
  addExtinguisherFormFields.innerHTML = `
    <label class="inspection-field inspection-field-accent">
      <span>Номер, присвоенный огнетушителю</span>
      <input type="text" placeholder="ПБ-001" aria-label="Номер, присвоенный огнетушителю" id="newExtinguisherNumber" data-add-ext-assigned-number />
    </label>
    <label class="inspection-field">
      <span>Дата размещения огнетушителя на объекте защиты</span>
      <input type="text" placeholder="ДД.ММ.ГГГГ" aria-label="Дата размещения огнетушителя на объекте защиты" data-add-ext-placement-date />
    </label>
    <label class="inspection-field">
      <span>Помещение</span>
      <input type="text" placeholder="Например: склад или кабинет 12" aria-label="Помещение" list="addExtinguisherPlaceList" data-add-ext-place />
      <datalist id="addExtinguisherPlaceList" data-add-ext-place-list></datalist>
    </label>
    <label class="inspection-field">
      <span>Точное место</span>
      <input type="text" placeholder="Например: у входа, справа от двери" aria-label="Точное место" data-add-ext-exact-place />
    </label>
    <label class="inspection-field">
      <span>Тип и марка огнетушителя</span>
      <input type="text" placeholder="ОП-4" aria-label="Тип и марка огнетушителя" data-add-ext-name />
    </label>
    <label class="inspection-field">
      <span>Завод — изготовитель огнетушителя</span>
      <input type="text" placeholder="Производитель" aria-label="Завод — изготовитель огнетушителя" data-add-ext-manufacturer />
    </label>
    <label class="inspection-field">
      <span>Заводской номер</span>
      <input type="text" placeholder="Заводской номер" aria-label="Заводской номер" data-add-ext-factory-number />
    </label>
    <label class="inspection-field">
      <span>Дата изготовления огнетушителя</span>
      <input type="text" placeholder="ДД.ММ.ГГГГ" aria-label="Дата изготовления огнетушителя" data-add-ext-release-date />
    </label>
    <label class="inspection-field">
      <span>Дата очередной перезарядки огнетушителя</span>
      <input type="text" placeholder="ДД.ММ.ГГГГ" aria-label="Дата очередной перезарядки огнетушителя" data-add-ext-next-recharge-date />
    </label>
    <label class="inspection-field">
      <span>Срок службы огнетушителя</span>
      <input type="text" placeholder="Например: до 2030 года" aria-label="Срок службы огнетушителя" data-add-ext-service-life />
    </label>
    <label class="inspection-field inspection-field-accent">
      <span>Ответственное лицо и его подпись</span>
      <input type="text" placeholder="ФИО ответственного" aria-label="Ответственное лицо и его подпись" required aria-required="true" data-add-ext-responsible-person />
    </label>
    <div class="photo-upload" id="photoUpload">
      <button type="button" class="upload-button" id="uploadPhotoButton">Загрузить фото</button>
    </div>
  `;

  photoUpload = addExtinguisherFormFields.querySelector("#photoUpload");
  uploadPhotoButton = addExtinguisherFormFields.querySelector("#uploadPhotoButton");
  bindPhotoUpload(photoUpload, uploadPhotoButton);
  populateAddExtinguisherPlaceInput();
}

function getAddExtinguisherDetails() {
  const placeInput = addExtinguisherFormFields.querySelector("[data-add-ext-place]");
  const placeList = addExtinguisherFormFields.querySelector("[data-add-ext-place-list]");
  const place = placeInput?.value.trim() || "";
  const selectedPlace = Array.from(placeList?.options || []).find((option) => option.value === place) || null;
  const assignedNumber = addExtinguisherFormFields.querySelector("[data-add-ext-assigned-number]")?.value.trim() || "";
  const name = addExtinguisherFormFields.querySelector("[data-add-ext-name]")?.value.trim() || "";

  return {
    roomId: selectedPlace?.dataset.roomId || "",
    roomName: selectedPlace?.dataset.roomName || "",
    floorName: selectedPlace?.dataset.floorName || "",
    fireZone: selectedPlace?.dataset.fireZone || "",
    buildingName: selectedPlace?.dataset.buildingName || "",
    place,
    manualPlace: selectedPlace ? "" : place,
    exactPlace: addExtinguisherFormFields.querySelector("[data-add-ext-exact-place]")?.value.trim() || "",
    number: assignedNumber,
    assignedNumber,
    name,
    typeMark: name,
    placementDate: addExtinguisherFormFields.querySelector("[data-add-ext-placement-date]")?.value.trim() || "",
    manufacturer: addExtinguisherFormFields.querySelector("[data-add-ext-manufacturer]")?.value.trim() || "",
    releaseDate: addExtinguisherFormFields.querySelector("[data-add-ext-release-date]")?.value.trim() || "",
    manufactureDate: addExtinguisherFormFields.querySelector("[data-add-ext-release-date]")?.value.trim() || "",
    factoryNumber: addExtinguisherFormFields.querySelector("[data-add-ext-factory-number]")?.value.trim() || "",
    nextRechargeDate: addExtinguisherFormFields.querySelector("[data-add-ext-next-recharge-date]")?.value.trim() || "",
    serviceLife: addExtinguisherFormFields.querySelector("[data-add-ext-service-life]")?.value.trim() || "",
    responsiblePerson: addExtinguisherFormFields.querySelector("[data-add-ext-responsible-person]")?.value.trim() || "",
    mass: addExtinguisherFormFields.querySelector("[data-add-ext-mass]")?.value.trim() || "",
    checkType: addExtinguisherFormFields.querySelector("[data-add-ext-check-type]")?.value || inspectionTypeSelect.value,
    result: addExtinguisherFormFields.querySelector("[data-add-ext-result]")?.value || "Годный к эксплуатации",
  };
}

function getFloorLabel(index) {
  return `${index} этаж`;
}

function isFloorCountValue(value) {
  const rawValue = String(value || "").trim();
  const numericValue = Number(rawValue.replace(/[^\d]/g, ""));

  return /^\d+\s*(?:этаж(?:а|ей)?|эт\.?)?$/i.test(rawValue) && numericValue > 0;
}

function getExpandedRoomFloors(room) {
  const rawValue = String(room.floor_name || "").trim();

  if (!rawValue) {
    return [""];
  }

  if (!isFloorCountValue(rawValue)) {
    return [rawValue];
  }

  const maxFloorCount = Number(rawValue.replace(/[^\d]/g, ""));
  return Array.from({ length: maxFloorCount }, (_, index) => getFloorLabel(index + 1));
}

function getFloorOptions(rooms) {
  const values = [];
  let maxFloorCount = 0;

  rooms.forEach((room) => {
    const rawValue = String(room.floor_name || "").trim();

    if (!rawValue) {
      return;
    }

    const numericValue = Number(rawValue.replace(/[^\d]/g, ""));

    if (isFloorCountValue(rawValue)) {
      maxFloorCount = Math.max(maxFloorCount, numericValue);
      return;
    }

    if (!values.includes(rawValue)) {
      values.push(rawValue);
    }
  });

  for (let floor = 1; floor <= maxFloorCount; floor += 1) {
    const label = getFloorLabel(floor);

    if (!values.includes(label)) {
      values.push(label);
    }
  }

  return values.map((value) => ({ id: value, value }));
}

function syncObjectForms() {
  const isContractorExtinguisher = addExtinguisherReturnTarget === "contractorInspection";
  const currentObject = isContractorExtinguisher
    ? (appState.contractor.currentObject || {})
    : (appState.currentObject || {});
  const rooms = currentObject.rooms || [];
  const extinguishers = currentObject.extinguishers || [];

  [addExtinguisherFormFields, addIssueScreen.querySelector(".extinguisher-form")].forEach((formElement) => {
    if (!formElement) {
      return;
    }

    setSelectOptions(
      formElement.querySelector("select[aria-label='Здание']"),
      "Здание",
      uniqueFormValues(rooms, "building_name"),
      (item) => item.value
    );
    setSelectOptions(
      formElement.querySelector("select[aria-label='Этаж']"),
      "Этаж",
      getFloorOptions(rooms),
      (item) => item.value
    );
    setSelectOptions(
      formElement.querySelector("select[aria-label='Помещение']"),
      "Помещение",
      rooms,
      (room) => room.name
    );
    setSelectOptions(
      formElement.querySelector("select[aria-label='Зона']"),
      "Зона",
      uniqueFormValues(rooms, "fire_zone"),
      (item) => item.value
    );
  });

  populateAddExtinguisherPlaceInput();

  setSelectOptions(
    addIssueScreen.querySelector("select[aria-label='Выбрать огнетушитель']"),
    "Выбрать огнетушитель",
    extinguishers,
    (extinguisher) => formatExtinguisherTitle(extinguisher)
  );
}

function showDashboard() {
  syncDashboardMode();
  steps.forEach((section) => section.classList.remove("is-active"));
  successState.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  authHeader.classList.add("is-hidden");
  authStepper.classList.add("is-hidden");
  form.classList.add("is-hidden");
  dashboardScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");

  if (getAccountType() === "organization") {
    loadDashboard();
  } else {
    loadContractorDashboard();
  }
}

function showSummary() {
  if (getAccountType() === "contractor") {
    showDashboard();
    return;
  }

  steps.forEach((section) => section.classList.remove("is-active"));
  successState.classList.remove("is-active");
  dashboardScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  authHeader.classList.add("is-hidden");
  authStepper.classList.add("is-hidden");
  form.classList.add("is-hidden");
  summaryScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");
  loadSummary();
}

function showObjectStep(step) {
  currentObjectStep = step;
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.add("is-active");
  objectStepLabel.textContent = `Шаг ${step} из 3`;

  objectSteps.forEach((section) => {
    section.classList.toggle("is-active", Number(section.dataset.objectStep) === step);
  });
  menuButton.setAttribute("aria-expanded", "false");
}

function showMenu(returnView = "dashboard") {
  menuReturnView = returnView;

  if (window.matchMedia("(min-width: 900px)").matches) {
    menuButton.setAttribute("aria-expanded", "false");
    return;
  }

  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  menuScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (menuReturnView === "object") {
    showObjectStep(currentObjectStep);
    return;
  }

  if (menuReturnView === "objects") {
    showObjects();
    return;
  }

  if (menuReturnView === "summaryOverview") {
    showSummary();
    return;
  }

  if (menuReturnView === "account") {
    showAccount();
    return;
  }

  if (menuReturnView === "summary") {
    showObjectSummary();
    return;
  }

  if (menuReturnView === "extinguisherDetail") {
    showExtinguisherDetail();
    return;
  }

  if (menuReturnView === "check") {
    showCheckDetail();
    return;
  }

  if (menuReturnView === "extinguisher") {
    showAddExtinguisher();
    return;
  }

  if (menuReturnView === "issue") {
    showAddIssue();
    return;
  }

  if (menuReturnView === "contractorObjectSelect") {
    showContractorObjectSelect();
    return;
  }

  if (menuReturnView === "contractorEmployeeSelect") {
    showContractorEmployeeSelect(inspectionEmployeeNextTarget);
    return;
  }

  if (menuReturnView === "contractorInspection") {
    showContractorInspection();
    return;
  }

  showDashboard();
}

function showObjects() {
  if (getAccountType() === "contractor") {
    showDashboard();
    return;
  }

  syncObjectsMode();
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectsScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");

  if (getAccountType() === "organization") {
    loadObjects();
  } else {
    loadContractorObjects();
  }
}

function showAccount() {
  syncAccountMode();
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  accountScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");

  if (getAccountType() === "organization") {
    loadAccount();
  } else {
    loadContractorAccount();
  }
}

function showObjectSummary() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  objectSummaryScreen.classList.add("is-active");
}

function showExtinguisherDetail() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  extinguisherDetailScreen.classList.add("is-active");
}

function setCheckDetail() {
  appState.currentInspection = null;
  checkDetailTitle.textContent = "Проверка";
  checkDetailList.innerHTML = "";
  checkDetailList.append(createEmptyState("Детали проверки пока не заполнены", "После отчета подрядчика здесь появятся замечания и результаты."));
  downloadReportExcelButton.classList.add("is-hidden");
  downloadReportPdfButton.classList.add("is-hidden");
}

function showCheckDetail(type = null) {
  if (type) {
    setCheckDetail(type);
  }
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  checkDetailScreen.classList.add("is-active");
}

function showAddExtinguisher() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.add("is-active");
}

function showAddIssue() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  addIssueScreen.classList.add("is-active");
}

function showContractorObjectSelect() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.add("is-active");
  loadContractorObjectSelect();
}

function showContractorEmployeeSelect(nextTarget = "objectSelect") {
  inspectionEmployeeNextTarget = nextTarget;
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.add("is-active");
}

function showContractorInspection() {
  dashboardScreen.classList.remove("is-active");
  summaryScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  if (!inspectionList.querySelector(".inspection-card, .empty-state")) {
    renderContractorInspectionList();
  }
  contractorInspectionTitle.textContent = getInspectionTitle({ inspectionType: inspectionTypeSelect.value });
  contractorInspectionScreen.classList.add("is-active");
}

function setSummaryTab(tabName) {
  document.querySelectorAll("[data-summary-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.summaryTab === tabName);
  });

  document.querySelectorAll("[data-summary-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.summaryPanel === tabName);
  });
}

function getActiveSummaryTab() {
  return document.querySelector("[data-summary-tab].is-active")?.dataset.summaryTab || "structure";
}

function openAddExtinguisher(returnTarget = "summary") {
  addExtinguisherReturnTarget = returnTarget;
  summaryReturnTab = getActiveSummaryTab();
  renderAddExtinguisherDetailsForm();
  syncObjectForms();
  showAddExtinguisher();
}

function openAddIssue() {
  summaryReturnTab = getActiveSummaryTab();
  syncObjectForms();
  showAddIssue();
}

function returnToSummaryWithSnackbar(message) {
  showObjectSummary();
  setSummaryTab(summaryReturnTab);
  showSnackbar(message);
}

function returnFromAddExtinguisher(message) {
  if (addExtinguisherReturnTarget === "contractorInspection") {
    const newCard = addContractorInspectionCard();
    showContractorInspection();
    requestAnimationFrame(() => {
      newCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    showSnackbar(message);
    return;
  }

  returnToSummaryWithSnackbar(message);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function showModal(title, message) {
  inspectionModalTitle.textContent = title;
  inspectionModalText.textContent = message;
  inspectionModal.classList.add("is-visible");
  inspectionModal.setAttribute("aria-hidden", "false");
}

function showSnackbar(message) {
  window.clearTimeout(snackbarTimer);
  snackbar.textContent = message;
  snackbar.classList.add("is-visible");

  snackbarTimer = window.setTimeout(() => {
    snackbar.classList.remove("is-visible");
  }, 2600);
}

function showInspectionModal() {
  showModal("Проверка запрошена", "Мы свяжемся с вами, чтобы согласовать дату и детали проверки.");
}

function hideInspectionModal() {
  inspectionModal.classList.remove("is-visible");
  inspectionModal.setAttribute("aria-hidden", "true");
}

function showDecommissionModal(button) {
  pendingDecommissionButton = button;
  decommissionModal.classList.add("is-visible");
  decommissionModal.setAttribute("aria-hidden", "false");
}

function hideDecommissionModal() {
  decommissionModal.classList.remove("is-visible");
  decommissionModal.setAttribute("aria-hidden", "true");
}

function showDeleteObjectModal() {
  if (getAccountType() !== "organization") {
    showSnackbar("Удалить объект может только организация");
    return;
  }

  const objectName = appState.currentObject?.object?.name || "этот объект";
  deleteObjectModalText.textContent = `Вы действительно хотите удалить объект «${objectName}»? Все огнетушители, проверки, неисправности и история объекта будут удалены без возможности восстановления.`;
  deleteObjectModal.classList.add("is-visible");
  deleteObjectModal.setAttribute("aria-hidden", "false");
}

function hideDeleteObjectModal() {
  deleteObjectModal.classList.remove("is-visible");
  deleteObjectModal.setAttribute("aria-hidden", "true");
}

function createLocationRow(roomNumber, value = "", extinguisherCount = "") {
  const row = document.createElement("div");
  row.className = "location-row";
  row.innerHTML = `
    <div class="location-row-fields">
      <input type="text" placeholder="Например: у выхода" aria-label="Место расположения огнетушителей ${roomNumber}" data-location-input />
      <input type="number" min="0" step="1" placeholder="Кол-во" aria-label="Количество огнетушителей в месте ${roomNumber}" data-location-count />
    </div>
    <button type="button" class="location-remove-button" data-remove-location aria-label="Удалить место расположения">&times;</button>
  `;
  row.querySelector("[data-location-input]").value = value;
  row.querySelector("[data-location-count]").value = extinguisherCount;
  return row;
}

function refreshLocationRemoveButtons(roomBlock) {
  const rows = Array.from(roomBlock.querySelectorAll(".location-row"));
  rows.forEach((row) => {
    const removeButton = row.querySelector("[data-remove-location]");
    removeButton.disabled = rows.length === 1;
  });
}

function addLocationRow(roomBlock, roomNumber, value = "", extinguisherCount = "") {
  const list = roomBlock.querySelector("[data-location-list]");
  list.append(createLocationRow(roomNumber, value, extinguisherCount));
  refreshLocationRemoveButtons(roomBlock);
}

function createRoomBlock(number) {
  const block = document.createElement("div");
  block.className = "room-block";
  block.innerHTML = `
    <p class="room-title">Помещение ${number}</p>
    <div class="object-fields">
      <input type="text" placeholder="Название помещение" aria-label="Название помещение ${number}" data-room-name />
      <input type="text" placeholder="Количество этажей" aria-label="Количество этажей помещения ${number}" inputmode="numeric" data-room-floor />
      <div class="location-builder">
        <div class="location-builder-head">
          <span>Места установки и количество огнетушителей</span>
          <button type="button" class="location-add-button" data-add-location>+ Добавить</button>
        </div>
        <div class="location-list" data-location-list></div>
      </div>
    </div>
  `;

  addLocationRow(block, number);

  block.querySelector("[data-add-location]").addEventListener("click", () => {
    addLocationRow(block, number);
    block.querySelector(".location-row:last-child input")?.focus();
  });

  block.querySelector("[data-location-list]").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-location]");

    if (!removeButton || removeButton.disabled) {
      return;
    }

    removeButton.closest(".location-row")?.remove();
    refreshLocationRemoveButtons(block);
  });

  return block;
}

function createEmployeeCard(name, email) {
  const card = document.createElement("div");
  card.className = "employee-card";
  card.innerHTML = `
    <span class="employee-info">
      <strong>${escapeHtml(name)}</strong>
      <span>${escapeHtml(email)}</span>
    </span>
    <button type="button" class="document-action is-danger" data-remove-employee>Удалить</button>
  `;

  return card;
}

function resetClientForm() {
  clientName.value = "";
  contractorPlanList.innerHTML = "";
  addContractorPlanRow();
  clientForm.querySelectorAll(".document-grid").forEach((grid) => {
    grid.innerHTML = "";
  });
}

function refreshContractorPlanOptions() {
  const objects = appState.account.objects || [];

  contractorPlanList.querySelectorAll("[data-contractor-plan-object]").forEach((select) => {
    const currentValue = select.value;
    select.innerHTML = '<option value="">Выберите объект</option>';
    objects.forEach((object) => {
      const option = document.createElement("option");
      option.value = object.id;
      option.textContent = object.name;
      select.append(option);
    });
    select.value = currentValue;
  });
}

function addContractorPlanRow() {
  const row = document.createElement("div");
  row.className = "contractor-plan-row";
  row.innerHTML = `
    <select aria-label="Объект плановой проверки" data-contractor-plan-object></select>
    <input type="date" aria-label="Дата плановой проверки" data-contractor-plan-date />
    <button type="button" class="document-action is-danger" data-remove-contractor-plan>Удалить</button>
  `;
  contractorPlanList.append(row);
  refreshContractorPlanOptions();
}

function collectContractorPlans() {
  return Array.from(contractorPlanList.querySelectorAll(".contractor-plan-row"))
    .map((row) => ({
      objectId: row.querySelector("[data-contractor-plan-object]")?.value || "",
      date: row.querySelector("[data-contractor-plan-date]")?.value || "",
    }))
    .filter((item) => item.objectId && item.date);
}

function createClientCard(name, documents) {
  const card = document.createElement("div");
  card.className = "client-card";
  const docsMarkup = documents.length
    ? documents.map((documentName) => `<span>${escapeHtml(documentName)}</span>`).join("")
    : "<span>Документы не загружены</span>";

  card.innerHTML = `
    <span class="employee-info">
      <strong>${escapeHtml(name)}</strong>
      <span>${documents.length} документа</span>
      <span class="client-documents">${docsMarkup}</span>
    </span>
    <button type="button" class="document-action is-danger" data-remove-client>Удалить</button>
  `;

  card.querySelector("[data-remove-client]").addEventListener("click", () => {
    card.remove();
    showSnackbar("Клиент удален");
  });

  return card;
}

function addRoom() {
  roomCount += 1;
  roomsList.append(createRoomBlock(roomCount));
  showObjectStep(3);
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (useDemoAccess) {
      startDemoAccess();
      return;
    }

    if (!useMockFlow && currentStep === 2 && !validateStepTwo()) {
      return;
    }

    if (!useMockFlow && currentStep === 2) {
      button.disabled = true;

      try {
        await requestAuthCode();
        showSnackbar("Код отправлен на email");
      } catch (error) {
        showSnackbar(error.message);
        button.disabled = false;
        return;
      }

      button.disabled = false;
    }

    showStep(Math.min(currentStep + 1, 3));

    if (currentStep === 3) {
      codeInputs[0].focus();
    }
  });
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => {
    if (authMode === "login" && currentStep === 2) {
      resetToRegistration();
      return;
    }

    showStep(Math.max(currentStep - 1, 1));
  });
});

accountTypeInputs.forEach((input) => {
  input.addEventListener("change", syncFormMode);
});

roleCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!useDemoAccess) {
      return;
    }

    const input = card.querySelector("input[name='accountType']");

    if (input) {
      setAccountType(input.value);
      startDemoAccess(input.value);
    }
  });
});

if (demoEnterButton) {
  demoEnterButton.addEventListener("click", () => {
    startDemoAccess();
  });
}

loginEntryButton.addEventListener("click", () => {
  if (useDemoAccess) {
    return;
  }

  authMode = "login";
  form.reset();
  setCodeError(false);
  codeInputs.forEach((input) => {
    input.value = "";
  });
  syncFormMode();
  showStep(2);
  document.querySelector("#email").focus();
});

codeInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    setCodeError(false);

    if (input.value && codeInputs[index + 1]) {
      codeInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && codeInputs[index - 1]) {
      codeInputs[index - 1].focus();
    }
  });

  input.addEventListener("paste", (event) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, codeInputs.length);

    digits.split("").forEach((digit, digitIndex) => {
      codeInputs[digitIndex].value = digit;
    });

    const nextIndex = Math.min(digits.length, codeInputs.length - 1);
    codeInputs[nextIndex].focus();
  });
});

if (resendCodeButton) {
  resendCodeButton.addEventListener("click", async () => {
    resendCodeButton.disabled = true;

    try {
      await requestAuthCode();
      showSnackbar("Новый код отправлен на email");
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      resendCodeButton.disabled = false;
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!useMockFlow && getCode().length !== codeInputs.length) {
    setCodeError(true);
    codeInputs.find((input) => !input.value)?.focus();
    return;
  }

  if (!useMockFlow) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      await verifyAuthCode();
      showSnackbar("Email подтвержден");
    } catch (error) {
      setCodeError(true);
      showSnackbar(error.message);
      submitButton.disabled = false;
      return;
    }

    submitButton.disabled = false;
  }

  showDashboard();
});

function resetToRegistration() {
  authMode = "registration";
  form.reset();
  codeInputs.forEach((input) => {
    input.value = "";
  });
  setCodeError(false);
  syncFormMode();
  summaryScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  extinguisherDetailScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  showStep(1);
  syncFormMode();
}

restartButton.addEventListener("click", () => {
  resetToRegistration();
});

menuButton.addEventListener("click", () => {
  showMenu("dashboard");
});

objectMenuButton.addEventListener("click", () => {
  showMenu("object");
});

accountMenuButton.addEventListener("click", () => {
  showMenu("account");
});

objectsMenuButton.addEventListener("click", () => {
  showMenu("objects");
});

summaryOverviewMenuButton.addEventListener("click", () => {
  showMenu("summaryOverview");
});

summaryMenuButton.addEventListener("click", () => {
  showMenu("summary");
});

extinguisherDetailMenuButton.addEventListener("click", () => {
  showMenu("extinguisherDetail");
});

checkMenuButton.addEventListener("click", () => {
  showMenu("check");
});

extinguisherMenuButton.addEventListener("click", () => {
  showMenu("extinguisher");
});

issueMenuButton.addEventListener("click", () => {
  showMenu("issue");
});

contractorObjectSelectMenuButton.addEventListener("click", () => {
  showMenu("contractorObjectSelect");
});

contractorEmployeeSelectMenuButton.addEventListener("click", () => {
  showMenu("contractorEmployeeSelect");
});

contractorInspectionMenuButton.addEventListener("click", () => {
  showMenu("contractorInspection");
});

summaryOverviewBackButton.addEventListener("click", () => {
  showDashboard();
});

accountBackButton.addEventListener("click", () => {
  showDashboard();
});

objectsBackButton.addEventListener("click", () => {
  showDashboard();
});

summaryBackButton.addEventListener("click", () => {
  if (objectSummaryScreen.classList.contains("is-editing")) {
    setObjectEditMode(false);
    return;
  }

  if (getAccountType() === "contractor") {
    showDashboard();
    return;
  }

  showObjects();
});

checkBackButton.addEventListener("click", () => {
  if (checkDetailReturnView === "contractorDashboard" || checkDetailReturnView === "dashboard") {
    showDashboard();
    return;
  }

  showObjectSummary();
  setSummaryTab("checks");
});

extinguisherDetailBackButton.addEventListener("click", () => {
  showObjectSummary();
  setSummaryTab("structure");
});

downloadExtinguisherHistoryExcelButton.addEventListener("click", () => {
  downloadExtinguisherHistoryExcel();
});

downloadExtinguisherHistoryPdfButton.addEventListener("click", () => {
  downloadExtinguisherHistoryPdf();
});

downloadReportExcelButton.addEventListener("click", () => {
  downloadInspectionReportExcel(getActiveInspectionReport(false));
});

downloadReportPdfButton.addEventListener("click", () => {
  downloadInspectionReportPdf(getActiveInspectionReport(false));
});

downloadObjectExcelButton.addEventListener("click", () => {
  downloadObjectReportExcel();
});

downloadObjectPdfButton.addEventListener("click", () => {
  downloadObjectReportPdf();
});

inspectionTypeSelect.addEventListener("change", () => {
  contractorInspectionTitle.textContent = getInspectionTitle({ inspectionType: inspectionTypeSelect.value });

  if (!appState.contractor.currentObjectId || !inspectionList.querySelector(".inspection-card")) {
    return;
  }

  saveCurrentContractorInspectionDraft().catch((error) => {
    showSnackbar(error.message);
  });
});

extinguisherBackButton.addEventListener("click", () => {
  if (addExtinguisherReturnTarget === "contractorInspection") {
    showContractorInspection();
    return;
  }

  showObjectSummary();
  setSummaryTab(summaryReturnTab);
});

issueBackButton.addEventListener("click", () => {
  showObjectSummary();
  setSummaryTab(summaryReturnTab);
});

contractorObjectSelectBackButton.addEventListener("click", () => {
  showDashboard();
});

contractorEmployeeSelectBackButton.addEventListener("click", () => {
  if (inspectionEmployeeNextTarget === "inspection") {
    showObjects();
    return;
  }

  showDashboard();
});

contractorInspectionBackButton.addEventListener("click", () => {
  showContractorObjectSelect();
});

closeMenuButton.addEventListener("click", () => {
  closeMenu();
});

menuBackButton.addEventListener("click", () => {
  closeMenu();
});

document.querySelector("[data-menu-dashboard]").addEventListener("click", () => {
  showDashboard();
});

menuSummaryButton.addEventListener("click", () => {
  showSummary();
});

menuObjectsButton.addEventListener("click", () => {
  showObjects();
});

document.querySelector("[data-menu-account]").addEventListener("click", () => {
  showAccount();
});

document.querySelectorAll("[data-dashboard-object]").forEach((button) => {
  button.addEventListener("click", () => {
    showObjectSummary();
    setSummaryTab("structure");
  });
});

document.querySelectorAll("[data-dashboard-check]").forEach((button) => {
  button.addEventListener("click", () => {
    showCheckDetail(button.dataset.dashboardCheck);
  });
});

accountLinkButton.addEventListener("click", () => {
  clientForm.classList.remove("is-hidden");
  accountLinkButton.classList.add("is-hidden");
  if (!contractorPlanList.children.length) {
    addContractorPlanRow();
  }
});

addContractorPlanButton.addEventListener("click", () => {
  addContractorPlanRow();
});

contractorPlanList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-contractor-plan]");

  if (!removeButton) {
    return;
  }

  removeButton.closest(".contractor-plan-row")?.remove();

  if (!contractorPlanList.children.length) {
    addContractorPlanRow();
  }
});

cancelClientButton.addEventListener("click", () => {
  resetClientForm();
  clientForm.classList.add("is-hidden");
  accountLinkButton.classList.remove("is-hidden");
});

saveClientButton.addEventListener("click", async () => {
  const name = clientName.value.trim();

  if (!name) {
    showSnackbar("Введите название подрядчика");
    return;
  }

  saveClientButton.disabled = true;

  try {
    const documentItems = Array.from(clientForm.querySelectorAll(".document-item"));

    for (const item of documentItems) {
      if (item._documentFile) {
        await uploadRealFile(item._documentFile, {
          kind: "document",
          displayName: `${item.dataset.documentLabel || "Документ"} — ${item._documentFile.name}`,
        });
      }
    }

    await apiRequest("/organization/contractor-invites.php", {
      method: "POST",
      body: JSON.stringify({ name, checks: collectContractorPlans() }),
    });
    resetClientForm();
    clientForm.classList.add("is-hidden");
    accountLinkButton.classList.remove("is-hidden");
    await loadAccount();
    showSnackbar("Приглашение подрядчика сохранено");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    saveClientButton.disabled = false;
  }
});

showEmployeeFormButton.addEventListener("click", () => {
  employeeForm.classList.remove("is-hidden");
  showEmployeeFormButton.classList.add("is-hidden");
});

cancelEmployeeButton.addEventListener("click", () => {
  employeeForm.classList.add("is-hidden");
  showEmployeeFormButton.classList.remove("is-hidden");
});

saveEmployeeButton.addEventListener("click", async () => {
  const name = employeeName.value.trim();
  const email = employeeEmail.value.trim();

  if (!name || !email) {
    showSnackbar("Заполните ФИО и email сотрудника");
    return;
  }

  try {
    await apiRequest("/organization/employees.php", {
      method: "POST",
      body: JSON.stringify({
        fullName: name,
        email,
      }),
    });
    employeeName.value = "";
    employeeEmail.value = "";
    employeeForm.classList.add("is-hidden");
    showEmployeeFormButton.classList.remove("is-hidden");
    await loadAccount();
    showSnackbar("Сотрудник добавлен");
  } catch (error) {
    showSnackbar(error.message);
  }
});

accountDocuments.addEventListener("click", (event) => {
  event.stopPropagation();
});

logoutButton.addEventListener("click", async () => {
  if (!useMockFlow) {
    try {
      await apiRequest("/auth/logout.php", { method: "POST" });
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  resetToRegistration();
});

addObjectButton.addEventListener("click", () => {
  roomCount = 0;
  roomsList.innerHTML = "";
  showObjectStep(1);
});

startInspectionButton.addEventListener("click", () => {
  showContractorObjectSelect();
});

dashboardObjectsHeadingButton.addEventListener("click", () => {
  showObjects();
});

dashboardChecksHeadingButton.addEventListener("click", () => {
  openDashboardChecksOverview();
});

addObjectFromObjectsButton.addEventListener("click", () => {
  roomCount = 0;
  roomsList.innerHTML = "";
  showObjectStep(1);
});

document.querySelectorAll("[data-start-contractor-inspection]").forEach((button) => {
  button.addEventListener("click", () => {
    showContractorEmployeeSelect("inspection");
  });
});

document.querySelectorAll("[data-select-contractor-object]").forEach((button) => {
  button.addEventListener("click", () => {
    showContractorEmployeeSelect("inspection");
  });
});

document.querySelectorAll("[data-contractor-dashboard-target]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.contractorDashboardTarget === "objects") {
      showObjects();
      return;
    }

    showContractorObjectSelect();
  });
});

continueInspectionEmployeeButton.addEventListener("click", async () => {
  if (inspectionEmployeeNextTarget === "inspection") {
    if (!appState.contractor.currentObjectId) {
      showSnackbar("Сначала выберите объект");
      showContractorObjectSelect();
      return;
    }

    continueInspectionEmployeeButton.disabled = true;

    try {
      await saveCurrentContractorInspectionDraft();
      showContractorInspection();
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      continueInspectionEmployeeButton.disabled = false;
    }
    return;
  }

  showContractorObjectSelect();
});

document.querySelectorAll(".summary-button").forEach((button) => {
  button.addEventListener("click", () => {
    showObjectSummary();
    setSummaryTab("structure");
  });
});

document.querySelectorAll("[data-summary-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    setSummaryTab(button.dataset.summaryTab);
  });
});

document.querySelectorAll("[data-open-check]").forEach((button) => {
  button.addEventListener("click", () => {
    showCheckDetail(button.dataset.checkType);
  });
});

if (requestInspectionButton) {
  requestInspectionButton.addEventListener("click", () => {
    if (!appState.currentObjectId) {
      showSnackbar("Сначала выберите объект");
      return;
    }

    apiRequest("/organization/inspection-requests.php", {
      method: "POST",
      body: JSON.stringify({
        objectId: appState.currentObjectId,
      }),
    })
      .then(() => {
        showModal("Проверка запрошена", "Заявка сохранена. Предстоящая проверка появится на главной.");
        loadDashboard();
      })
      .catch((error) => {
        showSnackbar(error.message);
      });
  });
}

inspectionModalClose.addEventListener("click", () => {
  hideInspectionModal();
});

inspectionModal.addEventListener("click", (event) => {
  if (event.target === inspectionModal) {
    hideInspectionModal();
  }
});

decommissionCancelButton.addEventListener("click", () => {
  hideDecommissionModal();
});

decommissionModal.addEventListener("click", (event) => {
  if (event.target === decommissionModal) {
    hideDecommissionModal();
  }
});

decommissionConfirmButton.addEventListener("click", () => {
  if (pendingDecommissionButton) {
    const card = pendingDecommissionButton.closest(".inspection-card");
    const resultSelect = card?.querySelectorAll("select")[1];
    card.dataset.decommissioned = "true";
    card.classList.add("is-decommissioned");

    if (resultSelect) {
      resultSelect.value = "Требуется замена";
    }
  }

  hideDecommissionModal();
  showSnackbar("Снятие с эксплуатации будет сохранено в проверке");
  pendingDecommissionButton = null;
});

deleteObjectCancelButton.addEventListener("click", () => {
  hideDeleteObjectModal();
});

deleteObjectModal.addEventListener("click", (event) => {
  if (event.target === deleteObjectModal) {
    hideDeleteObjectModal();
  }
});

deleteObjectConfirmButton.addEventListener("click", async () => {
  if (getAccountType() !== "organization") {
    hideDeleteObjectModal();
    showSnackbar("Удалить объект может только организация");
    return;
  }

  const objectId = appState.currentObjectId;

  if (!objectId) {
    hideDeleteObjectModal();
    showSnackbar("Объект не выбран");
    return;
  }

  deleteObjectConfirmButton.disabled = true;

  try {
    await apiRequest(`/organization/object.php?id=${encodeURIComponent(objectId)}`, {
      method: "DELETE",
    });
    hideDeleteObjectModal();
    appState.currentObjectId = null;
    appState.currentObject = null;
    appState.currentExtinguisher = null;
    setObjectEditMode(false);
    await loadDashboard();
    await loadObjects();
    showObjects();
    showSnackbar("Объект удален");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    deleteObjectConfirmButton.disabled = false;
  }
});

addExtinguisherButton.addEventListener("click", () => {
  openAddExtinguisher();
});

saveExtinguisherButton.addEventListener("click", async () => {
  const details = getAddExtinguisherDetails();

  if (addExtinguisherReturnTarget === "contractorInspection") {
    const number = details.assignedNumber || details.number;

    if (!number) {
      showSnackbar("Введите присвоенный номер огнетушителя");
      return;
    }

    if (!details.responsiblePerson) {
      showSnackbar("Укажите ответственное лицо");
      addExtinguisherFormFields.querySelector("[data-add-ext-responsible-person]")?.focus();
      return;
    }

    saveExtinguisherButton.disabled = true;

    try {
      await uploadPendingPhoto(photoUpload, appState.contractor.currentObjectId);
      returnFromAddExtinguisher("Огнетушитель добавлен в проверку");
      photoUpload._renderPhoto({});
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      saveExtinguisherButton.disabled = false;
    }
    return;
  }

  if (!appState.currentObjectId) {
    showSnackbar("Сначала выберите объект");
    return;
  }

  const number = details.assignedNumber || details.number;

  if (!number) {
    showSnackbar("Введите присвоенный номер огнетушителя");
    return;
  }

  if (!details.responsiblePerson) {
    showSnackbar("Укажите ответственное лицо");
    addExtinguisherFormFields.querySelector("[data-add-ext-responsible-person]")?.focus();
    return;
  }

  saveExtinguisherButton.disabled = true;

  try {
    const photoFileId = await uploadPendingPhoto(photoUpload, appState.currentObjectId);
    await apiRequest("/organization/extinguishers.php", {
      method: "POST",
      body: JSON.stringify({
      objectId: appState.currentObjectId,
      roomId: details.roomId,
      floorName: details.floorName,
      fireZone: details.fireZone,
      buildingName: details.buildingName,
      manualPlace: details.manualPlace,
      exactPlace: details.exactPlace,
      number,
      name: details.name,
      typeMark: details.typeMark,
      placementDate: details.placementDate,
      manufacturer: details.manufacturer,
      factoryNumber: details.factoryNumber,
      manufactureDate: details.manufactureDate,
      nextRechargeDate: details.nextRechargeDate,
      serviceLife: details.serviceLife,
      responsiblePerson: details.responsiblePerson,
      photoFileId,
      }),
    });
    addExtinguisherFormFields.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    photoUpload._renderPhoto({});
    await openObjectSummary(appState.currentObjectId);
    returnFromAddExtinguisher("Огнетушитель добавлен");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    saveExtinguisherButton.disabled = false;
  }
});

addIssueButton.addEventListener("click", () => {
  openAddIssue();
});

editObjectButton.addEventListener("click", () => {
  setObjectEditMode(true);
});

objectEditPanel.addEventListener("click", async (event) => {
  const formElement = objectEditPanel.querySelector("[data-object-edit-form]");

  if (!formElement) {
    return;
  }

  const addRoomButton = event.target.closest("[data-edit-add-room]");
  const addLocationButton = event.target.closest("[data-edit-add-location]");
  const removeLocationButton = event.target.closest("[data-edit-remove-location]");
  const removeRoomButton = event.target.closest("[data-edit-remove-room]");
  const cancelButton = event.target.closest("[data-cancel-object-edit]");
  const saveButton = event.target.closest("[data-save-object-edit]");
  const deleteButton = event.target.closest("[data-delete-object]");

  if (addRoomButton) {
    formElement.querySelector("[data-edit-room-list]").append(createObjectEditRoomCard());
    refreshObjectEditPlaceSelects(formElement);
    refreshObjectEditControls(formElement);
    return;
  }

  if (addLocationButton) {
    const card = addLocationButton.closest(".object-edit-card");
    card.querySelector("[data-edit-location-list]").append(createObjectEditLocationRow());
    refreshObjectEditPlaceSelects(formElement);
    refreshObjectEditControls(formElement);
    card.querySelector(".object-edit-location-row:last-child [data-edit-location]")?.focus();
    return;
  }

  if (removeLocationButton) {
    if (!removeLocationButton.disabled) {
      removeLocationButton.closest(".object-edit-location-row")?.remove();
      refreshObjectEditPlaceSelects(formElement);
      refreshObjectEditControls(formElement);
    }
    return;
  }

  if (removeRoomButton) {
    if (!removeRoomButton.disabled) {
      removeRoomButton.closest(".object-edit-card")?.remove();
      refreshObjectEditPlaceSelects(formElement);
      refreshObjectEditControls(formElement);
    }
    return;
  }

  if (cancelButton) {
    setObjectEditMode(false);
    showSnackbar("Изменения отменены");
    return;
  }

  if (deleteButton) {
    showDeleteObjectModal();
    return;
  }

  if (saveButton) {
    const payload = collectObjectEditFormData();

    if (!payload.name) {
      showSnackbar("Введите название объекта");
      return;
    }

    saveButton.disabled = true;

    try {
      await apiRequest(`/organization/object.php?id=${encodeURIComponent(appState.currentObjectId)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await openObjectSummary(appState.currentObjectId);
      await loadDashboard();
      await loadObjects();
      showSnackbar("Изменения сохранены");
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      saveButton.disabled = false;
    }
  }
});

objectEditPanel.addEventListener("input", (event) => {
  if (!event.target.matches("[data-edit-room-name], [data-edit-room-floor], [data-edit-location]")) {
    return;
  }

  const formElement = objectEditPanel.querySelector("[data-object-edit-form]");
  refreshObjectEditPlaceSelects(formElement);
  refreshObjectEditControls(formElement);
});

objectEditPanel.addEventListener("change", (event) => {
  if (!event.target.matches("[data-edit-ext-room]")) {
    return;
  }

  event.target.dataset.selectedRoomKey = event.target.value;
  const formElement = objectEditPanel.querySelector("[data-object-edit-form]");
  refreshObjectEditControls(formElement);
});

saveIssueButton.addEventListener("click", async () => {
  if (!appState.currentObjectId) {
    showSnackbar("Сначала выберите объект");
    return;
  }

  const issueForm = addIssueScreen.querySelector(".extinguisher-form");
  const extinguisherSelect = issueForm.querySelector("select[aria-label='Выбрать огнетушитель']");
  const extinguisherId = extinguisherSelect?.value || "";
  const comment = document.querySelector("#issueComment")?.value.trim() || "";
  const title = extinguisherId
    ? `Неисправность огнетушителя № ${extinguisherSelect.selectedOptions[0]?.textContent.replace("Огнетушитель № ", "") || ""}`
    : "Неисправность на объекте";

  saveIssueButton.disabled = true;

  try {
    const photoFileId = await uploadPendingPhoto(issuePhotoUpload, appState.currentObjectId);
    await apiRequest("/organization/issues.php", {
      method: "POST",
      body: JSON.stringify({
      objectId: appState.currentObjectId,
      extinguisherId,
      title,
      comment,
      photoFileId,
      }),
    });
    issuePhotoUpload._renderPhoto({});
    await openObjectSummary(appState.currentObjectId);
    setSummaryTab("issues");
    document.querySelector("#issueComment").value = "";
    showSnackbar("Неисправность зафиксирована");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    saveIssueButton.disabled = false;
  }
});

document.querySelectorAll("[data-object-next]").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentObjectStep === 2 && roomCount === 0) {
      addRoom();
      return;
    }

    showObjectStep(Math.min(currentObjectStep + 1, 3));
  });
});

document.querySelectorAll("[data-object-back]").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentObjectStep === 1) {
      showDashboard();
      return;
    }

    showObjectStep(currentObjectStep - 1);
  });
});

document.querySelectorAll("[data-add-room]").forEach((button) => {
  button.addEventListener("click", () => {
    addRoom();
  });
});

function createDocumentItem(label, file) {
  const item = document.createElement("div");
  item.className = "document-item";
  item._documentFile = file;
  item.dataset.documentLabel = label;
  item.innerHTML = `
    <span class="document-icon">${escapeHtml((file.name.split(".").pop() || "FILE").toUpperCase())}</span>
    <span class="document-name">${escapeHtml(file.name)}</span>
    <button type="button" class="document-action" data-replace-document>Заменить</button>
    <button type="button" class="document-action is-danger" data-remove-document>Удалить</button>
  `;

  const replacementInput = document.createElement("input");
  replacementInput.type = "file";
  replacementInput.accept = DOCUMENT_ACCEPT;
  replacementInput.className = "file-input-hidden";
  replacementInput.hidden = true;
  replacementInput.setAttribute("aria-hidden", "true");
  replacementInput.tabIndex = -1;
  item.append(replacementInput);

  item.querySelector("[data-replace-document]").addEventListener("click", (event) => {
    event.stopPropagation();
    replacementInput.click();
  });

  replacementInput.addEventListener("change", () => {
    try {
      const nextFile = validateLocalFile(replacementInput.files?.[0], "document");
      item._documentFile = nextFile;
      item.querySelector(".document-name").textContent = nextFile.name;
      item.querySelector(".document-icon").textContent = (nextFile.name.split(".").pop() || "FILE").toUpperCase();
    } catch (error) {
      replacementInput.value = "";
      showSnackbar(error.message);
    }
  });

  item.querySelector("[data-remove-document]").addEventListener("click", (event) => {
    event.stopPropagation();
    item.remove();
  });

  return item;
}

function createPhotoItem({ name, url }) {
  const item = document.createElement("div");
  item.className = "photo-item";
  item.innerHTML = `
    <img class="photo-preview-image" src="${escapeHtml(url)}" alt="Загруженное фото" />
    <span class="document-name">${escapeHtml(name || "Фото")}</span>
    <button type="button" class="document-action" data-replace-photo>Заменить</button>
    <button type="button" class="document-action is-danger" data-remove-photo>Удалить</button>
  `;
  return item;
}

function bindPhotoUpload(container, button, initialFileId = 0, initialName = "") {
  button.textContent = "Выбрать из галереи";

  const actions = document.createElement("div");
  actions.className = "photo-upload-actions";
  container.insertBefore(actions, button);
  actions.append(button);

  const cameraButton = document.createElement("button");
  cameraButton.type = "button";
  cameraButton.className = "upload-button";
  cameraButton.textContent = "Сделать фото";
  actions.append(cameraButton);

  if (!container.querySelector(".upload-hint")) {
    const hint = document.createElement("small");
    hint.className = "upload-hint";
    hint.textContent = "JPG, PNG или WEBP · до 10 МБ · галерея или камера";
    container.append(hint);
  }

  const input = document.createElement("input");
  input.type = "file";
  input.accept = PHOTO_ACCEPT;
  input.className = "file-input-hidden";
  input.hidden = true;
  input.setAttribute("aria-hidden", "true");
  input.tabIndex = -1;
  container.append(input);

  const cameraInput = document.createElement("input");
  cameraInput.type = "file";
  cameraInput.accept = "image/*";
  cameraInput.setAttribute("capture", "environment");
  cameraInput.className = "file-input-hidden";
  cameraInput.hidden = true;
  cameraInput.setAttribute("aria-hidden", "true");
  cameraInput.tabIndex = -1;
  container.append(cameraInput);

  const render = ({ file = null, fileId = 0, name = "", url = "" }) => {
    const previous = container.querySelector(".photo-item");
    const previousUrl = previous?.dataset.localUrl || "";

    if (previousUrl) {
      URL.revokeObjectURL(previousUrl);
    }

    previous?.remove();
    container._pendingFile = file;
    container.dataset.fileId = fileId ? String(fileId) : "";

    if (!file && !fileId) {
      actions.classList.remove("is-hidden");
      return;
    }

    const previewUrl = url || (file ? URL.createObjectURL(file) : getFileUrl(fileId));
    const item = createPhotoItem({ name: name || file?.name || "Фото", url: previewUrl });

    if (file && previewUrl) {
      item.dataset.localUrl = previewUrl;
    }

    item.querySelector("[data-replace-photo]").addEventListener("click", () => input.click());
    item.querySelector("[data-remove-photo]").addEventListener("click", () => {
      input.value = "";
      cameraInput.value = "";
      render({});
    });
    container.prepend(item);
    actions.classList.add("is-hidden");
  };

  button.addEventListener("click", () => input.click());
  cameraButton.addEventListener("click", () => cameraInput.click());

  const handlePhotoChange = (sourceInput) => {
    try {
      const file = validateLocalFile(sourceInput.files?.[0], "photo");
      render({ file, name: file.name });
    } catch (error) {
      sourceInput.value = "";
      showSnackbar(error.message);
    }
  };

  input.addEventListener("change", () => handlePhotoChange(input));
  cameraInput.addEventListener("change", () => handlePhotoChange(cameraInput));

  if (initialFileId) {
    render({ fileId: initialFileId, name: initialName || "Фото огнетушителя" });
  }

  container._renderPhoto = render;
  return container;
}

async function uploadPendingPhoto(container, objectId) {
  if (!container?._pendingFile) {
    return Number(container?.dataset.fileId || 0);
  }

  const uploaded = await uploadRealFile(container._pendingFile, { kind: "photo", objectId });
  container._renderPhoto({ fileId: uploaded.id, name: uploaded.name, url: getFileUrl(uploaded.id) });
  return Number(uploaded.id);
}

async function uploadPendingInspectionPhotos(objectId) {
  const cards = Array.from(inspectionList.querySelectorAll(".inspection-card"));

  for (const card of cards) {
    const container = card.querySelector(".photo-upload");

    if (container) {
      card.dataset.photoFileId = String(await uploadPendingPhoto(container, objectId) || "");
    }
  }
}

function bindContractorPhotoUpload(button, data = {}) {
  const container = button.parentElement;
  bindPhotoUpload(container, button, data.photoFileId || data.photo_file_id || 0, data.photoName || "Фото огнетушителя");
}

function bindDecommissionButton(button) {
  button.addEventListener("click", () => {
    showDecommissionModal(button);
  });
}

function saveInspectionFormState(form) {
  form.querySelectorAll("input, textarea").forEach((input) => {
    if (input.type === "file") {
      return;
    }

    if (input.type === "checkbox") {
      input.defaultChecked = input.checked;
      return;
    }
    input.defaultValue = input.value;
  });

  form.querySelectorAll("select").forEach((select) => {
    Array.from(select.options).forEach((option) => {
      option.defaultSelected = option.selected;
    });
  });
}

function resetInspectionFormState(form) {
  form.querySelectorAll("input, textarea").forEach((input) => {
    if (input.type === "file") {
      return;
    }

    if (input.type === "checkbox") {
      input.checked = input.defaultChecked;
      return;
    }
    input.value = input.defaultValue;
  });

  form.querySelectorAll("select").forEach((select) => {
    const savedIndex = Array.from(select.options).findIndex((option) => option.defaultSelected);
    select.selectedIndex = savedIndex >= 0 ? savedIndex : 0;
  });
}

async function saveCurrentContractorInspectionDraft() {
  const objectId = appState.contractor.currentObjectId;

  if (!objectId) {
    return;
  }

  await uploadPendingInspectionPhotos(objectId);
  const items = collectContractorInspectionItems();
  appState.contractor.inspectionDrafts[objectId] = {
    items,
    inspectionType: inspectionTypeSelect.value,
  };

  await apiRequest("/contractor/inspection-draft.php", {
    method: "POST",
    body: JSON.stringify({
      objectId,
      employeeName: inspectionEmployeeSelect.value,
      inspectionType: inspectionTypeSelect.value,
      items,
    }),
  });
}

function applyContractorInspectionDraft(objectId) {
  const draft = appState.contractor.inspectionDrafts[objectId];

  if (!draft || !appState.contractor.currentObject) {
    return;
  }

  const items = Array.isArray(draft) ? draft : draft.items || [];
  inspectionTypeSelect.value = Array.isArray(draft) ? "Ежеквартальная" : draft.inspectionType || "Ежеквартальная";

  appState.contractor.currentObject.extinguishers = items.map((item) => ({
    id: item.id,
    room_id: item.roomId,
    number: item.number,
    room_name: item.place,
    exact_place: item.exactPlace || item.exact_place || "",
    name: item.name,
    typeMark: item.typeMark || item.name,
    status: item.decommissioned ? "decommissioned" : item.result === "Требует ремонта" || item.result === "Требуется замена" ? "broken" : item.result === "Требует перезарядки" ? "needs_check" : "ok",
    placementDate: item.placementDate,
    manufacturer: item.manufacturer,
    releaseDate: item.releaseDate,
    manufactureDate: item.manufactureDate || item.releaseDate,
    factoryNumber: item.factoryNumber,
    assignedNumber: item.assignedNumber,
    nextRechargeDate: item.nextRechargeDate,
    serviceLife: item.serviceLife,
    responsiblePerson: item.responsiblePerson,
    photoFileId: item.photoFileId || item.photo_file_id || "",
    nextTestDate: item.nextTestDate,
    rechargeDate: item.rechargeDate,
    otvMark: item.otvMark,
    postRechargeResult: item.postRechargeResult,
    comment: item.comment,
    mass: item.mass,
    checkType: item.checkType,
    workTypes: getInspectionWorkTypes(item),
    result: item.result,
    checked: Boolean(item.checked),
    decommissioned: item.decommissioned,
  }));
}

function bindInspectionEditButtons(card) {
  const form = card.querySelector(".inspection-form");
  const saveButton = card.querySelector("[data-save-inspection-changes]");
  const cancelButton = card.querySelector("[data-cancel-inspection-changes]");

  saveButton.addEventListener("click", async () => {
    const validationError = getInspectionCardValidationError(card);

    if (validationError) {
      showSnackbar(validationError.message);
      validationError.field.focus();
      return;
    }

    const previousChecked = card.dataset.checked === "true";
    card.dataset.checked = "true";
    updateInspectionCardCheckedState(card);
    saveButton.disabled = true;

    try {
      await saveCurrentContractorInspectionDraft();
      saveInspectionFormState(form);
      updateInspectionCardTitle(card);
      card.dataset.savedChecked = "true";
      card.dataset.savedPhotoFileId = card.dataset.photoFileId || "";
      const toggle = card.querySelector(".inspection-card-toggle");
      card.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      form.hidden = true;
      showSnackbar("Изменения сохранены");
    } catch (error) {
      card.dataset.checked = String(previousChecked);
      updateInspectionCardCheckedState(card);
      showSnackbar(error.message);
    } finally {
      saveButton.disabled = false;
    }
  });

  cancelButton.addEventListener("click", () => {
    card.dataset.checked = card.dataset.savedChecked || "false";
    updateInspectionCardCheckedState(card);
    resetInspectionFormState(form);
    updateInspectionRechargeDateVisibility(card);
    updateInspectionCardTitle(card);
    const photoContainer = card.querySelector(".photo-upload");
    const savedPhotoFileId = Number(card.dataset.savedPhotoFileId || 0);

    if (photoContainer?._renderPhoto) {
      photoContainer._renderPhoto(savedPhotoFileId
        ? { fileId: savedPhotoFileId, name: "Фото огнетушителя" }
        : {});
      card.dataset.photoFileId = savedPhotoFileId ? String(savedPhotoFileId) : "";
    }

    showSnackbar("Изменения отменены");
  });
}

function getInspectionCardValidationError(card) {
  const typeMarkField = card.querySelector("[data-inspection-name]");
  const resultField = card.querySelector("[data-inspection-result]");
  [typeMarkField, resultField].forEach((field) => field?.removeAttribute("aria-invalid"));

  if (!typeMarkField?.value.trim()) {
    typeMarkField?.setAttribute("aria-invalid", "true");
    return { field: typeMarkField, message: "Укажите тип и марку огнетушителя" };
  }

  if (!resultField?.value) {
    resultField?.setAttribute("aria-invalid", "true");
    return { field: resultField, message: "Выберите результат проверки" };
  }

  return null;
}

function getSelectOptions(options, selectedValue) {
  return options
    .map((option) => `<option${option === selectedValue ? " selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function formatExtinguisherPlace(extinguisher) {
  return [extinguisher.room_name, extinguisher.floor_name, extinguisher.fire_zone]
    .filter(Boolean)
    .join(", ");
}

function getExtinguisherExactPlace(extinguisher) {
  return extinguisher?.exact_place || extinguisher?.exactPlace || "";
}

function getInspectionItemExactPlace(item) {
  return item?.exact_place || item?.exactPlace || "";
}

function formatExtinguisherFullPlace(extinguisher, separator = "\n") {
  return [formatExtinguisherPlace(extinguisher), getExtinguisherExactPlace(extinguisher)]
    .filter(Boolean)
    .join(separator);
}

function formatInspectionItemFullPlace(item, separator = "\n") {
  return [item?.place || "", getInspectionItemExactPlace(item)]
    .filter(Boolean)
    .join(separator);
}

function getExtinguisherIssueType(extinguisher) {
  const title = String(extinguisher?.latest_issue_title || "").trim();
  return title.replace(/^Огнетушитель\s+№\s*[^:]+:\s*/ui, "");
}

function getExtinguisherStatusText(extinguisherOrStatus) {
  const extinguisher = typeof extinguisherOrStatus === "object" ? extinguisherOrStatus : null;
  const status = extinguisher?.status || extinguisherOrStatus;
  const issueType = extinguisher ? getExtinguisherIssueType(extinguisher) : "";

  if (issueType) {
    return issueType;
  }

  if (status === "broken") {
    return "Неисправен";
  }

  if (status === "decommissioned") {
    return "Снят с эксплуатации";
  }

  if (status === "needs_check") {
    return "Требует проверки";
  }

  return "В норме";
}

function getExtinguisherTypeMark(extinguisher) {
  return extinguisher.type_mark || extinguisher.typeMark || extinguisher.name || "";
}

function getExtinguisherManufactureDate(extinguisher) {
  return extinguisher.manufacture_date || extinguisher.manufactureDate || extinguisher.release_date || extinguisher.releaseDate || "";
}

function getExtinguisherNumber(extinguisher) {
  return extinguisher.assigned_number || extinguisher.assignedNumber || extinguisher.number || "";
}

function formatExtinguisherTitle(extinguisher) {
  const number = getExtinguisherNumber(extinguisher) || "без номера";
  const typeMark = getExtinguisherTypeMark(extinguisher);
  return [`Огнетушитель № ${number}`, typeMark].filter(Boolean).join(" · ");
}

function parseEventDetails(details) {
  if (!details) {
    return {};
  }

  if (typeof details === "object") {
    return details;
  }

  try {
    const parsed = JSON.parse(details);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function eventTimestamp(value) {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(String(value).replace(" ", "T")).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function matchesExtinguisherHistoryItem(extinguisher, item) {
  const extinguisherId = String(extinguisher.id || "");
  const itemExtinguisherId = String(item.extinguisher_id || item.extinguisherId || "");
  const extinguisherNumber = getExtinguisherNumber(extinguisher);
  const itemNumber = item.assigned_number || item.assignedNumber || item.number || "";

  return Boolean(
    (extinguisherId && itemExtinguisherId && extinguisherId === itemExtinguisherId)
    || (extinguisherNumber && itemNumber && extinguisherNumber === itemNumber)
  );
}

function getExtinguisherHistory(extinguisher) {
  const source = appState.currentObject || {};
  const history = [];
  const inspectionEventIds = new Set();
  const eventRows = (source.extinguisherEvents || []).filter((event) => {
    const eventExtinguisherId = String(event.extinguisher_id || event.extinguisherId || "");
    return eventExtinguisherId && eventExtinguisherId === String(extinguisher.id || "");
  });

  eventRows.forEach((event) => {
    const details = parseEventDetails(event.details);
    const inspectionId = String(details.inspectionId || "");
    const inspectionLabel = details.checkType || details.inspectionType || "";
    const eventResult = details.result || details.title || formatInspectionItemFullPlace(details, ", ") || "";

    if (inspectionId) {
      inspectionEventIds.add(inspectionId);
    }

    history.push({
      type: event.event_type || "event",
      title: event.title || "Событие",
      at: event.event_at || event.created_at || "",
      actor: event.actor_name || "Не указано",
      actorRole: event.actor_role || "",
      details: [
        inspectionLabel && eventResult ? `${inspectionLabel} · ${eventResult}` : eventResult,
        getInspectionWorkTypes(details).join("; "),
        details.comment || "",
      ].filter(Boolean).join(" · "),
      source: "Журнал событий",
    });
  });

  if (!history.some((event) => event.type === "commissioned")) {
    history.push({
      type: "commissioned",
      title: "Введен в эксплуатацию",
      at: extinguisher.placement_date || extinguisher.created_at || "",
      actor: extinguisher.responsible_person || "Не указано",
      actorRole: "organization",
      details: formatExtinguisherFullPlace(extinguisher, ", ") || "Место не указано",
      source: "Карточка огнетушителя",
    });
  }

  (source.inspections || []).forEach((inspection) => {
    if (inspectionEventIds.has(String(inspection.id || ""))) {
      return;
    }

    (inspection.items || [])
      .filter((item) => matchesExtinguisherHistoryItem(extinguisher, item))
      .forEach((item) => {
        const result = item.result || "Результат не указан";
        let title = "Проверка выполнена";

        if (/замен/ui.test(result)) {
          title = "Отмечен к замене";
        } else if (/ремонт|перезаряд|треб/ui.test(result)) {
          title = "Зафиксировано отклонение";
        }

        history.push({
          type: "inspection",
          title,
          at: inspection.completed_at || inspection.planned_at || inspection.created_at || item.created_at || "",
          actor: inspection.employee_name || inspection.contractor_name || "Не указано",
          actorRole: "contractor",
          details: [`${item.check_type || "Проверка"} · ${result}`, formatInspectionWorkTypes(item), item.comment || ""].filter(Boolean).join(" · "),
          source: getInspectionTitle(inspection),
        });
      });
  });

  (source.issues || [])
    .filter((issue) => String(issue.extinguisher_id || "") === String(extinguisher.id || ""))
    .forEach((issue) => {
      const problemText = String(issue.title || "")
        .replace(/^Огнетушитель\s+№\s*[^:]+:\s*/ui, "")
        .trim()
        .toLocaleLowerCase("ru-RU");
      const issueTime = eventTimestamp(issue.created_at);
      const duplicatesEvent = history.some((event) => {
        if (!["issue", "replacement_required", "decommissioned"].includes(event.type)) {
          return false;
        }

        const eventText = `${event.title || ""} ${event.details || ""}`.toLocaleLowerCase("ru-RU");
        const eventTime = eventTimestamp(event.at);
        return (problemText && eventText.includes(problemText))
          || (issueTime && eventTime && Math.abs(issueTime - eventTime) <= 10000);
      });

      if (duplicatesEvent) {
        return;
      }

      history.push({
        type: "issue",
        title: "Зафиксирована неисправность",
        at: issue.created_at || "",
        actor: "Организация",
        actorRole: "organization",
        details: [issue.title || "", issue.comment || ""].filter(Boolean).join(" · "),
        source: "Неисправность",
      });
    });

  const uniqueHistory = [];
  const seen = new Set();

  history.forEach((event) => {
    const key = [event.type, event.title, event.at, event.actor, event.details].join("|");

    if (!seen.has(key)) {
      seen.add(key);
      uniqueHistory.push(event);
    }
  });

  return uniqueHistory.sort((left, right) => eventTimestamp(right.at) - eventTimestamp(left.at));
}

function getLifecycleEvent(history, matcher) {
  return history.find((event) => matcher(event)) || null;
}

function formatHistoryActor(event) {
  if (!event) {
    return "Нет данных";
  }

  const role = event.actorRole === "contractor" ? "подрядчик" : event.actorRole === "organization" ? "организация" : "";
  return [event.actor || "Не указано", role].filter(Boolean).join(" · ");
}

function getExtinguisherHistoryRows() {
  const extinguisher = appState.currentExtinguisher;

  if (!extinguisher) {
    return [];
  }

  return getExtinguisherHistory(extinguisher).map((event) => ({
    date: formatDateTime(event.at),
    action: event.title,
    actor: formatHistoryActor(event),
    details: event.details || "",
    source: event.source || "",
  }));
}

function renderExtinguisherDetail(extinguisher) {
  const history = getExtinguisherHistory(extinguisher);
  const commissioned = getLifecycleEvent(history, (event) => event.type === "commissioned" || /введен/ui.test(event.title));
  const decommissioned = getLifecycleEvent(history, (event) => event.type === "decommissioned" || /снят/ui.test(event.title));
  const replaced = getLifecycleEvent(history, (event) => event.type === "replaced" || /заменен/ui.test(event.title));
  const replacementRequired = getLifecycleEvent(history, (event) => event.type === "replacement_required" || /замен/ui.test(event.title));
  const place = formatExtinguisherPlace(extinguisher) || "Помещение не указано";
  const exactPlace = getExtinguisherExactPlace(extinguisher);
  const statusText = getExtinguisherStatusText(extinguisher);
  const statusClass = ["broken", "decommissioned"].includes(extinguisher.status) ? " is-dark" : "";
  const historyMarkup = history.length
    ? history.map((event) => `
        <li class="extinguisher-history-item">
          <span class="history-date">${escapeHtml(formatDateTime(event.at))}</span>
          <strong>${escapeHtml(event.title)}</strong>
          <small>${escapeHtml(formatHistoryActor(event))}</small>
          ${event.details ? `<p>${escapeHtml(event.details)}</p>` : ""}
          ${event.source ? `<em>${escapeHtml(event.source)}</em>` : ""}
        </li>
      `).join("")
    : `<li class="extinguisher-history-item is-empty"><strong>История пока пустая</strong><small>События появятся после добавления, проверки или изменения огнетушителя.</small></li>`;

  extinguisherDetailTitle.textContent = formatExtinguisherTitle(extinguisher);
  extinguisherDetailContent.innerHTML = `
    <section class="extinguisher-passport">
      <div class="extinguisher-passport-head">
        <span>Карточка огнетушителя</span>
        <strong class="extinguisher-status${statusClass}">${escapeHtml(statusText)}</strong>
      </div>
      ${extinguisher.photo_file_id || extinguisher.photoFileId ? `<a class="extinguisher-photo" href="${getFileUrl(extinguisher.photo_file_id || extinguisher.photoFileId)}" target="_blank" rel="noopener"><img src="${getFileUrl(extinguisher.photo_file_id || extinguisher.photoFileId)}" alt="Фото огнетушителя № ${escapeHtml(getExtinguisherNumber(extinguisher) || "")}" /></a>` : ""}
      <dl class="extinguisher-passport-grid">
        <div><dt>Номер присвоенный</dt><dd>${escapeHtml(getExtinguisherNumber(extinguisher) || "Не указан")}</dd></div>
        <div><dt>Дата размещения</dt><dd>${escapeHtml(extinguisher.placement_date || "Не указана")}</dd></div>
        <div><dt>Место установки</dt><dd class="extinguisher-place-lines"><span>${escapeHtml(place)}</span>${exactPlace ? `<span>${escapeHtml(exactPlace)}</span>` : ""}</dd></div>
        <div><dt>Тип и марка</dt><dd>${escapeHtml(getExtinguisherTypeMark(extinguisher) || "Не указаны")}</dd></div>
        <div><dt>Завод-изготовитель</dt><dd>${escapeHtml(extinguisher.manufacturer || "Не указан")}</dd></div>
        <div><dt>Заводской номер</dt><dd>${escapeHtml(extinguisher.factory_number || extinguisher.factoryNumber || "Не указан")}</dd></div>
        <div><dt>Дата изготовления</dt><dd>${escapeHtml(getExtinguisherManufactureDate(extinguisher) || "Не указана")}</dd></div>
        <div><dt>Очередная перезарядка</dt><dd>${escapeHtml(extinguisher.next_recharge_date || extinguisher.nextRechargeDate || "Не указана")}</dd></div>
        <div><dt>Срок службы</dt><dd>${escapeHtml(extinguisher.service_life || extinguisher.serviceLife || "Не указан")}</dd></div>
        <div><dt>Ответственное лицо</dt><dd>${escapeHtml(extinguisher.responsible_person || extinguisher.responsiblePerson || "Не указано")}</dd></div>
      </dl>
    </section>

    <section class="lifecycle-grid" aria-label="Жизненный цикл огнетушителя">
      <div>
        <span>Введен в эксплуатацию</span>
        <strong>${escapeHtml(commissioned ? formatDate(commissioned.at) : "Нет данных")}</strong>
        <small>${escapeHtml(formatHistoryActor(commissioned))}</small>
      </div>
      <div>
        <span>Снят с эксплуатации</span>
        <strong>${escapeHtml(decommissioned ? formatDate(decommissioned.at) : "Нет данных")}</strong>
        <small>${escapeHtml(formatHistoryActor(decommissioned))}</small>
      </div>
      <div>
        <span>Заменен</span>
        <strong>${escapeHtml(replaced ? formatDate(replaced.at) : "Нет данных")}</strong>
        <small>${escapeHtml(replaced ? formatHistoryActor(replaced) : replacementRequired ? `Пока только: ${replacementRequired.title}` : "Нет данных")}</small>
      </div>
    </section>

    <section class="extinguisher-history-section">
      <div class="fire-zone-head">
        <h3>История изменений</h3>
        <span>${history.length} событий</span>
      </div>
      <ul class="extinguisher-history-list">${historyMarkup}</ul>
    </section>
  `;
}

function openExtinguisherDetail(extinguisherId) {
  const extinguishers = appState.currentObject?.extinguishers || [];
  const extinguisher = extinguishers.find((item) => String(item.id) === String(extinguisherId));

  if (!extinguisher) {
    showSnackbar("Огнетушитель не найден");
    return;
  }

  appState.currentExtinguisher = extinguisher;
  renderExtinguisherDetail(extinguisher);
  showExtinguisherDetail();
}

function getSafeFileName(value) {
  return String(value || "file")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "file";
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadExtinguisherHistoryExcel() {
  const extinguisher = appState.currentExtinguisher;
  const rows = getExtinguisherHistoryRows();

  if (!extinguisher) {
    showSnackbar("Сначала откройте огнетушитель");
    return;
  }

  const title = `История огнетушителя № ${getExtinguisherNumber(extinguisher) || "без номера"}`;
  const tableRows = rows.length
    ? rows.map((row) => `
        <tr>
          <td>${escapeHtml(row.date)}</td>
          <td>${escapeHtml(row.action)}</td>
          <td>${escapeHtml(row.actor)}</td>
          <td>${escapeHtml(row.details)}</td>
          <td>${escapeHtml(row.source)}</td>
        </tr>
      `).join("")
    : '<tr><td colspan="5">История пока пустая</td></tr>';
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #999; padding: 8px; vertical-align: top; }
          th { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <p>Объект: ${escapeHtml(appState.currentObject?.object?.name || "Не указан")}</p>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Событие</th>
              <th>Кем</th>
              <th>Детали</th>
              <th>Источник</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" });
  downloadBlob(blob, `${getSafeFileName(title)}.xls`);
}

function wrapCanvasText(context, text, maxWidth) {
  const lines = [];

  String(text || "").split(/\r?\n/).forEach((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";

    words.forEach((word) => {
      const nextLine = line ? `${line} ${word}` : word;

      if (context.measureText(nextLine).width <= maxWidth || !line) {
        line = nextLine;
      } else {
        lines.push(line);
        line = word;
      }
    });

    lines.push(line);
  });

  return lines.length ? lines : [""];
}

function buildHistoryPdfCanvases(extinguisher, rows) {
  const width = 1240;
  const height = 1754;
  const margin = 72;
  const canvases = [];
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let y = margin;

  const setupPage = () => {
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#202124";
    context.font = "700 38px Arial";
    context.fillText(`История огнетушителя № ${getExtinguisherNumber(extinguisher) || "без номера"}`, margin, y);
    y += 56;
    context.font = "500 24px Arial";
    context.fillStyle = "#606368";
    context.fillText(`Объект: ${appState.currentObject?.object?.name || "Не указан"}`, margin, y);
    y += 52;
  };

  const newPage = () => {
    canvases.push(canvas);
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    y = margin;
    setupPage();
  };

  setupPage();

  if (!rows.length) {
    rows = [{ date: "Нет данных", action: "История пока пустая", actor: "", details: "", source: "" }];
  }

  rows.forEach((row) => {
    const details = [row.details, row.source].filter(Boolean).join(" · ");
    context.font = "700 25px Arial";
    const actionLines = wrapCanvasText(context, row.action, width - margin * 2 - 220);
    context.font = "500 22px Arial";
    const detailLines = wrapCanvasText(context, details, width - margin * 2 - 220);
    const blockHeight = 42 + actionLines.length * 32 + detailLines.length * 28 + 26;

    if (y + blockHeight > height - margin) {
      newPage();
    }

    context.fillStyle = "#f4f4f6";
    context.fillRect(margin, y, width - margin * 2, blockHeight);
    context.fillStyle = "#8a8d91";
    context.font = "600 20px Arial";
    context.fillText(row.date, margin + 24, y + 34);
    context.fillStyle = "#202124";
    context.font = "700 25px Arial";
    let textY = y + 34;
    actionLines.forEach((line) => {
      context.fillText(line, margin + 220, textY);
      textY += 32;
    });
    context.fillStyle = "#606368";
    context.font = "500 21px Arial";
    context.fillText(row.actor || "Не указано", margin + 220, textY);
    textY += 30;
    detailLines.forEach((line) => {
      context.fillText(line, margin + 220, textY);
      textY += 28;
    });
    y += blockHeight + 18;
  });

  canvases.push(canvas);
  return canvases;
}

function binaryStringToUint8Array(value) {
  const bytes = new Uint8Array(value.length);

  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }

  return bytes;
}

function createPdfFromCanvases(canvases, options = {}) {
  const pageWidth = options.pageWidth || 595;
  const pageHeight = options.pageHeight || 842;
  const objects = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(`<< /Type /Pages /Kids [${canvases.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] /Count ${canvases.length} >>`);

  canvases.forEach((canvas, index) => {
    const pageObjectNumber = 3 + index * 3;
    const imageObjectNumber = pageObjectNumber + 1;
    const contentObjectNumber = pageObjectNumber + 2;
    const imageData = atob(canvas.toDataURL("image/jpeg", 0.92).split(",")[1]);
    const content = `q ${pageWidth} 0 0 ${pageHeight} 0 0 cm /Im${index} Do Q`;

    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im${index} ${imageObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
    objects.push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageData.length} >>\nstream\n${imageData}\nendstream`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  let pdf = "%PDF-1.3\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([binaryStringToUint8Array(pdf)], { type: "application/pdf" });
}

function downloadExtinguisherHistoryPdf() {
  const extinguisher = appState.currentExtinguisher;

  if (!extinguisher) {
    showSnackbar("Сначала откройте огнетушитель");
    return;
  }

  const title = `История огнетушителя № ${getExtinguisherNumber(extinguisher) || "без номера"}`;
  const canvases = buildHistoryPdfCanvases(extinguisher, getExtinguisherHistoryRows());
  const blob = createPdfFromCanvases(canvases);
  downloadBlob(blob, `${getSafeFileName(title)}.pdf`);
}

function getObjectReportSections() {
  const data = appState.currentObject || {};
  const object = data.object || {};
  const extinguishers = data.extinguishers || [];
  const issues = data.issues || [];
  const inspections = data.inspections || [];
  const inspectionItems = inspections.flatMap((inspection) =>
    (inspection.items || []).map((item) => [
      formatDate(inspection.completed_at || inspection.planned_at || inspection.created_at),
      getInspectionTitle(inspection),
      item.number || "",
      formatInspectionItemFullPlace(item),
      formatInspectionWorkTypes(item),
      item.result || "",
      item.comment || "",
      item.next_planned_test_date || "",
      item.recharge_date || "",
      item.next_recharge_date || "",
      item.responsible_person || inspection.employee_name || "",
    ])
  );

  return [
    {
      title: "Объект",
      headers: ["Название", "Адрес", "Организация"],
      rows: [[object.name || "", object.address || "", object.organization_name || ""]],
    },
    {
      title: "Огнетушители",
      headers: ["Номер", "Место", "Тип и марка", "Производитель", "Заводской номер", "Дата изготовления", "Перезарядка", "Состояние", "Ответственный"],
      rows: extinguishers.map((item) => [
        getExtinguisherNumber(item),
        formatExtinguisherFullPlace(item),
        getExtinguisherTypeMark(item),
        item.manufacturer || "",
        item.factory_number || "",
        getExtinguisherManufactureDate(item),
        item.next_recharge_date || "",
        getExtinguisherStatusText(item),
        item.responsible_person || "",
      ]),
    },
    {
      title: "Неисправности",
      headers: ["Дата", "Огнетушитель", "Неисправность", "Комментарий", "Статус"],
      rows: issues.map((issue) => [
        formatDate(issue.created_at),
        issue.extinguisher_number || "",
        issue.title || "",
        issue.comment || "",
        issue.status === "resolved" ? "Устранена" : "Открыта",
      ]),
    },
    {
      title: "Проверки",
      headers: ["Дата", "Тип", "Подрядчик", "Сотрудник", "Огнетушителей"],
      rows: inspections.map((inspection) => [
        formatDate(inspection.completed_at || inspection.planned_at || inspection.created_at),
        getInspectionTitle(inspection),
        inspection.contractor_name || "",
        inspection.employee_name || "",
        (inspection.items || []).length,
      ]),
    },
    {
      title: "Результаты проверок",
      headers: ["Дата", "Проверка", "Номер", "Место", "Выполненные работы", "Результат", "Комментарий", "Следующее испытание", "Перезарядка", "Следующая перезарядка", "Ответственный"],
      rows: inspectionItems,
    },
  ];
}

function downloadObjectReportExcel() {
  const objectName = appState.currentObject?.object?.name || "Объект";
  const sections = getObjectReportSections();
  const body = sections.map((section) => `
    <h2>${escapeHtml(section.title)}</h2>
    <table>
      <thead><tr>${section.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>
        ${(section.rows.length ? section.rows : [["Нет данных"]]).map((row) => `<tr>${row.map((cell, index) => `<td${section.headers[index] === "Выполненные работы" ? ' class="work-types-cell"' : ""}>${escapeHtml(cell).replace(/\r?\n/g, "<br>")}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `).join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{font-family:Arial,sans-serif}table{border-collapse:collapse;width:100%;margin:0 0 24px}
    th,td{border:1px solid #999;padding:8px;vertical-align:top;mso-number-format:"\\@"}th{background:#f2f2f2}
    .work-types-cell{white-space:nowrap}
  </style></head><body><h1>Сводка по объекту: ${escapeHtml(objectName)}</h1>${body}</body></html>`;
  downloadBlob(new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" }), `${getSafeFileName(`Сводка-${objectName}`)}.xls`);
}

function buildObjectReportPdfCanvases() {
  const width = 1240;
  const height = 1754;
  const margin = 64;
  const canvases = [];
  let canvas;
  let context;
  let y;

  const newPage = () => {
    if (canvas) {
      canvases.push(canvas);
    }
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    y = margin;
  };

  const drawLine = (text, font = "500 22px Arial", color = "#202124", indent = 0) => {
    context.font = font;
    context.fillStyle = color;
    const lines = wrapCanvasText(context, text || "—", width - margin * 2 - indent);
    const needed = lines.length * 30 + 8;
    if (y + needed > height - margin) {
      newPage();
    }
    lines.forEach((line) => {
      context.fillText(line, margin + indent, y);
      y += 30;
    });
    y += 8;
  };

  newPage();
  drawLine(`Сводка по объекту: ${appState.currentObject?.object?.name || "Объект"}`, "700 38px Arial");
  drawLine(appState.currentObject?.object?.address || "Адрес не указан", "500 24px Arial", "#606368");
  y += 18;

  getObjectReportSections().slice(1).forEach((section) => {
    drawLine(section.title, "700 30px Arial");
    if (!section.rows.length) {
      drawLine("Нет данных", "500 22px Arial", "#777", 20);
    } else {
      section.rows.forEach((row) => {
        const text = section.headers.map((header, index) => `${header}: ${row[index] || "—"}`).join(" · ");
        drawLine(text, "500 20px Arial", "#202124", 20);
      });
    }
    y += 18;
  });

  canvases.push(canvas);
  return canvases;
}

function downloadObjectReportPdf() {
  const objectName = appState.currentObject?.object?.name || "Объект";
  const blob = createPdfFromCanvases(buildObjectReportPdfCanvases());
  downloadBlob(blob, `${getSafeFileName(`Сводка-${objectName}`)}.pdf`);
}

const INSPECTION_REPORT_COLUMNS = [
  "Номер, марка и место установки огнетушителя",
  "Дата проведения испытания, перезарядки, ремонта; организация, проводившая техобслуживание или ремонт",
  "Выполненные работы",
  "Результаты осмотра и испытания на прочность",
  "Срок следующего планового испытания",
  "Дата проведения перезарядки огнетушителя",
  "Концентрация заряженного ОТВ",
  "Результат осмотра после перезарядки",
  "Дата следующей плановой перезарядки",
  "Должность, фамилия, инициалы и подпись ответственного лица",
];

function getItemValue(item, snakeKey, camelKey) {
  return item?.[snakeKey] || item?.[camelKey] || "";
}

function getInspectionReportTitle(inspection) {
  const objectName = inspection?.object_name || appState.currentObject?.object?.name || appState.contractor.currentObject?.object?.name || "объект";
  const inspectionTitle = getInspectionTitle(inspection || { inspectionType: inspectionTypeSelect?.value });
  return `${inspectionTitle}: ${objectName}`;
}

function getInspectionReportRows(inspection) {
  const items = inspection?.items || [];
  const serviceDate = formatDate(inspection?.completed_at || inspection?.planned_at || inspection?.created_at || new Date().toISOString());
  const serviceOrg = inspection?.contractor_name || appState.contractor.currentObject?.object?.contractor_name || appState.currentUser?.fullName || "Не указано";
  const responsible = inspection?.employee_name || inspectionEmployeeSelect?.value || "";

  return items.map((item) => {
    const number = item.assigned_number || item.assignedNumber || item.number || "";
    const mark = item.name || item.typeMark || item.type_mark || "";
    const serviceText = [serviceDate, serviceOrg].filter(Boolean).join("; ");

    return [
      [[number ? `№ ${number}` : "", mark].filter(Boolean).join(", "), formatInspectionItemFullPlace(item)].filter(Boolean).join("\n") || "Не указано",
      serviceText || "Не указано",
      formatInspectionWorkTypes(item),
      item.result || "Не указано",
      getItemValue(item, "next_planned_test_date", "nextTestDate") || "Не указано",
      getItemValue(item, "recharge_date", "rechargeDate") || "Не указано",
      getItemValue(item, "otv_mark", "otvMark") || "Не указано",
      getItemValue(item, "post_recharge_result", "postRechargeResult") || "Не указано",
      getItemValue(item, "next_recharge_date", "nextRechargeDate") || "Не указано",
      getItemValue(item, "responsible_person", "responsiblePerson") || responsible || "Не указано",
    ];
  });
}

function createCurrentContractorInspectionReport() {
  return {
    title: `${inspectionTypeSelect.value} проверка`,
    contractor_name: appState.contractor.currentObject?.object?.contractor_name || "Подрядчик",
    employee_name: inspectionEmployeeSelect.value,
    completed_at: new Date().toISOString(),
    items: collectContractorInspectionItems(),
  };
}

function getActiveInspectionReport(isContractor = false) {
  return isContractor ? createCurrentContractorInspectionReport() : appState.currentInspection;
}

function ensureInspectionReportRows(inspection) {
  const rows = getInspectionReportRows(inspection);

  if (!rows.length) {
    showSnackbar("В отчете пока нет огнетушителей");
    return null;
  }

  return rows;
}

function downloadInspectionReportExcel(inspection) {
  const rows = ensureInspectionReportRows(inspection);

  if (!rows) {
    return;
  }

  const title = getInspectionReportTitle(inspection);
  const tableRows = rows.map((row) => `
    <tr>${row.map((cell, index) => `<td${index === 2 ? ' class="work-types-cell"' : ""}>${escapeHtml(cell).replace(/\r?\n/g, "<br>")}</td>`).join("")}</tr>
  `).join("");
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #6fc7a3; padding: 8px; vertical-align: top; mso-number-format:"\\@"; }
          th { color: #1b9d6c; font-weight: 700; text-align: center; }
          .work-types-cell { white-space: nowrap; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <table>
          <thead>
            <tr>${INSPECTION_REPORT_COLUMNS.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" });
  downloadBlob(blob, `${getSafeFileName(title)}.xls`);
}

function buildInspectionReportPdfCanvases(inspection, rows) {
  const width = 1940;
  const height = 1240;
  const margin = 44;
  const columns = [135, 245, 250, 190, 155, 170, 175, 170, 170, 190];
  const headerHeight = 190;
  const rowHeight = 190;
  const canvases = [];
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let y = margin;

  const drawPageHead = () => {
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "#202124";
    context.font = "700 32px Arial";
    context.fillText(getInspectionReportTitle(inspection), margin, y);
    y += 54;
  };

  const drawCellText = (text, x, top, cellWidth, font, color = "#202124") => {
    context.font = font;
    context.fillStyle = color;
    const lines = wrapCanvasText(context, text, cellWidth - 16).slice(0, 7);
    let textY = top + 26;
    lines.forEach((line) => {
      context.fillText(line, x + 8, textY);
      textY += 23;
    });
  };

  const drawHeader = () => {
    let x = margin;
    context.strokeStyle = "#65c79e";
    context.lineWidth = 2;
    INSPECTION_REPORT_COLUMNS.forEach((column, index) => {
      context.strokeRect(x, y, columns[index], headerHeight);
      drawCellText(column, x, y + 10, columns[index], "700 22px Arial", "#1b9d6c");
      x += columns[index];
    });
    y += headerHeight;
  };

  const newPage = () => {
    canvases.push(canvas);
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    y = margin;
    drawPageHead();
    drawHeader();
  };

  drawPageHead();
  drawHeader();

  rows.forEach((row) => {
    if (y + rowHeight > height - margin) {
      newPage();
    }

    let x = margin;
    context.strokeStyle = "#65c79e";
    context.lineWidth = 2;
    row.forEach((cell, index) => {
      context.strokeRect(x, y, columns[index], rowHeight);
      drawCellText(cell, x, y, columns[index], "500 20px Arial");
      x += columns[index];
    });
    y += rowHeight;
  });

  canvases.push(canvas);
  return canvases;
}

function downloadInspectionReportPdf(inspection) {
  const rows = ensureInspectionReportRows(inspection);

  if (!rows) {
    return;
  }

  const title = getInspectionReportTitle(inspection);
  const canvases = buildInspectionReportPdfCanvases(inspection, rows);
  const blob = createPdfFromCanvases(canvases, { pageWidth: 842, pageHeight: 595 });
  downloadBlob(blob, `${getSafeFileName(title)}.pdf`);
}

function getInspectionResultByStatus(status) {
  if (status === "broken" || status === "decommissioned") {
    return "Требуется замена";
  }

  if (status === "needs_check") {
    return "Требует перезарядки";
  }

  return "Годный к эксплуатации";
}

function mapExtinguisherToInspection(extinguisher) {
  const manufactureDate = extinguisher.manufacture_date || extinguisher.manufactureDate || extinguisher.release_date || extinguisher.releaseDate || "";
  const typeMark = extinguisher.type_mark || extinguisher.typeMark || extinguisher.name || "";

  return {
    id: extinguisher.id,
    roomId: extinguisher.room_id || "",
    number: extinguisher.number,
    place: formatExtinguisherPlace(extinguisher),
    exactPlace: getExtinguisherExactPlace(extinguisher),
    name: typeMark,
    typeMark,
    placementDate: extinguisher.placement_date || extinguisher.placementDate || "",
    manufacturer: extinguisher.manufacturer || "",
    releaseDate: manufactureDate,
    manufactureDate,
    factoryNumber: extinguisher.factory_number || extinguisher.factoryNumber || "",
    assignedNumber: extinguisher.assigned_number || extinguisher.assignedNumber || extinguisher.number,
    nextRechargeDate: extinguisher.next_recharge_date || extinguisher.nextRechargeDate || "",
    serviceLife: extinguisher.service_life || extinguisher.serviceLife || "",
    responsiblePerson: extinguisher.responsible_person || extinguisher.responsiblePerson || "",
    photoFileId: extinguisher.photo_file_id || extinguisher.photoFileId || "",
    nextTestDate: extinguisher.next_planned_test_date || extinguisher.nextTestDate || "",
    rechargeDate: extinguisher.recharge_date || extinguisher.rechargeDate || "",
    otvMark: extinguisher.otv_mark || extinguisher.otvMark || "",
    postRechargeResult: extinguisher.post_recharge_result || extinguisher.postRechargeResult || "",
    comment: extinguisher.comment || "",
    mass: extinguisher.mass || "",
    checkType: getInspectionType({
      inspectionType: extinguisher.checkType || inspectionTypeSelect?.value,
    }),
    workTypes: getInspectionWorkTypes(extinguisher),
    result: extinguisher.result || "",
    checked: Boolean(extinguisher.checked),
    decommissioned: extinguisher.status === "decommissioned",
  };
}

function renderContractorEmployeeSelect() {
  const currentUserName = appState.currentUser?.fullName || appState.currentUser?.full_name || "";
  const fallbackName = appState.contractor.currentObject?.object?.contractor_name || "Сотрудник подрядчика";
  const options = Array.from(new Set([currentUserName, fallbackName].filter(Boolean)));

  inspectionEmployeeSelect.innerHTML = options
    .map((name) => `<option>${escapeHtml(name)}</option>`)
    .join("");
}

function updateInspectionRechargeDateVisibility(card) {
  const rechargeSelected = Array.from(card.querySelectorAll("[data-inspection-work-type]:checked"))
    .some((input) => input.value === "Перезарядка");
  const field = card.querySelector("[data-inspection-recharge-date-field]");
  const input = card.querySelector("[data-inspection-recharge-date]");

  if (!field || !input) {
    return;
  }

  field.hidden = !rechargeSelected;
  input.disabled = !rechargeSelected;

  if (!rechargeSelected) {
    input.value = "";
  }
}

function updateInspectionCardTitle(card) {
  const title = card.querySelector("[data-inspection-card-title]");
  const assignedNumber = card.querySelector("[data-inspection-assigned-number]")?.value.trim();
  const typeMark = card.querySelector("[data-inspection-name]")?.value.trim();

  if (title) {
    title.textContent = formatExtinguisherTitle({
      number: assignedNumber || card.dataset.number || "",
      typeMark,
    });
  }
}

function updateInspectionCardCheckedState(card) {
  const isChecked = card.dataset.checked === "true";
  const marker = card.querySelector("[data-inspection-card-check]");
  card.classList.toggle("is-checked", isChecked);

  if (marker) {
    marker.hidden = !isChecked;
  }
}

function createContractorInspectionCard(data, isOpen = false) {
  const number = data.number || "001";
  const card = document.createElement("article");
  card.className = `inspection-card${isOpen ? " is-open" : ""}`;
  card.dataset.number = number;
  card.dataset.extinguisherId = data.id || "";
  card.dataset.roomId = data.roomId || "";
  card.dataset.photoFileId = data.photoFileId || data.photo_file_id || "";
  card.dataset.savedPhotoFileId = card.dataset.photoFileId;
  card.dataset.decommissioned = data.decommissioned ? "true" : "false";
  card.dataset.checked = data.checked ? "true" : "false";
  card.dataset.savedChecked = card.dataset.checked;
  const selectedWorkTypes = new Set(getInspectionWorkTypes(data));
  const workTypesMarkup = INSPECTION_WORK_TYPES.map((workType) => `
    <label class="inspection-work-option">
      <input type="checkbox" value="${escapeHtml(workType)}" data-inspection-work-type${selectedWorkTypes.has(workType) ? " checked" : ""} />
      <span>${escapeHtml(workType)}</span>
    </label>
  `).join("");
  card.innerHTML = `
    <button type="button" class="inspection-card-toggle" aria-expanded="${isOpen ? "true" : "false"}">
      <span data-inspection-card-title>${escapeHtml(formatExtinguisherTitle({ number: data.assignedNumber || number, typeMark: data.typeMark || data.name || "" }))}</span>
      <span class="inspection-card-meta">
        <span class="inspection-card-check" data-inspection-card-check aria-label="Проверено"${data.checked ? "" : " hidden"}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10.5 8.3 14 15 6.5" /></svg>
        </span>
        <span class="inspection-card-arrow" aria-hidden="true">›</span>
      </span>
    </button>
    <div class="extinguisher-form inspection-form" ${isOpen ? "" : "hidden"}>
      <label class="inspection-field inspection-field-accent">
        <span>Номер, присвоенный огнетушителю</span>
        <input type="text" value="${escapeHtml(data.assignedNumber || number)}" data-inspection-assigned-number />
      </label>
      <label class="inspection-field">
        <span>Дата размещения огнетушителя на объекте защиты</span>
        <input type="text" value="${escapeHtml(data.placementDate || "")}" data-inspection-placement-date />
      </label>
      <label class="inspection-field">
        <span>Помещение</span>
        <input type="text" value="${escapeHtml(data.place || "")}" data-inspection-place />
      </label>
      <label class="inspection-field">
        <span>Точное место</span>
        <input type="text" value="${escapeHtml(data.exactPlace || data.exact_place || "")}" placeholder="Например: у входа, справа от двери" data-inspection-exact-place />
      </label>
      <label class="inspection-field">
        <span>Тип и марка огнетушителя</span>
        <input type="text" value="${escapeHtml(data.name || "")}" required aria-required="true" data-inspection-name />
      </label>
      <label class="inspection-field">
        <span>Концентрация заряженного ОТВ</span>
        <input type="text" value="${escapeHtml(data.otvMark || "")}" placeholder="Например: порошок ABC" data-inspection-otv-mark />
      </label>
      <label class="inspection-field">
        <span>Завод — изготовитель огнетушителя</span>
        <input type="text" value="${escapeHtml(data.manufacturer || "")}" data-inspection-manufacturer />
      </label>
      <label class="inspection-field">
        <span>Заводской номер</span>
        <input type="text" value="${escapeHtml(data.factoryNumber || "")}" data-inspection-factory-number />
      </label>
      <label class="inspection-field">
        <span>Дата изготовления огнетушителя</span>
        <input type="text" value="${escapeHtml(data.manufactureDate || data.releaseDate || "")}" data-inspection-manufacture-date />
      </label>
      <label class="inspection-field">
        <span>Дата очередной перезарядки огнетушителя</span>
        <input type="text" value="${escapeHtml(data.nextRechargeDate || "")}" data-inspection-next-recharge-date />
      </label>
      <label class="inspection-field">
        <span>Срок службы огнетушителя</span>
        <input type="text" value="${escapeHtml(data.serviceLife || "")}" data-inspection-service-life />
      </label>
      <label class="inspection-field">
        <span>Ответственное лицо и его подпись</span>
        <input type="text" value="${escapeHtml(data.responsiblePerson || "")}" data-inspection-responsible-person />
      </label>
      <label class="inspection-field">
        <span>Внешний вид</span>
        <span class="inspection-hint">Фото огнетушителя</span>
      </label>
      <div class="photo-upload">
        <button type="button" class="upload-button" data-contractor-photo-upload>Загрузить фото</button>
      </div>
      <label class="inspection-field">
        <span>Полная масса (для углекислого огнетушителя)</span>
        <input type="text" value="${escapeHtml(data.mass || "")}" data-inspection-mass />
      </label>
      <fieldset class="inspection-work-types">
        <legend>Выполненные работы</legend>
        <p>Можно выбрать несколько вариантов</p>
        <div class="inspection-work-grid">${workTypesMarkup}</div>
      </fieldset>
      <label class="inspection-field">
        <span>Результат проверки</span>
        <select required aria-required="true" data-inspection-result>
          <option value="" disabled${data.result ? "" : " selected"}>Выберите результат</option>
          ${getSelectOptions(["Годный к эксплуатации", "Требует перезарядки", "Требует ремонта", "Требуется замена"], data.result || "")}
        </select>
      </label>
      <label class="inspection-field">
        <span>Срок следующего планового испытания</span>
        <input type="text" value="${escapeHtml(data.nextTestDate || "")}" placeholder="ДД.ММ.ГГГГ" data-inspection-next-test-date />
      </label>
      <label class="inspection-field" data-inspection-recharge-date-field${selectedWorkTypes.has("Перезарядка") ? "" : " hidden"}>
        <span>Дата проведения перезарядки</span>
        <input type="text" value="${escapeHtml(data.rechargeDate || "")}" placeholder="ДД.ММ.ГГГГ" data-inspection-recharge-date${selectedWorkTypes.has("Перезарядка") ? "" : " disabled"} />
      </label>
      <label class="inspection-field">
        <span>Результат осмотра после перезарядки</span>
        <input type="text" value="${escapeHtml(data.postRechargeResult || "")}" placeholder="Годен к эксплуатации" data-inspection-post-recharge-result />
      </label>
      <label class="inspection-field">
        <span>Комментарий к проверке</span>
        <textarea rows="4" placeholder="Произвольный комментарий, замечания или рекомендации" data-inspection-comment>${escapeHtml(data.comment || "")}</textarea>
      </label>
      <div class="inspection-card-actions">
        <div class="inspection-edit-actions">
          <button type="button" class="primary-button inspection-save-changes" data-save-inspection-changes>Сохранить</button>
          <button type="button" class="secondary-button inspection-cancel-changes" data-cancel-inspection-changes>Отменить</button>
        </div>
        <button type="button" class="decommission-button" data-decommission-extinguisher>Снять с эксплуатации</button>
      </div>
    </div>
  `;

  const toggle = card.querySelector(".inspection-card-toggle");
  const body = card.querySelector(".inspection-form");

  toggle.addEventListener("click", () => {
    const nextState = !card.classList.contains("is-open");
    card.classList.toggle("is-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
    body.hidden = !nextState;
  });

  bindContractorPhotoUpload(card.querySelector("[data-contractor-photo-upload]"), data);
  bindDecommissionButton(card.querySelector("[data-decommission-extinguisher]"));
  bindInspectionEditButtons(card);
  card.querySelectorAll("[data-inspection-work-type]").forEach((input) => {
    input.addEventListener("change", () => updateInspectionRechargeDateVisibility(card));
  });
  card.querySelectorAll("[data-inspection-assigned-number], [data-inspection-name]").forEach((input) => {
    input.addEventListener("input", () => updateInspectionCardTitle(card));
  });
  updateInspectionRechargeDateVisibility(card);
  updateInspectionCardTitle(card);
  updateInspectionCardCheckedState(card);

  return card;
}

function renderContractorInspectionList() {
  inspectionList.innerHTML = "";
  const objectData = appState.contractor.currentObject;
  const extinguishers = (objectData?.extinguishers || []).map(mapExtinguisherToInspection);

  if (!objectData) {
    inspectionList.append(createEmptyState("Объект не выбран", "Выберите объект, чтобы начать проверку."));
    return;
  }

  if (!extinguishers.length) {
    inspectionList.append(createEmptyState("Огнетушителей пока нет", "Добавьте новый огнетушитель и завершите проверку, чтобы ввести его в эксплуатацию."));
    return;
  }

  extinguishers.forEach((extinguisher, index) => {
    inspectionList.append(createContractorInspectionCard(extinguisher, index === 0));
  });
}

function addContractorInspectionCard() {
  contractorExtinguisherCount += 1;
  const details = getAddExtinguisherDetails();
  const number = details.assignedNumber || String(contractorExtinguisherCount).padStart(3, "0");
  const extinguisher = {
    roomId: details.roomId,
    number,
    place: details.place,
    exactPlace: details.exactPlace,
    name: details.name,
    typeMark: details.typeMark,
    placementDate: details.placementDate,
    manufacturer: details.manufacturer,
    releaseDate: details.releaseDate,
    manufactureDate: details.manufactureDate,
    factoryNumber: details.factoryNumber,
    assignedNumber: details.assignedNumber || number,
    nextRechargeDate: details.nextRechargeDate,
    serviceLife: details.serviceLife,
    responsiblePerson: details.responsiblePerson,
    photoFileId: photoUpload.dataset.fileId || "",
    nextTestDate: "",
    rechargeDate: "",
    otvMark: "",
    postRechargeResult: "",
    comment: "",
    mass: details.mass,
    checkType: details.checkType,
    workTypes: [],
    result: "",
  };

  appState.contractor.currentObject = appState.contractor.currentObject || { extinguishers: [] };
  appState.contractor.currentObject.extinguishers = appState.contractor.currentObject.extinguishers || [];
  appState.contractor.currentObject.extinguishers.push(extinguisher);

  inspectionList.querySelector(".empty-state")?.remove();
  const card = createContractorInspectionCard(extinguisher, true);
  inspectionList.append(card);
  saveCurrentContractorInspectionDraft().catch((error) => {
    showSnackbar(error.message);
  });
  addExtinguisherFormFields.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  return card;
}

function collectContractorInspectionItems() {
  return Array.from(inspectionList.querySelectorAll(".inspection-card")).map((card) => {
    const getValue = (selector) => card.querySelector(selector)?.value.trim() || "";
    const number = card.dataset.number || getValue("[data-inspection-assigned-number]");

    return {
      id: card.dataset.extinguisherId || "",
      roomId: card.dataset.roomId || "",
      number,
      place: getValue("[data-inspection-place]"),
      exactPlace: getValue("[data-inspection-exact-place]"),
      name: getValue("[data-inspection-name]"),
      typeMark: getValue("[data-inspection-name]"),
      placementDate: getValue("[data-inspection-placement-date]"),
      manufacturer: getValue("[data-inspection-manufacturer]"),
      releaseDate: getValue("[data-inspection-manufacture-date]"),
      manufactureDate: getValue("[data-inspection-manufacture-date]"),
      factoryNumber: getValue("[data-inspection-factory-number]"),
      assignedNumber: getValue("[data-inspection-assigned-number]") || number,
      nextRechargeDate: getValue("[data-inspection-next-recharge-date]"),
      serviceLife: getValue("[data-inspection-service-life]"),
      responsiblePerson: getValue("[data-inspection-responsible-person]"),
      nextTestDate: getValue("[data-inspection-next-test-date]"),
      rechargeDate: getValue("[data-inspection-recharge-date]"),
      otvMark: getValue("[data-inspection-otv-mark]"),
      postRechargeResult: getValue("[data-inspection-post-recharge-result]"),
      comment: getValue("[data-inspection-comment]"),
      photoFileId: card.dataset.photoFileId || "",
      mass: getValue("[data-inspection-mass]"),
      checkType: inspectionTypeSelect.value,
      workTypes: Array.from(card.querySelectorAll("[data-inspection-work-type]:checked")).map((input) => input.value),
      result: card.querySelector("[data-inspection-result]")?.value || "",
      checked: card.dataset.checked === "true",
      decommissioned: card.dataset.decommissioned === "true",
    };
  });
}

document.querySelectorAll("button[data-client-upload-label]").forEach((button) => {
  const group = button.closest("[data-client-document-group]");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = DOCUMENT_ACCEPT;
  input.className = "file-input-hidden";
  input.hidden = true;
  input.setAttribute("aria-hidden", "true");
  input.tabIndex = -1;
  group.append(input);

  if (!group.querySelector(".upload-hint")) {
    const hint = document.createElement("small");
    hint.className = "upload-hint";
    hint.textContent = "PDF, DOC, DOCX, XLS или XLSX · до 10 МБ";
    group.append(hint);
  }

  button.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    try {
      const file = validateLocalFile(input.files?.[0], "document");
      group.querySelector(".document-grid").append(createDocumentItem(button.dataset.clientUploadLabel || "Документ", file));
      input.value = "";
    } catch (error) {
      input.value = "";
      showSnackbar(error.message);
    }
  });
});

bindPhotoUpload(photoUpload, uploadPhotoButton);
bindPhotoUpload(issuePhotoUpload, uploadIssuePhotoButton);

document.querySelectorAll("[data-contractor-photo-upload]").forEach((button) => {
  bindContractorPhotoUpload(button);
});

document.querySelectorAll("[data-decommission-extinguisher]").forEach((button) => {
  bindDecommissionButton(button);
});

renderContractorInspectionList();

addContractorExtinguisherButton.addEventListener("click", () => {
  openAddExtinguisher("contractorInspection");
});

saveObjectButton.addEventListener("click", async () => {
  const payload = collectObjectFormData();

  if (!payload.name) {
    showSnackbar("Введите название объекта");
    showObjectStep(1);
    return;
  }

  saveObjectButton.disabled = true;

  try {
    await apiRequest("/organization/objects.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    resetObjectForm();
    await loadDashboard();
    await loadObjects();
    showObjects();
    showSnackbar("Объект добавлен");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    saveObjectButton.disabled = false;
  }
});

finishContractorInspectionButton.addEventListener("click", async () => {
  const objectId = appState.contractor.currentObjectId;

  if (!objectId) {
    showSnackbar("Сначала выберите объект");
    return;
  }

  finishContractorInspectionButton.disabled = true;

  try {
    await uploadPendingInspectionPhotos(objectId);
    const items = collectContractorInspectionItems();

    if (!items.length) {
      throw new Error("Добавьте хотя бы один огнетушитель в проверку");
    }

    const isFullyCompleted = items.every((item) => item.checked);

    if (!isFullyCompleted) {
      await saveCurrentContractorInspectionDraft();
      appState.contractor.currentObjectId = null;
      appState.contractor.currentObject = null;
      await loadContractorDashboard();
      showObjects();
      showModal(
        "Проверка завершена не полностью",
        "Не все огнетушители отмечены галочкой. Проверка сохранена со статусом «В работе», выгрузка документов пока недоступна."
      );
      return;
    }

    await apiRequest("/contractor/inspections.php", {
      method: "POST",
      body: JSON.stringify({
        objectId,
        employeeName: inspectionEmployeeSelect.value,
        inspectionType: inspectionTypeSelect.value,
        items,
      }),
    });

    delete appState.contractor.inspectionDrafts[objectId];
    appState.contractor.currentObjectId = null;
    appState.contractor.currentObject = null;
    await loadContractorDashboard();
    showObjects();
    showModal("Проверка завершена", "Результаты сохранены и уже доступны организации в истории проверок объекта.");
  } catch (error) {
    showSnackbar(error.message);
  } finally {
    finishContractorInspectionButton.disabled = false;
  }
});

restoreSession();
