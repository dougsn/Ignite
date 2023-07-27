import { GetStaticProps } from "next";
import  Head  from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from './home.module.scss';


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps =async () => { // Fazendo a chamada via SSG
  
  const price = await stripe.prices.retrieve('price_1NYYW6D7loqQirn36BL3rINw', {
    expand: ['product'] // Pegar todas as informações do produto
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hrs para buscar uma 'atualização' da página.
  }
}

// O StaticSideGeneration SSG é utilizado em páginas que possuem o mesmo conteúdo para todas as pessoas, pois salva um HTML temporário na consulta a API

// O ServerSideGeneration SSR é utilizado em páginas dinâmicas.
