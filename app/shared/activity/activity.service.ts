import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {Activity} from "./activity";
import {LogUtil} from "../../utils/log-util";

var Sqlite = require("nativescript-sqlite");
var R = require("ramda");

@Injectable()
export class ActivityService {

  private database: any;

  constructor() {
    (new Sqlite("activities.db")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, activity TEXT, points NUMBER)").then(id => {
        this.database = db;
      }, LogUtil.log("CREATE TABLE ERROR"));
    }, LogUtil.log("OPEN DB ERROR"));
  }

  create = (activity: Activity) => this.database.execSQL("INSERT INTO activities (activity, points) VALUES (?, ?)", [activity.activity, activity.points]);

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
