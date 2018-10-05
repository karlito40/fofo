import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import Switch from "react-switch";
import { Sidebar as PanelIcon } from 'styled-icons/feather/Sidebar';
import { EyeOff as PanelCloseIcon } from 'styled-icons/feather/EyeOff';
import serviceIPC from '../ipc';
import * as StorageSync from '../storage-sync';
import { _ } from '../i18n/react';
import Hint from './Hint';

export default class Body extends Component {
  state = { loading: true, currentPanel: false, onDemand: false };

  async handlePanel(panel) {
    this.setState({ currentPanel: panel });
    updateStorage({ panel });
  }

  toggleOnDemand = () => {
    const onDemand = !this.state.onDemand;
    this.setState({ onDemand });
    updateStorage({ onDemand });
  }

  async componentDidMount() { 
    try {
      const storage = await StorageSync.get();
      this.setState({ 
        currentPanel: storage.panel, 
        onDemand: storage.onDemand,
        loading: false 
      });

      // Shouldn't be there..
      // Place it on index.js for performance reason
      if(storage.onDemand) {
        serviceIPC.background.show();
      }

    } catch (e) {
      console.log('PopupExtension cannot call the background script.\nFalling back to bottom panel for demonstration purpose only.');
      this.setState({loading: false, currentPanel: 'bottom'});
    }
    
  }

  render() {
    const { currentPanel, loading, onDemand } = this.state;

    return <Wrapper>
      {loading ? null : 
        <Fragment>
          <Row>
            <Label>
              {_('Dock side')}
            </Label>

            <Modificators>
              <SelectPanel active={currentPanel === 'sidebar'} onClick={this.handlePanel.bind(this, 'sidebar')}>
                <Hint dir="left">{_('Dock to left')}</Hint>
                <PanelIcon size={18}/>
              </SelectPanel>
              <SelectPanel active={currentPanel === 'bottom'} onClick={this.handlePanel.bind(this, 'bottom')}>
                <Hint dir="left">{_('Dock to bottom')}</Hint>
                <PanelBottomIcon size={18}/>
              </SelectPanel>
              <SelectPanel active={!currentPanel} onClick={this.handlePanel.bind(this, false)}>
                <Hint dir="left">{_('Hide dock')}</Hint>
                <PanelCloseIcon size={18}/>
              </SelectPanel>
            </Modificators>
          </Row>

          <Row>
            <Label>
              <div>{_('Display only on demand')}</div>
              <LabelDetail>
                {_("This extension will only appear after a click on it")}
              </LabelDetail>
            </Label>
            <Modificators>
              <div onClick={this.toggleOnDemand}>
                <Switch 
                  onChange={() => {}} 
                  checked={onDemand} 
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={25}
                  boxShadow="0px 2px 10px 0px rgba(124, 130, 139, 0.15), inset 0px 0px 0px 1px rgba(231, 233, 238, 0.8)"
                  offColor="#eef0f4"
                  onColor="#39dd92"
                  height={20}
                  width={37}/>
              </div>
              
            </Modificators>
          </Row>
        </Fragment>
      }
      
    </Wrapper> 
  }
}

async function updateStorage(change) {
  try {
    await serviceIPC.background.updateStorage(change);
  } catch (e) {
    console.log('PopupExtension cannot call the background script. updateStorage() will be ignored');
  }
}

const Wrapper = styled.div`
  min-width: 210px;
  padding: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  width: 235px;
  margin-right: 15px;
`;

const LabelDetail = styled.div`
  font-size: ${p => p.theme.minFontSize};
  color: ${p => p.theme.lightColor};
  font-style: italic;
`;

const Modificators = styled.div`
  display: flex;
  margin-left: auto;
  margin-bottom: auto;
  position: relative;
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

