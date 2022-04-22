
export class AccountType {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class BusinessStatus {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Country {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Nationality {
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class City{
  public id: number;
  public name:string;
  public countryId:number;
  public countryName:string;
  public status:number;
  public createdByName:string;
  public createdById:number;
  public modifiedByName:string;
  public modifiedById:number;
}
export class BusinessClassifications{
  public id: number;
  public sectorId:number;
  public subSectorId:number;
  public groupId:number;
  public filterId:number;
  public businessId:number;
  public status:number;
  public createdByName:string;
  public createdById:number;
  public modifiedByName:string;
  public modifiedById:number;
}

export class Sector{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class SubSector{
  public id: number;
  public name: string;
  public status: number;
  public sectorId:number;
  public sectorName:string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Groups{
  public id: number;
  public name: string;
  public status: number;
  public subSectorId:number;
  public subSectorName:string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class Filters{
  public id: number;
  public name: string;
  public status: number;
  public groupId:number;
  public groupName:string;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class JobTitle{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}


export class TitleField{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}


export class TitleLevel{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class Nationalities{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class NoOfEmployee{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}

export class CorporateType{
  public id: number;
  public name: string;
  public status: number;
  public createdByName: string;
  public createdById: number;
  public modifiedByName: string;
  public modifiedById: number;
}
export class BasicModel{
  public id: number;
  public name: string;
}
