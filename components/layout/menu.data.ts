export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
  items?: { title: string; url: string }[];
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Товары",
    icon: "heroicons:cube",
    url: "/products",
    items: [
      { title: "Каталог", url: "/products/catalog" },
      { title: "Импорт", url: "/products/import" },
    ],
  },
  {
    name: "Продажи",
    icon: "heroicons:shopping-cart",
    url: "/order",
    items: [
      { title: "Новая продажа", url: "/order/new-order" },
      { title: "Все продажи", url: "/order/all" },
    ],
  },
  {
    name: "Клиенты и Агенты",
    icon: "heroicons:user-group",
    url: "/clients",
    items: [
        { title: "Все клиенты", url: "/clients/all" },
        { title: "Все агенты", url: "/clients/agents" },
        // { title: "Долги клиентов", url: "/clients/debts" },
      ],
  },
  {
    name: "Отчеты",
    icon: "heroicons:chart-pie",
    url: "/reports",
    items: [
        { title: "Магазин", url: "/reports/shop" },
        { title: "Товары", url: "/reports/products" },
        { title: "Продавцы", url: "/reports/sellers" },
      ],
  },
  {
    name: "Управление",
    icon: "uil:bag",
    url: "/management",
    items: [
        { title: "Сотрудники", url: "/management/employees" },
        { title: "Админ", url: "/management/admin" },
      ],
  },
  // {
  //   name: "Настройки",
  //   icon: "radix-icons:gear",
  //   url: "/settings",
  //   items: [
  //       { title: "Сотрудники", url: "/settings/employees" },
  //       { title: "Админ", url: "/settings/admin" },
  //     ],
  // },

];


