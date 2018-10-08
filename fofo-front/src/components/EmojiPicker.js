import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { getCategory, getPreferences, use } from '../lib/Emoji';
import { TimelineMax, Power4, TweenMax } from 'gsap/all';
import withTransition from './hoc/withTransition';

class EmojiPicker extends Component {
  container = React.createRef();
  favoriteSection = React.createRef();
  allSection = React.createRef();

  state = { 
    emojis: {
      prefs: getPreferences().slice(0, 16),
      all: [
        ...getCategory('emoticons'),
        ...getCategory('additionalEmoticons'),
      ]
    }
  }

  getTimeline() {
    const allSectionNode = this.allSection.current;
    const favoriteSectionNode = this.favoriteSection.current;
    const sections = [favoriteSectionNode, allSectionNode];

    TweenMax.set(sections, { opacity: 0, y: 15 });
    
    const tl = new TimelineMax();
    
    tl.from(this.container.current, 0.6, { width: 0, height: 0, ease: Power4.easeOut }, 'start');
    tl.to(sections, 0.2, { opacity:1, y: 0 }, '-=0.2');

    return tl;
  }

  select(code) {
    this.setState({
      emojis: {
        ...this.state.emojis,
        prefs: use(code).slice(0, 16)
      }
    });

    if(this.props.onSelect) {
      this.props.onSelect(code);
    }
  }
  
  render() {
    const { className, show } = this.props;
    const { emojis } = this.state;

    return (
      <Wrapper ref={this.container} className={className}>
        {!!emojis.prefs.length && (
          <Section ref={this.favoriteSection} dominant>
            <EmojiContainer>
              {emojis.prefs.map((emoji, i) => 
                <Emoji 
                  key={emoji.code} 
                  onClick={this.select.bind(this, emoji.code)}
                >
                  {emoji.code}
                </Emoji>
              )}
            </EmojiContainer>
          </Section>
        )}
        
        <Section ref={this.allSection}>
          <EmojiContainer>
            {emojis.all.map((emoji, i) => 
              <Emoji 
                key={i} 
                onClick={this.select.bind(this, emoji)}
              >
                {emoji}
              </Emoji>
            )}
          </EmojiContainer>
        </Section>
      </Wrapper>
    );
  }
}

export default withTransition()(EmojiPicker);

const Section = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }

  ${p => p.dominant && css`
    background-color: #f9f9f9;
  `}
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: calc(100% + 5px);
  right: calc(100% + 5px);
  width: 300px;
  padding: 15px 13px 15px 15px;
  max-height: 200px;
  overflow: scroll;
  background-color: white;
  box-shadow: ${p => p.theme.primaryBoxShadow};
`;

const EmojiContainer = styled.div`
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
`;

const Emoji = styled.div`
  cursor: pointer;
  padding: 7px 4px 5px 8px;
  line-height: 1em;

  &:hover {
    border-radius: 10px;
    background-color: #e6e7e8;
    transition: background-color 0.2s, border-radius 0.3s;
  }
`;
