import { Heading } from "@/ui/components/Heading"

export default function Home() {
  return (
    <div className="w-[350px] lg:w-[500px] mx-auto pt-10 pb-20">
      <Heading level={1} className="text-center">Welcome to your new app</Heading>
    </div>
  )
}