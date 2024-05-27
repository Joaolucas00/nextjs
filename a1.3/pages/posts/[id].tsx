import { GetStaticProps } from 'next';
import Link from 'next/link'
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  return {
    paths: [
      { params: {id: '2'} },
      { params: {id: '3'} }
    ],
    fallback: 'blocking' // boolean ou 'blocking' que segurar a requisição até ter o conteúdo, bom pra ISG
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  const json = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params?.id}`)
  .then((res) => res.json())

  return {
    props: {
      id: context.params?.id,
      json
    }
  }
}

export default function Post({ id, json }) {

  const rota = useRouter()
  if (rota.isFallback) {
    return 'Essa página não existe, ainda !'
  }

  return (
    <div>
      Id do post atual: { id }
      <pre>
        {JSON.stringify(json, null, 2)}
      </pre>
      <ul>
        <li>
          <Link href="/">
            <a>Ir para a home</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

/**
 *  ISG, cacheia algumas páginas e renderiza as outras
 */

/*
export async function getStaticPaths() {
  // const dadosDaAPI = await fetch('https://fakeapi-omariosouto.vercel.app/api/posts')
  //   .then((res) => res.json());

  // const paths = dadosDaAPI.posts.map((postAtual) => {
  //   return { params: { id: `${postAtual.id}` } };
  // })

  return {
    // paths: paths,
    paths: [],
    fallback: 'blocking' // false or 'blocking'
  };
}
*/
/*
export async function getStaticProps(contextdf) {
  console.log('Gerou!');
  const id = context.params.id;
  const dadosDaAPI = await fetch(`https://fakeapi-omariosouto.vercel.app/api/posts/${id}`)
  .then((res) => res.json());
  const post = dadosDaAPI;
  // const post = dados.posts.find((currentPost) => {
  //   if(currentPost.id === id) {
  //     return true;
  //   }
  //   return false;
  // })


  return {
    props: {
      id: post.id,
      title: post.title,
      date: post.date,
      content: post.content,
    }, 
  }
}*/