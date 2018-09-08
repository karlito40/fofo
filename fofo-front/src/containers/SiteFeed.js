import React, { Component } from 'react';
import SiteFeed from '../components/SiteFeed';

const pages = [
  {
    "id": 1,
    "site_id": 85,
    "uri": "/path2.html",
    "newMessages": 3,
    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet, turpis a laoreet porta, justo neque consectetur nisl, eget sodales augue nisi sed ex.",
    "created_at": "2018-08-24 15:58:08",
    "updated_at": "2018-08-24 15:58:08",
    "deleted_at": null,
    "commentable_id": 250,
    "last_comment_created_at": "2018-08-24 18:12:53",
    "last_id": 388,
    "domain": "gmail.com"
  },
  {
      "id": 2,
      "site_id": 85,
      "uri": "/path1.html",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet, turpis a laoreet porta, justo neque consectetur nisl, eget sodales augue nisi sed ex.",
      "created_at": "2018-08-24 15:58:08",
      "updated_at": "2018-08-24 15:58:08",
      "deleted_at": null,
      "commentable_id": 251,
      "last_comment_created_at": "2018-08-24 16:07:47",
      "last_id": 196,
      "domain": "gmail.com"
  },
  {
      "id": 85,
      "site_id": 85,
      "uri": "/path1.html",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet, turpis a laoreet porta, justo neque consectetur nisl, eget sodales augue nisi sed ex.",
      "created_at": "2018-08-24 15:58:08",
      "updated_at": "2018-08-24 15:58:08",
      "deleted_at": null,
      "commentable_id": 251,
      "last_comment_created_at": "2018-08-24 16:07:47",
      "last_id": 196,
      "domain": "gmail.com"
  },
  {
      "id": 3,
      "site_id": 85,
      "uri": "/path1.html",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet, turpis a laoreet porta, justo neque consectetur nisl, eget sodales augue nisi sed ex.",
      "created_at": "2018-08-24 15:58:08",
      "updated_at": "2018-08-24 15:58:08",
      "deleted_at": null,
      "commentable_id": 251,
      "last_comment_created_at": "2018-08-24 16:07:47",
      "last_id": 196,
      "domain": "gmail.com"
  }
];

export default (props) => <SiteFeed {...props} pages={pages}/>