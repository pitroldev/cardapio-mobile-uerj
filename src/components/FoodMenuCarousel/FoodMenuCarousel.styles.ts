import styled from 'styled-components/native';

export const CarouselView = styled.View`
  flex: 1;

  padding-top: 12px;
  padding-bottom: 12px;
`;

export const AccessibilityOnlyButton = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  position: absolute;
`;

export const Next = styled(AccessibilityOnlyButton)`
  left: 80%;
`;

export const Previous = styled(AccessibilityOnlyButton)`
  left: 0%;
`;
