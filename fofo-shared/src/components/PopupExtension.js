import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import Switch from "react-switch";
import { Sidebar as PanelIcon } from 'styled-icons/feather/Sidebar';
import { EyeOff as PanelCloseIcon } from 'styled-icons/feather/EyeOff';
import serviceIPC from '../ipc';
import * as StorageAccess from '../storage/access';
import { _ } from '../i18n/react';
import Hint from './Hint';
import config from '../config';

export default class PopupExtension extends Component {
  // This state should be derived from props
  state = { 
    loading: true, 
    currentPanel: config.defaultPanel, 
    onDemand: config.defaultOnDemand, 
    user: null 
  };

  disconnectUser = () => {
    // Only Usefull for browserAction. 
    // This popup under BrowserAction cannot be sync with the storage
    this.setState({user: null}); 

    StorageAccess.update({
      token: null,
      user: null,
    });
  }

  async handlePanel(panel) {
    this.setState({ currentPanel: panel });
    StorageAccess.update({ panel });
  }

  toggleOnDemand = () => {
    const onDemand = !this.state.onDemand;
    this.setState({ onDemand });
    StorageAccess.update({ onDemand });
  }

  onStorageSync = (storage) => {
    this.setState({user: storage.user});
  }

  async componentDidMount() { 
    const storage = await StorageAccess.get();

    this.setState({ 
      currentPanel: storage.panel, 
      onDemand: storage.onDemand,
      user: storage.user,
      loading: false 
    });
    
    StorageAccess.events.addListener('sync', this.onStorageSync);

    // It Should be move to index.js for performance reason
    // We want to execute it as soon as possible
    // It as nothing to do with PopupExtension
    if(storage.onDemand) {
      console.log('trying to show')
      try {
        await serviceIPC.background.show();
      } catch (e) {
        console.log('show fail')
      }
    }
  }

  componentWillUnmount() {
    StorageAccess.events.removeListener('sync', this.onStorageSync);
  }

  render() {
    const { currentPanel, loading, onDemand, user } = this.state;

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
                  checked={onDemand || false} 
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
          {user && <DeconnexionButton onClick={this.disconnectUser}>Deconnexion</DeconnexionButton>}
        </Fragment>
      }
      
    </Wrapper> 
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

const DeconnexionButton = styled.button`
  border: 0;
  outline: 0;
  background: rgb(238, 240, 244);
  font-weight: bold;
  font-family: GothamRounded, Roboto, sans-serif;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 10px 15px;
  color: ${p => p.theme.primaryColor};
  transition: 0.2s border;

  &:hover {
    border: 2px solid ${p => p.theme.primaryColor}
  }
`;