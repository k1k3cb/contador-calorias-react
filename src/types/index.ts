export interface Category {
  id: number;
  name: string;
}

export interface Activity {
  id: string;
  category: number;
  activityName: string;
  calories: number;
}
