import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/contants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full md:pt-44 relative ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_25%_at_50%_0%,#000_70%,transparent_100%)]" />
        <p className="text-center">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">Plura</h1>
        </div>
        <div className="flex justify-center items-center relative mt-[-20px] md:mt-[-40px]">
          <Image src={'/assets/preview.png'} alt="banner image" height={1200} width={1200} className="rounded-t-2xl border-2 border-muted" />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 pt-20">
        <h2 className="text-xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our Stright forward pricing plans are tailored to meet your needs.
        </p>
        <div className="grid container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4 mt-6">
          {
            pricingCards.map((card, index) => (
              <Card className={clsx('w-full h-full flex flex-col justify-between ', { 'border-2 border-primary': card.title === 'Unlimited Saas' })} key={card.title}>
                <CardHeader>
                  <CardTitle className={clsx('', { 'text-muted-foreground': card.title !== 'Unlimited Saas' })}>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground">/m</span>
                </CardContent>
                <CardFooter className='flex flex-col items-start gap-4'>
                  <div>
                    {
                      card.features.map((feature, index) => (
                        <div key={feature}
                          className="flex gap-2 items-center">
                          <Check />
                          <p className="text-muted-foreground">{feature}</p>
                        </div>
                      ))
                    }
                  </div>
                  <Link href={`/agency?paln=${card.priceId}`} className={clsx('w-full text-center bg-primary p-2 rounded-md', { '!bg-muted-foreground': card.title === 'Unlimited Saas' })}>
                    Get Started</Link>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </section>
    </>
  );
}
