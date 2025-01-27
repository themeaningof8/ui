import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion/accordion"

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UI Library</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>よくある質問</AccordionTrigger>
          <AccordionContent>
            これはサンプルのアコーディオンコンポーネントです。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 