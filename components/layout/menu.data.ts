export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
  items?: { title: string; url: string }[];
}

let userRole: string | null = null;
if (typeof localStorage !== "undefined") {
  userRole = localStorage.getItem("role");
}

export const MENU_DATA: IMenuItem[] = [
   userRole !== "salesman" ? {
    name: "Товары",
    icon: "heroicons:cube",
    url: "/products",
    items: [
      { title: "Каталог", url: "/products/catalog" },
       userRole !== "admin" ?
      { title: "Импорт", url: "/products/import" } : null,
    ].filter(Boolean),
  } : null,
  {
    name: "Продажи",
    icon: "heroicons:shopping-cart",
    url: "/order",
    items: [ userRole !== "admin, director" ?
      { title: "Новая продажа", url: "/order/new-order" } : null,
      { title: "Все продажи", url: "/order/all" },
    ].filter(Boolean),
  },
  {
    name: "Клиенты и Агенты",
    icon: "heroicons:user-group",
    url: "/clients",
    items: [
       { title: "Все клиенты", url: "/clients/all" } ,
       userRole !== "manager" && userRole !== "salesman"  ?
      { title: "Все агенты", url: "/clients/agents" } : null,
    ].filter(Boolean),
  },
   userRole !== "salesman" ? 
  {
    name: "Отчеты",
    icon: "heroicons:chart-pie",
    url: "/reports",
    items: [
        { title: "Магазин", url: "/reports/shop" },
        { title: "Товары", url: "/reports/products" },
        { title: "Продавцы", url: "/reports/sellers" },
      ],
  } : null,
  // Проверяем, что роль пользователя не является ни "manager", ни "salesman"
  userRole !== "manager" && userRole !== "salesman" ? 
  {
    name: "Управление",
    icon: "uil:bag",
    url: "",
    items:  [
        { title: "Сотрудники", url: "/management/employees" },
      ],
  } 
  : null, 
].filter(Boolean); 
