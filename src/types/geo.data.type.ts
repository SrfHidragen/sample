export type StateType = {
  id: string;
  name: string;
};
export interface GeoDataListType {
  districts: StateType[];
  states: StateType[];
  panchayaths: StateType[];
  wards: StateType[];
}
