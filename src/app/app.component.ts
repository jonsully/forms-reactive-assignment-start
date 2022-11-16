import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  status = ["stable", "critical", "finished"];

  ngOnInit() {
    this.projectForm = new FormGroup({
      project: new FormControl(
        null,
        // [Validators.required, this.forbiddenProjectName.bind(this)]
        [Validators.required],
        this.forbiddenProjects
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(this.status[0]),
    });
    this.projectForm.statusChanges.subscribe((status) => console.log(status));
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenProjects(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      // console.log(control.value);
      setTimeout(() => {
        if (control.value === "test") {
          resolve({ projectIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // forbiddenProjectName(control: FormControl) {
  //   if (control.value === "test") {
  //     return { projectIsForbidden: true };
  //   } else {
  //     return null;
  //   }
  // }
}
