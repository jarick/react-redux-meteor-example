// @flow

import styled from 'styled-components'
import {
  Row,
  Container,
  smViewport,
  Col,
} from '../Grid'

export const View = Container.extend`
  padding-top: 1em;
  @media ${smViewport} {
    padding-top: 3em;
  }
  display: flex;
  flex-flow: column nowrap;
  min-height: 95vh;
  font-size: 16px;
  font-family: "Times New Roman", Georgia, Serif;
`

export const LoginView = View.extend`
  max-width: 48em;
`

export const NavBar = styled.nav`
  display: block;
  width: 100%;
  padding: 0 .5em;
  background: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 3em;
`
export const NavBarContainer = Row.extend`

`
export const NavBarItem = Col.extend`
  a {
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 600;
    margin-right: 15px;
    text-decoration: none;
    line-height: 3em;
    color: #222;
    &:hover {
      color: #0FA0CE;
    }
    &.active {
      color: #0FA0CE;    
    }
  }
`

export const Table = styled.table`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 2em;
  table-layout: fixed;
  
  th:first-child, td:first-child {
    padding-left: 0;
  }
  th, td {
    padding: 12px 15px;
    text-align: left;
    overflow: hidden;
    a {
      color: #0FA0CE;
    }
  }
  .title-td {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 80vw;
  }
  .control {
    padding: 0 1em;
    color: #0FA0CE;
    cursor: pointer;
    text-decoration: underline;
  }
  .file {
    margin-right: 1em;
  }
`

export const TableWithAutoWidth = Table.extend`
  width: auto;
`

export const Pagination = styled.div`
  display: flex;
  justify-items: start;
  flex-wrap: wrap;
  
  div {
    margin: 0 0.5em;
    font-size: 1em;
    font-weight: bold;
    line-height: 2;
    a {
      color: #231f20;
      text-decoration: none;
      text-shadow: 0 0 0 #231f20;
      padding: 0 .5em;
      &.active {
        color: #0FA0CE;
      }
    }
  }
`
export const Header = styled.div`
  .title { 
    display: block;
    text-align: center;
    font-size: 2em;
    margin-bottom: 1em;
  }
  .button-box {
    display: block;
    margin-bottom: 1em;
    a:not(:last-child) {
      margin-right: 1.5em;
      margin-bottom: 1.5em;
    }
  }
  .button {
    display: inline-block;
    height: 38px;
    padding: 0 30px;
    color: #555;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    box-sizing: border-box; 
  }
  .button:hover, .button:focus {
    color: #333;
    border-color: #888;
    outline: 0; 
  }
  .sort-search-box {
    display: block;
    @media ${smViewport} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .sort-box {
    margin-bottom: 1em;
  }
  .label {
    margin: 0 0 0 .5em;
  }
  .link {
    margin: 0 0 0 .5em;
    color: #0FA0CE;
    text-decoration: underline;
    cursor: pointer;
    display: inline-block;
  }
  .search-wrap {
    position: relative;
    margin-bottom: 1em;
    input {
      height: 38px;
      padding: 5px 10px 5px 25px;
      background-color: #fff;
      border: 1px solid #D1D1D1;
      border-radius: 4px;
      box-shadow: none;
      box-sizing: border-box;
    }
    &:before {
      content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAQJJREFUKBWVkr2uQUEUhf3ET6GRaC5aFRoJKrf1BKpb8SwqovYGXkCj00k0QnRKEYkILYobvpUYmeMMyVnJl7P3mjN7Zu9zwiGv2qRFyMMSRrAFp6JPN8XzBj+wgDkUYAg7WINTYdwpDECxrRLJHeq2accdkgm8bzTvNAg2EDOGeUYI1KNO1gkuzTA1g8T7ojbn4ONQWPuHPWgeHmnzCqoe15tkSNPgPEAn68oVcOmA2XMtGK9FoE/VhOTTVNExqLCGZnxCv2pYauEC6lF0oQxX6IOvb7yX9NPEQafan+aPXDdQC18LsO6Tip5BBY6gIQaSbnMCFRCBZRcIvFkbsvCr4AFGOCxQy+JdGQAAAABJRU5ErkJggg==);
      display: block;
      position: absolute;
      width: 15px;
      z-index: 3;
      height: 15px;
      font-size: 20px;
      top: 5px;
      left: 7px;
      line-height: 32px;
      opacity: 0.6;    
    }
  }
`

export const Form = styled.form`
  .button-box{
    display: inline-block;
    margin: 1.5em 0;
    button:not(:last-child) {
      margin-right: 1.5em;
      margin-bottom: 1.5em;
    }
  }

  input[type="email"],
  input[type="number"],
  input[type="search"],
  input[type="date"],
  input[type="text"],
  input[type="tel"],
  input[type="url"],
  input[type="password"],
  textarea,
  select {
    width: 100%;
    height: 38px;
    padding: 6px 10px;
    background-color: #fff;
    border: 1px solid #D1D1D1;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box; 
    margin-bottom: 1.5rem;
    max-width: 600px;
    
    &:focus {
      border: 1px solid #33C3F0;
      outline: 0;   
    }
  }
  input[type="email"],
  input[type="number"],
  input[type="search"],
  input[type="date"],
  input[type="text"],
  input[type="tel"],
  input[type="url"],
  input[type="password"],
  textarea {
    appearance: none; 
  }
  textarea {
    min-height: 65px;
    padding-top: 6px;
    padding-bottom: 6px; 
  }
  label,
  legend {
    display: block;
    margin-bottom: .5rem;
    font-weight: 600; 
  }
  fieldset {
    padding: 0;
    border-width: 0; 
  }
  input[type="checkbox"],
  input[type="radio"] {
    display: inline; 
  }
  label > .label-body {
    display: inline-block;
    margin-left: .5rem;
    font-weight: normal; 
  }
  .cell {
    width: 100%;
    @media ${smViewport} {
      margin-left: 4%;
      width: 48%;
      &:first-child {
        margin-left: 0;  
      }
    }   
    float: left;
    display: inline-block;
  }
  .cellFull {
    width: 100%;
    float: left;
    display: inline-block;
  }
  .row {
    &:after {
      content: " ";
      clear: both;
    }
  }
  button {
    display: inline-block;
    height: 38px;
    padding: 0 30px;
    color: #555;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    box-sizing: border-box;
    &:hover, &:focus {
      color: #333;
      border-color: #888;
      outline: 0;     
    } 
    &[type="submit"] {
      color: #FFF;
      background-color: #33C3F0;
      border-color: #33C3F0;
    }
    &:disabled {
      color: #111;
      background-color: #eee;
      border-color: #eee;
    }
  }
  textarea {
    height: 300px;
  }

`
