<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Регистрация | Учет огнетушителей</title>
    <link rel="stylesheet" href="./styles.css?v=20260624-desktop-1" />
  </head>
  <body>
    <main class="app-shell" aria-labelledby="page-title">
      <section class="phone-frame">
        <header class="app-header" id="authHeader">
          <div class="brand-mark auth-logo" aria-label="Учет огнетушителей">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 3h8v4l-2 2v2h3a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a2 2 0 0 1 2-2h3V9L8 7V3Z" />
              <path d="M9 15h6" />
              <path d="M9 18h6" />
            </svg>
          </div>
          <h1 id="page-title">Демо-доступ</h1>
          <p class="subtitle">Выберите кабинет, чтобы сразу перейти к работе.</p>
        </header>

        <div class="stepper is-hidden" id="authStepper" aria-label="Прогресс регистрации">
          <span class="step-dot is-active" data-step-dot="1"></span>
          <span class="step-dot" data-step-dot="2"></span>
          <span class="step-dot" data-step-dot="3"></span>
        </div>

        <form class="registration-form" id="registrationForm">
          <section class="form-step is-active" data-step="1" aria-labelledby="step-1-title">
            <div class="step-heading">
              <span class="step-count">Демо</span>
              <h2 id="step-1-title">Выберите кабинет</h2>
            </div>

            <div class="role-grid" role="radiogroup" aria-label="Тип аккаунта">
              <label class="role-card">
                <input type="radio" name="accountType" value="organization" checked />
                <span class="role-title">Организация</span>
                <span class="role-text">Демо-кабинет компании с отдельными данными для этого браузера.</span>
              </label>

              <label class="role-card">
                <input type="radio" name="accountType" value="contractor" />
                <span class="role-title">Подрядчик</span>
                <span class="role-text">Демо-кабинет исполнителя с отдельными данными для этого браузера.</span>
              </label>
            </div>

            <button type="button" class="primary-button" data-demo-enter>Открыть выбранный кабинет</button>
            <button type="button" class="secondary-button login-entry-button is-hidden" id="loginEntryButton">Уже есть аккаунт? Войти</button>
          </section>

          <section class="form-step" data-step="2" aria-labelledby="step-2-title">
            <div class="step-heading">
              <span class="step-count">Шаг 2 из 3</span>
              <h2 id="step-2-title">Данные компании</h2>
              <p class="helper" id="stepTwoHelper">Заполните данные для создания аккаунта.</p>
            </div>

            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="name@company.ru" />
            </div>

            <div class="field organization-only">
              <label for="company">Название компании</label>
              <input id="company" name="company" type="text" autocomplete="organization" placeholder="ООО «Пожарный контроль»" />
            </div>

            <div class="field registration-only">
              <label for="fullName">ФИО</label>
              <input id="fullName" name="fullName" type="text" autocomplete="name" placeholder="Иванов Иван Иванович" />
            </div>

            <div class="button-row">
              <button type="button" class="secondary-button" data-prev>Назад</button>
              <button type="button" class="primary-button" data-next id="emailStepButton">Получить код</button>
            </div>
          </section>

          <section class="form-step" data-step="3" aria-labelledby="step-3-title">
            <div class="step-heading">
              <span class="step-count">Шаг 3 из 3</span>
              <h2 id="step-3-title">Код из письма</h2>
              <p class="helper">Мы отправили шестизначный код на указанный email.</p>
            </div>

            <div class="code-grid" aria-label="Проверочный код">
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 1" />
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 2" />
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 3" />
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 4" />
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 5" />
              <input class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="1" aria-label="Цифра 6" />
            </div>
            <p class="field-error" id="codeError">Введите все 6 цифр из письма.</p>

            <button type="button" class="text-button">Отправить код повторно</button>

            <div class="button-row">
              <button type="button" class="secondary-button" data-prev>Назад</button>
              <button type="submit" class="primary-button">Завершить</button>
            </div>
          </section>

          <section class="success-state" id="successState" aria-live="polite">
            <div class="success-mark" aria-hidden="true"></div>
            <h2 id="successTitle">Заявка создана</h2>
            <p id="successText">После проверки почты вы сможете войти в личный кабинет.</p>
            <button type="button" class="primary-button" id="restartButton">На главный экран</button>
          </section>
        </form>

        <section class="dashboard-screen" id="dashboardScreen" aria-labelledby="dashboardTitle">
          <header class="dashboard-topbar">
            <div class="brand-mark" data-organization-logo aria-label="Учет огнетушителей">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 3h8v4l-2 2v2h3a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a2 2 0 0 1 2-2h3V9L8 7V3Z" />
                <path d="M9 15h6" />
                <path d="M9 18h6" />
              </svg>
            </div>
            <p class="flow-step-label" data-dashboard-title-label>Главная</p>

            <div class="menu-wrap">
              <button type="button" class="icon-button" id="menuButton" aria-label="Открыть меню" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </header>

          <div class="dashboard-content" data-organization-dashboard>
            <section class="dashboard-objects-section" aria-labelledby="dashboardTitle">
              <div class="section-title-row">
                <h2 id="dashboardTitle">Объекты</h2>
                <span aria-hidden="true">›</span>
              </div>
              <div class="dashboard-object-list"></div>
            </section>

            <section class="checks-section" aria-labelledby="checksTitle">
              <div class="section-title-row">
                <h2 id="checksTitle">Последние проверки</h2>
                <span aria-hidden="true">›</span>
              </div>
              <div class="dashboard-check-list"></div>
            </section>

            <section class="checks-section" aria-labelledby="upcomingCheckTitle">
              <div class="section-title-row">
                <h2 id="upcomingCheckTitle">Предстоящая проверка</h2>
              </div>
            </section>
          </div>

          <div class="dashboard-content is-hidden" data-contractor-dashboard>
            <section class="checks-section" aria-labelledby="contractorObjectsTitle">
              <div class="section-title-row">
                <h2 id="contractorObjectsTitle">Мои объекты</h2>
              </div>
              <div class="contractor-objects-list contractor-dashboard-object-list"></div>
            </section>

            <section class="checks-section" aria-labelledby="contractorUpcomingTitle">
              <div class="section-title-row">
                <h2 id="contractorUpcomingTitle">Плановые проверки</h2>
              </div>
              <div class="contractor-upcoming-check-list"></div>
            </section>

            <section class="checks-section" aria-labelledby="contractorCompletedChecksTitle">
              <div class="section-title-row">
                <h2 id="contractorCompletedChecksTitle">Проведенные проверки</h2>
                <span aria-hidden="true">›</span>
              </div>
              <div class="contractor-completed-check-list"></div>
            </section>
          </div>

          <button type="button" class="primary-button add-project-button" id="addObjectButton" data-organization-dashboard-action>Добавить объект</button>
          <button type="button" class="primary-button add-project-button is-hidden" id="startInspectionButton" data-contractor-dashboard-action>Начать проверку</button>
        </section>

        <section class="summary-screen" id="summaryScreen" aria-labelledby="summaryTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="summaryOverviewBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="summaryTitle">Сводка</p>
            <button type="button" class="flow-icon-button" id="summaryOverviewMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="dashboard-content">
            <section class="summary-section" aria-labelledby="summaryDashboardTitle">
              <h2 id="summaryDashboardTitle">Сводка по всем объектам</h2>
              <div class="metric-grid"></div>
            </section>

            <section class="object-detail-section" data-summary-objects-section>
              <div class="small-title-row">
                <h3>Объекты</h3>
                <span aria-hidden="true">›</span>
              </div>
            </section>

            <section class="object-detail-section" data-summary-issues-section>
              <div class="small-title-row">
                <h3>Проблемы по объектам</h3>
                <span aria-hidden="true">›</span>
              </div>
            </section>
          </div>
        </section>

        <section class="menu-screen" id="menuScreen" aria-labelledby="menuTitle">
          <header class="menu-topbar">
            <button type="button" class="flow-icon-button" id="menuBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <h2 class="menu-title" id="menuTitle">Меню</h2>
            <button type="button" class="icon-button" id="closeMenuButton" aria-label="Закрыть меню">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </header>

          <nav class="menu-list" aria-label="Меню кабинета">
            <button type="button" data-menu-dashboard>Главная</button>
            <button type="button" data-menu-summary>Сводка</button>
            <button type="button" data-menu-objects>Ваши объекты</button>
            <button type="button" data-menu-account>Аккаунт</button>
          </nav>

          <button type="button" class="menu-logout" id="logoutButton">Выйти</button>
        </section>

        <section class="account-screen" id="accountScreen" aria-labelledby="accountTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="accountBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="accountTitle">Аккаунт</p>
            <button type="button" class="flow-icon-button" id="accountMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="account-content">
            <section class="account-section">
              <h2>Информация о компании</h2>
              <div class="account-info-card"></div>
            </section>

            <section class="account-section">
              <h2 data-account-link-title>Подрядчик - подвязка подрядчика</h2>
              <div class="client-list is-hidden" id="clientList"></div>
              <div class="client-form is-hidden" id="clientForm">
                <input type="text" id="clientName" placeholder="Название подрядчика" aria-label="Название подрядчика" />
                <div class="contractor-plans">
                  <div class="contractor-plans-head">
                    <h3>Плановые проверки</h3>
                    <button type="button" class="document-action" id="addContractorPlanButton">Добавить дату</button>
                  </div>
                  <div class="contractor-plan-list" id="contractorPlanList"></div>
                </div>
                <div class="document-group" data-client-document-group>
                  <div class="document-grid"></div>
                  <button type="button" class="upload-button" data-client-upload-label="Договор">Загрузить договор</button>
                </div>
                <div class="document-group" data-client-document-group>
                  <div class="document-grid"></div>
                  <button type="button" class="upload-button" data-client-upload-label="ТЗ">Загрузить ТЗ</button>
                </div>
                <div class="document-group" data-client-document-group>
                  <div class="document-grid"></div>
                  <button type="button" class="upload-button" data-client-upload-label="План размещения средств ПБ">Загрузить план размещения средств ПБ</button>
                </div>
                <div class="employee-actions">
                  <button type="button" class="secondary-button" id="cancelClientButton">Отмена</button>
                  <button type="button" class="primary-button" id="saveClientButton">Добавить</button>
                </div>
              </div>
              <button type="button" class="secondary-button" data-account-link-button>Пригласить подрядчика</button>
            </section>

            <section class="account-section">
              <h2>Сотрудники</h2>
              <div class="employee-list" id="employeeList"></div>
              <div class="employee-form is-hidden" id="employeeForm">
                <input type="text" id="employeeName" placeholder="ФИО сотрудника" aria-label="ФИО сотрудника" />
                <input type="email" id="employeeEmail" placeholder="Email сотрудника" aria-label="Email сотрудника" />
                <div class="employee-actions">
                  <button type="button" class="secondary-button" id="cancelEmployeeButton">Отмена</button>
                  <button type="button" class="primary-button" id="saveEmployeeButton">Добавить</button>
                </div>
              </div>
              <button type="button" class="secondary-button" id="showEmployeeFormButton">Добавить сотрудника</button>
            </section>

            <section class="account-section" data-account-documents-section>
              <h2>Загруженные документы</h2>
              <div class="account-documents"></div>
            </section>
          </div>
        </section>

        <section class="objects-screen" id="objectsScreen" aria-labelledby="objectsTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="objectsBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="objectsTitle">Ваши объекты</p>
            <button type="button" class="flow-icon-button" id="objectsMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="objects-list" data-organization-objects></div>

          <div class="contractor-objects-list is-hidden" data-contractor-objects></div>

          <div class="objects-bottom-bar" data-organization-objects-action>
            <button type="button" class="primary-button" id="addObjectFromObjectsButton">Добавить объект</button>
          </div>
        </section>

        <section class="object-summary-screen" id="objectSummaryScreen" aria-labelledby="objectSummaryTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="summaryBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="objectSummaryTitle">Объект</p>
            <button type="button" class="flow-icon-button" id="summaryMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="summary-tabs" role="tablist" aria-label="Сводка объекта">
            <button type="button" class="is-active" data-summary-tab="structure">Структура объекта</button>
            <button type="button" data-summary-tab="issues">Проблемы на объекте</button>
            <button type="button" data-summary-tab="checks">Последние проверки</button>
          </div>

          <div class="summary-panel is-active" data-summary-panel="structure"></div>

          <div class="summary-panel" data-summary-panel="issues"></div>

          <div class="summary-panel" data-summary-panel="checks"></div>

          <div class="object-edit-panel is-hidden" id="objectEditPanel"></div>

          <div class="object-actions summary-actions">
            <button type="button" class="secondary-button is-hidden" id="downloadObjectExcelButton">Скачать Excel</button>
            <button type="button" class="secondary-button is-hidden" id="downloadObjectPdfButton">Скачать PDF</button>
            <button type="button" class="secondary-button" id="addExtinguisherButton">Добавить новый огнетушитель</button>
            <button type="button" class="secondary-button" id="addIssueButton">Зафиксировать неисправность</button>
            <button type="button" class="secondary-button" id="editObjectButton">Редактировать объект</button>
          </div>
        </section>

        <section class="extinguisher-detail-screen" id="extinguisherDetailScreen" aria-labelledby="extinguisherDetailTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="extinguisherDetailBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="extinguisherDetailTitle">Огнетушитель</p>
            <button type="button" class="flow-icon-button" id="extinguisherDetailMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="extinguisher-detail-content" data-extinguisher-detail-content></div>

          <div class="object-actions extinguisher-detail-actions">
            <button type="button" class="secondary-button" id="downloadExtinguisherHistoryExcelButton">Скачать Excel</button>
            <button type="button" class="primary-button" id="downloadExtinguisherHistoryPdfButton">Скачать PDF</button>
          </div>
        </section>

        <section class="check-detail-screen" id="checkDetailScreen" aria-labelledby="checkDetailTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="checkBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="checkDetailTitle">Проверка</p>
            <button type="button" class="flow-icon-button" id="checkMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <ul class="summary-list check-issues" id="checkDetailList"></ul>

          <div class="object-actions report-download-actions">
            <button type="button" class="secondary-button" id="downloadReportExcelButton">Скачать Excel</button>
            <button type="button" class="primary-button" id="downloadReportPdfButton">Скачать PDF</button>
          </div>
        </section>

        <section class="add-extinguisher-screen" id="addExtinguisherScreen" aria-labelledby="addExtinguisherTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="extinguisherBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="addExtinguisherTitle">Новый огнетушитель</p>
            <button type="button" class="flow-icon-button" id="extinguisherMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="extinguisher-form" id="addExtinguisherFormFields">
            <input type="text" placeholder="Ваше ФИО" aria-label="Ваше ФИО" />
            <select aria-label="Здание">
              <option selected disabled>Здание</option>
              <option>Здание 1</option>
              <option>Здание 2</option>
            </select>
            <select aria-label="Этаж">
              <option selected disabled>Этаж</option>
              <option>1 этаж</option>
              <option>2 этаж</option>
            </select>
            <select aria-label="Помещение">
              <option selected disabled>Помещение</option>
              <option>Помещение 1</option>
              <option>Помещение 2</option>
            </select>
            <select aria-label="Зона">
              <option selected disabled>Зона</option>
              <option>Зона ПБ 1</option>
              <option>Зона ПБ 2</option>
            </select>
            <input type="text" placeholder="Номер огнетушителя" aria-label="Номер огнетушителя" id="newExtinguisherNumber" />
            <div class="photo-upload" id="photoUpload">
              <button type="button" class="upload-button" id="uploadPhotoButton">Загрузить фото</button>
            </div>
          </div>

          <button type="button" class="primary-button extinguisher-save-button" id="saveExtinguisherButton">Сохранить</button>
        </section>

        <section class="add-extinguisher-screen" id="addIssueScreen" aria-labelledby="addIssueTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="issueBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="addIssueTitle">Новая неисправность</p>
            <button type="button" class="flow-icon-button" id="issueMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="extinguisher-form">
            <input type="text" placeholder="Ваше ФИО" aria-label="Ваше ФИО" />
            <select aria-label="Здание">
              <option selected disabled>Здание</option>
              <option>Здание 1</option>
              <option>Здание 2</option>
            </select>
            <select aria-label="Этаж">
              <option selected disabled>Этаж</option>
              <option>1 этаж</option>
              <option>2 этаж</option>
            </select>
            <select aria-label="Помещение">
              <option selected disabled>Помещение</option>
              <option>Помещение 1</option>
              <option>Помещение 2</option>
            </select>
            <select aria-label="Зона">
              <option selected disabled>Зона</option>
              <option>Зона ПБ 1</option>
              <option>Зона ПБ 2</option>
            </select>
            <select aria-label="Выбрать огнетушитель">
              <option selected disabled>Выбрать огнетушитель</option>
              <option>Огнетушитель № 001</option>
              <option>Огнетушитель № 002</option>
              <option>Огнетушитель № 003</option>
            </select>
            <div class="photo-upload" id="issuePhotoUpload">
              <button type="button" class="upload-button" id="uploadIssuePhotoButton">Загрузить фото</button>
            </div>
            <label class="inspection-field">
              <span>Комментарий</span>
              <textarea id="issueComment" rows="4" placeholder="Опишите неисправность или добавьте важные детали"></textarea>
            </label>
          </div>

          <button type="button" class="primary-button extinguisher-save-button" id="saveIssueButton">Сохранить</button>
        </section>

        <section class="add-extinguisher-screen contractor-object-select-screen" id="contractorObjectSelectScreen" aria-labelledby="contractorObjectSelectTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="contractorObjectSelectBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="contractorObjectSelectTitle">Выбор объекта</p>
            <button type="button" class="flow-icon-button" id="contractorObjectSelectMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="inspection-select-content">
            <h2>Выберите объект проверки</h2>
            <div class="contractor-objects-list"></div>
          </div>
        </section>

        <section class="add-extinguisher-screen contractor-employee-select-screen" id="contractorEmployeeSelectScreen" aria-labelledby="contractorEmployeeSelectTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="contractorEmployeeSelectBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="contractorEmployeeSelectTitle">Сотрудник</p>
            <button type="button" class="flow-icon-button" id="contractorEmployeeSelectMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="inspection-select-content">
            <h2>Кто проводит проверку</h2>
            <div class="extinguisher-form inspection-form">
              <label class="inspection-field">
                <span>Сотрудник</span>
                <select id="inspectionEmployeeSelect"></select>
              </label>
              <label class="inspection-field">
                <span>Тип проверки</span>
                <select id="inspectionTypeSelect">
                  <option>Ежеквартальная</option>
                  <option>Ежегодная</option>
                </select>
              </label>
            </div>
          </div>

          <button type="button" class="primary-button extinguisher-save-button" id="continueInspectionEmployeeButton">Продолжить</button>
        </section>

        <section class="add-extinguisher-screen contractor-inspection-screen" id="contractorInspectionScreen" aria-labelledby="contractorInspectionTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" id="contractorInspectionBackButton" aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="contractorInspectionTitle">Ежеквартальная проверка</p>
            <button type="button" class="flow-icon-button" id="contractorInspectionMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="inspection-list" id="inspectionList"></div>

          <div class="contractor-inspection-footer">
            <button type="button" class="secondary-button inspection-add-button" id="addContractorExtinguisherButton">Добавить огнетушитель</button>
            <button type="button" class="primary-button extinguisher-save-button" id="finishContractorInspectionButton">Завершить проверку</button>
          </div>
        </section>

        <section class="object-flow" id="objectFlow" aria-labelledby="objectFlowTitle">
          <header class="flow-topbar">
            <button type="button" class="flow-icon-button" data-object-back aria-label="Назад">
              <img src="./assets/icon-back.svg" alt="" />
            </button>
            <p class="flow-step-label" id="objectStepLabel">Шаг 1 из 3</p>
            <button type="button" class="flow-icon-button" id="objectMenuButton" aria-label="Открыть меню">
              <img src="./assets/icon-menu.svg" alt="" />
            </button>
          </header>

          <div class="object-step is-active" data-object-step="1">
            <div class="object-content">
              <h2 id="objectFlowTitle">Добавление объекта</h2>
              <div class="object-fields">
                <input type="text" placeholder="Название объекта" aria-label="Название объекта" />
                <input type="text" placeholder="Адрес" aria-label="Адрес" />
              </div>
            </div>
            <div class="object-actions">
              <button type="button" class="primary-button" data-object-next>Далее</button>
            </div>
          </div>

          <div class="object-step" data-object-step="2">
            <div class="object-content">
              <h2>Структура объекта</h2>
              <div class="object-empty">
                <h3>Тут пока пусто</h3>
                <p>Вы еще не добавили ни одного здания</p>
              </div>
            </div>
            <div class="object-actions">
              <button type="button" class="primary-button" data-object-next>Далее</button>
              <button type="button" class="secondary-button" data-add-room>Добавить помещение</button>
            </div>
          </div>

          <div class="object-step" data-object-step="3">
            <div class="object-content">
              <h2>Структура объекта</h2>
              <div class="rooms-list" id="roomsList"></div>
            </div>
            <div class="object-actions">
              <button type="button" class="primary-button" id="saveObjectButton">Сохранить</button>
              <button type="button" class="secondary-button" data-add-room>Добавить помещение</button>
            </div>
          </div>
        </section>
        <div class="modal-overlay" id="inspectionModal" aria-hidden="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="inspectionModalTitle">
            <h2 id="inspectionModalTitle">Проверка запрошена</h2>
            <p id="inspectionModalText">Мы свяжемся с вами, чтобы согласовать дату и детали проверки.</p>
            <button type="button" class="primary-button" id="inspectionModalClose">Понятно</button>
          </div>
        </div>
        <div class="modal-overlay" id="decommissionModal" aria-hidden="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="decommissionModalTitle">
            <h2 id="decommissionModalTitle">Снять с эксплуатации?</h2>
            <p>Вы уверены, что хотите снять этот огнетушитель с эксплуатации?</p>
            <div class="modal-actions">
              <button type="button" class="secondary-button" id="decommissionCancelButton">Отмена</button>
              <button type="button" class="primary-button" id="decommissionConfirmButton">Да</button>
            </div>
          </div>
        </div>
        <div class="modal-overlay" id="deleteObjectModal" aria-hidden="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="deleteObjectModalTitle">
            <h2 id="deleteObjectModalTitle">Вы уверены, что хотите удалить объект?</h2>
            <p id="deleteObjectModalText">Объект и все связанные данные будут удалены без возможности восстановления.</p>
            <div class="modal-actions">
              <button type="button" class="secondary-button" id="deleteObjectCancelButton">Отмена</button>
              <button type="button" class="danger-button" id="deleteObjectConfirmButton">Удалить</button>
            </div>
          </div>
        </div>
        <div class="snackbar" id="snackbar" role="status" aria-live="polite"></div>
      </section>
    </main>

    <script src="./script.js?v=20260624-desktop-1"></script>
  </body>
</html>
