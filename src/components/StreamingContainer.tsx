import styled from 'styled-components';
import { typography } from '@/src/styles/theme/constants';

export const StreamingContainer = styled.div<{ numLines: number }>`
  height: ${props => Math.max(0, props.numLines + 1) * typography.lineHeight.normal}em;
  min-height: ${typography.lineHeight.normal}em;
  transition: height 150ms ease-out;
  overflow: hidden;
`; 