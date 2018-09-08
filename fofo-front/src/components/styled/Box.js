import styled, { css } from 'styled-components';

export default styled.div`
  background-color: ${p => p.theme.secondaryBgColor};
  box-shadow: ${p => p.theme.primaryBoxShadow};
  margin: 15px;
  padding: 15px;
`;