import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// get all posts
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            createdAt
            title
            url
            excerpt
            ingredients
            featuredImage {
              url
            }
            categories {
              name
              url
              categoryDescription
              image {
                url
              }
              localizations {
      id
      name
      locale
    }
            }
            ingredientCategories {
              name
              url
              image {
                url
              }
              localizations {
      id
      name
      locale
    }
            }
            countries {
              categoryDescription
              image {
                url
              }
              name
              url
              localizations {
      id
      name
      locale
    }
            }
          }
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};

// get post details
export const getPostDetails = async (url) => {
  const query = gql`
    query GetPostDetails($url: String!) {
      post(where: { url: $url }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        url
        content {
          raw
        }
        localizations {
          excerpt
          title
          content {
            raw
          }
        }
        categories {
          name
          url
          categoryDescription
          image {
            url
          }
          localizations {
      id
      name
      locale
    }
        }
        ingredients
        ingredientCategories {
          name
          url
          image {
            url
          }
          localizations {
      id
      name
      locale
    }
        }
        countries {
          categoryDescription
          image {
            url
          }
          name
          url
          localizations {
      id
      name
      locale
    }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { url });

  return result.post;
};

// get recent posts
export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(orderBy: 
    createdAt_ASC
    last: 3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      url
    }
  }
  `;
  const results = await request(graphqlAPI, query);
  return results.posts;
};

// get similar category posts
export const getSimilarPosts = async (categories, url) => {
  const query = gql`
    query GetPostDetails($url: String!, $categories: [String!]) {
      posts(
        where: {
          url_not: $url
          AND: { categories_some: { url_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        url
      }
    }
  `;
  const result = await request(graphqlAPI, query, { url, categories });

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories(first: 20) {
        name
        url
        categoryDescription
        image {
          url
        }
        localizations {
      id
      name
      locale
    }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getCountries = async () => {
  const query = gql`
    query GetCountriers {
      countries {
        categoryDescription
        image {
          url
        }
        name
        url
        localizations {
      id
      name
      locale
    }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.countries;
};

export const getIngredientCategories = async () => {
  const query = gql`
    query GetIngredientCategories {
      ingredientCategories(first: 20) {
        name
        url
        image {
          url
        }
        localizations {
      id
      name
      locale
    }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.ingredientCategories;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (url) => {
  const query = gql`
    query GetComments($url: String!) {
      comments(where: { post: { url: $url } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { url });
  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        url
        createdAt
        localizations {
          excerpt
          title
          content {
            raw
          }
        }
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategoryPost = async (url) => {
  const query = gql`
    query GetCategoryPost($url: String!) {
      postsConnection(where: { categories_some: { url: $url } }) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            url
            title
            excerpt
            
            featuredImage {
              url
            }
            categories {
              name
              url
              categoryDescription
              image {
                url
              }
              localizations {
      id
      name
      locale
      excerpt
          title
          content {
            raw
          }
    }
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { url });

  return result.postsConnection.edges;
};

export const getIngredientPost = async (url) => {
  const query = gql`
    query GetIngredientPost($url: String!) {
      postsConnection(where: { ingredientCategories_some: { url: $url } }) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            url
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              url
              categoryDescription
              image {
                url
              }
            }
            ingredientCategories {
              name
              url
              image {
                url
              }
              localizations {
      id
      name
      locale
      excerpt
          title
          content {
            raw
          }
    }
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { url });

  return result.postsConnection.edges;
};

export const getCountryPost = async (url) => {
  const query = gql`
    query GetCountryPost($url: String!) {
      postsConnection(where: { countries_some: { url: $url } }) {
        edges {
          node {
            author {
              name
              bio
              id
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            createdAt
            excerpt
            title
            url
            countries {
              categoryDescription
              name
              url
              image {
                url
              }
              localizations {
      id
      name
      locale
      excerpt
          title
          content {
            raw
          }
    }
            }
            categories {
              categoryDescription
              name
              image {
                url
              }
              url
              localizations {
      id
      name
      locale
    }
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { url });

  return result.postsConnection.edges;
};

export const getBlogSubjects = async () => {
  const query = gql`
    query GetSubjects {
      blogSubjects {
        name
        image {
          url
        }
        localizations {
      id
      locale
      name
    }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.blogSubjects;
};

export const getCreatorDescription = async () => {
  const query = gql`
    query MyQuery {
      generalInfos {
        creatorDescription
        localizations {
      id
      locale

    }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.generalInfos;
};

// export const getIngredientCategories = async () => {
//   const query = gql`
//     query GetIngredientCategories {
//       ingredientCategories {
//         name
//         url
//         image {
//           url
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query);
//   return result.ingredientCategories;
// };
