
import type { ModuleData } from '../evolution-data';

export const executionModule: ModuleData = {
  name: "Исполнение сделок",
  revisions: {
    rev1: { tech: "Market Orders", period: "early", desc: "Простые рыночные ордера" },
    rev2: { tech: "Smart Routing", period: "early", desc: "Умная маршрутизация ордеров" },
    rev3: { tech: "TWAP/VWAP", period: "modern", desc: "Алгоритмы исполнения TWAP/VWAP" },
    rev4: { tech: "RL Execution", period: "modern", desc: "Исполнение на основе RL" },
    rev5: { tech: "Game-theoretic", period: "current", desc: "Игровые стратегии исполнения" }
  }
};
