import { Component, OnInit , EventEmitter, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Details } from '../model1/Details'; 
import { UsersDataService } from '../services/users-data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-table1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {
  ratings: number[] = Array.from({ length: 101 }, (_, i) => i);
  userform1: FormGroup;
  userform2: FormGroup
  isFormsubmitted: boolean = false;
  selectedQuarter: string = '';  
  isDateDisabled = false;
  maxDate: string = '';
  minDate: string = '';
  dynamicHeading: string = '';
  details: Details = {} as Details;
  UserId: string;
  user: any;

  constructor(private userdataservice :UsersDataService , private services: UsersDataService, private http: HttpClient , private route: ActivatedRoute) {
    this.userform1 = new FormGroup({
      empname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mngname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      role: new FormControl('', [Validators.required, Validators.minLength(4)]),
      subdate: new FormControl('', [Validators.required]),
     
    });

    this.userform2 = new FormGroup({
      goals: new FormControl(''),
      achievements: new FormControl(''),
      expectations: new FormControl(''),
      remarks: new FormControl(''),
    });


  }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.UserId = params['id'];
      this.userdataservice.GetUserById(this.UserId)
        .subscribe(res => {
 
          this.user = res;
          this.userform1.patchValue({
            empname: this.user.empname,
            mngname: this.user.mngname,
            role: this.user.role
          });
        })
    });
 
 
  }

  setInitialQuarter() {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 1 && currentMonth <= 3) {
      this.selectedQuarter = 'Q1';
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      this.selectedQuarter = 'Q2';
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      this.selectedQuarter = 'Q3';
    } else {
      this.selectedQuarter = 'Q4';
    }
    this.updateDateInputFields();
    this.updateValidators();
  }

  onQuarterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedQuarter = target.value;
    this.updateDateInputFields();
    this.updateValidators();
    this.dynamicHeading = this.selectedQuarter ? `Welcome to ${this.selectedQuarter}` : '';
    this.userform2.reset();
  }

  updateDateInputFields() {
    const currentYear = new Date().getFullYear();
    switch (this.selectedQuarter) {
      case 'Q1':
        this.minDate = `${currentYear}-01-01`;
        this.maxDate = `${currentYear}-03-31`;
        break;
      case 'Q2':
        this.minDate = `${currentYear}-04-01`;
        this.maxDate = `${currentYear}-06-30`;
        break;
      case 'Q3':
        this.minDate = `${currentYear}-07-01`;
        this.maxDate = `${currentYear}-09-30`;
        break;
      case 'Q4':
        this.minDate = `${currentYear}-10-01`;
        this.maxDate = `${currentYear}-12-31`;
        break;
      default:
        this.minDate = '';
        this.maxDate = '';
        break;
    }
  }

  updateValidators() {
    const quarters = ['q1', 'q2', 'q3', 'q4'];

    quarters.forEach(quarter => {
      const isQuarterSelected = this.selectedQuarter.toLowerCase() === quarter;
      const goalsControl = this.userform1.get(`goals${quarter}`);
      const achievementsControl = this.userform1.get(`achievements${quarter}`);
      const expectationsControl = this.userform1.get(`expectations${quarter}`);
      const remarksControl = this.userform1.get(`remarks${quarter}`);

      // Apply validators if the control exists
      if (goalsControl) {
        goalsControl.setValidators(isQuarterSelected ? [Validators.required, Validators.minLength(4)] : null);
      }
      if (achievementsControl) {
        achievementsControl.setValidators(isQuarterSelected ? [Validators.required, Validators.minLength(4)] : null);
      }
      if (expectationsControl) {
        expectationsControl.setValidators(isQuarterSelected ? [Validators.required, Validators.minLength(4)] : null);
      }
      if (remarksControl) {
        remarksControl.setValidators(isQuarterSelected ? [Validators.required, Validators.minLength(4)] : null);
      }
    });

    // Update the form validity status after changing validators
    this.userform1.updateValueAndValidity();
  }

  onSubmit() {
    const isFormValid = this.userform1.valid;
    this.isFormsubmitted = true;
    if (isFormValid) {
      this.details = this.userform1.value;
      // this.details = this.userform2.value;
      this.details.goals = this.userform2.value.goals;
      this.details.achievements = this.userform2.value.achievements;
      this.details.expectations = this.userform2.value.expectations;
      this.details.remarks = this.userform2.value.remarks;
      this.details.duration = this.selectedQuarter;
      this.services.Details(this.details).subscribe({
        error: (err) => {
          console.log(err)
          // console.error('Form Submission Failed', err);
          alert('Form Submission Failed. Please check your Details');
        }
      });
    } else {
      console.log('Form is Invalid');
    }
  }
}
