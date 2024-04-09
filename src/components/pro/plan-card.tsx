'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Sparkles, Wand, WandSparkles } from 'lucide-react';

export const PlanCard = () => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg font-bold'>
            BNA Pro
          </CardTitle>
          <CardDescription>Ignite Creativity!</CardDescription>
        </div>
        {/* <div className='ml-auto flex items-center gap-1'>
          <Button size='sm' variant='outline' className='h-8 gap-1'>
            <Truck className='h-3.5 w-3.5' />
            <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
              Learn more
            </span>
          </Button>
        </div> */}
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold flex items-center gap-2'>
            Content AI
          </div>
          <ul className='grid gap-3'>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>
                Autocompletion & rephrasing
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Image generation</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>
                Manipulate in-line text
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>
                Automated translation
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>
                Grammar & spelling checker
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Text to Podcast</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>
                Voice & tone adjustment
              </span>
            </li>
          </ul>

          <Separator className='my-2' />

          <div className='grid gap-3'>
            <div className='font-semibold flex items-center gap-2'>
              AI-Powered Content Creation
            </div>
            <ul className='grid gap-3'>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>Content AI UI</span>
              </li>
              <li className='flex items-center justify-between'>
                <span className='text-muted-foreground'>
                  Predefined & custom prompts
                </span>
              </li>
              <li>
                <span className='text-muted-foreground'>
                  Latest OpenAI & DALL·E models
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center justify-between  border-t bg-muted/50 px-6 py-3'>
        <div className='text-xs text-muted-foreground'>Coming soon</div>
        <div className='text-xs text-muted-foreground'>{`$$/month`}</div>
      </CardFooter>
    </Card>
  );
};
