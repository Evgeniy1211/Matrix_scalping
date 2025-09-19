/**
 * Module Name Mapping for Technology Database Update
 * Maps old camelCase names to actual module names
 */

export const moduleNameMapping = {
  // Old camelCase -> New actual module names
  'signalGeneration': 'Генерация сигналов',
  'featureEngineering': 'Feature Engineering',
  'dataCollection': 'Сбор данных',
  'execution': 'Исполнение сделок',
  'marketAdaptation': 'Адаптация к рынку',
  'dataProcessing': 'Обработка данных',
  'riskManagement': 'Риск-менеджмент',
  'visualization': 'Визуализация и мониторинг',
  
  // Old string variants to new actual names
  'Визуализация и мониторинг': 'Визуализация и мониторинг',
  'Генерация сигналов': 'Генерация сигналов',
} as const;

export function updateModuleReferences(applicableModules: string[]): string[] {
  return applicableModules.map(moduleName => {
    if (moduleNameMapping[moduleName as keyof typeof moduleNameMapping]) {
      return moduleNameMapping[moduleName as keyof typeof moduleNameMapping];
    }
    return moduleName; // Keep as-is if no mapping found
  });
}