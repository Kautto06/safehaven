// helpers/calendario.ts
export const generateCalendar = (currentDate: Date): number[][] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
  
    // Primer día del mes
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Último día del mes
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  
    // Rellenar el calendario con días (matriz 6x7)
    const weeks: number[][] = [];
    let week: number[] = [];
    let dayCount = 1;
  
    // Días vacíos antes del primer día
    for (let i = 0; i < firstDayOfMonth; i++) {
      week.push(0); // Día vacío
    }
  
    for (let i = firstDayOfMonth; i < 7; i++) {
      week.push(dayCount++);
    }
    weeks.push(week);
  
    while (dayCount <= lastDateOfMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        week.push(dayCount <= lastDateOfMonth ? dayCount++ : 0);
      }
      weeks.push(week);
    }
  
    return weeks;
  };
  
  export const getMonthYearString = (date: Date): string => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  