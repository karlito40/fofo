import React from 'react';
import PageFeed from '../components/PageFeed';

const comments = [
  {
      "id": 388,
      "user_id": 1,
      "commentable_id": 250,
      "like": true,
      "commentable_type": "App\\Models\\Page",
      "content": "LAallaa",
      "created_at": "2018-08-24 18:12:53",
      "updated_at": "2018-08-24 18:12:53",
      "deleted_at": null
  },
  {
      "id": 197,
      "user_id": 1,
      "commentable_id": 250,
      "commentable_type": "App\\Models\\Page",
      "content": "LAallaa",
      "created_at": "2018-08-24 16:08:31",
      "updated_at": "2018-08-24 16:08:31",
      "deleted_at": null
  },
  {
      "id": 195,
      "user_id": 1,
      "commentable_id": 250,
      "commentable_type": "App\\Models\\Page",
      "content": "nouveau comment",
      "created_at": "2018-08-24 15:58:16",
      "updated_at": "2018-08-24 15:58:16",
      "deleted_at": null
  },
  {
      "id": 194,
      "user_id": 1,
      "commentable_id": 250,
      "commentable_type": "App\\Models\\Page",
      "content": "je suis un contenudz dzadazdaz",
      "created_at": "2018-08-24 15:58:08",
      "updated_at": "2018-08-24 15:58:08",
      "deleted_at": null
  },
  {
    "id": 201,
    "user_id": 1,
    "commentable_id": 250,
    "commentable_type": "App\\Models\\Page",
    "content": "je suis un contenudz dzadazdaz",
    "created_at": "2018-08-24 15:58:08",
    "updated_at": "2018-08-24 15:58:08",
    "deleted_at": null
},
{
  "id": 202,
  "user_id": 1,
  "commentable_id": 250,
  "commentable_type": "App\\Models\\Page",
  "content": "je suis un contenudz dzadazdaz",
  "created_at": "2018-08-24 15:58:08",
  "updated_at": "2018-08-24 15:58:08",
  "deleted_at": null
},
{
  "id": 203,
  "user_id": 1,
  "commentable_id": 250,
  "commentable_type": "App\\Models\\Page",
  "content": "je suis un contenudz dzadazdaz",
  "created_at": "2018-08-24 15:58:08",
  "updated_at": "2018-08-24 15:58:08",
  "deleted_at": null
},
];

export default (props) => <PageFeed {...props} comments={comments}/>
