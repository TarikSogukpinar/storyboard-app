import {
  gql,
  createClient,
  Client,
  debugExchange,
  cacheExchange,
  fetchExchange,
} from "@urql/svelte";

// URQL client'ı için doğru tipi belirtiyoruz.
const client: Client = createClient({
  url: "http://localhost:5432/graphql",
  exchanges: [debugExchange, cacheExchange, fetchExchange],
});

// GraphQL query'sini TypeScript ile tanımlıyoruz.
export const GET_STORYBOARDS = gql`
  query {
    storyboards {
      id
      title
      description
    }
  }
`;

// Storyboard ekleme fonksiyonunu TypeScript ile yazıyoruz.
export const createStoryboard = async (request: Request): Promise<Response> => {
  // Gelen request body'sinin tipini tanımlıyoruz
  const data: { title: string; description: string } = await request.json();

  // Mutation sorgusunu oluşturuyoruz
  const mutation = gql`
    mutation ($title: String!, $description: String!) {
      insert_storyboards(
        objects: { title: $title, description: $description }
      ) {
        returning {
          id
          title
        }
      }
    }
  `;

  // Mutation'ı URQL client ile çalıştırıyoruz
  const result = await client
    .mutation(mutation, { title: data.title, description: data.description })
    .toPromise();

  // Yanıtın tipini kontrol ediyoruz
  if (result.error) {
    return new Response("Error executing mutation", { status: 500 });
  }

  // Başarılı yanıtı döndürüyoruz
  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
