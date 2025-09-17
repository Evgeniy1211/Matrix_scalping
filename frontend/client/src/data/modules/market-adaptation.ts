
import type { ModuleData } from '../evolution-data';

export const marketAdaptationModule: ModuleData = {
  name: "Адаптация к рынку",
  revisions: {
    rev1: { tech: "", period: "empty", desc: "Отсутствие адаптации" },
    rev2: { tech: "Regime Detection", period: "early", desc: "Детекция режимов рынка" },
    rev3: { tech: "Online Learning", period: "modern", desc: "Онлайн обучение" },
    rev4: { tech: "Meta-Learning", period: "modern", desc: "Мета-обучение" },
    rev5: { tech: "Continual Learning", period: "current", desc: "Непрерывное обучение" }
  }
};
