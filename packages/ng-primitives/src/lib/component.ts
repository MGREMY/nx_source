import { inject, InjectionToken, type ValueProvider } from '@angular/core';
import type { ClassProp, StringToBoolean } from 'class-variance-authority/types';
import { clsx, type ClassValue } from 'clsx';

type MgnpCvaSchema = Record<string, string | number | symbol | Record<string, ClassValue>>;

type VariantKeys<V> = V extends Record<string, ClassValue> ? keyof V & (string | number) : V;

type MgnpCvaVariants<T extends MgnpCvaSchema> = {
  [K in keyof T]?: StringToBoolean<VariantKeys<T[K]>> | null | undefined;
} & ClassProp;

function createMgnpComponentCva<T extends MgnpCvaSchema>(
  name: string,
  options?: { base?: ClassValue }
): (props?: MgnpCvaVariants<T>) => string {
  const prefix = `mgnp-${name}`;
  const base = options?.base ?? `${prefix} group/${prefix}`;

  return (props?: MgnpCvaVariants<T>): string => {
    const variantClasses = props
      ? Object.entries(props)
          .filter(
            ([key, value]) =>
              key !== 'class' && key !== 'className' && value != null && value !== ''
          )
          .map(([key, value]) => `${prefix}-${key}-${String(value)}`)
      : [];

    return clsx(base, variantClasses, props?.class, props?.className);
  };
}

function createMgnpComponentConfig<T>(
  name: string,
  defaultConfig: T
): [provider: (config: Partial<T>) => ValueProvider, injector: () => T] {
  const tokenName = `Mgnp${name}Config`;

  const token = new InjectionToken<T>(tokenName);

  const provideConfig: (config: Partial<T>) => ValueProvider = (config) => {
    return { provide: token, useValue: { ...defaultConfig, ...config } };
  };

  const injectConfig: () => T = () => {
    return inject(token, { optional: true }) ?? defaultConfig;
  };

  return [provideConfig, injectConfig];
}

export function createMgnpComponent<const Cva extends MgnpCvaSchema>(
  name: string,
  defaultConfig: Cva
): [
  cva: (props?: MgnpCvaVariants<Cva>) => string,
  provider: (config: Partial<Cva>) => ValueProvider,
  injector: () => Cva,
] {
  const cva = createMgnpComponentCva<Cva>(name);
  const [provider, injector] = createMgnpComponentConfig(name, defaultConfig);

  return [cva, provider, injector];
}
