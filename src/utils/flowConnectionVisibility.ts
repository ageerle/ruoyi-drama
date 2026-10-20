interface ConnectionEndpoints { source: string; target: string }

/** Display filtering only: shared references remain bound to every original shot. */
export function visibleFlowConnections<T extends ConnectionEndpoints>(
  connections: readonly T[], selectedId: string,
): T[] {
  const seen = new Set<string>();
  return connections.filter(connection => {
    if (!selectedId || (connection.source !== selectedId && connection.target !== selectedId)) return false;
    const key = JSON.stringify([connection.source, connection.target]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
