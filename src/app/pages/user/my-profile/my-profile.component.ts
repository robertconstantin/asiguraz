import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../core/models/user/user.model';
import { UserService } from '../../../core/services/user/user.service';
import { AppStorageService } from '../../../core/services/base/app-storage.service';
import { UserUpdate } from '../../../core/models/user/user-update.model';
import { AppSession } from '../../../core/models/user/app-session.model';
import { GlobalEventsService } from '../../../core/services/base/global-events.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  public user: User = new User();
  public userCopy: User = new User();
  public userModified = false;
  // form
  public myProfileForm: FormGroup;
  public myProfileOutput: any;
  public submittedForm: any;

  constructor(
    private globalEventsService: GlobalEventsService,
    private userService: UserService,
    private appStorageService: AppStorageService,
    private formBuilder: FormBuilder
  ) {
    // my profile validation
    this.myProfileForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.myProfileForm.valueChanges.subscribe(data => {
      this.myProfileOutput = data;
    });
    const appSession = this.appStorageService.getAppSession();
    if (appSession) {
      this.user = appSession.user;
      this.userCopy = Object.assign({}, this.user);
    }
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.undoMyProfile();
  }

  objectHasBeenModified() {
    const equal = JSON.stringify(this.user) !== JSON.stringify(this.userCopy);
    return equal;
  }

  updateMyProfile() {
    this.submittedForm = this.myProfileForm.value;
    for (const i in this.myProfileForm.controls) {
      if (this.myProfileForm.controls.hasOwnProperty(i)) {
        this.myProfileForm.controls[i].markAsTouched();
      }
    }
    if (this.myProfileForm.valid) {
      const userUpdate = new UserUpdate(this.user);
      this.userService.update(userUpdate).then((appSession: AppSession) => {
        this.appStorageService.removeAppSession();
        this.appStorageService.setAppSession(appSession, true);
        this.user = appSession.user;
        this.globalEventsService.currentUser.emit(this.user);
        this.userCopy = Object.assign({}, this.user);
      });
    }
  }

  undoMyProfile() {
    this.user = Object.assign({}, this.userCopy);
  }

}
