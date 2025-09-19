import type { ModuleData } from '../evolution-data';
import { dataCollectionModule } from './data-collection';
import { dataProcessingModule } from './data-processing';
import { executionModule } from './execution';
import { featureEngineeringModule } from './feature-engineering';
import { marketAdaptationModule } from './market-adaptation';
import { riskManagementModule } from './risk-management';
import { signalGenerationModule } from './signal-generation';
import { visualizationModule } from './visualization';

// Собираем все модули в одном месте
export const allModules: ModuleData[] = [
  dataCollectionModule,
  dataProcessingModule,
  featureEngineeringModule,
  signalGenerationModule,
  riskManagementModule,
  executionModule,
  marketAdaptationModule,
  visualizationModule,
];

// Экспортируем отдельные модули для возможности их индивидуального использования
export {
  dataCollectionModule,
  dataProcessingModule,
  executionModule,
  featureEngineeringModule,
  marketAdaptationModule,
  riskManagementModule,
  signalGenerationModule,
  visualizationModule,
};

// Функция для получения модуля по имени
export function getModuleByName(name: string): ModuleData | undefined {
  return allModules.find((module) => module.name === name);
}

// Функция для получения всех названий модулей
export function getAllModuleNames(): string[] {
  return allModules.map((module) => module.name);
}

console.log('=== МОДУЛЬНАЯ СТРУКТУРА ЗАГРУЖЕНА ===');
console.log('Количество модулей:', allModules.length);
console.log('Названия модулей:', getAllModuleNames());
