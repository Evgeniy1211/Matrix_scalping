
import { dataCollectionModule } from './data-collection';
import { dataProcessingModule } from './data-processing';
import { featureEngineeringModule } from './feature-engineering';
import { signalGenerationModule } from './signal-generation';
import { riskManagementModule } from './risk-management';
import { executionModule } from './execution';
import { marketAdaptationModule } from './market-adaptation';
import { visualizationModule } from './visualization';
import type { ModuleData } from '../evolution-data';

// Собираем все модули в одном месте
export const allModules: ModuleData[] = [
  dataCollectionModule,
  dataProcessingModule,
  featureEngineeringModule,
  signalGenerationModule,
  riskManagementModule,
  executionModule,
  marketAdaptationModule,
  visualizationModule
];

// Экспортируем отдельные модули для возможности их индивидуального использования
export {
  dataCollectionModule,
  dataProcessingModule,
  featureEngineeringModule,
  signalGenerationModule,
  riskManagementModule,
  executionModule,
  marketAdaptationModule,
  visualizationModule
};

// Функция для получения модуля по имени
export function getModuleByName(name: string): ModuleData | undefined {
  return allModules.find(module => module.name === name);
}

// Функция для получения всех названий модулей
export function getAllModuleNames(): string[] {
  return allModules.map(module => module.name);
}

console.log('=== МОДУЛЬНАЯ СТРУКТУРА ЗАГРУЖЕНА ===');
console.log('Количество модулей:', allModules.length);
console.log('Названия модулей:', getAllModuleNames());
