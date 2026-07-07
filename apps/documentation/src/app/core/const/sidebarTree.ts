import { SidebarTree } from '../../components/app-sidebar';

import {
  heroAdjustmentsVertical,
  heroArrowRightOnRectangle,
  heroBookmark,
  heroBookOpen,
  heroDocumentMagnifyingGlass,
  heroLockClosed,
  heroQuestionMarkCircle,
  heroSquaresPlus,
  heroTruck,
  heroWrenchScrewdriver,
} from '@ng-icons/heroicons/outline';

export default [
  {
    label: 'Core',
    path: '/documentation/core',
    icon: heroBookOpen,
    tree: [
      {
        label: 'Guards',
        path: '/documentation/core/guards',
        icon: heroLockClosed,
      },
      {
        label: 'Interceptors',
        path: '/documentation/core/interceptors',
        icon: heroDocumentMagnifyingGlass,
      },
      {
        label: 'Pipes',
        path: '/documentation/core/pipes',
        icon: heroArrowRightOnRectangle,
      },
      {
        label: 'Resolvers',
        path: '/documentation/core/resolvers',
        icon: heroQuestionMarkCircle,
      },
      {
        label: 'Utils',
        path: '/documentation/core/utils',
        icon: heroWrenchScrewdriver,
      },
      {
        label: 'Services',
        path: '/documentation/core/services',
        icon: heroAdjustmentsVertical,
        tree: [
          {
            label: 'Environment',
            path: '/documentation/core/services/environment',
          },
          {
            label: 'Config',
            path: '/documentation/core/services/config',
          },
          {
            label: 'Auth',
            path: '/documentation/core/services/auth',
          },
          {
            label: 'Storage',
            path: '/documentation/core/services/storage',
          },
          {
            label: 'Translation',
            path: '/documentation/core/services/translation',
          },
          {
            label: 'Theme',
            path: '/documentation/core/services/theme',
          },
        ],
      },
    ],
  },
  {
    label: 'Ng Primitives',
    path: '/documentation/ng-primitives',
    icon: heroBookmark,
    tree: [
      {
        label: 'Accordion',
        path: '/documentation/ng-primitives/accordion',
      },
      {
        label: 'Breadcrumb',
        path: '/documentation/ng-primitives/breadcrumb',
      },
      {
        label: 'Button',
        path: '/documentation/ng-primitives/button',
      },
      {
        label: 'Checkbox',
        path: '/documentation/ng-primitives/checkbox',
      },
      {
        label: 'Combobox',
        path: '/documentation/ng-primitives/combobox',
      },
      {
        label: 'Dialog',
        path: '/documentation/ng-primitives/dialog',
      },
      {
        label: 'Form field',
        path: '/documentation/ng-primitives/form-field',
      },
      {
        label: 'Input',
        path: '/documentation/ng-primitives/input',
      },
      {
        label: 'Menu',
        path: '/documentation/ng-primitives/menu',
      },
      {
        label: 'Pagination',
        path: '/documentation/ng-primitives/pagination',
      },
      {
        label: 'Switch',
        path: '/documentation/ng-primitives/switch',
      },
      {
        label: 'Toast',
        path: '/documentation/ng-primitives/toast',
      },
      {
        label: 'Tooltip',
        path: '/documentation/ng-primitives/tooltip',
      },
      {
        label: 'Extended',
        icon: heroSquaresPlus,
        tree: [
          {
            label: 'Loader',
            path: '/documentation/ng-primitives/extended/loader',
          },
          {
            label: 'Navbar',
            path: '/documentation/ng-primitives/extended/navbar',
          },
          {
            label: 'Table',
            path: '/documentation/ng-primitives/extended/table',
          },
        ],
      },
    ],
  },
  {
    label: 'Plugin',
    tree: [
      {
        label: 'Generator',
        path: '/documentation/plugin/generator',
        icon: heroTruck,
      },
    ],
  },
] as SidebarTree[];
