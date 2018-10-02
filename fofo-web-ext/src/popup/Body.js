import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Sidebar as PanelIcon } from 'styled-icons/feather/Sidebar';
import { EyeOff as PanelCloseIcon } from 'styled-icons/feather/EyeOff';
import * as actions from './actions';
import * as StorageSync from '../shared/storage-sync';
import Hint from './Hint';

export default class Body extends Component {
  state = { loading: true, currentPanel: false };

  handlePanel(panel) {
    actions.selectPanel(panel);
    this.setState({ currentPanel: panel });
  }

  async componentDidMount() { 
    const currentPanel = (await StorageSync.get()).panel;
    this.setState({ currentPanel, loading: false });
  }

  render() {
    const { currentPanel, loading } = this.state;

    return <Wrapper>
      {loading ? null : 
        <Header>
          <Label>
            Dock side
          </Label>
          <Panels>
            <SelectPanel active={currentPanel === 'sidebar'} onClick={this.handlePanel.bind(this, 'sidebar')}>
              <Hint dir="left">Dock to left</Hint>
              <PanelIcon size={18}/>
            </SelectPanel>
            <SelectPanel active={currentPanel === 'bottom'} onClick={this.handlePanel.bind(this, 'bottom')}>
              <Hint dir="left">Dock to bottom</Hint>
              <PanelBottomIcon size={18}/>
            </SelectPanel>
            <SelectPanel active={!currentPanel} onClick={this.handlePanel.bind(this, false)}>
              <Hint dir="left">Hide dock</Hint>
              <PanelCloseIcon size={18}/>
            </SelectPanel>
          </Panels>
        </Header>
      }
      
    </Wrapper> 
  }
}

const Wrapper = styled.div`
  min-width: 210px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div``;
const Panels = styled.div`
  display: flex;
  margin-left: auto;
`;

const SelectPanel = styled.div`
  position: relative;
  padding: 0 3px;
  padding-bottom: 3px;
  cursor: pointer;
  color: ${p => p.theme.strongColor};
  ${p => p.active && css`
    color: ${p => p.theme.highlightColor};
  `}

  &:first-child {
    margin-left: 0px;
  }

  &:hover {
    color: ${p => p.theme.highlightColor};
  }
`;

const PanelBottomIcon = styled(PanelIcon)`
  transform: rotate(-90deg);
`;

