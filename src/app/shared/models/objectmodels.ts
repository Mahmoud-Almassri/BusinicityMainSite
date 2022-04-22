export class AppSettings {
  aboutUsTitle: string;
  aboutUsDescription: string;
  aboutUsVision: string;
  aboutUsMision: string;
  contactUsEmail: string;
  contactUsMobileNo: string;
  contactUsLatitude: string;
  contactUsLongitude: string;
  contactUsTitle: string;
  contactUsTitleAR: string;
  aboutUsTitleAR: string;
  aboutUsDescriptionAR: string;
  aboutUsVisionAR: string;
  aboutUsMisionAR: string;
  address: string;
}

export class ContactUs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class WebPerson {
  firstName;
  secondName;
  thirdName;
  lastName;
  gender;
  saluation;
  mobileNo;
  personalEmail;
  personJob : PersonJob[];
}
export class PersonJob{
  personId
  businessId
  businessName
  businessWebsite
  jobTitle
  phoneExtention
  email
}
