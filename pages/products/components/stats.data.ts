export interface IMenuItem {
    name: string;
    icon: string;
    unit: string;
  }
  
  export const STATS_DATA: IMenuItem[] = [

    {
      name: "Наименований",
      icon: "heroicons:cube",
      unit: "шт",
     
    },
    {
      name: "Товарных единиц",
      icon: "heroicons:cube",
      unit: "ед.",
     
    },
    {
      name: "Сумма по цене поставки",
      icon: "ph:money",
      unit: "uzs",

    },
    {
      name: "Сумма по цене продажи",
      icon: "ph:money",
      unit: "uzs",

    },
  
  ];
  
  
  