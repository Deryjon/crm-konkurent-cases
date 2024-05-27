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
      { title: "Удаленные товары", url: "/products/arxiv" },
      { title: "Брак товары", url: "/products/defective" },
       userRole !== "admin" ?
      { title: "Импорт", url: "/products/import" } : null,
    ].filter(Boolean),
  } : null,
  {
    name: "Продажи",
    icon: "heroicons:shopping-cart",
    url: "/order",
    items: [ userRole !== "admin" && userRole !== "manager"  ?
      { title: "Новая продажа", url: "/order/new-order" } : null,
      userRole !== "manager" && userRole !== "salesman"  ?

      { title: "Все продажи", url: "/order/all" } : null,
      { title: "Возврат", url: "/order/archive-order" },
    ].filter(Boolean),
  }, userRole !== "manager"  ?
  {
    name: "Клиенты и Агенты",
    icon: "heroicons:user-group",
    url: "/clients",
    items: [ 
       { title: "Все клиенты", url: "/clients/all" } ,
       userRole !== "salesman"  ?
      { title: "Все агенты", url: "/clients/agents" } : null,
    ].filter(Boolean),
  } : null,
   userRole !== "salesman" ? 
  {
    name: "Отчеты",
    icon: "heroicons:chart-pie",
    url: "/analytics",
    items: [
        { title: "Магазин", url: "/analytics/shop" },
      ],
  } : null,
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
