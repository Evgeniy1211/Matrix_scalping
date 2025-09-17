import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { treeData } from "@/data/evolution-data";
import * as d3 from "d3";

export function TechnologyTree() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 400;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    // Create tree layout
    const tree = d3.tree<any>()
      .size([height - 40, width - 100]);

    const root = d3.hierarchy(treeData);
    tree(root);

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Draw links
    g.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, any>()
        .x(d => d.y + 50)
        .y(d => d.x + 20));

    // Draw nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y + 50},${d.x + 20})`);

    node.append('circle')
      .attr('r', 6)
      .style('fill', d => {
        if (!d.children && !d._children) return 'hsl(38 92% 50%)'; // leaf nodes - secondary
        return d.depth === 0 ? 'hsl(221 83% 53%)' : 'hsl(142 76% 36%)'; // root: primary, internal: accent
      });

    // Add labels
    node.append('text')
      .attr('class', 'node-label')
      .attr('dy', 3)
      .attr('x', d => d.children || d._children ? -10 : 10)
      .style('text-anchor', d => d.children || d._children ? 'end' : 'start')
      .text(d => d.data.name);

    // Add tooltip functionality to nodes
    node.on('mouseenter', function(event, d) {
      showTooltip(event, d.data.description || d.data.name);
    }).on('mouseleave', hideTooltip);

    function showTooltip(event: MouseEvent, content: string) {
      const tooltip = d3.select('body').selectAll('.tree-tooltip')
        .data([null]);
      
      const tooltipEnter = tooltip.enter()
        .append('div')
        .attr('class', 'tree-tooltip')
        .style('position', 'absolute')
        .style('background', 'hsl(var(--foreground))')
        .style('color', 'hsl(var(--background))')
        .style('padding', '8px 12px')
        .style('border-radius', '6px')
        .style('font-size', '12px')
        .style('max-width', '200px')
        .style('z-index', '1000')
        .style('opacity', '0')
        .style('pointer-events', 'none')
        .style('transition', 'opacity 0.2s ease');

      const tooltipUpdate = tooltip.merge(tooltipEnter);
      
      tooltipUpdate
        .text(content)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px')
        .style('opacity', '1');
    }

    function hideTooltip() {
      d3.select('.tree-tooltip')
        .style('opacity', '0');
    }

    // Cleanup function
    return () => {
      d3.select('.tree-tooltip').remove();
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Re-render the tree on resize
      const timer = setTimeout(() => {
        if (svgRef.current && containerRef.current) {
          // Trigger re-render by updating a dependency
          const event = new Event('resize');
          window.dispatchEvent(event);
        }
      }, 100);

      return () => clearTimeout(timer);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lg:col-span-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Дерево эволюции технологий</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={containerRef} className="w-full border border-border rounded-md">
            <svg 
              ref={svgRef} 
              className="w-full h-96"
              data-testid="technology-tree-svg"
            />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>💡 Наведите курсор на узлы для дополнительной информации</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
