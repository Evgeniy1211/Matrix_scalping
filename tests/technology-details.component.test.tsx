import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';

import { TechnologyDetails } from '@/components/technology-details';
import * as hooks from '@/hooks/use-technologies';

vi.stubGlobal('fetch', vi.fn());

const technologies = [
  {
    id: 't1',
    name: 'Pandas',
    fullName: 'Pandas Library',
    description: 'Data processing library',
    category: 'processing',
    periods: { start: 2012 },
    evolution: {},
    applicableModules: ['Обработка данных'],
    advantages: [],
    disadvantages: [],
    useCases: [],
    sources: [],
  },
  {
    id: 't2',
    name: 'Docker',
    description: 'Container runtime',
    category: 'infrastructure',
    periods: { start: 2014 },
    evolution: {},
    applicableModules: ['Инфраструктура'],
    advantages: [],
    disadvantages: [],
    useCases: [],
    sources: [],
  },
];

describe('TechnologyDetails component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(hooks, 'useTechnologies').mockReturnValue({
      data: technologies as any,
      isLoading: false,
      isError: false,
    } as any);
  });

  it('filters list by search query', () => {
    render(<TechnologyDetails />);
    const search = screen.getByPlaceholderText('Поиск технологий...') as HTMLInputElement;
    fireEvent.change(search, { target: { value: 'Pandas' } });
    expect(screen.getByText('Pandas')).toBeInTheDocument();
    expect(screen.queryByText('Docker')).toBeNull();
  });

  it('module filter shows only selected module items', () => {
    render(<TechnologyDetails moduleFilter="Инфраструктура" />);
    // В списке должен остаться Docker, а Pandas отфильтроваться
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.queryByText('Pandas')).toBeNull();
  });
});
