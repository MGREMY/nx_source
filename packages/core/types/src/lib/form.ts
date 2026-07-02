import { FormArray, FormControl, FormGroup } from '@angular/forms';

type FlagExcludeType<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? never : Key;
};

type AllowedNames<Base, Type> = FlagExcludeType<Base, Type>[keyof Base];

type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type ExcludeFuncType<T> = OmitType<T, Function>;

type FormItems<T> = [T] extends [boolean | number | string | null | undefined | Date]
  ? FormControl<T>
  : [T] extends [(infer U)[]]
    ? FormArray<FormItems<U>>
    : FormGroup<FormType<T>>;

export type FormType<T> = {
  [K in keyof ExcludeFuncType<T>]: FormItems<T[K]>;
};
