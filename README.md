![Uygulama Ekran Görüntüsü](https://i.ibb.co/52r9yxJ/og-image-lg.jpg)

  
## Installation

Bu projeyi dağıtmak için çalıştırın

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

## Demo

Live Demo: http://78.111.111.77:4173/

Local Host: http://78.111.111.77:5173/
  
# Svelte & GraphQL Storyboard CRUD API



## API Usage

#### Get All Story Boards

```http
  export const GET_ALL_STORYBOARDS = 
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

```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `id` | `ID!` | **Gerekli**. API anahtarınız. |
| `title` | `String` | **Gerekli**. API anahtarınız. |
| `description` | `String` | **Gerekli**. API anahtarınız. |
| `status` | `String` | **Gerekli**. API anahtarınız. |
| `tags` | `String` | **Gerekli**. API anahtarınız. |

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

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `id` | `ID!` | **Gerekli**. API anahtarınız. |


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

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `id` | `ID!` | **Gerekli**. API anahtarınız. |
| `title` | `String!` | **Gerekli**. API anahtarınız. |
| `description` | `String!` | **Gerekli**. API anahtarınız. |
| `status` | `String!` | **Gerekli**. API anahtarınız. |
| `tags` | `String!` | **Gerekli**. API anahtarınız. |


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

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `id` | `ID!` | **Gerekli**. API anahtarınız. |


  
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

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `id` | `ID!` | **Gerekli**. API anahtarınız. |
| `title` | `String!` | **Gerekli**. API anahtarınız. |
| `description` | `String!` | **Gerekli**. API anahtarınız. |
| `status` | `String!` | **Gerekli**. API anahtarınız. |
| `tags` | `String!` | **Gerekli**. API anahtarınız. |


## Ekler

Herhangi bir ek bilgi buraya gelir

  
