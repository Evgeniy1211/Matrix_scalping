import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TechnologyTree } from '@/components/technology-tree';
import * as hooks from '@/hooks/use-technologies';

vi.stubGlobal('fetch', vi.fn());

describe('TechnologyTree component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state', () => {
    vi.spyOn(hooks, 'useTreeData').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);
    render(<TechnologyTree />);
    expect(screen.getByText('Загрузка данных дерева...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.spyOn(hooks, 'useTreeData').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);
    render(<TechnologyTree />);
    expect(screen.getByText('Ошибка загрузки данных дерева')).toBeInTheDocument();
  });

  it('renders svg and labels for root and a child node', async () => {
    const treeData = {
      name: 'Root',
      description: 'Root node',
      children: [
        {
          name: 'Child',
          description: 'Child node',
        },
      ],
    };

    vi.spyOn(hooks, 'useTreeData').mockReturnValue({
      data: treeData as any,
      isLoading: false,
      isError: false,
    } as any);

    render(<TechnologyTree />);

    // SVG container exists
    const svg = await screen.findByTestId('technology-tree-svg');
    expect(svg).toBeInTheDocument();

    // D3 appends text nodes with labels; ensure both are present
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
