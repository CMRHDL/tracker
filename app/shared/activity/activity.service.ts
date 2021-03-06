import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {Activity} from "./activity";
import {LogUtil} from "../../utils/log-util";
import * as moment from 'moment';

var Sqlite = require("nativescript-sqlite");
var R = require("ramda");

@Injectable()
export class ActivityService {

  private database: any;

  readonly INSERT_ACTIVITIES = "INSERT INTO activities (activity, points) VALUES (?, ?)";

  createQueries: Array<string> = [
    "CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, activity TEXT, points NUMBER)",
    "CREATE TABLE IF NOT EXISTS days (id INTEGER PRIMARY KEY AUTOINCREMENT, day_milli NUMBER, day STRING, activity_id TEXT, done BOOLEAN)",
  ];

  constructor() {
    (new Sqlite("activities.db")).then(db => {
      this.database = db;
      this.initTable(this.createQueries);
    }, LogUtil.log("OPEN DB ERROR"));
  }

  initTable = (arr: Array<string>) => {
    if(arr.length) this.database.execSQL(arr.shift()).then(this.initTable(arr)).catch(LogUtil.log("CREATE TABLE ERROR"))
  }

  create = (activity: Activity) => this.database.execSQL(this.INSERT_ACTIVITIES, [activity.activity, activity.points]);

  fetch = () => this.database.all("SELECT * FROM activities");

  fetchNew = (id) => this.database.all("SELECT * FROM activities WHERE id > ?", [id]);

  update(activity: Activity) {
  }

  buildEntity = (row) => new Activity(row[1], row[2], row[0]);

  createList = R.curry((arr, newActivities) => newActivities.reduce((i, c) => {
    i.push(this.buildEntity(c));
    return i;
  }, arr));

}
