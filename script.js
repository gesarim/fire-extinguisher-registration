const form = document.querySelector("#registrationForm");
const authHeader = document.querySelector("#authHeader");
const authStepper = document.querySelector("#authStepper");
const steps = Array.from(document.querySelectorAll("[data-step]"));
const dots = Array.from(document.querySelectorAll("[data-step-dot]"));
const successState = document.querySelector("#successState");
const dashboardScreen = document.querySelector("#dashboardScreen");
const menuScreen = document.querySelector("#menuScreen");
const accountScreen = document.querySelector("#accountScreen");
const objectsScreen = document.querySelector("#objectsScreen");
const objectSummaryScreen = document.querySelector("#objectSummaryScreen");
const checkDetailScreen = document.querySelector("#checkDetailScreen");
const checkDetailTitle = document.querySelector("#checkDetailTitle");
const checkDetailList = document.querySelector("#checkDetailList");
const downloadReportButton = document.querySelector("#downloadReportButton");
const addExtinguisherScreen = document.querySelector("#addExtinguisherScreen");
const addIssueScreen = document.querySelector("#addIssueScreen");
const contractorObjectSelectScreen = document.querySelector("#contractorObjectSelectScreen");
const contractorEmployeeSelectScreen = document.querySelector("#contractorEmployeeSelectScreen");
const contractorInspectionScreen = document.querySelector("#contractorInspectionScreen");
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
const extinguisherMenuButton = document.querySelector("#extinguisherMenuButton");
const issueMenuButton = document.querySelector("#issueMenuButton");
const contractorObjectSelectMenuButton = document.querySelector("#contractorObjectSelectMenuButton");
const contractorEmployeeSelectMenuButton = document.querySelector("#contractorEmployeeSelectMenuButton");
const contractorInspectionMenuButton = document.querySelector("#contractorInspectionMenuButton");
const summaryBackButton = document.querySelector("#summaryBackButton");
const checkBackButton = document.querySelector("#checkBackButton");
const extinguisherBackButton = document.querySelector("#extinguisherBackButton");
const issueBackButton = document.querySelector("#issueBackButton");
const contractorObjectSelectBackButton = document.querySelector("#contractorObjectSelectBackButton");
const contractorEmployeeSelectBackButton = document.querySelector("#contractorEmployeeSelectBackButton");
const contractorInspectionBackButton = document.querySelector("#contractorInspectionBackButton");
const closeMenuButton = document.querySelector("#closeMenuButton");
const logoutButton = document.querySelector("#logoutButton");
const addObjectButton = document.querySelector("#addObjectButton");
const startInspectionButton = document.querySelector("#startInspectionButton");
const addObjectFromObjectsButton = document.querySelector("#addObjectFromObjectsButton");
const saveObjectButton = document.querySelector("#saveObjectButton");
const requestInspectionButton = document.querySelector("#requestInspectionButton");
const addExtinguisherButton = document.querySelector("#addExtinguisherButton");
const saveExtinguisherButton = document.querySelector("#saveExtinguisherButton");
const addIssueButton = document.querySelector("#addIssueButton");
const saveIssueButton = document.querySelector("#saveIssueButton");
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
const photoUpload = document.querySelector("#photoUpload");
const uploadPhotoButton = document.querySelector("#uploadPhotoButton");
const addExtinguisherFormFields = document.querySelector("#addExtinguisherFormFields");
const newExtinguisherNumber = document.querySelector("#newExtinguisherNumber");
const issuePhotoUpload = document.querySelector("#issuePhotoUpload");
const uploadIssuePhotoButton = document.querySelector("#uploadIssuePhotoButton");
const roomsList = document.querySelector("#roomsList");
const inspectionList = document.querySelector("#inspectionList");
const accountDocuments = document.querySelector(".account-documents");
const employeeList = document.querySelector("#employeeList");
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
const accountTypeInputs = Array.from(document.querySelectorAll("input[name='accountType']"));
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
const organizationObjectsAction = document.querySelector("[data-organization-objects-action]");
const accountLinkTitle = document.querySelector("[data-account-link-title]");
const accountLinkButton = document.querySelector("[data-account-link-button]");
const accountDocumentsSection = document.querySelector("[data-account-documents-section]");
const clientList = document.querySelector("#clientList");
const clientForm = document.querySelector("#clientForm");
const clientName = document.querySelector("#clientName");
const saveClientButton = document.querySelector("#saveClientButton");
const cancelClientButton = document.querySelector("#cancelClientButton");

const useMockFlow = true;
let currentStep = 1;
let currentObjectStep = 1;
let roomCount = 0;
let authMode = "registration";
let menuReturnView = "dashboard";
let snackbarTimer;
let summaryReturnTab = "structure";
let addExtinguisherReturnTarget = "summary";
let inspectionEmployeeNextTarget = "objectSelect";
let employeeCount = 0;
let clientCount = 0;
let accountDocumentReplaceCount = 0;
let pendingDecommissionButton = null;
let contractorExtinguisherCount = 10;

const checkDetails = {
  inspection: {
    title: "Проверка 22.12.26",
    rows: [
      "Отсутствует огнетушитель в здании 1 в секции 2",
      "Отсутствует огнетушитель в здании 1 в секции 2",
      "Отсутствует огнетушитель в здании 1 в секции 2",
    ],
    showReport: true,
  },
  decommission: {
    title: "Снятие огнетушителя с эксплуатации",
    rows: [
      "Снято: Огнетушитель ОП-4, N ПБ-002",
      "Причина: требуется замена",
      "Заменено на: Огнетушитель ОУ-5, N ПБ-003",
      "Выполнил: Иванов Иван Иванович",
    ],
    showReport: true,
  },
  addition: {
    title: "Добавление нового огнетушителя",
    rows: [
      "Добавлено: Огнетушитель ОУ-5, N ПБ-003",
      "Вместо: Огнетушитель ОП-4, N ПБ-002",
      "Место установки: здание 1, этаж 2, помещение 204",
      "Выполнил: Иванов Иван Иванович",
    ],
    showReport: true,
  },
};

const contractorExtinguishers = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(3, "0");
  const isEven = index % 2 === 1;

  return {
    number,
    place: `Здание 1, этаж ${index + 1}, зона ПБ ${index + 1}`,
    name: isEven ? "ОП-4" : "ОУ-5",
    manufacturer: isEven ? "ООО «Пожтехника-Сервис»" : "ООО «Пожтехника»",
    releaseDate: isEven ? "20.05.2023" : "12.03.2024",
    factoryNumber: `А-${12994 + index}`,
    assignedNumber: `ПБ-${number}`,
    mass: isEven ? "8,1 кг" : "8,4 кг",
    checkType: isEven ? "Внеплановая" : "Плановая",
    result: isEven ? "Требуется замена" : "Годный к эксплуатации",
  };
});

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

function syncDashboardMode() {
  const isContractor = getAccountType() === "contractor";

  dashboardScreen.classList.toggle("is-contractor", isContractor);
  organizationDashboard.classList.toggle("is-hidden", isContractor);
  organizationDashboardAction.classList.toggle("is-hidden", isContractor);
  organizationLogo.classList.remove("is-hidden");
  contractorDashboard.classList.toggle("is-hidden", !isContractor);
  contractorDashboardAction.classList.toggle("is-hidden", !isContractor);
  dashboardTitleLabel.classList.toggle("is-hidden", isContractor);
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
  clientForm.classList.add("is-hidden");
  accountLinkButton.classList.remove("is-hidden");
}

function syncFormMode() {
  const isLogin = authMode === "login";
  const isOrganization = getAccountType() === "organization";
  const totalSteps = getTotalSteps();

  pageTitle.textContent = isLogin ? "Вход" : "Регистрация";
  subtitle.textContent = isLogin
    ? "Введите email, мы отправим на него письмо с кодом проверки."
    : "Создайте профиль для работы с проверками и обслуживанием.";
  stepOneTitle.textContent = isLogin ? "Войти в аккаунт" : "Выберите роль";
  stepTwoTitle.textContent = isLogin ? "Email для входа" : isOrganization ? "Данные компании" : "Данные подрядчика";
  stepTwoHelper.textContent = isLogin
    ? "На этот адрес придет одноразовый код."
    : isOrganization
      ? "Заполните данные организации и представителя."
      : "Для подрядчика достаточно email и ФИО.";
  emailStepButton.textContent = isLogin ? "Отправить код" : "Получить код";

  organizationOnlyFields.forEach((element) => {
    element.classList.toggle("is-hidden", isLogin || !isOrganization);
    element.querySelectorAll("input, select").forEach((input) => {
      input.required = !useMockFlow && !isLogin && isOrganization;
    });
  });

  registrationOnlyFields.forEach((element) => {
    element.classList.toggle("is-hidden", isLogin);
    element.querySelectorAll("input, select").forEach((input) => {
      input.required = !useMockFlow && !isLogin;
    });
  });

  document.querySelector("#email").required = !useMockFlow;

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-hidden", index >= totalSteps);
  });

  const stepCounts = Array.from(document.querySelectorAll(".step-count"));
  stepCounts[0].textContent = `Шаг 1 из ${totalSteps}`;
  stepCounts[1].textContent = `Шаг ${isLogin ? 1 : 2} из ${totalSteps}`;
  stepCounts[2].textContent = `Шаг ${totalSteps} из ${totalSteps}`;
}

function validateStepTwo() {
  const visibleInputs = steps[1].querySelectorAll("input[required]");
  return Array.from(visibleInputs).every((input) => input.reportValidity());
}

function getCode() {
  return codeInputs.map((input) => input.value).join("");
}

function setCodeError(isVisible) {
  codeError.classList.toggle("is-visible", isVisible);
  codeGrid.classList.toggle("has-error", isVisible);
}

function showDashboard() {
  syncDashboardMode();
  steps.forEach((section) => section.classList.remove("is-active"));
  successState.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
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
  authHeader.classList.add("is-hidden");
  authStepper.classList.add("is-hidden");
  form.classList.add("is-hidden");
  dashboardScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");
}

function showObjectStep(step) {
  currentObjectStep = step;
  dashboardScreen.classList.remove("is-active");
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
  objectFlow.classList.add("is-active");
  objectStepLabel.textContent = `Шаг ${step} из 3`;

  objectSteps.forEach((section) => {
    section.classList.toggle("is-active", Number(section.dataset.objectStep) === step);
  });
  menuButton.setAttribute("aria-expanded", "false");
}

function showMenu(returnView = "dashboard") {
  menuReturnView = returnView;
  dashboardScreen.classList.remove("is-active");
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

  if (menuReturnView === "account") {
    showAccount();
    return;
  }

  if (menuReturnView === "summary") {
    showObjectSummary();
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
  syncObjectsMode();
  dashboardScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectsScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");
}

function showAccount() {
  syncAccountMode();
  dashboardScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  accountScreen.classList.add("is-active");
  menuButton.setAttribute("aria-expanded", "false");
}

function showObjectSummary() {
  dashboardScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  objectSummaryScreen.classList.add("is-active");
}

function setCheckDetail(type = "inspection") {
  const detail = checkDetails[type] || checkDetails.inspection;
  checkDetailTitle.textContent = detail.title;
  checkDetailList.innerHTML = detail.rows.map((row) => `<li>${escapeHtml(row)}</li>`).join("");
  downloadReportButton.classList.toggle("is-hidden", !detail.showReport);
}

function showCheckDetail(type = "inspection") {
  setCheckDetail(type);
  dashboardScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
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
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
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
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
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
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.add("is-active");
}

function showContractorEmployeeSelect(nextTarget = "objectSelect") {
  inspectionEmployeeNextTarget = nextTarget;
  dashboardScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
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
  menuScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  objectFlow.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
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
  showAddExtinguisher();
}

function openAddIssue() {
  summaryReturnTab = getActiveSummaryTab();
  showAddIssue();
}

function returnToSummaryWithSnackbar(message) {
  showObjectSummary();
  setSummaryTab(summaryReturnTab);
  showSnackbar(message);
}

function returnFromAddExtinguisher(message) {
  if (addExtinguisherReturnTarget === "contractorInspection") {
    addContractorInspectionCard();
    showContractorInspection();
    showSnackbar(message);
    return;
  }

  returnToSummaryWithSnackbar(message);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
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

function createRoomBlock(number) {
  const block = document.createElement("div");
  block.className = "room-block";
  block.innerHTML = `
    <p class="room-title">Помещение ${number}</p>
    <div class="object-fields">
      <input type="text" placeholder="Название помещение" aria-label="Название помещение ${number}" />
      <input type="text" placeholder="Этаж" aria-label="Этаж помещения ${number}" />
      <input type="text" placeholder="Место расположения огнетушителей" aria-label="Место расположения огнетушителей ${number}" />
      <input type="text" placeholder="Количество огнетушителей" aria-label="Количество огнетушителей ${number}" />
    </div>
  `;

  return block;
}

function createEmployeeCard(name, email) {
  const card = document.createElement("div");
  card.className = "employee-card";
  card.innerHTML = `
    <span class="employee-info">
      <strong>${name}</strong>
      <span>${email}</span>
    </span>
    <button type="button" class="document-action is-danger" data-remove-employee>Удалить</button>
  `;

  card.querySelector("[data-remove-employee]").addEventListener("click", () => {
    card.remove();
  });

  return card;
}

function resetClientForm() {
  clientName.value = "";
  clientForm.querySelectorAll(".document-grid").forEach((grid) => {
    grid.innerHTML = "";
  });
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
  button.addEventListener("click", () => {
    if (!useMockFlow && currentStep === 2 && !validateStepTwo()) {
      return;
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

loginEntryButton.addEventListener("click", () => {
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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!useMockFlow && getCode().length !== codeInputs.length) {
    setCodeError(true);
    codeInputs.find((input) => !input.value)?.focus();
    return;
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
  objectFlow.classList.remove("is-active");
  objectsScreen.classList.remove("is-active");
  accountScreen.classList.remove("is-active");
  objectSummaryScreen.classList.remove("is-active");
  checkDetailScreen.classList.remove("is-active");
  addExtinguisherScreen.classList.remove("is-active");
  addIssueScreen.classList.remove("is-active");
  contractorObjectSelectScreen.classList.remove("is-active");
  contractorEmployeeSelectScreen.classList.remove("is-active");
  contractorInspectionScreen.classList.remove("is-active");
  menuScreen.classList.remove("is-active");
  showStep(1);
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

summaryMenuButton.addEventListener("click", () => {
  showMenu("summary");
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

summaryBackButton.addEventListener("click", () => {
  showObjects();
});

checkBackButton.addEventListener("click", () => {
  showObjectSummary();
  setSummaryTab("checks");
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

document.querySelector("[data-menu-dashboard]").addEventListener("click", () => {
  showDashboard();
});

document.querySelector("[data-menu-objects]").addEventListener("click", () => {
  showObjects();
});

document.querySelector("[data-menu-account]").addEventListener("click", () => {
  showAccount();
});

accountLinkButton.addEventListener("click", () => {
  if (getAccountType() !== "contractor") {
    showSnackbar("Приглашение подрядчика отправлено");
    return;
  }

  clientForm.classList.remove("is-hidden");
  accountLinkButton.classList.add("is-hidden");
});

cancelClientButton.addEventListener("click", () => {
  resetClientForm();
  clientForm.classList.add("is-hidden");
  accountLinkButton.classList.remove("is-hidden");
});

saveClientButton.addEventListener("click", () => {
  clientCount += 1;
  const name = clientName.value.trim() || `Клиент ${clientCount}`;
  const documents = Array.from(clientForm.querySelectorAll(".document-name")).map((documentName) => documentName.textContent);
  clientList.append(createClientCard(name, documents));
  resetClientForm();
  clientForm.classList.add("is-hidden");
  accountLinkButton.classList.remove("is-hidden");
  showSnackbar("Клиент добавлен");
});

showEmployeeFormButton.addEventListener("click", () => {
  employeeForm.classList.remove("is-hidden");
  showEmployeeFormButton.classList.add("is-hidden");
});

cancelEmployeeButton.addEventListener("click", () => {
  employeeForm.classList.add("is-hidden");
  showEmployeeFormButton.classList.remove("is-hidden");
});

saveEmployeeButton.addEventListener("click", () => {
  employeeCount += 1;
  const name = employeeName.value.trim() || `Сотрудник ${employeeCount}`;
  const email = employeeEmail.value.trim() || `employee${employeeCount}@company.ru`;
  employeeList.append(createEmployeeCard(name, email));
  employeeName.value = "";
  employeeEmail.value = "";
  employeeForm.classList.add("is-hidden");
  showEmployeeFormButton.classList.remove("is-hidden");
});

accountDocuments.addEventListener("click", (event) => {
  const documentItem = event.target.closest(".document-item");

  if (!documentItem) {
    return;
  }

  if (event.target.matches("[data-account-remove-document]")) {
    documentItem.remove();
    showSnackbar("Документ удален");
    return;
  }

  if (event.target.matches("[data-account-replace-document]")) {
    accountDocumentReplaceCount += 1;
    const documentName = documentItem.querySelector(".document-name");
    const baseName = documentName.textContent.replace(/\.pdf$/i, "").replace(/\s\(заменен \d+\)$/i, "");
    documentName.textContent = `${baseName} (заменен ${accountDocumentReplaceCount}).pdf`;
    showSnackbar("Документ заменен");
  }
});

logoutButton.addEventListener("click", () => {
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

continueInspectionEmployeeButton.addEventListener("click", () => {
  if (inspectionEmployeeNextTarget === "inspection") {
    showContractorInspection();
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

requestInspectionButton.addEventListener("click", () => {
  showInspectionModal();
});

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
    pendingDecommissionButton.closest(".inspection-card")?.remove();
  }

  hideDecommissionModal();
  showSnackbar("Огнетушитель снят с эксплуатации");
  pendingDecommissionButton = null;
});

addExtinguisherButton.addEventListener("click", () => {
  openAddExtinguisher();
});

saveExtinguisherButton.addEventListener("click", () => {
  returnFromAddExtinguisher("Огнетушитель добавлен");
});

addIssueButton.addEventListener("click", () => {
  openAddIssue();
});

saveIssueButton.addEventListener("click", () => {
  returnToSummaryWithSnackbar("Неисправность зафиксирована");
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

let documentUploadCount = 0;

function createDocumentItem(label) {
  documentUploadCount += 1;
  const fileName = `${label} ${documentUploadCount}.pdf`;
  const item = document.createElement("div");
  item.className = "document-item";
  item.innerHTML = `
    <span class="document-icon">PDF</span>
    <span class="document-name">${fileName}</span>
    <button type="button" class="document-action" data-replace-document>Заменить</button>
    <button type="button" class="document-action is-danger" data-remove-document>Удалить</button>
  `;

  item.querySelector("[data-replace-document]").addEventListener("click", (event) => {
    event.stopPropagation();
    item.querySelector(".document-name").textContent = `${label} ${documentUploadCount + 1}.pdf`;
    documentUploadCount += 1;
  });

  item.querySelector("[data-remove-document]").addEventListener("click", (event) => {
    event.stopPropagation();
    item.remove();
  });

  return item;
}

function createPhotoItem(uploadButton) {
  const item = document.createElement("div");
  item.className = "photo-item";
  item.innerHTML = `
    <span class="photo-preview">Фото</span>
    <span class="document-name">Фото огнетушителя.jpg</span>
    <button type="button" class="document-action" data-replace-photo>Заменить</button>
    <button type="button" class="document-action is-danger" data-remove-photo>Удалить</button>
  `;

  item.querySelector("[data-replace-photo]").addEventListener("click", () => {
    item.querySelector(".document-name").textContent = "Новое фото огнетушителя.jpg";
  });

  item.querySelector("[data-remove-photo]").addEventListener("click", () => {
    item.remove();
    uploadButton.classList.remove("is-hidden");
  });

  return item;
}

function bindContractorPhotoUpload(button) {
  button.addEventListener("click", () => {
    button.parentElement.prepend(createPhotoItem(button));
    button.classList.add("is-hidden");
  });
}

function bindDecommissionButton(button) {
  button.addEventListener("click", () => {
    showDecommissionModal(button);
  });
}

function saveInspectionFormState(form) {
  form.querySelectorAll("input").forEach((input) => {
    input.defaultValue = input.value;
  });

  form.querySelectorAll("select").forEach((select) => {
    Array.from(select.options).forEach((option) => {
      option.defaultSelected = option.selected;
    });
  });
}

function resetInspectionFormState(form) {
  form.querySelectorAll("input").forEach((input) => {
    input.value = input.defaultValue;
  });

  form.querySelectorAll("select").forEach((select) => {
    const savedIndex = Array.from(select.options).findIndex((option) => option.defaultSelected);
    select.selectedIndex = savedIndex >= 0 ? savedIndex : 0;
  });
}

function bindInspectionEditButtons(card) {
  const form = card.querySelector(".inspection-form");
  const saveButton = card.querySelector("[data-save-inspection-changes]");
  const cancelButton = card.querySelector("[data-cancel-inspection-changes]");

  saveButton.addEventListener("click", () => {
    saveInspectionFormState(form);
    showSnackbar("Изменения сохранены");
  });

  cancelButton.addEventListener("click", () => {
    resetInspectionFormState(form);
    showSnackbar("Изменения отменены");
  });
}

function getSelectOptions(options, selectedValue) {
  return options
    .map((option) => `<option${option === selectedValue ? " selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function createContractorInspectionCard(data, isOpen = false) {
  const number = data.number || "001";
  const card = document.createElement("article");
  card.className = `inspection-card${isOpen ? " is-open" : ""}`;
  card.innerHTML = `
    <button type="button" class="inspection-card-toggle" aria-expanded="${isOpen ? "true" : "false"}">
      <span>Огнетушитель № ${escapeHtml(number)}</span>
      <span class="inspection-card-arrow" aria-hidden="true">›</span>
    </button>
    <div class="extinguisher-form inspection-form" ${isOpen ? "" : "hidden"}>
      <label class="inspection-field">
        <span>Место установки</span>
        <input type="text" value="${escapeHtml(data.place || "")}" />
      </label>
      <label class="inspection-field inspection-field-accent">
        <span>Наименование огнетушителя</span>
        <input type="text" value="${escapeHtml(data.name || "")}" />
      </label>
      <label class="inspection-field">
        <span>Наименование производителя</span>
        <input type="text" value="${escapeHtml(data.manufacturer || "")}" />
      </label>
      <label class="inspection-field">
        <span>Дата выпуска</span>
        <input type="text" value="${escapeHtml(data.releaseDate || "")}" />
      </label>
      <label class="inspection-field">
        <span>Номер заводской</span>
        <input type="text" value="${escapeHtml(data.factoryNumber || "")}" />
      </label>
      <label class="inspection-field">
        <span>Номер присвоенный (эксплуатационный номер)</span>
        <input type="text" value="${escapeHtml(data.assignedNumber || number)}" />
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
        <input type="text" value="${escapeHtml(data.mass || "")}" />
      </label>
      <label class="inspection-field">
        <span>Вид проверки</span>
        <select>
          ${getSelectOptions(["Первичная", "Плановая", "Внеплановая"], data.checkType || "Плановая")}
        </select>
      </label>
      <label class="inspection-field">
        <span>Результат проверки</span>
        <select>
          ${getSelectOptions(["Годный к эксплуатации", "Требует перезарядки", "Требует ремонта", "Требуется замена"], data.result || "Годный к эксплуатации")}
        </select>
      </label>
      <div class="inspection-edit-actions">
        <button type="button" class="primary-button inspection-save-changes" data-save-inspection-changes>Сохранить изменения</button>
        <button type="button" class="secondary-button inspection-cancel-changes" data-cancel-inspection-changes>Отменить изменения</button>
      </div>
      <button type="button" class="secondary-button decommission-button" data-decommission-extinguisher>Снять с эксплуатации</button>
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

  bindContractorPhotoUpload(card.querySelector("[data-contractor-photo-upload]"));
  bindDecommissionButton(card.querySelector("[data-decommission-extinguisher]"));
  bindInspectionEditButtons(card);

  return card;
}

function renderContractorInspectionList() {
  inspectionList.innerHTML = "";
  contractorExtinguishers.forEach((extinguisher) => {
    inspectionList.append(createContractorInspectionCard(extinguisher));
  });
}

function addContractorInspectionCard() {
  contractorExtinguisherCount += 1;
  const number = newExtinguisherNumber.value.trim() || String(contractorExtinguisherCount).padStart(3, "0");
  const extinguisher = {
    number,
    assignedNumber: `ПБ-${number}`,
    checkType: "Плановая",
    result: "Годный к эксплуатации",
  };
  contractorExtinguishers.push(extinguisher);
  inspectionList.append(createContractorInspectionCard(extinguisher, true));
  addExtinguisherFormFields.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}

document.querySelectorAll("button[data-upload-label]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const group = button.closest("[data-document-group]");
    const grid = group.querySelector(".document-grid");
    grid.append(createDocumentItem(button.dataset.uploadLabel || "Документ"));
  });
});

document.querySelectorAll("button[data-client-upload-label]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest("[data-client-document-group]");
    const grid = group.querySelector(".document-grid");
    grid.append(createDocumentItem(button.dataset.clientUploadLabel || "Документ"));
  });
});

uploadPhotoButton.addEventListener("click", () => {
  photoUpload.prepend(createPhotoItem(uploadPhotoButton));
  uploadPhotoButton.classList.add("is-hidden");
});

uploadIssuePhotoButton.addEventListener("click", () => {
  issuePhotoUpload.prepend(createPhotoItem(uploadIssuePhotoButton));
  uploadIssuePhotoButton.classList.add("is-hidden");
});

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

saveObjectButton.addEventListener("click", () => {
  showDashboard();
});

finishContractorInspectionButton.addEventListener("click", () => {
  showObjects();
  showModal("Проверка завершена", "Проверка объекта завершена. Данные сохранены в списке проектов.");
});

syncFormMode();
