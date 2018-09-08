import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Box from './styled/Box';
import Avatar from './Avatar';
import {Reply} from 'styled-icons/material/Reply';
import {Heart} from 'styled-icons/fa-solid/Heart';

export default (props) => {
  const { comment, className } = props;

  return (
    <Wrapper className={className}>
      <Header>
        <Avatar user={null}/>
        <Presentation>
          <User>
            <Pseudo>Sinha</Pseudo>
            <Date>Feb 18 03:40pm</Date>
          </User>
          <Extra>
            <ReplyIcon size={20}/>
            <HeartIcon size={15} like={comment.like}/>
          </Extra>
        </Presentation>
      </Header>
      <Content>
        {comment.content} 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum metus ac viverra maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque sagittis vestibulum felis non luctus. Phasellus tristique nibh velit, ut egestas velit mattis ut. Aliquam ut gravida enim, eu consectetur leo. Etiam facilisis dui sed nisi pharetra, in varius purus dapibus. Aenean eu euismod lorem.
      </Content>
    </Wrapper>
  )
}

const cssIcon = `margin-left: 10px;`;

const Wrapper = styled(Box)`
  margin: 30px;
  padding: 30px;
`;

const HeartIcon = styled(Heart)`
  ${cssIcon};
  ${p => p.like && css`
    color: #eb6d58;
  `}
`;

const ReplyIcon = styled(Reply)`
  ${cssIcon};
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Presentation = styled.div`
  display: flex;
  margin-left: 15px;
  align-items: center;
  flex: 1;
  font-family: GothamRoundedBook, Roboto, sans-serif;
`;

const Extra = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  flex: 1;
`;

const Pseudo = styled.div`
  font-size: ${p => p.theme.titleFontSize};
  text-transform: uppercase;
`;

const Date = styled.div`
  font-size: ${p => p.theme.minFontSize};
  color: ${p => p.theme.lightColor};
`;

const Content = styled.div``;