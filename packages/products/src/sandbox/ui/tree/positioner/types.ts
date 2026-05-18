import { GNode, Graph } from "@magic/graph/types";
import { NodeDepth } from "../useNodeDepth";
import { TreeFormationOptions } from "../useTreeShaper";
import { Coordinate } from "@magic/shapes/types/utility";

export type NodePosition = { nodeId: GNode["id"]; coords: Coordinate };

export type TreeGraphPositionerOptions = {
  graph: Graph;
  rootNode: GNode;
  nodeDepths: NodeDepth;
  treeFormationOptions: TreeFormationOptions;
};

export type TreeGraphPositioner = (
  options: TreeGraphPositionerOptions,
) => NodePosition[];
