import { SettingsComponent } from "./pages/settings/settings.component";
import { SummaryComponent } from "./pages/summary/summary.component";
import { DayComponent } from "./pages/day/day.component";

export const routes = [
  { path: "", component: DayComponent },
  { path: "settings", component: SettingsComponent },
  { path: "summary", component: SummaryComponent },
];

export const navigatableComponents = [
  SettingsComponent,
  SummaryComponent,
  DayComponent,
];
