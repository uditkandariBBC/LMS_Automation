export const navLocator = {
  topNav: {
    languageToggle: "//*[@id='header-nav']/ul/li[1]",
    displayedLanguage: "//*[@id='header-nav']/ul/li[1]/a/strong",
    languageOption: {
      englishUK: "//a[@data-locale='en-gb']",
      englishUS: "//a[@data-locale='en-us']",
      chinese: "//a[@data-locale='zh-cn']",
      french: "//a[@data-locale='fr']",
      japanese: "//a[@data-locale='ja']",
      korean: "//a[@data-locale='ko']",
      portuguese: "//a[@data-locale='pt']",
      russian: "//a[@data-locale='ru']",
      spanish: "//a[@data-locale='es']",
    },
    analyticsDashboard: '//a[@href="https://dashboard.mymediabox.com"]',
    mySite: '//a[@id="osdropdownmenu"]',
    pa: '//a[@href="https://bbcwwtest-pa-sandbox512.uat.mymediabox.com"]',
    support: '//a[@id="FreshDeskSupportButton"]',
    training: '//a[@id="ostraining"]',
    calender: '//a[@data-content="Calendar"]',
    announcements: '//a[@id="announcements-link"]',
    notifications: '//a[@href="/rm/Licensor/Notifications/"]',
    loggeginUserName: '//strong[text()="udit kandari"]',
    administrator: '//a[@href="/rm/Admin/Settings/Dashboard"]',
    profile: '//a[@href="/rm/Profile/Details/"]',
    menuDropdown: '//a[@id="dropdownMenu1"]',
    about: '//a[@href="/about.html"]',
    contactUs: '//a[@href="/contact-us.html"]',
    userGuide: '//a[@href="/helpdocs/FlarePublish_RM_User/default.htm"]',
    logout: '//a[@href="/rm/Home/Logout/"]',
  },
  sideNavLocator: {
    dashboard: '//a[@href="/rm/Licensor/Dashboard/"]',
    availability: '//a[@href="/rm/Licensor/Availabilities/"]',
    companies: '//a[contains(text(),"Companies")]',
    agents: '//a[@href="/rm/Licensor/Companies/Agents/"]',
    licensees: 'href="/rm/Licensor/Companies/Licensees/"',
    companies_showAll: '//a[@href="/rm/Licensor/Companies/Index/All"]',
    products: '//a[@href="/rm/Licensor/Products/"]',
    manufacturers: '//a[@href="/rm/Licensor/Manufacturers/"]',
    contracts: '//a[@href="/rm/Licensor/Contracts/"]',
    forecasting:
      '//a[@href="/rm/Licensor/Forecasting/Sales/?sort=UpdatedDate&sortdir=DESC"]',
    crmTools: '//a[contains(.,"CRM Tools")]',
    contractActivity: '//a[@href="/rm/Licensor/CRM/ContractActivity/"]',
    contractManagement: '//a[@href="/rm/Licensor/CRM/Contacts/"]',
    finances: '//a[contains(.,"Financials")]',
    enterSalesData: '//a[@href="/rm/Licensor/Sales/Entry/"]',
    trueUpContracts: '//a[@href="/rm/Licensor/Transactions/TrueupList/"]',
    pendingTransactions: '//a[@href="/rm/Licensor/Transactions/Pending/"]',
    approvedTransactions: '//a[contains(text(),"Approved Transactions")]',
    adHocTransactions: '//a[@href="/rm/Licensor/Transactions/AdhocAmounts"]',
    agentCommissions: '//a[@href="/rm/Licensor/Sales/Commissions/"]',
    processQueue: '//a[@href="/rm/Licensor/ProcessQue/Review/"]',
    invoice: '//span[text()="Invoice"]',
    billableAmounts: '//a[@href="/rm/Licensor/BillableAmounts/"]',
    invoices: '//a[@href="/rm/Licensor/Invoices/"]',
    payments: '//a[@href="/rm/Licensor/Invoices/Payments/"]',
    reports: '//a[@href="/rm/Reporting/Directory/"]',
  },
};