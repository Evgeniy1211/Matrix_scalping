
import type { ModuleData } from '../evolution-data';

export const dataProcessingModule: ModuleData = {
  name: "Обработка данных",
  revisions: {
    rev1: { tech: "Excel, CSV", period: "early", desc: "Ручная обработка в табличных редакторах" },
    rev2: { tech: "Pandas, NumPy", period: "early", desc: "Python библиотеки для анализа данных" },
    rev3: { tech: "Apache Spark", period: "modern", desc: "Распределённая обработка больших данных" },
    rev4: { tech: "Polars, DuckDB", period: "modern", desc: "Высокопроизводительная аналитика" },
    rev5: { tech: "Ray, Dask", period: "current", desc: "Масштабируемые вычисления" }
  }
};
