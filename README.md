![Uygulama Ekran Görüntüsü](https://i.ibb.co/52r9yxJ/og-image-lg.jpg)

  
## Installation

Run project

```bash
  npm install

  npm run dev
```
## Docker

  ```bash
  docker build -t ledun/storyboard-app:latest
  docker push ledun/storyboard-app:latest
  docker-compose up -d
```

## Env file

`VITE_API_URL = your_api_url`


  
## Demo

Live Demo: http://78.111.111.77:4173/

Local Host: http://localhost:5173/
  
# Svelte & GraphQL Storyboard CRUD API



## API Usage

#### Get All Story Boards

```http
  export const GET_ALL_STORYBOARDS = `
  query {
    storyboards {
      nodes {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`;
```

| Parametre | Tip     |
| :-------- | :------- |
| `id` | `ID!` 
| `title` | `String` 
| `description` | `String` 
| `status` | `String` 
| `tags` | `String` 

#### Get Story Board

```http
  query($id: Int!) {
    storyboard(id: $id) {
      id
      title
      description
    }
  }
`;
```

| Parametre | Tip     |
| :-------- | :------- |
| `id` | `ID!` |


#### Total Count

```http
   query {
  storyboards {
    totalCount
    nodes {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
}
`;
```

#### Create Story Board

```http
   mutation CreateStoryboard($storyboard: StoryboardInput!) {
  createStoryboard(input: { storyboard: $storyboard }) {
    storyboard {
      id
      title
      description
      status
      tags
    }
  }
}
`;
```

| Parametre | Tip     |
| :-------- | :------- | 
| `id` | `ID!` 
| `title` | `String!` 
| `description` | `String!` 
| `status` | `String!` 
| `tags` | `String!` 


#### Delete Story Board

```http
  mutation DeleteStoryboard($input: DeleteStoryboardInput!) {
  deleteStoryboard(input: $input) {
    storyboard {
      id
    }
  }
}
`;
```

| Parametre | Tip     |
| :-------- | :------- |
| `id` | `ID!` 


  
#### Update Story Board

```http
 mutation UpdateStoryboard($input: UpdateStoryboardInput!) {
  updateStoryboard(input: $input) {
    storyboard {
      id
      title
      description
    }
  }
}
`;
```

| Parametre | Tip     |
| :-------- | :------- | 
| `id` | `ID!`  
| `title` | `String!`  
| `description` | `String!` 
| `status` | `String!` 
| `tags` | `String!` 


## Links

https://github.com/TarikSogukpinar/storyboard-app

https://hub.docker.com/repository/docker/ledun/storyboard-app/general

https://www.graphile.org/postgraphile/

https://graphql.org/


  
