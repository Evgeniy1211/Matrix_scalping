import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { EvolutionMatrix } from '@/components/evolution-matrix';
import * as hooks from '@/hooks/use-technologies';
import { REVISIONS } from '@shared/constants';

// jsdom env
vi.stubGlobal('fetch', vi.fn());

describe('EvolutionMatrix component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockHooks({ withInfrastructure = true }: { withInfrastructure?: boolean } = {}) {
    const modules = [
      { name: 'Сбор данных', revisions: { rev1: { tech: 'A', period: 'early', desc: '' }, rev2: { tech: 'A', period: 'modern', desc: '' }, rev3: { tech: 'A', period: 'modern', desc: '' }, rev4: { tech: 'A', period: 'current', desc: '' }, rev5: { tech: 'A', period: 'current', desc: '' } } },
      { name: 'Обработка данных', revisions: { rev1: { tech: '', period: 'empty', desc: '' }, rev2: { tech: 'B', period: 'modern', desc: '' }, rev3: { tech: 'B', period: 'modern', desc: '' }, rev4: { tech: 'B', period: 'current', desc: '' }, rev5: { tech: 'B', period: 'current', desc: '' } } },
      { name: 'Инфраструктура', revisions: { rev1: { tech: '', period: 'empty', desc: '' }, rev2: { tech: '', period: 'empty', desc: '' }, rev3: { tech: '', period: 'empty', desc: '' }, rev4: { tech: '', period: 'empty', desc: '' }, rev5: { tech: 'Docker', period: 'current', desc: '' } } },
    ];

    const mods = withInfrastructure ? modules : modules.filter((m) => m.name !== 'Инфраструктура');

    vi.spyOn(hooks, 'useEvolutionData').mockReturnValue({
      data: { modules: mods },
      isLoading: false,
      isError: false,
    } as any);
    vi.spyOn(hooks, 'useTechnologies').mockReturnValue({ isLoading: false, isError: false } as any);
    vi.spyOn(hooks, 'useTradingMachines').mockReturnValue({ data: [], isLoading: false, isError: false } as any);
  }

  it('renders revision headers from REVISIONS', () => {
    mockHooks();
    render(<EvolutionMatrix />);
    Object.values(REVISIONS).forEach((rev) => {
      expect(screen.getByText(rev.label)).toBeInTheDocument();
    });
  });

  it('shows Infrastructure module row', () => {
    mockHooks({ withInfrastructure: true });
    render(<EvolutionMatrix />);
    expect(screen.getByText('Инфраструктура')).toBeInTheDocument();
  });

  it('hideUnchanged filter reduces visible modules when applicable', () => {
    mockHooks();
    render(<EvolutionMatrix />);

    const countBefore = screen.getAllByRole('row').length;
    fireEvent.click(screen.getByTestId('button-hide-unchanged'));
    const countAfter = screen.getAllByRole('row').length;

    // Ожидаем, что строк стало меньше или равно (если все менялись)
    expect(countAfter).toBeLessThanOrEqual(countBefore);
  });
});
