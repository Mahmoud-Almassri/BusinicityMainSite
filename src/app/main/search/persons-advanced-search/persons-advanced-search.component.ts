import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Controllers } from 'src/app/shared/global-variables/api-config';
import { Sector, SubSector, City, Filters, Groups, JobTitle, NoOfEmployee, Country, Nationality, AccountType, CorporateType, BusinessStatus, BasicModel } from 'src/app/shared/models/loockups.model';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';

@Component({
  selector: 'app-persons-advanced-search',
  templateUrl: './persons-advanced-search.component.html',
  styleUrls: ['./persons-advanced-search.component.scss']
})
export class PersonsAdvancedSearchComponent implements OnInit {

  @Output() personSearchClicked = new EventEmitter<any>();
  public sectors: Sector[];
  public subSectors: SubSector[];
  public cities: City[];
  public filters: Filters[];
  public groups: Groups[];
  public jobTitles: JobTitle[];
  public noOfEmployees: NoOfEmployee[];
  public countries: Country[];
  public nationalities: Nationality[];


  public filteredNoOfEmployeesOptions: Observable<NoOfEmployee[]>;
  public filteredFiltersOptions: Observable<Filters[]>;
  public filteredGroupsOptions: Observable<Groups[]>;
  public filteredSectorsOptions: Observable<Sector[]>;
  public filteredSubSectorsOptions: Observable<SubSector[]>;
  public filteredCountriesOptions: Observable<Country[]>;
  public filteredNationalitiesOptions: Observable<Nationality[]>;
  public filteredCitiesOptions: Observable<City[]>;
  public filteredJobTitlesOptions: Observable<JobTitle[]>;

  public filterControl = new FormControl();

  constructor(private baseService:BaseServiceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getCountries();
    this.getFilters();
    this.getJobTitles();
    this.getNumberOfEmployees();
    this.getSectors();
    this.getSubSectors();
    this.getGroups();

  }

  public personSearchForm = new FormGroup({
    sector: new FormControl(),
    subSector: new FormControl(),
    group: new FormControl(),
    filter: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    district: new FormControl(),
    subDistrict: new FormControl(),
    street: new FormControl(),
    gender: new FormControl(),
    jobTitle: new FormControl(),
    noOfEmployees: new FormControl(),
    titleLevel: new FormControl(),
    phoneNo: new FormControl(),
    titleField: new FormControl(),
    pageSize: new FormControl(10),
    pageNumber: new FormControl(1),

  });
  public getJobTitles() {
    this.baseService.getAllItems(Controllers.JobTitle).subscribe(response => {
      this.jobTitles = response;
      this.filteredJobTitlesOptions = this.getFormControlByName('jobTitle').valueChanges.pipe(
        startWith(''),
        map(value => this.filterJobTitles(value))
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
      this.spinner.hide();
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
  public getFormControlByName(controlName: string): FormControl {
    return this.personSearchForm.get(controlName) as FormControl;
  }
  public onSearchPerson() {
    this.personSearchClicked.emit(this.personSearchForm.value);
  }
}
