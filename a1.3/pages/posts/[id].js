import Link from 'next/link'
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  return {
    paths: [{
      params: {id: '2'}
    }],
    fallback: false
  }
}

export async function getStaticProps(context) {
  console.log(context);

  return {
    props: {
      id: context.params.id
    }
  }
}

export default function Post({ id }) {

  return (
    <div>
      Id do post atual: { id }

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
