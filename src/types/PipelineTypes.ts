import type { ImageSourcePropType } from 'react-native';

import type { ImageDebugInfo } from './DebugTypes';

/**
 * Pipeline resolve result.
 */
export interface ResolveResult {
  source: ImageSourcePropType;

  debug: ImageDebugInfo;
}

/**
 * Pipeline stage.
 */
export type PipelineStage =
  'memory' | 'disk' | 'original' | 'network' | 'native';

/**
 * Pipeline state.
 */
export interface PipelineState {
  stage: PipelineStage;

  finished: boolean;

  error?: Error;
}
