import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { getCategory, getPreferences, use } from '../lib/Emoji';

export default class extends Component {
  state = { 
    emojis: {
      prefs: getPreferences().slice(0, 16),
      all: [
        ...getCategory('emoticons'),
        ...getCategory('additionalEmoticons'),
      ]
    }
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
    const { className } = this.props;
    const { emojis } = this.state;

    return <Wrapper className={className}>
      {!!emojis.prefs.length && (
        <Section dominant>
          <EmojiContainer>
            {emojis.prefs.map((emoji, i) => 
              <Emoji key={emoji.code} onClick={this.select.bind(this, emoji.code)}>{emoji.code}</Emoji>
            )}
          </EmojiContainer>
        </Section>
      )}
      
      <Section>
        <EmojiContainer>
          {emojis.all.map((emoji, i) => 
            <Emoji key={i} onClick={this.select.bind(this, emoji)}>{emoji}</Emoji>
          )}
        </EmojiContainer>
      </Section>
      
    </Wrapper>
  }
}

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

const Title = styled.div`
  font-size: 16px;
  font-family: GothamRoundedBook,Roboto,sans-serif;
`;

const EmojiContainer = styled.div`
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */ 
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
