import { Stack } from './stack';

export abstract class Graph<T> {
  abstract addVertex(newVertex: GraphVertex<T>): Graph<T>;
  abstract getVertexByKey(vertexKey: string): GraphVertex<T>;
  abstract getNeighbors(vertex: GraphVertex<T>): GraphVertex<T>[];
  abstract getAllVertices(): GraphVertex<T>[];
  abstract getAllEdges(): GraphEdge[];
  abstract addEdge(edge: GraphEdge): Graph<T>;
  abstract deleteEdge(edge: GraphEdge): void;
  abstract findEdge(
    startVertex: GraphVertex<T>,
    endVertex: GraphVertex<T>,
  ): GraphEdge;
  abstract findVertexByKey(vertexKey: string): GraphVertex<T>;
  abstract getWeight(): number;
  abstract reverse(): Graph<T>;
  abstract getVerticesIndices(): { [key: string]: number };
  abstract getAdjacencyMatrix(): any[][];
  abstract toString(): string;
}
export abstract class GraphEdge {
  abstract getKey(): string;
  abstract reverse(): GraphEdge;
  abstract toString(): string;
}
export abstract class GraphVertex<T> {
  abstract addEdge(edge: GraphEdge): GraphVertex<T>;
  abstract deleteEdge(edge: GraphEdge): void;
  abstract getNeighbors(): GraphVertex<T>[];
  abstract getEdges(): GraphEdge[];
  abstract getDegree(): number;
  abstract hasEdge(requiredEdge: GraphEdge): boolean;
  abstract hasNeighbor(vertex: GraphVertex<T>): boolean;
  abstract findEdge(vertex: GraphVertex<T>): GraphEdge;
  abstract getKey(): string;
  abstract deleteAllEdges(): GraphVertex<T>;
  abstract toString(callback: (val: T) => string): string;
}

export interface GraphCallbacks<T> {
  allowTraversal: (
    previousVertex: GraphVertex<T>,
    currentVertex: GraphVertex<T>,
    nextVertex: GraphVertex<T>,
  ) => boolean;
  enterVertex: (
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T>,
  ) => any;
  leaveVertex: (
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T>,
  ) => any;
}

export interface GraphBridge {
  [key: string]: GraphEdge;
}

export abstract class GraphFactory {
  abstract depthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: GraphVertex<T>,
    callbacks: GraphCallbacks<T>,
  ): void;
  abstract breadthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: GraphVertex<T>,
    callbacks: GraphCallbacks<T>,
  ): void;

  abstract graphBridges<T>(graph: Graph<T>): GraphBridge;

  abstract bellmanFord<T>(
    graph: Graph<T>,
    startVertex: GraphVertex<T>,
  ): {
    distances: { [key: string]: number };
    previousVertices: { [key: string]: GraphVertex<T> };
  };

  abstract articulationPoints<T>(
    graph: Graph<T>,
  ): { [key: string]: GraphVertex<T> };

  abstract detectDirectedCycle<T>(
    graph: Graph<T>,
  ): { [key: string]: GraphVertex<T> };

  abstract detectUndirectedCycle<T>(
    graph: Graph<T>,
  ): { [key: string]: GraphVertex<T> };

  abstract detectUndirectedCycleUsingDisjointSet<T>(graph: Graph<T>): boolean;

  abstract dijkstra<T>(
    graph: Graph<T>,
    startVertex: GraphVertex<T>,
  ): {
    distances: { [key: string]: number };
    previousVertices: { [key: string]: GraphVertex<T> };
  };

  abstract eulerianPath<T>(graph: Graph<T>): GraphVertex<T>[];

  abstract floydWarshall<T>(
    graph: Graph<T>,
  ): {
    distances: { [key: string]: number };
    nextVertices: { [key: string]: GraphVertex<T> };
  };

  abstract hamiltonianCycle<T>(graph: Graph<T>): GraphVertex<T>[];
  abstract kruskal<T>(graph: Graph<T>): Graph<T>;
  abstract prim<T>(graph: Graph<T>): Graph<T>;
  abstract getVerticesSortedByDfsFinishTime<T>(graph: Graph<T>): Stack<T>;
  abstract topologicalSort<T>(graph: Graph<T>): GraphVertex<T>[];
  abstract bfTravellingSalesman<T>(graph: Graph<T>): GraphVertex<T>[];
}
