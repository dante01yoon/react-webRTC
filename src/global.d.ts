type Nullable<T> = T | null;

type Some<T> = {
  [P in keyof T]: T[P];
}