import { Preferences } from "./preferences";
import { Location } from "./location";

export type User = {
  _id: string,
  age: number | string,
  eyeColor: string,
  name: string,
  gender: string,
  location: Location,
  preferences: Preferences,
}
