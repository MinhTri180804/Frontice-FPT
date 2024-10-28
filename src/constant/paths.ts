const paths = {
  // default path
  default: '/',
  home: '/home',

  // auth path
  auth: '/auth',
  login: 'login',
  register: 'register',
  forgotPassword: 'forgot-password',
  otp: 'otp',
  resetPassword: 'reset-password',

  // protected path
  challengesSystem: '/challenges-system',
  challengesRecruiter: '/challenges-recruiter',
  solutions: '/solutions',
  mySolutions: '/my-solutions',
  profile: '/profile',
  // settingsProfilePage: '/settingsProfilePage',
  challenges: '/challenges',
  solutionDetails: '/solutionDetails',
  setting: '/setting',
  statistic: '/statistic',
  recruiterCompany: '/recruiter-company',
  submitSolution: '/submit-solution',
  challengeDetails: '/challenge-details',
  tasks: '/tasks',
  //

  API: {
    root: 'api',
    AUTH: {
      root: '/auth',
      login: `/login`,
      register: '/register',
      logout: '/logout',
      forgot_password: '/forgotPassword/send',
      reset_password: '/forgotPassword/reset',
      send_otp: '/otp-sending',
      verify_email: '/verify',
      verify_forgot_password_otp: '/forgotPassword/verify',
      refreshToken: '/refresh',
      resendOtp: 'otp-resend',
      info: '/me',
    },
    CHALLENGER: {
      root: '/challenger',
      profile: '/profile',
    },
    CHALLENGE: {
      root: '/challenges',
    },
    SOLUTION: {
      getIncompleteChallenge: '/solutions',
      submitted: '/solutions/submitted',
      submitSolution: '/solutions/challenge/submit',
      getAll: '/solutions/challenge',
      getDetails: `/solutions/challenge/get`,
      getSolutionsOfChallenge: `/solutions/challenges`,
    },
    taskee: {
      getInformation: '/taskees',
    },
    task: {
      root: '/task',
    },
  },

  LOCAL_STORAGE: {
    emailRegister: 'emailRegister',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    account: 'accountInformation',
    emailForgotPassword: 'emailForgotPassword',
    i18nLanguage: 'i18nextLng',
    profile: 'profile',
  },

  LANGUAGE: {
    english: 'en',
    vietnamese: 'vi',
  },

  QUERY_KEY: {
    challenges: 'challenges',
    meInfo: 'info',
    solutionIncompleteChallenge: 'solutionIncompleteChallenge',
    solutionSubmitted: 'solutionSubmitted',
    challengeDetails: 'challengeDetails',
    solutionList: 'solutionList',
    mySolution: 'mySolution',
    solution: 'solution',
    solutionOfChallenge: 'solutionOfChallenge',
    tasks: 'tasks',
    informationTaskee: 'informationTaskee',
  },
};

export default paths;
