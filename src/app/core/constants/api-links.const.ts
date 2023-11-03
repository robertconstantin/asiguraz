export const ApiLinks = {
  User: {
    Get: 'user/get',
    GetByConfirmData: 'user/getbyconfirmdata',
    Login: 'user/login',
    Logout: 'user/logout',
    ForgotPassword: 'user/forgotpassword',
    ChangePassword: 'user/changepassword',
    CheckAvailability: 'user/checkavailability',
    Register: 'user/register',
    SubscribeUser: 'user/subscribeuser',
    Create: 'user/create',
    Update: 'user/update',
    UpdateProfilePicture: 'user/updateprofilepicture',
    UpdateLanguage: 'user/updatelanguage',
    ConfirmEmail: 'user/confirmemail',
    ConfirmInvite: 'user/confirminvite',
    ResendConfirmUserEmail: 'user/resendconfirmuseremail',
    ResetPassword: 'user/resetpassword',
    VerifySecurityCode: 'user/verifysecuritycode'
  },
  Role: {
    GetOneById: 'role/getonebyid',
    GetList: 'role/getlist',
    AddList: 'role/addlist',
    AddOne: 'role/addone',
    Update: 'role/update',
    Merge: 'role/merge',
    ToggleActive: 'role/toggleactive',
    ToggleRoleCanCar: 'role/togglerolecancar',
    ToggleRoleCanDriver: 'role/togglerolecandriver',
    ToggleRoleCanCarInsurance: 'role/togglerolecancarinsurance',
    ToggleRoleCanCarVignette: 'role/togglerolecancarvignette',
    ToggleRoleCanUsers: 'role/togglerolecanusers',
    Delete: 'role/delete'
  },
  Type: {
    GetRegisterType: 'type/getregistertype',
    GetUsageType: 'type/getusagetype',
    GetFuel: 'type/getfuel',
    GetBmClass: 'type/getbmclass'
  },
  Insurance: {
    GetCompanies: 'insurance/getcompanies',
    GetSocietatiDeLeasing: 'insurance/getsocietatideleasing',
    GetQuote: 'insurance/getquote',
    IssueInsurance: 'insurance/issueinsurance',
    SendPolita: 'insurance/sendpolita',
    GetPdf: 'insurance/getpdf'
  },
  Auto: {
    GetCategories: 'auto/getcategories',
    GetSubcategories: 'auto/getsubcategories',
    GetBrands: 'auto/getbrands',
    GetModels: 'auto/getmodels'
  },
  Payment: {
    MobilPay: 'payment/mobilpay',
  }
};
