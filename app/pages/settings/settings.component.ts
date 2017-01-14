import {Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from "@angular/core";
import {Activity} from "../../shared/activity/activity";
import {ActivityService} from "../../shared/activity/activity.service";
import {ValidationUtil} from "../../utils/validation-util";
import {LogUtil} from "../../utils/log-util";
import {Day} from "../../shared/day/day";

var R = require("ramda");

@Component({
  providers: [ActivityService],
  selector: "settings",
  styleUrls: ["pages/settings/settings-common.css", "pages/settings/settings.css"],
  templateUrl: "pages/settings/settings.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  day: Day = new Day();
  activity: string = '';
  points: string = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.load();
  }

  resetParams = () => {
    this.activity = '';
    this.points = '';
  }

  add(activity: string, points: number) {
    var validate = R.pipe(
      ValidationUtil.isNumber('points'),
      ValidationUtil.isTruthy('points'),
      ValidationUtil.isTruthy('activity'),
      ValidationUtil.wrapUp
    );
    validate(new Activity(activity, points))
      .then(this.activityService.create)
      .then(this.load)
      .catch(LogUtil.log("INSERT ERROR"));
  }

  load = () => {
    this.day.activities = [];
    this.activityService.fetch()
      .then(this.activityService.createList(this.day.activities))
      .then(this.setActivities(this.day.activities))
      .then(this.resetParams);
  }

  setActivities = (arr) => (res) => arr = res;

}
