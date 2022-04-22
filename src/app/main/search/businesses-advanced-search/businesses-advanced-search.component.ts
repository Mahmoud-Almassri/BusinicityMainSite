import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Controllers } from 'src/app/shared/global-variables/api-config';
import { Sector, SubSector, City, Filters, Groups, JobTitle, NoOfEmployee, Country, Nationality, CorporateType, AccountType, BusinessStatus } from 'src/app/shared/models/loockups.model';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';

@Component({
  selector: 'app-businesses-advanced-search',
  templateUrl: './businesses-advanced-search.component.html',
  styleUrls: ['./businesses-advanced-search.component.scss']
})
export class BusinessesAdvancedSearchComponent implements OnInit {

  @Output() businessSearchClicked = new EventEmitter<any>();
  public sectors: Sector[];
  public subSectors: SubSector[];
  public cities: City[];
  public filters: Filters[];
  public groups: Groups[];
  public jobTitles: JobTitle[];
  public noOfEmployees: NoOfEmployee[];
  public countries: Country[];
  public nationalities: Nationality[];
  public corporateTypes: CorporateType[];
  public businessStatuses: BusinessStatus[];
  public accountTypes: AccountType[];

  public filteredNoOfEmployeesOptions: Observable<NoOfEmployee[]>;
  public filteredFiltersOptions: Observable<Filters[]>;
  public filteredGroupsOptions: Observable<Groups[]>;
  public filteredBusinessStatusesOptions: Observable<BusinessStatus[]>;
  public filteredSectorsOptions: Observable<Sector[]>;
  public filteredSubSectorsOptions: Observable<SubSector[]>;
  public filteredCountriesOptions: Observable<Country[]>;
  public filteredNationalitiesOptions: Observable<Nationality[]>;
  public filteredCitiesOptions: Observable<City[]>;
  public filteredJobTitlesOptions: Observable<JobTitle[]>;
  public filteredCorporateTypesOptions: Observable<CorporateType[]>;
  public filteredAccountTypesOptions: Observable<AccountType[]>;

  public accountTypeControl = new FormControl();

  constructor(private baseService:BaseServiceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAccountTypes();
    this.getCountries();
    this.getFilters();
    this.getNumberOfEmployees();
    this.getSectors();
    this.getSubSectors();
    this.getGroups();
    this.getBusinessStatuses();
    this.getCities();
    this.getPartnerNationalities();
    this.getCorporateTypes();
    this.spinner.hide();
  }
  public businessSearchForm = new FormGroup({
    sector: new FormControl(),
    group: new FormControl(),
    subSector: new FormControl(),
    filter: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    district: new FormControl(),
    subDistrict: new FormControl(),
    street: new FormControl(),
    complexName: new FormControl(),
    complexNo: new FormControl(),
    phoneNo: new FormControl(),
    fax: new FormControl(),
    email: new FormControl(),
    website: new FormControl(),
    postalCode: new FormControl(),
    poBox: new FormControl(),
    nationalId: new FormControl(),
    noOfEmployees: new FormControl(),
    businessStatus: new FormControl(),
    corporateType: new FormControl(),
    partnerNationality: new FormControl(),
    accountTypeId: new FormControl(),
    pageSize: new FormControl(10),
    pageNumber: new FormControl(0),
  });
  public getCorporateTypes() {
    this.baseService.getAllItems(Controllers.CorporateType).subscribe(response => {
      this.corporateTypes = response;
      this.filteredCorporateTypesOptions = this.getFormControlByName('corporateType').valueChanges.pipe(
        startWith(''),
        map(value => this.filterCorporateTypes(value))
      );
    })
  }
  public getAccountTypes() {
    this.baseService.getAllItems(Controllers.AccountType).subscribe(response => {
      this.accountTypes = response;
      this.filteredAccountTypesOptions = this.getFormControlByName('accountTypeId').valueChanges.pipe(
        startWith(''),
        map(value => this.filterAccountTypes(value))
      );
    })
  }

  public getFilters() {
    this.baseService.getAllItems(Controllers.Filters).subscribe(response => {
      this.filters = response;
      this.filteredFiltersOptions = this.getFormControlByName('filter').valueChanges.pipe(
        startWith(''),
        map(value => this.filterFilters(value))
      );
    })
  }
  public getGroups() {
    this.baseService.getAllItems(Controllers.Groups).subscribe(response => {
      this.groups = response;
      this.filteredGroupsOptions = this.getFormControlByName('group').valueChanges.pipe(
        startWith(''),
        map(value => this.filterGroups(value))
      );
    })
  }
  public getSectors() {
    this.baseService.getAllItems(Controllers.Sector).subscribe(response => {
      this.sectors = response;
      this.filteredSectorsOptions = this.getFormControlByName('sector').valueChanges.pipe(
        startWith(''),
        map(value => this.filterSectors(value))
      );
    })
  }
  public getSubSectors() {
    this.baseService.getAllItems(Controllers.SubSector).subscribe(response => {
      this.subSectors = response;
      this.filteredSubSectorsOptions = this.getFormControlByName('subSector').valueChanges.pipe(
        startWith(''),
        map(value => this.filterSubSectors(value))
      );
    })
  }
  public getCountries() {
    this.baseService.getAllItems(Controllers.Country).subscribe(response => {
      this.countries = response;
      this.filteredCountriesOptions = this.getFormControlByName('country').valueChanges.pipe(
        startWith(''),
        map(value => this.filterCountries(value))
      );
    })
  }

  public getCities() {
    this.baseService.getAllItems(Controllers.City).subscribe(response => {
      this.cities = response;
      this.filteredCitiesOptions = this.getFormControlByName('city').valueChanges.pipe(
        startWith(''),
        map(value => this.filterCities(value))
      );
    })
  }
  public getPartnerNationalities() {
    this.baseService.getAllItems(Controllers.Nationality).subscribe(response => {
      this.nationalities = response;
      this.filteredNationalitiesOptions = this.getFormControlByName('partnerNationality').valueChanges.pipe(
        startWith(''),
        map(value => this.filterNationalities(value))
      );
    })
  }
  public getBusinessStatuses() {
    this.baseService.getAllItems(Controllers.BusinessStatus).subscribe(response => {
      this.businessStatuses = response;
      this.filteredBusinessStatusesOptions = this.getFormControlByName('businessStatus').valueChanges.pipe(
        startWith(''),
        map(value => this.filterBusinessStatuses(value))
      );
    })
  }
  public getNumberOfEmployees() {
    this.baseService.getAllItems(Controllers.NoOfEmployee).subscribe(response => {
      this.noOfEmployees = response;
      this.filteredNoOfEmployeesOptions = this.getFormControlByName('noOfEmployees').valueChanges.pipe(
        startWith(''),
        map(value => this.filterNoOfEmployees(value))
      );
    })
  }
  private filterJobTitles(value: string): JobTitle[] {
    const filterValue = value.toLowerCase();
    return this.jobTitles.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterNoOfEmployees(value: string): NoOfEmployee[] {
    const filterValue = value.toLowerCase();
    return this.noOfEmployees.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterBusinessStatuses(value: string): BusinessStatus[] {
    const filterValue = value.toLowerCase();
    return this.businessStatuses.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterNationalities(value: string): Nationality[] {
    const filterValue = value.toLowerCase();
    return this.nationalities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterFilters(value: string): Filters[] {
    const filterValue = value.toLowerCase();
    return this.filters.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterGroups(value: string): Groups[] {
    const filterValue = value.toLowerCase();
    return this.groups.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterSectors(value: string): Sector[] {
    const filterValue = value.toLowerCase();
    return this.sectors.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterSubSectors(value: string): SubSector[] {
    const filterValue = value.toLowerCase();
    return this.subSectors.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterAccountTypes(value: string): AccountType[] {
    const filterValue = value.toLowerCase();
    return this.accountTypes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private filterCorporateTypes(value: string): CorporateType[] {
    const filterValue = value.toLowerCase();
    return this.corporateTypes.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  public accountTypeSelected(event) {
    const accountTypeId = this.accountTypes.find(x => x.name === event.option.value).id
    this.getFormControlByName('accountType').setValue(accountTypeId)
  }
  public getFormControlByName(controlName: string): FormControl {
    return this.businessSearchForm.get(controlName) as FormControl;
  }
  public onSearchBuiness() {
    this.businessSearchClicked.emit(this.businessSearchForm.value);
  }
}
