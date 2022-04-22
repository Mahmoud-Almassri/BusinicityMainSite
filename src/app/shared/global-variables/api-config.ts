import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
    })
};


export const httpFormDataOptions = {
    headers: new HttpHeaders({
        // 'Content-Type': undefined
    })
};

export enum Controllers {
  Auth = 'Auth/',
  User = 'User/',
  Employee = 'Employee/',
  Business = 'Business/',
  AccountType = 'AccountType/',
  BusinessStatus = 'BusinessStatus/',
  Country = 'Country/',
  City = 'City/',
  CorporateType = 'CorporateType/',
  Filters = 'Filters/',
  Groups = 'Groups/',
  JobTitle = 'JobTitle/',
  Nationality = 'Nationality/',
  NoOfEmployee = 'NoOfEmployee/',
  Sector = 'Sector/',
  SubSector = 'SubSector/',
  TitleField = 'TitleField/',
  TitleLevel = 'TitleLevel/',
  WebPerson = 'WebPerson/',
  WebBUsiness = 'WebBusiness/',
  Search = 'Search/',
  Person = 'Person/',
  ContactUs = 'ContactUs/',
  Contacts = 'Contacts/',

}




export enum Actions {
  GetList = 'GetList',
  GetFilteredItems = 'GetFilteredItems',
  GetById = 'GetById/',
  Get = 'Get',
  GetByParentId = 'GetByParentId',
  GetAllItems = 'GetAllItems',
  GetAllItemsWithImages = 'GetAllItemsWithImages',
  GetItemsBySetId = 'GetItemsBySetId',
  PostItem = 'Create',
  PostRange = 'PostRange',
  EditItem = 'Update',
  DeleteSetItem = 'DeleteSetItem',
  EditRange = 'EditRange',
  RemoveItemById = 'RemoveItemById',
  RemoveItem = 'Delete',
  RemoveItemImage = 'DeleteItemImage',
  RemoveRange = 'RemoveRange',
  Login = 'Login',
  UpdateStatus = 'UpdateStatus',
  UpdateUserInfo = 'UpdateUserInfo',
  SendSingleUserNotification = 'SendSingleUserNotification',
  PodcastAllUsersNotification = 'PodcastAllUsersNotification',
  PodcastMultiUsersNotification = 'PodcastMultiUsersNotification',
  AddItemImages = 'AddItemImages',
  GetItemByIdWithRelated = 'GetItemByIdWithRelated',
  GetSubCategoryUsers = 'GetSubCategoryUsers',
  GetAllMainBranches = 'GetAllMainBranches',
  GetRoles = 'GetRoles',
  UpdateEmployeeInfo = "UpdateEmployeeInfo",
  UserRegistration = "UserRegistration",
  ForgetPassword = "ForgetPassword",
  resetPassword = "ResetPassword",
  Search = "Search",
  MapsSearch = "MapsSearch",
  BusinessAdvanceSearch = "BusinessAdvanceSearch",
  PersonAdvanceSearch = "PersonAdvanceSearch",
  ExternalLinkedinLogin = "ExternalLinkedinLogin",
  ValidateResetPasswordCode = "ValidateResetPasswordCode"
}
