import {Router} from "@angular/router";
import {Page} from "ui/page";
import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Day} from "../../shared/day/day";
import {Activity} from "../../shared/activity/activity";
import {ActivityService} from "../../shared/activity/activity.service";
import {LogUtil} from "../../utils/log-util";
import {Util} from "../../utils/util";
import * as moment from "moment";
import {DayService} from "../../shared/day/day.service";

var R = require("ramda");

@Component({
  providers: [ActivityService],
  selector: "app",
  styleUrls: ["pages/day/day-common.css", "pages/day/day.css"],
  templateUrl: "pages/day/day.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit {

  day: Day = new Day();

  constructor(private router: Router, private page: Page, private activityService: ActivityService, private dayService: DayService) {
  }

  ngOnInit() {
    moment.locale('de');
    this.day.activities = [];
    this.activityService.fetch()
      .then(this.activityService.createList(this.day.activities))
      .then(this.setActivities(this.day.activities));
  }

  goto(location) {
    this.router.navigate([`/${location}`])
  }

  refresh() {
    this.activityService.fetchNew(Util.max(this.day.activities, 'id'))
      .then(this.activityService.createList(this.day.activities))
      .then(this.setActivities(this.day.activities));
  }

  wrapUpDay = () => this.dayService.saveDay(this.day.activities);

  setActivities = (arr) => (res) => arr = res;

}
